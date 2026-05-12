import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealTitle,
  CardCurtain,
  CardCurtainRevealDescription,
} from "@/components/ui/card-curtain-reveal";
import { HeroCameraScroll } from "@/components/ui/hero-camera-scroll";
import { Camera, Package, Layers, Shield } from "lucide-react";
import { motion } from "framer-motion";

const divisionKeys = [
  { icon: Package, titleKey: "dist_title", textKey: "dist_text", link: "/products" },
  { icon: Camera, titleKey: "brand_title", textKey: "brand_text", link: "/guarded-products" },
  { icon: Layers, titleKey: "services_title", textKey: "services_text", link: "/solutions" },
  { icon: Shield, titleKey: "cyber_title2", textKey: "cyber_text2", link: "/services" },
];

const stats = [
  { number: "15+", titleKey: "adv1_title", textKey: "adv1_text" },
  { number: "7+", titleKey: "adv2_title", textKey: "adv2_text" },
  { number: "3", titleKey: "adv3_title", textKey: "adv3_text" },
  { number: "100%", titleKey: "adv4_title", textKey: "adv4_text" },
];

const projectImages = [
  "/assets/projects/uae.jpg",
  "/assets/projects/kz.jpg",
  "/assets/projects/africa.jpg",
];

const caseStudies = [
  { tagKey: "tag1", titleKey: "title1", locKey: "loc1", img: projectImages[0] },
  { tagKey: "tag2", titleKey: "title2", locKey: "loc2", img: projectImages[1] },
  { tagKey: "tag3", titleKey: "title3", locKey: "loc3", img: projectImages[2] },
];

const newsArticles = [
  {
    titleKey: "art1_title",
    dateKey: "art1_date",
    excerptKey: "art1_excerpt",
    catKey: "art1_cat",
    readKey: "read_time_1",
    image: "/assets/news/ai-surveillance.jpg",
  },
  {
    titleKey: "art2_title",
    dateKey: "art2_date",
    excerptKey: "art2_excerpt",
    catKey: "art2_cat",
    readKey: "read_time_2",
    image: "/assets/news/smart-home.jpg",
  },
  {
    titleKey: "art3_title",
    dateKey: "art3_date",
    excerptKey: "art3_excerpt",
    catKey: "art3_cat",
    readKey: "read_time_3",
    image: "/assets/news/cybersecurity.jpg",
  },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero — scroll-driven camera animation */}
      <HeroCameraScroll />

      {/* Core Divisions */}
      <section className="section-alt">
        <div className="section-container">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-fade-in">
            {t("hero", "ecosystem")}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {divisionKeys.map((d, i) => (
              <Link key={d.titleKey} to={d.link}>
                <CardCurtainReveal
                  className="card-hover h-64 animate-fade-in bg-[hsl(var(--surface-card))]"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
                >
                  <CardCurtainRevealBody>
                    <d.icon className="mb-5 h-10 w-10 text-primary" />
                    <CardCurtainRevealTitle>{t("divisions", d.titleKey)}</CardCurtainRevealTitle>
                  </CardCurtainRevealBody>
                  <CardCurtain />
                  <CardCurtainRevealDescription>
                    <d.icon className="mb-5 h-10 w-10 text-zinc-700 dark:text-zinc-300" />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">{t("divisions", d.titleKey)}</h3>
                    <p className="text-sm leading-relaxed">{t("divisions", d.textKey)}</p>
                  </CardCurtainRevealDescription>
                </CardCurtainReveal>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Guarded — editorial stats strip */}
      <section className="section-dark overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 max-w-xl"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              {t("home", "advantages_title")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {t("home", "advantages_subtitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/5 border border-border/20 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={s.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background p-5 sm:p-8 md:p-10 group hover:bg-[hsl(var(--surface-card-hover))] transition-colors duration-300"
              >
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tabular-nums leading-none mb-4 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {s.number}
                </p>
                <h3 className="text-sm font-semibold text-foreground mb-2">{t("home", s.titleKey)}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t("home", s.textKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects — editorial asymmetric layout */}
      <section className="section-alt">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
                {t("home", "cases_subtitle")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t("home", "cases_title")}
              </h2>
            </motion.div>
            <Link
              to="/projects"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              {t("home", "view_all_cases")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetric grid: large left + stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Featured large card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <Link
                to="/projects"
                className="card-hover group block relative overflow-hidden rounded-3xl bg-[hsl(var(--surface-alt))] h-[380px] lg:h-full min-h-[380px]"
              >
                <img
                  src={caseStudies[0].img}
                  alt={t("projects", caseStudies[0].titleKey)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 text-primary mb-3 backdrop-blur-sm">
                    {t("projects", caseStudies[0].tagKey)}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                    {t("projects", caseStudies[0].titleKey)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {t("projects", caseStudies[0].locKey)}
                  </div>
                </div>
                <div className="absolute inset-y-0 start-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
              </Link>
            </motion.div>

            {/* Stacked right cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {caseStudies.slice(1).map((cs, i) => (
                <motion.div
                  key={cs.titleKey}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <Link
                    to="/projects"
                    className="card-hover group block relative overflow-hidden rounded-3xl bg-[hsl(var(--surface-alt))] h-[175px]"
                  >
                    <img
                      src={cs.img}
                      alt={t("projects", cs.titleKey)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary mb-2 backdrop-blur-sm">
                        {t("projects", cs.tagKey)}
                      </span>
                      <h3 className="text-base font-bold text-white mb-1">{t("projects", cs.titleKey)}</h3>
                      <div className="flex items-center gap-1.5 text-white/60 text-xs">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {t("projects", cs.locKey)}
                      </div>
                    </div>
                    <div className="absolute inset-y-0 start-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/projects">
              <Button variant="outline" className="gap-2">
                {t("home", "view_all_cases")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News — magazine split layout */}
      <section className="section-dark">
        <div className="section-container">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
                {t("home", "news_subtitle")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t("home", "news_title")}
              </h2>
            </motion.div>
            <Link
              to="/news"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              {t("home", "view_all_news")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Magazine split: featured large left + 2 stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured article — large */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/news"
                className="card-hover group flex flex-col rounded-3xl overflow-hidden bg-[hsl(var(--surface-alt))] h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={newsArticles[0].image}
                    alt={t("news", newsArticles[0].titleKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_6.7%)] via-[hsl(0_0%_6.7%/0.3)] to-transparent" />
                  <span className="absolute top-4 start-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {t("news", newsArticles[0].catKey)}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {t("news", newsArticles[0].dateKey)}
                    </div>
                    <span className="text-white/20">·</span>
                    <span>{t("news", newsArticles[0].readKey)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {t("news", newsArticles[0].titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {t("news", newsArticles[0].excerptKey)}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary/60 group-hover:text-primary transition-colors">
                    {t("news", "read_more")} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secondary articles — stacked horizontal */}
            <div className="flex flex-col gap-6">
              {newsArticles.slice(1).map((art, i) => (
                <motion.div
                  key={art.titleKey}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <Link
                    to="/news"
                    className="card-hover group flex rounded-3xl overflow-hidden bg-[hsl(var(--surface-alt))] h-full"
                  >
                    <div className="relative w-36 shrink-0 overflow-hidden">
                      <img
                        src={art.image}
                        alt={t("news", art.titleKey)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(0_0%_6.7%/0.3)]" />
                    </div>
                    <div className="p-5 flex flex-col justify-center flex-1 min-h-[130px]">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="text-primary/70 font-medium">{t("news", art.catKey)}</span>
                        <span className="text-white/20">·</span>
                        <span>{t("news", art.dateKey)}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {t("news", art.titleKey)}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {t("news", art.excerptKey)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/news">
              <Button variant="outline" className="gap-2">
                {t("home", "view_all_news")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
