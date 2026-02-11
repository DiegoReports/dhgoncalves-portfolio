import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

interface JobEntry {
  yearRange: string;
  duration: string;
  company: string;
  role: string;
  techStack: string;
  description: string;
  keyResults: string[];
}

const jobs: JobEntry[] = [
  {
    yearRange: "2023 -",
    duration: "1 year 8 months",
    company: "Tech Automation Co",
    role: "Senior RPA Developer",
    techStack: "UiPath & Python",
    description: "Leading the RPA Center of Excellence, designing and deploying enterprise-grade automation solutions across finance, HR, and operations departments.",
    keyResults: [
      "Delivered 15+ production bots saving 2,000+ hours/month",
      "Reduced invoice processing time by 85%",
      "Established CI/CD pipeline for bot deployments",
    ],
  },
  {
    yearRange: "2021 - 2023",
    duration: "2 years",
    company: "Digital Solutions Inc",
    role: "RPA Analyst",
    techStack: "Power Automate & SQL",
    description: "Analyzed business processes for automation opportunities and developed end-to-end workflow solutions using Microsoft's Power Platform ecosystem.",
    keyResults: [
      "Automated 30+ manual business processes",
      "Created a reusable component library for the team",
      "Trained 10+ team members on Power Automate",
    ],
  },
  {
    yearRange: "2019 - 2021",
    duration: "1 year 11 months",
    company: "Process Labs",
    role: "Automation Developer",
    techStack: "UiPath & VBA",
    description: "Developed automation scripts and bots for data entry, report generation, and cross-system data migration tasks.",
    keyResults: [
      "Built a data migration tool processing 100K+ records",
      "Reduced manual data entry errors by 95%",
      "Won internal hackathon for best automation project",
    ],
  },
  {
    yearRange: "2018 - 2019",
    duration: "9 months",
    company: "StartUp Hub",
    role: "Junior Developer",
    techStack: "Python & JavaScript",
    description: "Contributed to web scraping tools and internal dashboard development, gaining foundational skills in automation and backend development.",
    keyResults: [
      "Built web scraping pipelines for market research",
      "Developed an internal KPI tracking dashboard",
      "Automated daily report generation workflows",
    ],
  },
];

const WorkExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedJob, setSelectedJob] = useState<JobEntry | null>(null);

  const totalYears = 4;
  const totalMonths = 9;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-4 md:px-12 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-right mb-10 md:mb-16 text-4xl md:text-5xl lg:text-6xl"
        >
          Work
        </motion.h2>

        {/* Job Entries List */}
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
                    {job.duration}
                  </p>
                </div>
                <p className="font-body text-base font-medium mb-1 text-foreground/90 transition-colors duration-300 group-hover:text-background">
                  {job.company}
                </p>
                <p className="font-code text-xs text-muted-foreground transition-colors duration-300 group-hover:text-background/80">
                  {job.role}{" "}
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
                    {job.duration}
                  </p>
                </div>

                <div className="col-span-4 flex items-center">
                  <p className="font-body text-base lg:text-lg text-foreground/90 transition-colors duration-300 group-hover:text-background">
                    {job.company}
                  </p>
                </div>

                <div className="col-span-6 flex items-center justify-end">
                  <p className="font-code text-sm lg:text-base text-right text-foreground/80 transition-colors duration-300 group-hover:text-background">
                    {job.role}{" "}
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

        {/* Total Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 md:mt-8 text-right"
        >
          <p className="text-muted-foreground text-xs md:text-sm">Work experience</p>
          <p className="font-code text-base md:text-lg text-foreground">
            {totalYears} years {totalMonths} months
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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg glass-card p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <h3 className="font-code text-xl md:text-2xl font-bold mb-1">
                {selectedJob.company}
              </h3>
              <p className="font-code text-sm text-muted-foreground mb-6">
                {selectedJob.role}
              </p>

              {/* Period */}
              <div className="mb-4">
                <p className="font-code text-xs text-muted-foreground uppercase tracking-wider mb-1">Period</p>
                <p className="font-body text-sm text-foreground">
                  {selectedJob.yearRange} · {selectedJob.duration}
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="font-code text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Key Results */}
              <div>
                <p className="font-code text-xs text-muted-foreground uppercase tracking-wider mb-2">Key Results</p>
                <ul className="space-y-2">
                  {selectedJob.keyResults.map((result, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                      <span className="text-muted-foreground mt-0.5">→</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-code text-xs text-muted-foreground">
                  Stack: {selectedJob.techStack}
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
