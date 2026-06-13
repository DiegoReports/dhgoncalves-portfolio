function readEnv(key: string): string | undefined {
  const env = import.meta.env as Record<string, string | undefined>;
  return env[key];
}

/** Central URLs; set in `.env` for production. Empty string falls back to `#`. */
function envUrl(key: string): string {
  const v = readEnv(key);
  return typeof v === "string" && v.length > 0 ? v : "#";
}

export const siteUrls = {
  github:   envUrl("USER_GITHUB_URL")   || envUrl("VITE_GITHUB_URL"),
  linkedin: envUrl("USER_LINKEDIN_URL") || envUrl("VITE_LINKEDIN_URL"),
  /** USER_EMAIL may omit the mailto: scheme — we add it automatically */
  email: (() => {
    const raw = readEnv("USER_EMAIL") ?? readEnv("VITE_EMAIL_URL") ?? "";
    if (!raw) return "#";
    return raw.startsWith("mailto:") || raw.startsWith("http") ? raw : `mailto:${raw}`;
  })(),
  instagram: envUrl("USER_INSTAGRAM_URL") || envUrl("VITE_INSTAGRAM_URL"),
  whatsapp:  envUrl("USER_CONTACT_WPP")   || envUrl("VITE_WHATSAPP_URL"),
  adidasRunning: envUrl("VITE_ADIDAS_RUNNING_URL"),
  stravaProfile: envUrl("VITE_STRAVA_PROFILE_URL"),
  /** Full image URL or local public/ path — falls back to bundled asset */
  profileImage: (() => {
    const v = readEnv("VITE_PROFILE_IMAGE");
    return typeof v === "string" && v.length > 0 ? v : "/assets/profile-dh.png";
  })(),
  /** Optional sport photo for the Activities BentoGrid photo card */
  sportPhoto: (() => {
    const v = readEnv("VITE_SPORT_PHOTO_URL");
    return typeof v === "string" && v.length > 0 ? v : null;
  })(),
};
