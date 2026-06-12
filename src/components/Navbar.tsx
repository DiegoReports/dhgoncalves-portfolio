import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const { locale, setLocale, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { name: t.nav.about, href: "#about" },
      { name: t.nav.experience, href: "#experience" },
      { name: t.nav.projects, href: "#projects" },
      { name: t.nav.activities, href: "#activities" },
      { name: t.nav.articles, href: "#articles" },
      { name: t.nav.contacts, href: "#contacts" },
    ],
    [t.nav]
  );

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 lg:px-20 md:py-6 bg-background/80 backdrop-blur-md border-b border-border/30"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#top" className="font-code text-lg font-semibold text-foreground z-50">
            RPA<span className="text-muted-foreground">.dev</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />

            <div className="flex items-center gap-1 font-code text-sm z-50">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`flex items-center gap-1 transition-colors duration-300 ${locale === "en" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <span>🇺🇸</span>
                <span>En</span>
              </button>
              <span className="text-muted-foreground">/</span>
              <button
                type="button"
                onClick={() => setLocale("pt")}
                className={`flex items-center gap-1 transition-colors duration-300 ${locale === "pt" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <span>🇧🇷</span>
                <span>Pt</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="font-code text-3xl font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="flex items-center gap-3 font-code text-xl mt-2"
              >
                <button
                  type="button"
                  onClick={() => { setLocale("en"); handleLinkClick(); }}
                  className={`flex items-center gap-1.5 transition-colors duration-300 ${locale === "en" ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span>🇺🇸</span>
                  <span>En</span>
                </button>
                <span className="text-muted-foreground">/</span>
                <button
                  type="button"
                  onClick={() => { setLocale("pt"); handleLinkClick(); }}
                  className={`flex items-center gap-1.5 transition-colors duration-300 ${locale === "pt" ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span>🇧🇷</span>
                  <span>Pt</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
