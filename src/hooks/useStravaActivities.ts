import { useQuery } from "@tanstack/react-query";

export type StravaActivity = {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  average_speed: number;
  total_elevation_gain: number;
  map: { summary_polyline: string };
  start_date_local: string;
};

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b: number;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

export function normalizePolyline(
  points: [number, number][],
  width: number,
  height: number,
  padding = 8
): string {
  if (points.length === 0) return "";

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;
  const scale = Math.min(
    (width - padding * 2) / lngRange,
    (height - padding * 2) / latRange
  );

  // Center the scaled route within the viewport
  const renderedW = lngRange * scale;
  const renderedH = latRange * scale;
  const xStart = (width - renderedW) / 2;
  const yStart = (height - renderedH) / 2;

  return points
    .map(([lat, lng]) => {
      const x = xStart + (lng - minLng) * scale;
      const y = yStart + renderedH - (lat - minLat) * scale;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function polylineToPath(polylineStr: string): string {
  if (!polylineStr) return "";
  return polylineStr
    .split(" ")
    .map((p, i) => `${i === 0 ? "M" : "L"}${p}`)
    .join(" ");
}

export function formatPace(speedMs: number): string {
  if (!speedMs || speedMs <= 0) return "--:--/km";
  const secPerKm = 1000 / speedMs;
  const min = Math.floor(secPerKm / 60);
  const sec = Math.round(secPerKm % 60);
  return `${min}:${sec.toString().padStart(2, "0")}/km`;
}

export function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
}

export function hasGpsRoute(activity: StravaActivity): boolean {
  return !!activity?.map?.summary_polyline;
}

export function getPolylinePoints(activity: StravaActivity): [number, number][] {
  const encoded = activity?.map?.summary_polyline;
  if (!encoded) return [];
  return decodePolyline(encoded);
}

async function fetchStravaActivities(): Promise<StravaActivity[]> {
  const res = await fetch("/api/strava");
  if (!res.ok) throw new Error("Failed to fetch Strava activities");
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected Strava response");
  return data as StravaActivity[];
}

export function useStravaActivities() {
  return useQuery<StravaActivity[]>({
    queryKey: ["strava-activities"],
    queryFn: fetchStravaActivities,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
