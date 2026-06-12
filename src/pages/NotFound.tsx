import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-code text-sm text-muted-foreground mb-4">RPA.dev</p>
      <h1 className="font-code text-6xl md:text-8xl font-bold text-foreground tracking-tight">{t.notFound.title}</h1>
      <p className="mt-6 max-w-md font-body text-muted-foreground">{t.notFound.message}</p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 font-code text-sm text-background transition-opacity hover:opacity-90 cursor-dark theme-light:cursor-light"
      >
        {t.notFound.back}
      </Link>
    </div>
  );
};

export default NotFound;
