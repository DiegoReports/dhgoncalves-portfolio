import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [language, setLanguage] = useState<"En" | "Pt">("En");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
    { name: "Contacts", href: "#contacts" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 lg:px-20 md:py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Name */}
          <a href="#" className="font-code text-lg font-semibold text-foreground z-50">
            RPA<span className="text-muted-foreground">.dev</span>
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side: Language Switch + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex items-center gap-1 font-code text-sm z-50">
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

            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
            
            {/* Menu content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;