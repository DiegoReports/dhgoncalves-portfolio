import { useQuery } from "@tanstack/react-query";

/**
 * Route shape as delivered by `/api/strava`: points already normalized to a
 * 0..1 box server-side. No latitude/longitude ever reaches the browser.
 */
export type NormalizedRoute = {
  points: [number, number][];
  aspect: number;
};

export type StravaActivity = {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  average_speed: number;
  total_elevation_gain: number;
  route: NormalizedRoute | null;
  month: number;
  year: number;
};

export type StravaPhoto = {
  url: string;
  month: number;
  year: number;
};

export type StravaData = {
  activities: StravaActivity[];
  photo: StravaPhoto | null;
};

/**
 * Fits the unit-box route into a width x height viewport, preserving the
 * route's original proportions. Pure scaling — the input carries no
 * geographic meaning, so neither does the output.
 */
export function normalizeRoute(
  route: NormalizedRoute,
  width: number,
  height: number,
  padding = 8
): string {
  const { points, aspect } = route;
  if (points.length === 0) return "";

  const availW = width - padding * 2;
  const availH = height - padding * 2;

  let renderedW = availW;
  let renderedH = availW / aspect;
  if (renderedH > availH) {
    renderedH = availH;
    renderedW = availH * aspect;
  }

  const xStart = (width - renderedW) / 2;
  const yStart = (height - renderedH) / 2;

  return points
    .map(([ux, uy]) => {
      const x = xStart + ux * renderedW;
      const y = yStart + renderedH - uy * renderedH;
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
  return !!activity?.route && activity.route.points.length > 1;
}

async function fetchStravaData(): Promise<StravaData> {
  const res = await fetch("/api/strava");
  if (!res.ok) throw new Error("Failed to fetch Strava activities");
  const data = await res.json();
  if (!data || !Array.isArray(data.activities)) {
    throw new Error("Unexpected Strava response");
  }
  return {
    activities: data.activities as StravaActivity[],
    photo: (data.photo ?? null) as StravaPhoto | null,
  };
}

export function useStravaActivities() {
  return useQuery<StravaData>({
    queryKey: ["strava-activities"],
    queryFn: fetchStravaData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
