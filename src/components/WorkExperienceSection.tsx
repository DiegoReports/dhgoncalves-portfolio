import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface JobEntry {
  yearRange: string;
  duration: string;
  company: string;
  role: string;
  techStack: string;
}

const jobs: JobEntry[] = [
  {
    yearRange: "2023 -",
    duration: "1 year 8 months",
    company: "Tech Automation Co",
    role: "Senior RPA Developer",
    techStack: "UiPath & Python",
  },
  {
    yearRange: "2021 - 2023",
    duration: "2 years",
    company: "Digital Solutions Inc",
    role: "RPA Analyst",
    techStack: "Power Automate & SQL",
  },
  {
    yearRange: "2019 - 2021",
    duration: "1 year 11 months",
    company: "Process Labs",
    role: "Automation Developer",
    techStack: "UiPath & VBA",
  },
  {
    yearRange: "2018 - 2019",
    duration: "9 months",
    company: "StartUp Hub",
    role: "Junior Developer",
    techStack: "Python & JavaScript",
  },
];

const WorkExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Calculate total experience
  const totalYears = 4;
  const totalMonths = 9;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 px-4 md:px-12 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title - Right aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-right mb-10 md:mb-16 text-4xl md:text-5xl lg:text-6xl"
        >
          Work
        </motion.h2>

        {/* Job Entries List */}
        <div className="border-t border-border/30">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="work-entry group border-b border-border/30"
            >
              {/* Mobile Layout - Stacked */}
              <div className="md:hidden py-4 px-3 -mx-3 transition-all duration-300 ease-out group-hover:bg-white group-hover:cursor-dark">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-code text-sm transition-colors duration-300 group-hover:text-black">
                    {job.yearRange}
                  </p>
                  <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-black/60">
                    {job.duration}
                  </p>
                </div>
                <p className="font-body text-base font-medium mb-1 transition-colors duration-300 group-hover:text-black">
                  {job.company}
                </p>
                <p className="font-code text-xs text-muted-foreground transition-colors duration-300 group-hover:text-black/80">
                  {job.role}{" "}
                  <span className="transition-colors duration-300 group-hover:text-black/50">|</span>{" "}
                  {job.techStack}
                </p>
              </div>

              {/* Desktop Layout - Grid */}
              <div className="hidden md:grid grid-cols-12 gap-4 py-6 px-4 -mx-4 transition-all duration-300 ease-out group-hover:bg-white group-hover:cursor-dark">
                {/* Left Column - Year Range */}
                <div className="col-span-2">
                  <p className="font-code text-base lg:text-lg transition-colors duration-300 group-hover:text-black">
                    {job.yearRange}
                  </p>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-black/60">
                    {job.duration}
                  </p>
                </div>

                {/* Middle Column - Company */}
                <div className="col-span-4 flex items-center">
                  <p className="font-body text-base lg:text-lg transition-colors duration-300 group-hover:text-black">
                    {job.company}
                  </p>
                </div>

                {/* Right Column - Role & Tech Stack */}
                <div className="col-span-6 flex items-center justify-end">
                  <p className="font-code text-sm lg:text-base text-right transition-colors duration-300 group-hover:text-black">
                    {job.role}{" "}
                    <span className="text-muted-foreground transition-colors duration-300 group-hover:text-black/70">
                      |
                    </span>{" "}
                    {job.techStack}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Experience Summary */}
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
    </section>
  );
};

export default WorkExperienceSection;
