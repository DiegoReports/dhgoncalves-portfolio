declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function pushToDataLayer(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function setDefaultConsent() {
  pushToDataLayer("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function updateConsent(granted: boolean) {
  const state = granted ? "granted" : "denied";
  pushToDataLayer("consent", "update", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}
