import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowUpRight } from "lucide-react";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Invoice Automation Bot",
      description:
        "An end-to-end invoice processing solution that extracts data from PDFs, validates entries, and automatically updates the ERP system. Reduced processing time by 85%.",
      techStack: ["UiPath", "Python", "SQL", "Azure"],
      featured: true,
    },
    {
      title: "HR Onboarding Workflow",
      description:
        "Automated employee onboarding process including account creation, access provisioning, and document generation across multiple platforms.",
      techStack: ["Power Automate", "SharePoint", "Azure AD"],
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 relative" ref={ref}>
      {/* Decorative arc */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] border border-white/5 rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-code text-muted-foreground text-sm">... /Projects ...</span>
        </motion.div>

        {/* Projects */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Project info */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <h3 className="font-code text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="pill text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground font-body leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                    <Github size={20} />
                  </div>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>

              {/* Project visuals */}
              <div
                className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <div className="glass-card p-4 relative">
                  {/* Main mockup */}
                  <div className="aspect-video rounded-xl bg-card-elevated overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-card flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-muted-foreground/20 mx-auto mb-3 flex items-center justify-center">
                          <span className="font-code text-2xl">🤖</span>
                        </div>
                        <p className="font-code text-xs text-muted-foreground">Bot Dashboard</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating smaller card */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-24 glass-card p-3 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-code text-xs text-muted-foreground">Analytics</p>
                      <p className="font-code text-lg font-bold text-foreground">85%</p>
                      <p className="font-code text-[10px] text-muted-foreground">Time saved</p>
                    </div>
                  </div>
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