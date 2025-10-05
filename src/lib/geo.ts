export type Coordinates = { latitude: number; longitude: number };

export const MENA_CITIES: Record<string, [number, number]> = {
  Cairo: [30.0444, 31.2357],
  Riyadh: [24.7136, 46.6753],
  Tehran: [35.6892, 51.389],
  Dubai: [25.2048, 55.2708],
  Istanbul: [41.0082, 28.9784],
  Casablanca: [33.5731, -7.5898],
  Baghdad: [33.3152, 44.3661],
  Doha: [25.2854, 51.531],
  "Kuwait City": [29.3759, 47.9774],
  Amman: [31.9454, 35.9284],
  Beirut: [33.8938, 35.5018],
  Damascus: [33.5138, 36.2765],
  Tunis: [36.8065, 10.1815],
  Algiers: [36.7538, 3.0588],
  Khartoum: [15.5007, 32.5599],
  "Abu Dhabi": [24.2992, 54.6972],
  Manama: [26.0667, 50.5577],
  Muscat: [23.5859, 58.4059],
  "Sana'a": [15.3694, 44.191],
  Jeddah: [21.4858, 39.1925],
};

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

function haversineDistance(a: Coordinates, b: Coordinates): number {
  const R = 6371; // km
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aa = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export function estimateMenaCity(coords: Coordinates): string {
  let bestCity = "Other";
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const [city, [lat, lon]] of Object.entries(MENA_CITIES)) {
    const d = haversineDistance(coords, { latitude: lat, longitude: lon });
    if (d < bestDistance) {
      bestDistance = d;
      bestCity = city;
    }
  }
  // Consider within ~500 km as inside region; otherwise Other
  return bestDistance <= 500 ? bestCity : "Other";
}

export async function getBrowserCoordinates(): Promise<Coordinates | null> {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}


