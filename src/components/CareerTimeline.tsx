import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { type CareerStep } from "@/content/translations";

interface CareerTimelineProps {
  steps: CareerStep[];
}

const CareerTimeline = ({ steps }: CareerTimelineProps) => {
  const ordered = [...steps].reverse();

  return (
    <VerticalTimeline layout="1-column-left" lineColor="hsl(var(--border))">
      {ordered.map((step, index) => (
        <VerticalTimelineElement
          key={step.startDate}
          animate={false}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            boxShadow: "none",
            borderRadius: "calc(var(--radius) - 4px)",
            padding: "0.625rem 0.875rem",
          }}
          contentArrowStyle={{
            borderRight: "7px solid hsl(var(--border))",
          }}
          iconStyle={{
            background: index === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted))",
            color: index === 0 ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
            boxShadow: "none",
            width: "1.75rem",
            height: "1.75rem",
          }}
          icon={<Briefcase size={12} />}
        >
          <motion.div
            className="flex items-center justify-between gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + index * 0.12, ease: "easeOut" }}
          >
            <p className="font-code text-sm text-foreground m-0">{step.role}</p>
            <span className="font-code text-xs text-muted-foreground shrink-0">{step.startDate}</span>
          </motion.div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default CareerTimeline;
