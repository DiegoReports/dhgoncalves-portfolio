/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_EMAIL_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_WHATSAPP_URL?: string;
  readonly VITE_PROFILE_IMAGE?: string;
  readonly VITE_ADIDAS_RUNNING_URL?: string;
  readonly VITE_STRAVA_PROFILE_URL?: string;
  readonly VITE_SPORT_PHOTO_URL?: string;
  readonly USER_GITHUB_URL?: string;
  readonly USER_LINKEDIN_URL?: string;
  readonly USER_EMAIL?: string;
  readonly USER_CONTACT_WPP?: string;
  readonly USER_INSTAGRAM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
