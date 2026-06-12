import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Instagram, ArrowUpRight } from "lucide-react";
import { siteUrls } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  const navLinks = [
    { name: t.footer.navMain, href: "#top" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.activities, href: "#activities" },
    { name: t.nav.articles, href: "#articles" },
  ];

  const contactMethods = [
    { icon: Mail, label: t.footer.social.email, href: siteUrls.email },
    { icon: Linkedin, label: t.footer.social.linkedin, href: siteUrls.linkedin },
    { icon: WhatsAppIcon, label: t.footer.social.whatsapp, href: siteUrls.whatsapp },
  ];

  const socialLinks = [
    { icon: Github, label: t.footer.social.github, href: siteUrls.github },
    { icon: Linkedin, label: t.footer.social.linkedin, href: siteUrls.linkedin },
    { icon: Mail, label: t.footer.social.email, href: siteUrls.email },
    { icon: Instagram, label: t.footer.social.instagram, href: siteUrls.instagram },
    { icon: WhatsAppIcon, label: t.footer.social.whatsapp, href: siteUrls.whatsapp },
  ];

  return (
    <footer id="contacts" className="py-24 px-4 md:px-12 lg:px-20 relative" ref={ref}>
      <div className="absolute top-0 left-1/3 w-[500px] h-[250px] border border-foreground/5 rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-code text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-4">
              {t.footer.ctaLine1}
              <br />
              <span className="italic">{t.footer.ctaLine2}</span>
            </h2>
            <p className="text-muted-foreground font-body mt-8">
              {t.footer.subtitle1}
              <br />
              {t.footer.subtitle2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <span className="font-code text-muted-foreground text-sm">{t.footer.contactsKicker}</span>

            {/* Contact method cards */}
            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card px-5 py-4 flex items-center justify-between gap-4 hover:border-foreground/30 transition-all duration-300 group/card"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover/card:border-foreground/40 group-hover/card:text-foreground transition-all duration-300">
                      <method.icon size={16} />
                    </div>
                    <p className="font-code text-sm text-foreground">{method.label}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground group-hover/card:text-foreground transition-colors duration-300 shrink-0"
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <a key={link.href + link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="font-code text-sm text-muted-foreground">{t.footer.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
