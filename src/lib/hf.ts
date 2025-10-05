const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const FUNCTIONS_BASE: string = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
export type PredictResponse = {
  raw: string; // the Space returns a Markdown string for /predict_api
};

export type Predict7Response = {
  table: { headers: string[]; data: (string | number)[][] };
  raw: unknown; // raw open-meteo payload passthrough
};

export async function callPredict(city: string): Promise<PredictResponse> {
  // Use our hf-proxy function which matches the Space's required fields
  const res = await fetch(`${FUNCTIONS_BASE}/functions/v1/hf-proxy/predict_api`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(SUPABASE_ANON_KEY
        ? { authorization: `Bearer ${SUPABASE_ANON_KEY}`, apikey: SUPABASE_ANON_KEY }
        : {}),
    },
    body: JSON.stringify({ city, sensor_pm25: 0, sensor_temp: 0, sensor_humidity: 0 }),
  });
  if (!res.ok) throw new Error("predict call failed");
  const initial = await res.json();
  console.debug("[HF callPredict] initial:", initial);
  const sse = Array.isArray(initial?.data) && typeof initial.data[0] === "string" ? (initial.data[0] as string) : "";
  console.debug("[HF callPredict] sse:", sse);
  // Extract the last data: payload; handle nested quoted JSON
  let payloadArr: any[] | null = null;
  const lines = sse.split(/\n/);
  let acc: string[] = [];
  let seen = false;
  for (const ln of lines) {
    if (ln.startsWith("data:")) { acc = [ln.replace(/^data:\s*/, "")]; seen = true; } else if (seen) { acc.push(ln); }
  }
  if (seen) {
    const body = acc.join("\n");
    try { payloadArr = JSON.parse(body); } catch {}
    if (payloadArr && typeof payloadArr[0] === "string") {
      try { const inner = JSON.parse(payloadArr[0]); if (inner) payloadArr[0] = inner; } catch {}
    }
  }
  const payload = payloadArr ?? [sse];
  console.debug("[HF callPredict] payload:", payload);
  const raw = typeof payload[0] === "string" ? (payload[0] as string) : JSON.stringify(payload[0]);
  return { raw };
}

export async function callPredict7(city: string): Promise<Predict7Response> {
  console.debug("[HF callPredict7] → sending", { url: `${FUNCTIONS_BASE}/functions/v1/hf-proxy/predict_7day_aqi`, city, sensor_pm25: 0 });
  const res = await fetch(`${FUNCTIONS_BASE}/functions/v1/hf-proxy/predict_7day_aqi`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(SUPABASE_ANON_KEY
        ? { authorization: `Bearer ${SUPABASE_ANON_KEY}`, apikey: SUPABASE_ANON_KEY }
        : {}),
    },
    body: JSON.stringify({ city, sensor_pm25: 0 }),
  });
  if (!res.ok) throw new Error("predict7 call failed");
  const initial = await res.json();
  console.debug("[HF callPredict7] ← received initial", initial);
  const sse = Array.isArray(initial?.data) && typeof initial.data[0] === "string" ? (initial.data[0] as string) : "";
  console.debug("[HF callPredict7] sse length", sse.length, "sample", sse.slice(0, 200));

  let arr: any = null;
  const lines = sse.split(/\n/);
  let acc: string[] = [];
  let seen = false;
  for (const ln of lines) {
    if (ln.startsWith("data:")) { acc = [ln.replace(/^data:\s*/, "")]; seen = true; } else if (seen) { acc.push(ln); }
  }
  if (seen) {
    const body = acc.join("\n");
    console.debug("[HF callPredict7] extracted payload string", body.slice(0, 200));
    try {
      // The body is the full tuple array, e.g., "[tableJsonString, openMeteoObject]"
      const fullTuple = JSON.parse(body);
      if (Array.isArray(fullTuple) && typeof fullTuple[0] === 'string') {
        // The first element is the stringified table, parse it.
        arr = [JSON.parse(fullTuple[0]), fullTuple[1]];
      } else {
        arr = fullTuple;
      }
    } catch (e) {
      console.debug("[HF callPredict7] JSON.parse failed", e);
    }
  }
  if (!arr) return { table: { headers: [], data: [] }, raw: sse };
  // Expect tuple-like [tableObj, rawJson]
  const first = Array.isArray(arr) ? arr[0] : arr;
  const headers: string[] = Array.isArray(first?.headers) ? first.headers : [];
  const rows: (string | number)[][] = Array.isArray(first?.data) ? first.data : [];
  console.debug("[HF callPredict7] headers:", headers, "rows count:", rows.length);
  return { table: { headers, data: rows }, raw: Array.isArray(arr) ? arr[1] : null };
}

export function parseScoreFromMarkdown(md: string): { score: number | null; aqi: number | null; category: string | null } {
  // Example lines:
  // **Air Quality Score:** 85.9/100
  // **AQI:** 70.3
  // **Category:** Moderate
  const scoreMatch = md.match(/\*\*Air Quality Score:\*\*\s*([0-9]+(?:\.[0-9]+)?)/i);
  const aqiMatch = md.match(/\*\*AQI:\*\*\s*([0-9]+(?:\.[0-9]+)?)/i);
  const catMatch = md.match(/\*\*Category:\*\*\s*([A-Za-z]+)/i);
  return {
    score: scoreMatch ? parseFloat(scoreMatch[1]) : null,
    aqi: aqiMatch ? parseFloat(aqiMatch[1]) : null,
    category: catMatch ? catMatch[1] : null,
  };
}


