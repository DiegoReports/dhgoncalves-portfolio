import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

const AnalyticsGate = () => {
  const { status } = useCookieConsent();
  const location = useLocation();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || status !== "accepted") return;

    if (!initializedRef.current) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      initializedRef.current = true;
    }

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [status, location.pathname, location.search]);

  return null;
};

export default AnalyticsGate;
