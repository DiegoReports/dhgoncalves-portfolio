import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, ChevronDown } from "lucide-react";
import AutomationGrid from "./AutomationGrid";
import { siteUrls } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

type Phase = "typing" | "pausing" | "erasing";

const Hero = () => {
  const { t } = useLanguage();
  const titles = t.hero.titles;

  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Reset when language changes
  useEffect(() => {
    setDisplayedText("");
    setTitleIndex(0);
    setPhase("typing");
  }, [titles]);

  // Typewriter state machine
  useEffect(() => {
    const currentTitle = titles[titleIndex] ?? "";

    if (phase === "typing") {
      if (displayedText.length < currentTitle.length) {
        const t = setTimeout(() => {
          setDisplayedText((prev) => currentTitle.slice(0, prev.length + 1));
        }, 100);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 2000);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayedText.length > 0) {
        const t = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 50);
        return () => clearTimeout(t);
      } else {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setPhase("typing");
      }
    }
  }, [displayedText, phase, titleIndex, titles]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(id);
  }, []);

  const socialLinks = [
    { icon: Github, label: t.hero.social.github, href: siteUrls.github },
    { icon: Linkedin, label: t.hero.social.linkedin, href: siteUrls.linkedin },
    { icon: Mail, label: t.hero.social.email, href: siteUrls.email },
    { icon: Instagram, label: t.hero.social.instagram, href: siteUrls.instagram },
  ];

  const ctaBlock = (className?: string) => (
    <div className={`flex items-center gap-3 md:gap-4 ${className ?? ""}`}>
      <a
        href="#projects"
        className="px-6 md:px-8 py-3 md:py-4 bg-foreground text-background rounded-full font-code font-medium hover:opacity-90 transition-opacity text-sm md:text-base cursor-dark theme-light:cursor-light"
      >
        {t.hero.projectsCta}
      </a>
      <a
        href="#projects"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity cursor-dark theme-light:cursor-light"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="md:w-5 md:h-5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-20 pt-20 md:pt-24 pb-8 md:pb-12 relative overflow-hidden">
      <AutomationGrid />

      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full border border-foreground/5 -translate-x-1/2 hidden md:block" />
      <div className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full border border-foreground/5 translate-x-1/2 hidden md:block" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-12">
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-code text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none break-words"
            >
              {displayedText}
              <span
                className={`inline-block w-[3px] md:w-[4px] h-[0.85em] bg-foreground align-middle ml-0.5 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.h1>

            {/* CTA below title — mobile/tablet only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 lg:hidden"
            >
              {ctaBlock()}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-md font-body leading-relaxed"
            >
              {t.hero.subtitleLead}{" "}
              <span className="text-foreground font-semibold">{t.hero.subtitleBold1}</span>
              {t.hero.subtitleMid}{" "}
              <span className="text-foreground font-semibold italic">{t.hero.subtitleBoldItalic}</span>{" "}
              {t.hero.subtitleTail}
            </motion.p>
          </div>

          {/* CTA on the right — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex"
          >
            {ctaBlock()}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 md:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 md:gap-4"
        >
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} className="social-button justify-center sm:justify-start">
              <social.icon size={18} />
              <span>{social.label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="font-code text-[10px] tracking-widest uppercase text-muted-foreground">
          {t.hero.scrollDown}
        </span>
        <motion.div
          animate={{ y: [0, 7, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
