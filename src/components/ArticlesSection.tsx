import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PAGE_SIZE = 2;

const ArticlesSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const articles = t.articles.items;
  const pageCount = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage((p) => Math.min(Math.max(1, p), pageCount));
  }, [pageCount, articles.length]);

  const visibleArticles = useMemo(() => {
    const start = (activePage - 1) * PAGE_SIZE;
    return articles.slice(start, start + PAGE_SIZE);
  }, [articles, activePage]);

  const pageNumbers = useMemo(() => Array.from({ length: pageCount }, (_, i) => i + 1), [pageCount]);

  return (
    <section id="articles" className="py-24 px-4 md:px-12 lg:px-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="section-title text-right mb-16"
        >
          {t.articles.sectionTitle}
        </motion.h2>

        <div className="flex gap-8 lg:gap-16">
          {pageCount > 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex flex-col items-center gap-4"
            >
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center font-code text-sm transition-all ${
                    activePage === page
                      ? "bg-foreground text-background border-foreground cursor-dark theme-light:cursor-light"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </motion.div>
          )}

          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {visibleArticles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-card p-8 group hover:border-foreground/20 transition-all duration-300"
              >
                <h3 className="font-code text-lg font-semibold mb-4 group-hover:text-foreground transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">{article.excerpt}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={article.href}
                    className="px-6 py-2 rounded-full bg-foreground text-background font-code text-sm hover:bg-foreground/90 transition-colors cursor-dark theme-light:cursor-light"
                  >
                    {t.articles.readMore}
                  </a>
                  <a
                    href={article.href}
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors cursor-dark theme-light:cursor-light"
                    aria-label={t.articles.readMore}
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {pageCount > 1 && (
          <div className="mt-8 flex md:hidden justify-center gap-2">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`min-w-10 h-10 px-3 rounded-full border font-code text-sm transition-all ${
                  activePage === page
                    ? "bg-foreground text-background border-foreground cursor-dark theme-light:cursor-light"
                    : "border-border text-muted-foreground"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
