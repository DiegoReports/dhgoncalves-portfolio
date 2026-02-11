import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Send, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const navLinks = [
    { name: t("footer.nav.main"), href: "#" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.articles"), href: "#articles" },
  ];

  const socialLinks = [
    { icon: Github, label: "Github", href: "https://github.com/DiegoReports" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/dh-goncalves" },
    { icon: Mail, label: "E-mail", href: "mailto:diego.reports@gmail.com" },
    { icon: Send, label: "Telegram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <footer id="contacts" className="py-24 px-6 md:px-12 lg:px-20 relative" ref={ref}>
      <div className="absolute top-0 left-1/3 w-[500px] h-[250px] border border-foreground/5 rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-code text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4">
              {t("footer.title1")}
              <br />
              <span className="italic">{t("footer.title2")}</span>
            </h2>
            <p className="text-muted-foreground font-body mt-8 whitespace-pre-line">
              {t("footer.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <span className="font-code text-muted-foreground text-sm">{t("footer.breadcrumb")}</span>

            <div className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <a key={link.href + link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ))}
            </div>

            <div className="glass-card p-6 max-w-sm">
              <h4 className="font-code text-lg mb-4 text-muted-foreground">Site</h4>
              <div className="space-y-2 font-code text-sm">
                <p>
                  {t("footer.site.by")}<span className="text-foreground">ME</span> /
                </p>
                <p>
                  {t("footer.site.design")}<span className="text-foreground">{t("footer.site.passion")}</span> /
                </p>
                <p>
                  {t("footer.site.powered")}<span className="text-foreground">React</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center lg:justify-start"
        >
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="social-button">
              <social.icon size={18} />
              <span>{social.label}</span>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="font-code text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
