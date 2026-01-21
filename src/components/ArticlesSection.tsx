import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

const ArticlesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePage, setActivePage] = useState(1);

  const articles = [
    {
      title: "How to optimize Python bots for enterprise scale",
      excerpt:
        "Learn the best practices for building performant automation scripts that can handle thousands of transactions daily.",
    },
    {
      title: "UiPath vs Power Automate: A complete comparison",
      excerpt:
        "An in-depth analysis of the two leading RPA platforms, their strengths, and when to use each one.",
    },
    {
      title: "Building resilient automation workflows",
      excerpt:
        "Discover error handling patterns and retry mechanisms that make your bots production-ready.",
    },
    {
      title: "Integrating AI with RPA for intelligent automation",
      excerpt:
        "How to combine machine learning models with robotic process automation for smarter workflows.",
    },
  ];

  return (
    <section id="articles" className="py-24 px-6 md:px-12 lg:px-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title text-right mb-16"
        >
          Articles
        </motion.h2>

        <div className="flex gap-8 lg:gap-16">
          {/* Pagination indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex flex-col items-center gap-4"
          >
            <button
              onClick={() => setActivePage(1)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center font-code text-sm transition-all ${
                activePage === 1
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              1
            </button>
            <button
              onClick={() => setActivePage(2)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center font-code text-sm transition-all ${
                activePage === 2
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              2
            </button>
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <ArrowDown size={16} className="text-muted-foreground" />
            </div>
          </motion.div>

          {/* Articles grid */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-card p-8 group hover:border-white/20 transition-all duration-300"
              >
                <h3 className="font-code text-lg font-semibold mb-4 group-hover:text-foreground transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="px-6 py-2 rounded-full bg-foreground text-background font-code text-sm hover:bg-foreground/90 transition-colors"
                  >
                    Read more
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;