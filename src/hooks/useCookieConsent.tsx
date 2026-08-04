import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { updateConsent } from "@/lib/consentMode";

export type ConsentStatus = "accepted" | "declined" | null;

const CONSENT_KEY = "cookie-consent";

function readStoredConsent(): ConsentStatus {
  const raw = localStorage.getItem(CONSENT_KEY);
  return raw === "accepted" || raw === "declined" ? raw : null;
}

type CookieConsentContextValue = {
  status: ConsentStatus;
  isBannerOpen: boolean;
  accept: () => void;
  decline: () => void;
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>(() => readStoredConsent());
  const [isBannerOpen, setIsBannerOpen] = useState(() => readStoredConsent() === null);

  const accept = useCallback(() => {
    updateConsent(true);
    localStorage.setItem(CONSENT_KEY, "accepted");
    setStatus("accepted");
    setIsBannerOpen(false);
  }, []);

  const decline = useCallback(() => {
    updateConsent(false);
    localStorage.setItem(CONSENT_KEY, "declined");
    setStatus("declined");
    setIsBannerOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setIsBannerOpen(true);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({ status, isBannerOpen, accept, decline, openPreferences }),
    [status, isBannerOpen, accept, decline, openPreferences]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
