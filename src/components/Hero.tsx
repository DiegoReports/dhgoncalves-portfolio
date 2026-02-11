import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import AutomationGrid from "./AutomationGrid";

const phrases = ["RPA Developer", "Automation Analyst", "Process Engineer"];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const isPaused = useRef(false);
  const blinkCount = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentPhrase = phrases[phraseIndex.current];

      if (isPaused.current) {
        // Blink cursor 3 times during pause
        blinkCount.current++;
        if (blinkCount.current >= 6) {
          isPaused.current = false;
          isDeleting.current = true;
          blinkCount.current = 0;
        }
        timeout = setTimeout(tick, 400);
        return;
      }

      if (isDeleting.current) {
        charIndex.current--;
        setDisplayedText(currentPhrase.slice(0, charIndex.current));
        if (charIndex.current === 0) {
          isDeleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          timeout = setTimeout(tick, 300);
          return;
        }
        timeout = setTimeout(tick, 50);
      } else {
        charIndex.current++;
        setDisplayedText(currentPhrase.slice(0, charIndex.current));
        if (charIndex.current === currentPhrase.length) {
          isPaused.current = true;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 100);
      }
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const socialLinks = [
    { icon: Github, label: "Github", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "E-mail", href: "#" },
    { icon: Send, label: "Telegram", href: "#" },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-20 pt-20 md:pt-24 pb-8 md:pb-12 relative overflow-hidden">
      {/* Automation Grid Background */}
      <AutomationGrid />
      
      {/* Decorative circles - hidden on mobile */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full border border-foreground/5 -translate-x-1/2 hidden md:block" />
      <div className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full border border-foreground/5 translate-x-1/2 hidden md:block" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Left side - Title */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-code text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
            >
              <span className="block whitespace-nowrap">{displayedText}</span>
              <span
                className={`inline-block w-[3px] md:w-[4px] h-[0.9em] bg-foreground ml-1 transition-opacity duration-100 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-md font-body leading-relaxed"
            >
              My goal is to <span className="text-foreground font-semibold">automate processes</span>,{" "}
              write <span className="text-foreground font-semibold italic">clean and efficient code</span>{" "}
              to make business operations seamless.
            </motion.p>
          </div>

          {/* Right side - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <a
              href="#projects"
              className="px-6 md:px-8 py-3 md:py-4 bg-foreground text-background rounded-full font-code font-medium hover:opacity-90 transition-opacity text-sm md:text-base cursor-dark"
            >
              Projects
            </a>
            <a
              href="#projects"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity cursor-dark"
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
          </motion.div>
        </div>

        {/* Social Links */}
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
    </section>
  );
};

export default Hero;
