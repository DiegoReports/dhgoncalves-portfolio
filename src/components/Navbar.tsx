import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [language, setLanguage] = useState<"En" | "Pt">("En");

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
    { name: "Contacts", href: "#contacts" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="font-code text-lg font-semibold text-foreground">
          RPA<span className="text-muted-foreground">.dev</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* Language Switch */}
        <div className="flex items-center gap-1 font-code text-sm">
          <button
            onClick={() => setLanguage("En")}
            className={`transition-colors duration-300 ${
              language === "En" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            En
          </button>
          <span className="text-muted-foreground">/</span>
          <button
            onClick={() => setLanguage("Pt")}
            className={`transition-colors duration-300 ${
              language === "Pt" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Pt
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;