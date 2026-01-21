import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "RPA Developer";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
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
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full border border-white/5 -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-[300px] h-[300px] rounded-full border border-white/5 translate-x-1/2" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left side - Title */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-code text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
            >
              <span className="block">{displayedText}</span>
              <span
                className={`inline-block w-[4px] h-[0.9em] bg-foreground ml-1 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-lg text-muted-foreground max-w-md font-body leading-relaxed"
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
            className="flex items-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-foreground text-background rounded-full font-code font-medium hover:bg-foreground/90 transition-colors"
            >
              Projects
            </a>
            <a
              href="#projects"
              className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
          className="mt-16 flex flex-wrap gap-4"
        >
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} className="social-button">
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