import type { Coordinates } from "./geo";

export type DailyForecast = {
  date: string;
  temperatureMaxC: number;
  temperatureMinC: number;
  pressureHpa: number | null;
  humidityPct: number | null;
  windSpeedMaxKph: number | null;
};

export type CurrentWeather = {
  temperatureC: number | null;
  windSpeedKph: number | null;
  humidityPct: number | null;
  pressureHpa: number | null;
};

export async function fetchOpenMeteoDaily(coords: Coordinates): Promise<DailyForecast[]> {
  const params = new URLSearchParams({
    latitude: String(coords.latitude),
    longitude: String(coords.longitude),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "pressure_msl_mean",
      "relative_humidity_2m_mean",
      "wind_speed_10m_max",
    ].join(","),
    timezone: "auto",
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!res.ok) throw new Error("Open-Meteo daily fetch failed");
  const data = await res.json();
  const dates: string[] = data?.daily?.time ?? [];
  const tmax: number[] = data?.daily?.temperature_2m_max ?? [];
  const tmin: number[] = data?.daily?.temperature_2m_min ?? [];
  const pmsl: number[] = data?.daily?.pressure_msl_mean ?? [];
  const rhm: number[] = data?.daily?.relative_humidity_2m_mean ?? [];
  const wsp: number[] = data?.daily?.wind_speed_10m_max ?? [];
  return dates.map((date, i) => ({
    date,
    temperatureMaxC: tmax[i] ?? null,
    temperatureMinC: tmin[i] ?? null,
    pressureHpa: pmsl[i] ?? null,
    humidityPct: rhm[i] ?? null,
    windSpeedMaxKph: wsp[i] ?? null,
  }));
}

export async function fetchOpenMeteoCurrent(coords: Coordinates): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: String(coords.latitude),
    longitude: String(coords.longitude),
    hourly: ["relativehumidity_2m"].join(","),
    current: ["temperature_2m", "wind_speed_10m", "pressure_msl"].join(","),
    wind_speed_unit: "ms",
    timezone: "auto",
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!res.ok) throw new Error("Open-Meteo current fetch failed");
  const data = await res.json();
  const temperatureC = data?.current?.temperature_2m ?? null;
  const windSpeedMs = data?.current?.wind_speed_10m ?? null;
  const windSpeedKph = windSpeedMs !== null && windSpeedMs !== undefined ? windSpeedMs * 3.6 : null;
  const pressureHpa = data?.current?.pressure_msl ?? null;

  // Estimate current humidity from last hourly relative humidity
  const rhSeries: number[] = data?.hourly?.relativehumidity_2m ?? [];
  const humidityPct = rhSeries.length ? rhSeries[rhSeries.length - 1] : null;

  return { temperatureC, windSpeedKph, humidityPct, pressureHpa };
}


