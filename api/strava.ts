import type { VercelRequest, VercelResponse } from "@vercel/node";
import { toPublicRoute, type NormalizedRoute } from "../lib/stravaRoute";

type StravaSummaryActivity = {
  id: number;
  total_photo_count?: number;
  start_date_local?: string;
  [key: string]: unknown;
};

/**
 * The only shape that reaches the browser. Strava returns ~48 fields per
 * activity — including precise GPS (`start_latlng`/`end_latlng`), exact
 * timestamps, athlete id and device identifiers. None of that is needed to
 * render the UI, so nothing outside this type is ever forwarded.
 */
type PublicActivity = {
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

type PublicPhoto = {
  url: string;
  month: number;
  year: number;
};

/** Coarsens a timestamp to month/year so training times can't be inferred. */
function toCoarseDate(raw: unknown): { month: number; year: number } {
  const date = typeof raw === "string" ? new Date(raw) : new Date();
  const parsed = Number.isNaN(date.getTime()) ? new Date() : date;
  return { month: parsed.getMonth() + 1, year: parsed.getFullYear() };
}

function num(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toPublicActivity(activity: StravaSummaryActivity): PublicActivity {
  const map = activity.map as { summary_polyline?: unknown } | undefined;
  const { month, year } = toCoarseDate(activity.start_date_local);

  return {
    id: activity.id,
    name: str(activity.name),
    type: str(activity.type),
    sport_type: str(activity.sport_type),
    distance: num(activity.distance),
    moving_time: num(activity.moving_time),
    average_speed: num(activity.average_speed),
    total_elevation_gain: num(activity.total_elevation_gain),
    route: toPublicRoute(map?.summary_polyline),
    month,
    year,
  };
}

/**
 * Fetches the largest available photo URL for a given activity.
 * The activity list endpoint does not include photo URLs, only a count,
 * so a dedicated call to /activities/{id}/photos is required.
 * Returns null on any failure so the caller can fall back gracefully.
 */
async function fetchActivityPhotoUrl(
  activityId: number,
  accessToken: string
): Promise<string | null> {
  const res = await fetch(
    `https://www.strava.com/api/v3/activities/${activityId}/photos?size=1000&photo_sources=true`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) return null;

  const photos = (await res.json()) as Array<{ urls?: Record<string, string> }>;
  if (!Array.isArray(photos) || photos.length === 0) return null;

  const urls = photos[0]?.urls;
  if (!urls) return null;

  // urls is a map of { "<size>": "<url>" }; pick the largest available size.
  const numericSizes = Object.keys(urls)
    .map(Number)
    .filter((n) => !Number.isNaN(n));

  if (numericSizes.length === 0) {
    const first = Object.values(urls)[0];
    return typeof first === "string" ? first : null;
  }

  const largest = Math.max(...numericSizes);
  return urls[String(largest)] ?? null;
}

/**
 * Rejects requests coming from other sites. Direct calls (no Origin header,
 * e.g. curl) still pass — this blocks embedding, not scraping.
 */
function isAllowedOrigin(req: VercelRequest): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;

  const host = req.headers.host;
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return res.status(503).json({ error: "Strava credentials not configured" });
  }

  try {
    const tokenRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenRes.ok) {
      return res.status(502).json({ error: "Failed to refresh Strava token" });
    }

    const { access_token } = (await tokenRes.json()) as { access_token: string };

    if (!access_token) {
      return res.status(502).json({ error: "No access token in Strava response" });
    }

    // Fetch a wider window so we can scan for the most recent activity with a photo.
    const activitiesRes = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=30",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!activitiesRes.ok) {
      return res.status(502).json({ error: "Failed to fetch Strava activities" });
    }

    const allActivities = (await activitiesRes.json()) as StravaSummaryActivity[];
    const list = Array.isArray(allActivities) ? allActivities : [];

    // The first three activities feed the bento grid cards.
    const activities = list.slice(0, 3).map(toPublicActivity);

    // Activities come back sorted newest-first, so the first one with a photo
    // is the most recent photographed activity.
    let photo: PublicPhoto | null = null;
    const withPhoto = list.find((a) => (a.total_photo_count ?? 0) > 0);
    if (withPhoto) {
      const url = await fetchActivityPhotoUrl(withPhoto.id, access_token);
      if (url) {
        photo = { url, ...toCoarseDate(withPhoto.start_date_local) };
      }
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({ activities, photo });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}
