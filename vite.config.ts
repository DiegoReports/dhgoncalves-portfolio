import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { toPublicRoute } from "./api/_route";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Prefix '' loads ALL env vars (including non-VITE_ ones like STRAVA_*)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    envPrefix: ["VITE_", "USER_"],
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: false },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "development" && {
        name: "strava-dev-api",
        configureServer(server) {
          server.middlewares.use("/api/strava", async (_req, res) => {
            try {
              const tokenRes = await fetch("https://www.strava.com/oauth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  client_id: env.STRAVA_CLIENT_ID,
                  client_secret: env.STRAVA_CLIENT_SECRET,
                  refresh_token: env.STRAVA_REFRESH_TOKEN,
                  grant_type: "refresh_token",
                }),
              });
              if (!tokenRes.ok) {
                res.statusCode = 502;
                res.end(JSON.stringify({ error: "Failed to refresh Strava token" }));
                return;
              }
              const { access_token } = (await tokenRes.json()) as { access_token: string };
              if (!access_token) {
                res.statusCode = 502;
                res.end(JSON.stringify({ error: "No access token in Strava response" }));
                return;
              }
              const activitiesRes = await fetch(
                "https://www.strava.com/api/v3/athlete/activities?per_page=3",
                { headers: { Authorization: `Bearer ${access_token}` } }
              );
              if (!activitiesRes.ok) {
                res.statusCode = 502;
                res.end(JSON.stringify({ error: "Failed to fetch Strava activities" }));
                return;
              }
              const raw = (await activitiesRes.json()) as Record<string, unknown>[];
              // Mirror the production whitelist so dev never sees GPS either.
              const activities = (Array.isArray(raw) ? raw : []).map((a) => {
                const map = a.map as { summary_polyline?: unknown } | undefined;
                const d = new Date(String(a.start_date_local ?? ""));
                const valid = !Number.isNaN(d.getTime()) ? d : new Date();
                return {
                  id: a.id,
                  name: a.name ?? "",
                  type: a.type ?? "",
                  sport_type: a.sport_type ?? "",
                  distance: a.distance ?? 0,
                  moving_time: a.moving_time ?? 0,
                  average_speed: a.average_speed ?? 0,
                  total_elevation_gain: a.total_elevation_gain ?? 0,
                  route: toPublicRoute(map?.summary_polyline),
                  month: valid.getMonth() + 1,
                  year: valid.getFullYear(),
                };
              });
              res.setHeader("Content-Type", "application/json");
              res.setHeader("Cache-Control", "no-store");
              res.end(JSON.stringify({ activities, photo: null }));
            } catch {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Failed to fetch Strava data" }));
            }
          });
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
