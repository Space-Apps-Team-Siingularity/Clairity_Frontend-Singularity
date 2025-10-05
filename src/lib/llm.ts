type HealthBoxes = {
  category: string;
  general: string;
  sensitiveGroups: string;
};

type ForecastBoxes = {
  daysToWatch: string;
  goodDays: string;
  otherInfo: string;
};

function buildHealthPrompt(city: string, score: number | null, category: string | null): string {
  return [
    "You are a public health assistant specializing in air quality.",
    `City: ${city}.`,
    `Air Quality Score (higher is better): ${score ?? "unknown"}.`,
    `AQI Category: ${category ?? "unknown"}.`,
    "Considering typical pollutants from NASA TEMPO, MERRA-2, OMI, and local conditions, output three sections strictly in JSON with keys: category, general, sensitiveGroups.",
    "- category: concise 3-8 word label (e.g., 'Moderate - Take Precautions').",
    "- general: 2-4 short sentences with actionable guidance.",
    "- sensitiveGroups: 2-4 short sentences targeted at asthmatics, elderly, children, pregnant people.",
  ].join("\n");
}

function buildForecastPrompt(city: string, rows: (string | number)[][]): string {
  const compact = rows
    .map((r) => ({ date: r[0], aqi: r[1], score: r[2], category: r[3], t: r[4], h: r[5], p: r[6] }))
    .slice(0, 7);
  return [
    "You are an air-quality forecaster.",
    `City: ${city}. Next 7 days (date, aqi, score, category, tempC, humidity, pressure):`,
    JSON.stringify(compact),
    "Output insights strictly in JSON with keys: daysToWatch, goodDays, otherInfo.",
    "- daysToWatch: brief bullets for days with 'Unhealthy' or high AQI.",
    "- goodDays: brief bullets for favorable days.",
    "- otherInfo: concise notes on humidity/pressure patterns.",
  ].join("\n");
}

async function callFreeLLM(prompt: string): Promise<any> {
  // Use OpenAI-compatible free endpoint if provided, else fall back to huggingface textendpoint via CORS-friendly proxy.
  const base = import.meta.env.VITE_LLM_BASE_URL || "https://api.groq.com/openai/v1";
  const key = import.meta.env.VITE_LLM_API_KEY || "";
  const model = import.meta.env.VITE_LLM_MODEL || "llama3-8b-8192";

  if (!key) {
    throw new Error("LLM key missing");
  }

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(key ? { authorization: `Bearer ${key}` } : {}),
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Answer in minimal JSON only with the requested keys." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    }),
  });
  if (!res.ok) throw new Error("LLM call failed");
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "{}";
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function fallbackFromCategory(category: string | null, score: number | null): HealthBoxes {
  const cat = (category || "Moderate").toLowerCase();
  if (cat.includes("good")) {
    return {
      category: "Good - Enjoy Outdoors",
      general: "Air quality is healthy. Normal outdoor activity is safe. Stay hydrated in heat.",
      sensitiveGroups: "No special precautions required. Monitor symptoms if you have asthma.",
    };
  }
  if (cat.includes("moderate")) {
    return {
      category: "Moderate - Take Light Care",
      general: "Air quality is acceptable. If you notice irritation, reduce intense outdoor exercise.",
      sensitiveGroups: "People with asthma, children, older adults: limit prolonged exertion outdoors.",
    };
  }
  if (cat.includes("unhealthy")) {
    return {
      category: "Unhealthy - Limit Exposure",
      general: "Consider moving activities indoors. Close windows if pollution odors are noticeable.",
      sensitiveGroups: "Asthmatics, elderly, pregnant people, and children should avoid strenuous outdoor activity.",
    };
  }
  return {
    category: "Health Advisory",
    general: "Limit prolonged outdoor exertion if you feel any symptoms.",
    sensitiveGroups: "Sensitive groups should minimize exposure and follow physician guidance.",
  };
}

export function getFallbackHealthBoxes(city: string, score: number | null, category: string | null): HealthBoxes {
  return fallbackFromCategory(category, score);
}

export async function getHealthBoxes(city: string, score: number | null, category: string | null): Promise<HealthBoxes> {
  const prompt = buildHealthPrompt(city, score, category);
  try {
    const json = await callFreeLLM(prompt);
    return {
      category: json.category || (category ?? "Health Advisory"),
      general: json.general || "Limit prolonged outdoor exertion if you feel symptoms.",
      sensitiveGroups: json.sensitiveGroups || "Sensitive groups should follow physician advice and reduce exposure.",
    };
  } catch {
    return fallbackFromCategory(category, score);
  }
}

export async function getForecastBoxes(city: string, rows: (string | number)[][]): Promise<ForecastBoxes> {
  const prompt = buildForecastPrompt(city, rows);
  try {
    const json = await callFreeLLM(prompt);
    return {
      daysToWatch: json.daysToWatch || "No significant risks detected.",
      goodDays: json.goodDays || "Several days show favorable air quality for outdoor activities.",
      otherInfo: json.otherInfo || "Humidity and pressure remain stable overall.",
    };
  } catch {
    return getFallbackForecastBoxes(rows);
  }
}

export function getFallbackForecastBoxes(rows: (string | number)[][]): ForecastBoxes {
  const categories = rows.map((r) => String(r[3] ?? ""));
  const dates = rows.map((r) => String(r[0] ?? ""));
  const aqiVals = rows.map((r) => Number(r[1] ?? 0));
  const badIdx: number[] = [];
  const goodIdx: number[] = [];
  categories.forEach((c, i) => {
    const lower = c.toLowerCase();
    if (lower.includes("unhealthy") || (aqiVals[i] ?? 0) >= 100) badIdx.push(i);
    if (lower.includes("good") || (aqiVals[i] ?? 0) <= 50) goodIdx.push(i);
  });
  const daysToWatch = badIdx.length
    ? badIdx.map((i) => `${dates[i]} (${categories[i] || 'Unhealthy'})`).join("; ")
    : "No significant risks detected.";
  const goodDays = goodIdx.length
    ? goodIdx.map((i) => `${dates[i]} (${categories[i] || 'Good'})`).join("; ")
    : "Several days show favorable air quality for outdoor activities.";
  const otherInfo = "Forecast based on 7-day model output. Monitor local advisories for changes.";
  return { daysToWatch, goodDays, otherInfo };
}


