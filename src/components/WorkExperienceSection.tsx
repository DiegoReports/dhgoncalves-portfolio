import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { type JobEntry } from "@/content/translations";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const rowHover =
  "transition-all duration-300 ease-out group-hover:bg-foreground group-hover:cursor-dark theme-light:group-hover:cursor-light";

const WorkExperienceSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });
  const jobs = t.work.jobs;
  const { totalYears, totalMonths } = t.work;

  const [selectedJob, setSelectedJob] = useState<JobEntry | null>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-20 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="section-title text-right mb-10 md:mb-16 text-4xl md:text-5xl lg:text-6xl"
        >
          {t.work.sectionTitle}
        </motion.h2>

        <div className="border-t border-border/30">
          {jobs.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.yearRange}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="work-entry group border-b border-border/30"
            >
              {/* Mobile layout */}
              <div className={`md:hidden py-4 px-3 -mx-3 ${rowHover}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-code text-sm transition-colors duration-300 group-hover:text-background">
                    {job.yearRange}
                  </p>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-background/70">
                    {job.duration}
                  </p>
                </div>
                <p className="font-body text-base font-medium mb-1 transition-colors duration-300 group-hover:text-background">
                  {job.company}
                </p>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <p className="font-code text-xs text-muted-foreground transition-colors duration-300 group-hover:text-background/85">
                    {job.role}{" "}
                    <span className="transition-colors duration-300 group-hover:text-background/50">|</span>{" "}
                    {job.techStack}
                  </p>
                  <Badge
                    variant="outline"
                    className="shrink-0 cursor-pointer text-xs transition-all duration-200 bg-background text-foreground border-border hover:bg-foreground hover:text-background hover:border-foreground/50"
                    onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                  >
                    {t.work.viewDetails}
                  </Badge>
                </div>
              </div>

              {/* Desktop layout */}
              <div className={`hidden md:grid grid-cols-12 gap-4 py-6 px-4 -mx-4 ${rowHover}`}>
                <div className="col-span-2">
                  <p className="font-code text-base lg:text-lg transition-colors duration-300 group-hover:text-background">
                    {job.yearRange}
                  </p>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-background/70">
                    {job.duration}
                  </p>
                </div>

                <div className="col-span-3 flex items-center">
                  <p className="font-body text-base lg:text-lg transition-colors duration-300 group-hover:text-background">
                    {job.company}
                  </p>
                </div>

                <div className="col-span-5 flex items-center justify-end">
                  <p className="font-code text-sm lg:text-base text-right transition-colors duration-300 group-hover:text-background">
                    {job.role}{" "}
                    <span className="text-muted-foreground transition-colors duration-300 group-hover:text-background/60">
                      |
                    </span>{" "}
                    {job.techStack}
                  </p>
                </div>

                <div className="col-span-2 flex items-center justify-end">
                  <Badge
                    variant="outline"
                    className="cursor-pointer transition-all duration-200 bg-background text-foreground border-border hover:bg-foreground hover:text-background hover:border-foreground/50"
                    onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                  >
                    {t.work.viewDetails}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 md:mt-8 text-right"
        >
          <p className="text-muted-foreground text-xs md:text-sm">{t.work.totalLabel}</p>
          <p className="font-code text-base md:text-lg text-foreground">
            {totalYears} {t.work.durationYearLabel} {totalMonths} {t.work.durationMonthLabel}
          </p>
        </motion.div>
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-code text-xl">{selectedJob?.company}</DialogTitle>
            <DialogDescription className="font-code text-sm">
              {selectedJob?.role}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex gap-3 text-sm font-code text-muted-foreground">
              <span>{selectedJob?.yearRange}</span>
              <span>·</span>
              <span>{selectedJob?.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedJob?.techStack.split(/[&,]/).map((tech) => (
                <Badge key={tech.trim()} variant="secondary" className="font-code text-xs">
                  {tech.trim()}
                </Badge>
              ))}
            </div>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {selectedJob?.details}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WorkExperienceSection;
