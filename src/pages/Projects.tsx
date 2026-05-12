import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, type CaseStudy, type Lang } from "@/data/caseStudies";

const filterKeys = ["all", "uae", "kz", "africa"] as const;

/* ─── Expanded overlay — Apple style ─── */
function CaseExpanded({
  cs,
  lang,
  onClose,
  t,
}: {
  cs: CaseStudy;
  lang: Lang;
  onClose: () => void;
  t: (section: string, key: string) => string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const sectionLabels: Record<Lang, Record<string, string>> = {
    en: { challenge: "Challenge", solution: "Solution", results: "Outcome", products: "Technologies" },
    ru: { challenge: "Задача", solution: "Решение", results: "Результат", products: "Технологии" },
    kk: { challenge: "Мәселе", solution: "Шешім", results: "Нәтиже", products: "Технологиялар" },
    ar: { challenge: "التحدي", solution: "الحل", results: "النتيجة", products: "التقنيات" },
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      <motion.div
        layoutId={`case-${cs.id}`}
        className="fixed inset-x-4 inset-y-6 md:inset-x-16 md:inset-y-10 lg:inset-x-28 lg:inset-y-10
          z-50 rounded-3xl overflow-hidden flex flex-col shadow-2xl
          bg-[hsl(var(--background))]"
        style={{ maxWidth: 880, margin: "auto" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {/* Hero */}
        <motion.div layoutId={`img-${cs.id}`} className="relative h-52 md:h-72 shrink-0">
          <img
            src={cs.image}
            alt={t("projects", cs.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

          {/* Title overlaid on image */}
          <div className="absolute bottom-0 inset-x-0 px-8 md:px-12 pb-8">
            <p className="text-[11px] font-medium tracking-[0.25em] text-white/50 uppercase mb-2">
              {t("projects", cs.tagKey)} · {t("projects", cs.locKey)}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {t("projects", cs.titleKey)}
            </h2>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Stats — inline, no boxes */}
          <div className="px-8 md:px-12 pt-10 pb-8 border-b border-foreground/8">
            <div className="flex flex-wrap gap-x-10 gap-y-5">
              {cs.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-semibold text-foreground tracking-tight">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label[lang]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Text sections */}
          <div className="px-8 md:px-12 py-10 space-y-10">
            {(["challenge", "solution", "results"] as const).map((section) => (
              <div key={section} className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8">
                <div className="text-xs text-muted-foreground/60 font-medium uppercase tracking-[0.18em] pt-0.5">
                  {sectionLabels[lang][section]}
                </div>
                <p className="text-[15px] text-foreground/80 leading-[1.75]">
                  {cs[section][lang]}
                </p>
              </div>
            ))}

            {/* Products — plain list */}
            <div className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8">
              <div className="text-xs text-muted-foreground/60 font-medium uppercase tracking-[0.18em] pt-0.5">
                {sectionLabels[lang].products}
              </div>
              <ul className="space-y-3">
                {cs.products.map((p, i) => (
                  <li key={i} className="text-[15px] text-foreground/80 border-b border-foreground/6 pb-3 last:border-0 last:pb-0">
                    {p[lang]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 end-5 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm
            flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50
            transition-all duration-200 z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </>
  );
}

/* ─── Project card ─── */
function ProjectCard({
  cs,
  onSelect,
  t,
  lang,
}: {
  cs: CaseStudy;
  onSelect: () => void;
  t: (section: string, key: string) => string;
  lang: Lang;
}) {
  return (
    <motion.div
      layoutId={`case-${cs.id}`}
      onClick={onSelect}
      className="card-hover group rounded-3xl overflow-hidden bg-[hsl(var(--surface-card))] cursor-pointer"
    >
      <motion.div layoutId={`img-${cs.id}`} className="relative h-56 overflow-hidden">
        <img
          src={cs.image}
          alt={t("projects", cs.titleKey)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={(e) => {
            const fallbacks = [
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
              "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
            ];
            const idx = caseStudies.indexOf(cs);
            (e.target as HTMLImageElement).src = fallbacks[idx] || fallbacks[0];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute top-4 start-4 text-[10px] font-semibold tracking-[0.2em] uppercase
          px-2.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/15">
          {t("projects", cs.tagKey)}
        </span>
      </motion.div>

      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <MapPin className="w-3 h-3 shrink-0" />
          {t("projects", cs.locKey)}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {t("projects", cs.titleKey)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
          {t("projects", cs.descKey)}
        </p>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/70
          group-hover:text-primary transition-colors duration-200">
          {t("projects", "view_case")}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Main page ─── */
const Projects = () => {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCase = selectedId ? caseStudies.find((c) => c.id === selectedId) ?? null : null;
  const handleClose = useCallback(() => setSelectedId(null), []);

  const filtered = activeFilter === "all"
    ? caseStudies
    : caseStudies.filter((c) => c.filter === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="section-dark pt-32">
        <div className="section-container text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.05),transparent_70%)]" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative z-10">
            {t("projects", "title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto relative z-10">
            {t("projects", "subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10 relative z-10">
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`text-sm font-medium pb-2 transition-all duration-200 border-b-2 ${
                  activeFilter === key
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("projects", `filter_${key}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-alt">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((cs) => (
              <ProjectCard
                key={cs.id}
                cs={cs}
                lang={lang as Lang}
                onSelect={() => setSelectedId(cs.id)}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Overlay */}
      <AnimatePresence>
        {selectedCase && (
          <CaseExpanded
            cs={selectedCase}
            lang={lang as Lang}
            onClose={handleClose}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-dark">
        <div className="section-container">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[hsl(var(--surface-alt))] p-10 md:p-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {t("projects", "cta")}
            </h2>
            <Button asChild size="lg" className="font-semibold gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">
                {t("projects", "cta_btn")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
