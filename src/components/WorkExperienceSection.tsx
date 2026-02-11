import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface JobEntry {
  yearRange: string;
  duration: Record<"en" | "pt", string>;
  company: string;
  client: string;
  role: Record<"en" | "pt", string>;
  techStack: string;
  description: Record<"en" | "pt", string>;
  keyResults: Record<"en" | "pt", string[]>;
}

const jobs: JobEntry[] = [
  {
    yearRange: "2025 -",
    duration: { en: "Present", pt: "Atual" },
    company: "Rocketbot (Chile)",
    client: "Imbera Cooling",
    role: { en: "RPA Developer", pt: "Desenvolvedor RPA" },
    techStack: "Rocketbot Studio & Python",
    description: {
      en: "Develop automation bots using Rocketbot Studio for logistics processes. Participate in all stages: mapping, documentation, integrated testing, and final delivery.",
      pt: "Desenvolvimento de bots de automação usando Rocketbot Studio para processos logísticos. Participação em todas as etapas: mapeamento, documentação, testes integrados e entrega final.",
    },
    keyResults: {
      en: [
        "Developed automation bots for logistics processes",
        "Full lifecycle participation: mapping to delivery",
        "Client: Imbera Cooling",
      ],
      pt: [
        "Desenvolvimento de bots para processos logísticos",
        "Participação em todo o ciclo: mapeamento à entrega",
        "Cliente: Imbera Cooling",
      ],
    },
  },
  {
    yearRange: "2022 - 2024",
    duration: { en: "2 years", pt: "2 anos" },
    company: "EARQ Consultoria",
    client: "DHL Supply Chain",
    role: { en: "Support Analyst", pt: "Analista de Suporte" },
    techStack: "UiPath & SQL & Orchestrator",
    description: {
      en: "Monitored and supported RPA operations. Generated performance indicators for automated activities. Queried SQL databases to validate processes. Developed improvements and new RPA workflows in UiPath.",
      pt: "Monitoramento e suporte de operações RPA. Geração de indicadores de desempenho para atividades automatizadas. Consultas SQL para validação de processos. Desenvolvimento de melhorias e novos fluxos RPA em UiPath.",
    },
    keyResults: {
      en: [
        "Monitored and supported RPA operations at DHL",
        "Generated performance indicators for automated activities",
        "Developed improvements and new RPA workflows in UiPath",
        "Managed processes and queues in Orchestrator",
      ],
      pt: [
        "Monitoramento e suporte de operações RPA na DHL",
        "Geração de indicadores de desempenho",
        "Desenvolvimento de melhorias e novos fluxos RPA em UiPath",
        "Gestão de processos e filas no Orchestrator",
      ],
    },
  },
  {
    yearRange: "2015 - 2022",
    duration: { en: "7 years 3 months", pt: "7 anos e 3 meses" },
    company: "SBK BPO",
    client: "Bradesco CPI",
    role: { en: "RPA Developer (Admin Analyst)", pt: "Desenvolvedor RPA (Analista Administrativo)" },
    techStack: "VBA & MacroScheduler & UiPath",
    description: {
      en: "Assisted with confidential data collection for banking transfers. Handled requests from legal authorities, ensuring agility and accuracy in information delivery. Mapped automation opportunities and developed RPA processes using VBA, MacroScheduler, and UiPath.",
      pt: "Auxílio na coleta de dados confidenciais para transferências bancárias. Atendimento a solicitações de autoridades legais, garantindo agilidade e precisão na entrega de informações. Mapeamento de oportunidades de automação e desenvolvimento de processos RPA usando VBA, MacroScheduler e UiPath.",
    },
    keyResults: {
      en: [
        "Mapped automation opportunities across banking processes",
        "Developed RPA processes using VBA, MacroScheduler, and UiPath",
        "Handled confidential data for Bradesco CPI",
        "Collaborated with team to maintain service efficiency",
      ],
      pt: [
        "Mapeamento de oportunidades de automação em processos bancários",
        "Desenvolvimento de processos RPA com VBA, MacroScheduler e UiPath",
        "Tratamento de dados confidenciais para o Bradesco CPI",
        "Colaboração com a equipe para manter a eficiência do serviço",
      ],
    },
  },
];

const WorkExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedJob, setSelectedJob] = useState<JobEntry | null>(null);
  const { t, language } = useLanguage();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-4 md:px-12 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-right mb-10 md:mb-16 text-4xl md:text-5xl lg:text-6xl"
        >
          {t("work.title")}
        </motion.h2>

        <div className="border-t border-border">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="work-entry group border-b border-border cursor-pointer-custom"
              onClick={() => setSelectedJob(job)}
            >
              {/* Mobile Layout */}
              <div className="md:hidden py-4 px-3 -mx-3 transition-all duration-300 ease-out group-hover:bg-foreground group-hover:cursor-dark">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-code text-sm text-foreground/80 transition-colors duration-300 group-hover:text-background">
                    {job.yearRange}
                  </p>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-background/60">
                    {job.duration[language]}
                  </p>
                </div>
                <p className="font-body text-base font-medium mb-1 text-foreground/90 transition-colors duration-300 group-hover:text-background">
                  {job.company}
                </p>
                <p className="font-code text-xs text-muted-foreground transition-colors duration-300 group-hover:text-background/80">
                  {job.role[language]}{" "}
                  <span className="transition-colors duration-300 group-hover:text-background/50">|</span>{" "}
                  {job.techStack}
                </p>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-4 py-6 px-4 -mx-4 transition-all duration-300 ease-out group-hover:bg-foreground group-hover:cursor-dark">
                <div className="col-span-2">
                  <p className="font-code text-base lg:text-lg text-foreground/80 transition-colors duration-300 group-hover:text-background">
                    {job.yearRange}
                  </p>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-background/60">
                    {job.duration[language]}
                  </p>
                </div>

                <div className="col-span-4 flex items-center">
                  <p className="font-body text-base lg:text-lg text-foreground/90 transition-colors duration-300 group-hover:text-background">
                    {job.company}
                  </p>
                </div>

                <div className="col-span-6 flex items-center justify-end">
                  <p className="font-code text-sm lg:text-base text-right text-foreground/80 transition-colors duration-300 group-hover:text-background">
                    {job.role[language]}{" "}
                    <span className="text-muted-foreground transition-colors duration-300 group-hover:text-background/70">
                      |
                    </span>{" "}
                    {job.techStack}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 md:mt-8 text-right"
        >
          <p className="text-muted-foreground text-xs md:text-sm">{t("work.total.label")}</p>
          <p className="font-code text-base md:text-lg text-foreground">
            {t("work.total.value")}
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg glass-card p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-code text-xl md:text-2xl font-bold mb-1">
                {selectedJob.company}
              </h3>
              <p className="font-code text-sm text-muted-foreground mb-1">
                {selectedJob.role[language]}
              </p>
              <p className="font-code text-xs text-muted-foreground/60 mb-6">
                Client: {selectedJob.client}
              </p>

              <div className="mb-4">
                <p className="font-code text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("work.modal.period")}</p>
                <p className="font-body text-sm text-foreground">
                  {selectedJob.yearRange} · {selectedJob.duration[language]}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-code text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("work.modal.description")}</p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  {selectedJob.description[language]}
                </p>
              </div>

              <div>
                <p className="font-code text-xs text-muted-foreground uppercase tracking-wider mb-2">{t("work.modal.results")}</p>
                <ul className="space-y-2">
                  {selectedJob.keyResults[language].map((result, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                      <span className="text-muted-foreground mt-0.5">→</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-code text-xs text-muted-foreground">
                  {t("work.modal.stack")}: {selectedJob.techStack}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkExperienceSection;
