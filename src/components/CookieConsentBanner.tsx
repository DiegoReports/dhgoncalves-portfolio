import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Button } from "@/components/ui/button";

const CookieConsentBanner = () => {
  const { t } = useLanguage();
  const { isBannerOpen, accept, decline } = useCookieConsent();

  return (
    <AnimatePresence>
      {isBannerOpen && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 md:px-6 md:pb-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div
            role="dialog"
            aria-label={t.cookieConsent.title}
            className="glass-card bg-card/95 theme-light:bg-card border border-foreground/15 theme-light:border-black/10 shadow-2xl shadow-black/40 theme-light:shadow-black/10 w-full max-w-3xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6"
          >
            <div className="flex items-start sm:items-center gap-3.5 flex-1">
              <div className="w-11 h-11 rounded-full bg-amber-400/10 theme-light:bg-amber-500/10 border border-amber-400/25 theme-light:border-amber-500/25 flex items-center justify-center shrink-0">
                <Cookie size={22} className="text-amber-400 theme-light:text-amber-600" />
              </div>
              <div>
                <p className="font-code text-sm font-semibold text-foreground mb-1">
                  {t.cookieConsent.title}
                </p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {t.cookieConsent.description}{" "}
                  <Link
                    to="/politica-de-privacidade"
                    className="underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {t.cookieConsent.learnMore}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none text-foreground"
                onClick={decline}
              >
                {t.cookieConsent.decline}
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none" onClick={accept}>
                {t.cookieConsent.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
