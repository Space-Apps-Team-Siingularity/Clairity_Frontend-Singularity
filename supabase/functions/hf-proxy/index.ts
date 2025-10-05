// @ts-nocheck
// Deno Deploy edge function to proxy calls to Hugging Face Gradio Space from the browser
// This avoids CORS and hides tokens if needed (not required for public Spaces)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

type PredictApi = {
  city: string;
  sensor_pm25: number;
  sensor_temp?: number;
  sensor_humidity?: number;
};

type Predict7DayApi = {
  city: string;
  sensor_pm25: number;
};

const SPACE_API = "https://shauryac-mena-air-quality-predictor.hf.space/gradio_api/call"; // Gradio queue API base

async function callGradio(apiName: string, payload: Record<string, unknown>) {
  // Try using the Gradio REST runner endpoint
  const res = await fetch(`${SPACE_API}/${apiName}`, {
    method: "POST",
    body: payload as any,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HF call failed: ${res.status} ${text}`);
  }
  return await res.json();
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  });
}

serve(async (req) => {
  try {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return jsonResponse({}, { status: 204, headers: cors() });

    // Simple health check
    if (url.pathname.endsWith("/health")) {
      return jsonResponse({ ok: true }, { headers: cors() });
    }

    if (url.pathname.endsWith("/predict_7day_aqi")) {
      const body = (await req.json()) as Predict7DayApi;
      // Step 1: Create event
      const create = await fetch(`${SPACE_API}/predict_7day_aqi`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: [body.city, body.sensor_pm25] }),
      }).then((r) => r.json());
      const eventId = create?.event_id || create?.eventId || create?.hash || create?.id;
      if (!eventId) return jsonResponse({ error: "No event id" }, { status: 500, headers: cors() });
      // Step 2: Poll result
      const res2 = await fetch(`${SPACE_API}/predict_7day_aqi/${eventId}`);
      const text = await res2.text();
      try {
        const json = JSON.parse(text);
        return jsonResponse(json, { headers: cors() });
      } catch {
        // Wrap non-JSON string so frontend can handle predict_7day as well
        return jsonResponse({ data: [text] }, { headers: cors() });
      }
    }

    if (url.pathname.endsWith("/predict_api")) {
      const body = (await req.json()) as PredictApi;
      const create = await fetch(`${SPACE_API}/predict_api`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: [body.city, body.sensor_pm25, body.sensor_temp ?? 0, body.sensor_humidity ?? 0] }),
      }).then((r) => r.json());
      const eventId = create?.event_id || create?.eventId || create?.hash || create?.id;
      if (!eventId) return jsonResponse({ error: "No event id" }, { status: 500, headers: cors() });
      const res2 = await fetch(`${SPACE_API}/predict_api/${eventId}`);
      const text = await res2.text();
      // Current API returns a markdown string; wrap it as a JSON { data: [string] }
      return jsonResponse({ data: [text] }, { headers: cors() });
    }

    // Allow posting to base function path; choose API via body.api_name or ?api=
    if (url.pathname.endsWith("/hf-proxy") && req.method === "POST") {
      const incoming = await req.json();
      const apiName = incoming?.api_name || url.searchParams.get("api");
      if (apiName === "/predict_7day_aqi") {
        const body = incoming as Predict7DayApi;
        const form = new FormData();
        form.append("city", body.city);
        form.append("sensor_pm25", String(body.sensor_pm25 ?? 0));
        const out = await fetch(`${SPACE_API}/predict_7day_aqi`, { method: "POST", body: form }).then((r) => r.json());
        return jsonResponse(out, { headers: cors() });
      }
      // default to /predict_api
      const body = incoming as PredictApi;
      const form = new FormData();
      form.append("city", body.city);
      form.append("sensor_pm25", String(body.sensor_pm25 ?? 0));
      form.append("sensor_temp", String(body.sensor_temp ?? 0));
      form.append("sensor_humidity", String(body.sensor_humidity ?? 0));
      const out = await fetch(`${SPACE_API}/predict_api`, { method: "POST", body: form }).then((r) => r.json());
      return jsonResponse(out, { headers: cors() });
    }

    return jsonResponse({ error: "Not Found", path: url.pathname }, { status: 404, headers: cors() });
  } catch (e) {
    return jsonResponse({ error: String(e) }, { status: 500, headers: cors() });
  }
});

function cors() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,apikey",
  } as Record<string, string>;
}





