import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
              const { access_token } = (await tokenRes.json()) as { access_token: string };
              const activitiesRes = await fetch(
                "https://www.strava.com/api/v3/athlete/activities?per_page=3",
                { headers: { Authorization: `Bearer ${access_token}` } }
              );
              const activities = await activitiesRes.json();
              res.setHeader("Content-Type", "application/json");
              res.setHeader("Cache-Control", "no-store");
              res.end(JSON.stringify(activities));
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
