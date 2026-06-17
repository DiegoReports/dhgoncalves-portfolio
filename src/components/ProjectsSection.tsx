import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { siteUrls } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

const ProjectsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const projects = t.projects.items;

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-12 lg:px-20 relative" ref={ref}>
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] border border-foreground/5 rounded-full -translate-y-1/2 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center"
        >
          <span className="font-code text-muted-foreground text-xs md:text-sm">{t.projects.kicker}</span>
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-center"
            >
              <div
                className={`relative w-full ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="glass-card p-3 md:p-4 relative">
                  <div className="aspect-video rounded-lg md:rounded-xl bg-card-elevated overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-card flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-muted-foreground/20 mx-auto mb-2 md:mb-3 flex items-center justify-center">
                          <span className="font-code text-xl md:text-2xl">{project.thumbEmoji ?? "🤖"}</span>
                        </div>
                        <p className="font-code text-[10px] md:text-xs text-muted-foreground">{project.thumbLabel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 w-24 md:w-32 h-18 md:h-24 glass-card p-2 md:p-3 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-code text-[10px] md:text-xs text-muted-foreground">{project.statLabel}</p>
                      <p className="font-code text-base md:text-lg font-bold text-foreground">{project.statValue}</p>
                      <p className="font-code text-[8px] md:text-[10px] text-muted-foreground">{project.statSub}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : "lg:order-2"}>
                <h3 className="font-code text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">{project.title}</h3>

                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="pill text-muted-foreground text-xs md:text-sm px-2 md:px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground font-body leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                  {project.description}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={siteUrls.github}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border flex items-center justify-center"
                    aria-label="GitHub"
                  >
                    <Github size={18} className="md:w-5 md:h-5" />
                  </a>
                  <a
                    href={siteUrls.github}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors cursor-dark theme-light:cursor-light"
                    aria-label="GitHub"
                  >
                    <ArrowUpRight size={18} className="md:w-5 md:h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
