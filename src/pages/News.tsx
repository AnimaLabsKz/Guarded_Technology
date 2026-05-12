import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { articles, type Article, type Lang } from "@/data/articles";

const filterKeys = ["cat_all", "cat_security", "cat_smart_home", "cat_energy", "cat_cyber"] as const;

/* ─── Expanded overlay ─── */
function ArticleExpanded({
  article,
  lang,
  onClose,
  t,
}: {
  article: Article;
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

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        layoutId={`card-${article.id}`}
        className="fixed inset-x-4 inset-y-6 md:inset-x-12 md:inset-y-10 lg:inset-x-24 lg:inset-y-12
          z-50 bg-[hsl(var(--surface-card))] rounded-3xl overflow-hidden
          flex flex-col shadow-2xl"
        style={{ maxWidth: 900, margin: "auto" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >
        {/* Hero image */}
        <motion.div
          layoutId={`img-${article.id}`}
          className="relative h-52 md:h-72 shrink-0 overflow-hidden"
        >
          <img
            src={article.image}
            alt={article.title[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--surface-card))] via-transparent to-transparent" />
          <span className="absolute top-5 start-5 text-[10px] font-bold uppercase tracking-wider
            px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
            {article.category[lang]}
          </span>
        </motion.div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto px-7 md:px-12 py-8">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span>{article.date[lang]}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <Clock className="w-3 h-3" />
            <span>{article.readTime[lang]}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-6">
            {article.title[lang]}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {article.body[lang]}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm
            flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60
            transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </>
  );
}

/* ─── Card ─── */
function ArticleCard({
  article,
  lang,
  size = "normal",
  onSelect,
  t,
}: {
  article: Article;
  lang: Lang;
  size?: "large" | "normal";
  onSelect: () => void;
  t: (section: string, key: string) => string;
}) {
  return (
    <motion.article
      layoutId={`card-${article.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={onSelect}
      className="card-hover group rounded-2xl overflow-hidden bg-[hsl(var(--surface-card))]
        flex flex-col h-full cursor-pointer"
    >
      <motion.div
        layoutId={`img-${article.id}`}
        className={`relative overflow-hidden shrink-0 ${size === "large" ? "h-56" : "h-44"}`}
      >
        <img
          src={article.image}
          alt={article.title[lang]}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
        <span className="absolute top-4 start-4 text-[10px] font-bold uppercase tracking-wider
          px-3 py-1 rounded-full bg-primary/15 text-primary backdrop-blur-sm border border-primary/20">
          {article.category[lang]}
        </span>
      </motion.div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span>{article.date[lang]}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <Clock className="w-3 h-3" />
          <span>{article.readTime[lang]}</span>
        </div>
        <h3 className={`font-bold text-foreground leading-snug mb-3 group-hover:text-primary
          transition-colors line-clamp-2 ${size === "large" ? "text-xl" : "text-base"}`}>
          {article.title[lang]}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {article.excerpt[lang]}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary/60
          group-hover:text-primary transition-colors">
          {t("news", "read_more")}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Strip card ─── */
function ArticleStrip({
  article,
  lang,
  onSelect,
  t,
}: {
  article: Article;
  lang: Lang;
  onSelect: () => void;
  t: (section: string, key: string) => string;
}) {
  return (
    <motion.article
      layoutId={`card-${article.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={onSelect}
      className="card-hover group rounded-2xl overflow-hidden bg-[hsl(var(--surface-card))]
        flex flex-col md:flex-row cursor-pointer"
    >
      <motion.div
        layoutId={`img-${article.id}`}
        className="relative overflow-hidden h-48 md:h-auto md:w-80 shrink-0"
      >
        <img
          src={article.image}
          alt={article.title[lang]}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A] hidden md:block" />
        <span className="absolute top-4 start-4 text-[10px] font-bold uppercase tracking-wider
          px-3 py-1 rounded-full bg-primary/15 text-primary backdrop-blur-sm border border-primary/20">
          {article.category[lang]}
        </span>
      </motion.div>

      <div className="flex flex-col justify-center p-7 md:p-10">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span>{article.date[lang]}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <Clock className="w-3 h-3" />
          <span>{article.readTime[lang]}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-4
          group-hover:text-primary transition-colors">
          {article.title[lang]}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-6">
          {article.excerpt[lang]}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/60
          group-hover:text-primary transition-colors">
          {t("news", "read_more")}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main page ─── */
const News = () => {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("cat_all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const selectedArticle = selectedId ? articles.find((a) => a.id === selectedId) ?? null : null;
  const handleClose = useCallback(() => setSelectedId(null), []);

  const featured = articles[0];

  const filtered =
    activeFilter === "cat_all"
      ? articles
      : articles.filter((a) => a.filterTag === activeFilter);

  const mainGrid = filtered.slice(0, 2);
  const strips   = filtered.slice(2);

  const handleSubscribe = async () => {
    if (!email) return;
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId   = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    try {
      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ chat_id: chatId, text: `📩 Newsletter: ${email}` }),
        });
      }
      toast.success(t("news", "subscribe_success"));
      setEmail("");
    } catch {
      toast.error("Failed to subscribe.");
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          EDITORIAL HEADER
      ═══════════════════════════════════════ */}
      <section className="section-dark pt-28 pb-0">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-8 border-b border-border/40"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              {t("nav", "news")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight">
                {t("news", "title")}
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                {t("news", "subtitle")}
              </p>
            </div>
          </motion.div>

          {/* category filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-2 pt-6 pb-12"
          >
            {filterKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  activeFilter === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-[hsl(var(--surface-card))] text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--surface-card-hover))]"
                }`}
              >
                {t("news", key)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED ARTICLE — full-width hero
      ═══════════════════════════════════════ */}
      <section className="section-dark pt-0">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            onClick={() => setSelectedId(featured.id)}
            className="card-hover group relative rounded-3xl overflow-hidden cursor-pointer h-[400px] md:h-[480px]"
          >
            <img
              src={featured.image}
              alt={featured.title[lang as Lang]}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t
              from-[#1A1A1A] via-[#1A1A1A/0.55] to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider
                  px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                  {t("news", "featured")}
                </span>
                <span className="text-xs text-white/60">{featured.date[lang as Lang]}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <Clock className="w-3 h-3 text-white/50" />
                <span className="text-xs text-white/60">{featured.readTime[lang as Lang]}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4
                max-w-3xl group-hover:text-primary transition-colors">
                {featured.title[lang as Lang]}
              </h2>

              <p className="text-sm text-white/70 max-w-xl leading-relaxed mb-6 hidden md:block">
                {featured.excerpt[lang as Lang]}
              </p>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80
                group-hover:text-primary transition-colors w-fit">
                {t("news", "read_more")}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ARTICLE GRID — magazine layout
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        <div className="section-container">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground py-16"
              >
                No articles in this category yet.
              </motion.p>
            ) : (
              <motion.div key={activeFilter} className="space-y-6">
                {mainGrid.length > 0 && (
                  <div className={`grid gap-6 ${mainGrid.length === 1 ? "grid-cols-1 max-w-lg" : "grid-cols-1 md:grid-cols-2"}`}>
                    {mainGrid.map((a) => (
                      <ArticleCard
                        key={a.id}
                        article={a}
                        lang={lang as Lang}
                        size={mainGrid.length === 1 ? "large" : "normal"}
                        onSelect={() => setSelectedId(a.id)}
                        t={t}
                      />
                    ))}
                  </div>
                )}
                {strips.map((a) => (
                  <ArticleStrip
                    key={a.id}
                    article={a}
                    lang={lang as Lang}
                    onSelect={() => setSelectedId(a.id)}
                    t={t}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPANDED ARTICLE OVERLAY
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleExpanded
            article={selectedArticle}
            lang={lang as Lang}
            onClose={handleClose}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          NEWSLETTER — minimal
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="h-px w-12 bg-primary mb-8 mx-auto" />
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("news", "subscribe_title")}
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {t("news", "subscribe_text")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="you@enterprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                className="flex-1 bg-[hsl(var(--surface-input))] border-[hsl(var(--border-input))]
                  text-foreground placeholder:text-muted-foreground/40
                  focus-visible:ring-primary/50 h-11 rounded-xl"
              />
              <Button
                onClick={handleSubscribe}
                className="bg-primary text-primary-foreground hover:bg-primary/90
                  font-semibold h-11 px-6 rounded-full whitespace-nowrap"
              >
                {t("news", "subscribe_btn")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default News;
