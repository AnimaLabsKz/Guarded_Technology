import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import solutionsCctv from "@/assets/solutions-cctv.jpg";
import solutionsLiving from "@/assets/solutions-living.jpg";
import solutionsEnergy from "@/assets/solutions-energy.jpg";
import solutionsCctvLight from "@/assets/solutions-cctv-light.jpg";
import solutionsLivingLight from "@/assets/solutions-living-light.jpg";
import solutionsEnergyLight from "@/assets/solutions-energy-light.jpg";

const Solutions = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const apiRef = useRef<FullScreenFXAPI>(null);

  const isDark = resolvedTheme === "dark";
  const cctvImg = isDark ? solutionsCctv : solutionsCctvLight;
  const livingImg = isDark ? solutionsLiving : solutionsLivingLight;
  const energyImg = isDark ? solutionsEnergy : solutionsEnergyLight;

  const overviewCards = [
    {
      img: cctvImg,
      tagKey: "cctv_title",
      descKey: "cctv_desc",
    },
    {
      img: livingImg,
      tagKey: "living_title",
      descKey: "living_desc",
    },
    {
      img: energyImg,
      tagKey: "energy_title",
      descKey: "energy_desc",
    },
  ];

  const sections = [
    {
      leftLabel: t("solutions", "cctv_title"),
      title: "CCTV",
      rightLabel: t("solutions", "cctv_desc"),
      background: cctvImg,
    },
    {
      leftLabel: t("solutions", "living_title"),
      title: "LIVING",
      rightLabel: t("solutions", "living_desc"),
      background: livingImg,
    },
    {
      leftLabel: t("solutions", "energy_title"),
      title: "ENERGY",
      rightLabel: t("solutions", "energy_desc"),
      background: energyImg,
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          HERO — intro
      ═══════════════════════════════════════ */}
      <section className="section-dark pt-32 pb-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,hsl(var(--primary)/0.05),transparent_70%)]" />
        <div className="section-container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-5"
          >
            Integrated Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight mb-6"
          >
            {t("solutions", "title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground max-w-2xl mx-auto mb-14 text-base leading-relaxed"
          >
            {t("solutions", "subtitle")}
          </motion.p>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {["CCTV Solutions", "Guarded Living", "Guarded Energy"].map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <span className="text-foreground/20 text-sm">·</span>}
                <span className="text-xs font-semibold text-primary/70 uppercase tracking-[0.2em] px-1">
                  {label}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OVERVIEW CARDS
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        <div className="section-container">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-10 text-center"
          >
            Our Services
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overviewCards.map((card, i) => (
              <motion.div
                key={card.tagKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover group relative overflow-hidden rounded-3xl bg-[hsl(var(--surface-alt))] h-[340px]"
              >
                <img
                  src={card.img}
                  alt={t("solutions", card.tagKey)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {t("solutions", card.tagKey)}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    {t("solutions", card.descKey)}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FULL-SCREEN SCROLL
      ═══════════════════════════════════════ */}
      <FullScreenScrollFX
        key={resolvedTheme}
        sections={sections}
        apiRef={apiRef}
        fontFamily='"Inter", system-ui, sans-serif'
        header={
          <div className="flex items-center justify-center pt-20">
            <span className="text-sm md:text-base uppercase tracking-[0.25em] opacity-70 font-semibold">
              Guarded Solutions
            </span>
          </div>
        }
        durations={{ change: 1.0, snap: 1000 }}
        showProgress={true}
        colors={{
          text: resolvedTheme === "dark" ? "hsl(0, 0%, 96%)" : "#B00000",
          overlay: resolvedTheme === "dark" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.12)",
          pageBg: resolvedTheme === "dark" ? "hsl(0, 0%, 2%)" : "#FFFFFF",
          stageBg: resolvedTheme === "dark" ? "hsl(0, 0%, 2%)" : "#FFFFFF",
        }}
        inactiveOpacity={resolvedTheme === "dark" ? 0.35 : 0.75}
      />

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[hsl(var(--surface-alt))] p-12 md:p-16 text-center"
          >
            <p className="relative text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              Ready to Integrate
            </p>
            <h2 className="relative text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("solutions", "cta_title")}
            </h2>
            <p className="relative text-sm text-muted-foreground max-w-lg mx-auto mb-8">
              {t("solutions", "cta_desc")}
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="relative bg-primary text-primary-foreground font-semibold hover:bg-primary/90 gap-2"
              >
                {t("solutions", "cta_btn")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Solutions;
