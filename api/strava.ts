import type { VercelRequest, VercelResponse } from "@vercel/node";

type StravaSummaryActivity = {
  id: number;
  total_photo_count?: number;
  start_date_local?: string;
  [key: string]: unknown;
};

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

export default async function handler(_req: VercelRequest, res: VercelResponse) {
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
    const activities = list.slice(0, 3);

    // Activities come back sorted newest-first, so the first one with a photo
    // is the most recent photographed activity.
    let photo: { url: string; activityId: number; date: string | null } | null = null;
    const withPhoto = list.find((a) => (a.total_photo_count ?? 0) > 0);
    if (withPhoto) {
      const url = await fetchActivityPhotoUrl(withPhoto.id, access_token);
      if (url) {
        photo = {
          url,
          activityId: withPhoto.id,
          date: withPhoto.start_date_local ?? null,
        };
      }
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json({ activities, photo });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}
