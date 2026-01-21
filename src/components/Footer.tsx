import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Send, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const navLinks = [
    { name: "Main", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
  ];

  const socialLinks = [
    { icon: Github, label: "Github", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "E-mail", href: "#" },
    { icon: Send, label: "Telegram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <footer id="contacts" className="py-24 px-6 md:px-12 lg:px-20 relative" ref={ref}>
      {/* Decorative circle */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[250px] border border-white/5 rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Left - Big CTA text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-code text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4">
              Let's
              <br />
              <span className="italic">Automate</span>
            </h2>
            <p className="text-muted-foreground font-body mt-8">
              Full-stack
              <br />
              RPA developer
            </p>
          </motion.div>

          {/* Right - Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <span className="font-code text-muted-foreground text-sm">... /Contacts ...</span>

            {/* Navigation */}
            <div className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Site info card */}
            <div className="glass-card p-6 max-w-sm">
              <h4 className="font-code text-lg mb-4 text-muted-foreground">Site</h4>
              <div className="space-y-2 font-code text-sm">
                <p>
                  Handcrafted by <span className="text-foreground">ME</span> /
                </p>
                <p>
                  Designed with <span className="text-foreground">passion</span> /
                </p>
                <p>
                  Powered by <span className="text-foreground">React</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center lg:justify-start"
        >
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} className="social-button">
              <social.icon size={18} />
              <span>{social.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="font-code text-sm text-muted-foreground">
            © 2025 RPA Developer. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;