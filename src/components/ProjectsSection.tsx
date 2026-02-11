import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const projects = [
    {
      title: {
        en: "Logistics Automation Bot",
        pt: "Bot de Automação Logística",
      },
      description: {
        en: "End-to-end automation bot developed with Rocketbot Studio for Imbera Cooling's logistics processes, covering mapping, documentation, integrated testing, and delivery.",
        pt: "Bot de automação end-to-end desenvolvido com Rocketbot Studio para processos logísticos da Imbera Cooling, cobrindo mapeamento, documentação, testes integrados e entrega.",
      },
      techStack: ["Rocketbot Studio", "Python"],
      stat: "100%",
      statLabel: { en: "Automated", pt: "Automatizado" },
      emoji: "🤖",
    },
    {
      title: {
        en: "RPA Operations Dashboard",
        pt: "Dashboard de Operações RPA",
      },
      description: {
        en: "Monitoring and performance indicators system for automated activities at DHL Supply Chain, with SQL database validation and Orchestrator management.",
        pt: "Sistema de monitoramento e indicadores de desempenho para atividades automatizadas na DHL Supply Chain, com validação SQL e gestão no Orchestrator.",
      },
      techStack: ["UiPath", "SQL", "Orchestrator"],
      stat: "85%",
      statLabel: { en: "Time saved", pt: "Tempo economizado" },
      emoji: "📊",
    },
    {
      title: {
        en: "Banking Process Automation",
        pt: "Automação de Processos Bancários",
      },
      description: {
        en: "Automation of confidential data collection processes for Bradesco CPI, handling requests from legal authorities with agility and accuracy using VBA, MacroScheduler, and UiPath.",
        pt: "Automação de processos de coleta de dados confidenciais para o Bradesco CPI, atendendo solicitações de autoridades legais com agilidade e precisão usando VBA, MacroScheduler e UiPath.",
      },
      techStack: ["VBA", "MacroScheduler", "UiPath"],
      stat: "95%",
      statLabel: { en: "Accuracy", pt: "Precisão" },
      emoji: "🏦",
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-12 lg:px-20 relative" ref={ref}>
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] border border-foreground/5 rounded-full -translate-y-1/2 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center"
        >
          <span className="font-code text-muted-foreground text-xs md:text-sm">{t("projects.breadcrumb")}</span>
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                className={`flex flex-col lg:flex-row gap-6 lg:gap-16 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="glass-card p-3 md:p-4 relative">
                    <div className="aspect-video rounded-lg md:rounded-xl bg-card-elevated overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-card flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-muted-foreground/20 mx-auto mb-2 md:mb-3 flex items-center justify-center">
                            <span className="font-code text-xl md:text-2xl">{project.emoji}</span>
                          </div>
                          <p className="font-code text-[10px] md:text-xs text-muted-foreground">Bot Dashboard</p>
                        </div>
                      </div>
                    </div>

                    <div className={`absolute -bottom-4 ${isEven ? '-left-2 md:-left-6' : '-right-2 md:-right-6'} w-24 md:w-32 h-18 md:h-24 glass-card p-2 md:p-3 flex items-center justify-center`}>
                      <div className="text-center">
                        <p className="font-code text-[10px] md:text-xs text-muted-foreground">Analytics</p>
                        <p className="font-code text-base md:text-lg font-bold text-foreground">{project.stat}</p>
                        <p className="font-code text-[8px] md:text-[10px] text-muted-foreground">{project.statLabel[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <h3 className="font-code text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">{project.title[language]}</h3>

                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="pill text-muted-foreground text-xs md:text-sm px-2 md:px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground font-body leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                    {project.description[language]}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border flex items-center justify-center">
                      <Github size={18} className="md:w-5 md:h-5" />
                    </div>
                    <a
                      href="#"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors cursor-dark"
                    >
                      <ArrowUpRight size={18} className="md:w-5 md:h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
