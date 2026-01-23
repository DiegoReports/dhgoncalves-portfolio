import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowUpRight } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillGroups = [
    {
      title: "RPA Tools",
      skills: ["UiPath", "Power Automate", "Automation Anywhere", "Blue Prism"],
    },
    {
      title: "Scripting",
      skills: ["Python", "VBA", "JavaScript", "PowerShell"],
    },
    {
      title: "Database & Cloud",
      skills: ["SQL", "Azure", "AWS", "Google Cloud"],
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-12 lg:px-20 relative" ref={ref}>
      {/* Decorative elements - hidden on mobile */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full border border-white/5 translate-x-1/2 -translate-y-1/2 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <span className="font-code text-muted-foreground text-xs md:text-sm">... /About me ...</span>
          <h2 className="font-code text-xl sm:text-2xl md:text-3xl mt-3 md:mt-4 text-foreground">
            Hello! I'm an <span className="italic">RPA Developer</span>.
            <br />
            <span className="text-muted-foreground">More than 5 years experience.</span>
          </h2>
        </motion.div>

        {/* Mobile: Photo first, then skills. Desktop: side by side */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Skills */}
          <div className="space-y-4 md:space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground font-body text-sm md:text-base"
            >
              Some of my <span className="text-foreground italic">favorite technologies,</span>
              <br />
              <span className="text-foreground italic">topics, or tools</span> that I worked with
            </motion.p>

            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + groupIndex * 0.1 }}
                className="skill-card cursor-dark"
              >
                <h3 className="font-code text-base md:text-lg font-semibold mb-2 md:mb-3">{group.title}</h3>
                <p className="font-code text-xs md:text-sm text-skill-card-foreground/70">
                  {group.skills.join(" / ")}
                </p>
              </motion.div>
            ))}

            {/* GitHub button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3 pt-2 md:pt-4"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border flex items-center justify-center">
                <Github size={18} className="md:w-5 md:h-5" />
              </div>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors cursor-dark"
              >
                <ArrowUpRight size={18} className="md:w-5 md:h-5" />
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden bg-card-elevated relative">
              {/* Placeholder for photo with grayscale effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-card flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted-foreground/20 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                    <span className="font-code text-3xl md:text-4xl text-muted-foreground">👤</span>
                  </div>
                  <p className="font-code text-xs md:text-sm text-muted-foreground">Your Photo Here</p>
                </div>
              </div>
              {/* Grayscale overlay effect */}
              <div className="absolute inset-0 mix-blend-luminosity bg-black/20" />
            </div>
            {/* Decorative corner lines - hidden on mobile */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-white/10 rounded-tr-3xl hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-white/10 rounded-bl-3xl hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;