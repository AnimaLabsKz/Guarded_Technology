import { useEffect, useRef } from "react";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { motion, useAnimation } from "framer-motion";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import { GuardedGlobe } from "@/components/ui/guarded-globe";

/* ─── Data ─── */
const milestones = [
  { year: "2019", titleKey: "tm_2019_title", textKey: "tm_2019_text" },
  { year: "2022", titleKey: "tm_2022_title", textKey: "tm_2022_text" },
  { year: "2024", titleKey: "tm_2024_title", textKey: "tm_2024_text" },
  { year: "2026", titleKey: "tm_2026_title", textKey: "tm_2026_text" },
];

const certifications = [
  { name: "ISO 27001", descKey: "cert_27001", img: "/assets/about/iso27001.png" },
  { name: "ISO 9001",  descKey: "cert_9001",  img: "/assets/about/iso9001.png"  },
  { name: "ISO 14001", descKey: "cert_14001", img: "/assets/about/iso14001.png" },
  { name: "ISO 45001", descKey: "cert_45001", img: "/assets/about/iso45001.png" },
];


const hubs = [
  {
    emoji: "🇦🇪",
    labelKey: "hub_me",
    cityKey:  "city_me",
    detail:   "8F22, 1st Floor, JAFZA 8, JAFZA, Dubai, UAE",
    markets:  ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
  },
  {
    emoji: "🇰🇿",
    labelKey: "hub_ca",
    cityKey:  "city_ca",
    detail:   "Prospect Raiymbekа 212A, Almaty, Kazakhstan",
    markets:  ["Kazakhstan", "Uzbekistan", "Kyrgyzstan"],
  },
];


/* ─── Component ─── */
const About = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const heroCtrl = useAnimation();
  const whatWeDoApiRef = useRef<FullScreenFXAPI>(null);

  useEffect(() => {
    heroCtrl.start((i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12 + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] },
    }));
  }, [heroCtrl]);

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          HERO — full-width background image
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background image */}
        <img
          src={resolvedTheme === "dark" ? "/assets/about/hero-tech.jpg" : "/assets/about/hero-tech-light.jpg"}
          alt="Guarded Technology — Data Center"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Readability overlays — dark in dark theme, light in light theme */}
        {resolvedTheme === "dark" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r
              from-[hsl(0_0%_2%/0.97)] via-[hsl(0_0%_2%/0.78)] to-[hsl(0_0%_2%/0.25)]" />
            <div className="absolute inset-0 bg-gradient-to-t
              from-[hsl(0_0%_2%/0.85)] via-transparent to-[hsl(0_0%_2%/0.3)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r
              from-[hsl(0_0%_100%/0.90)] via-[hsl(0_0%_100%/0.65)] to-[hsl(0_0%_100%/0.15)]" />
            <div className="absolute inset-0 bg-gradient-to-t
              from-[hsl(0_0%_100%/0.60)] via-transparent to-[hsl(0_0%_100%/0.20)]" />
          </>
        )}

        {/* Subtle gold glow */}
        <div className="pointer-events-none absolute inset-0 z-[1]
          bg-[radial-gradient(ellipse_55%_70%_at_15%_75%,hsl(var(--primary)/0.06),transparent_60%)]" />

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
          <div className="max-w-2xl">
            <motion.p
              custom={0} initial={{ opacity: 0, y: 20 }} animate={heroCtrl}
              className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-5"
            >
              Est. 2019 · Global Technology
            </motion.p>

            <motion.h1
              custom={1} initial={{ opacity: 0, y: 30 }} animate={heroCtrl}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.08] mb-6"
            >
              {t("about", "heroTitle")}
            </motion.h1>

            <motion.p
              custom={2} initial={{ opacity: 0, y: 20 }} animate={heroCtrl}
              className="text-base text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              {t("about", "heroSubtitle")}
            </motion.p>

            <motion.div
              custom={3} initial={{ opacity: 0, y: 20 }} animate={heroCtrl}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                  font-semibold text-sm px-6 py-3 rounded-full
                  hover:bg-primary/90 transition-colors"
              >
                {t("about", "cta_partner_btn")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 border border-foreground/15 text-foreground
                  font-semibold text-sm px-6 py-3 rounded-full
                  hover:border-primary/50 hover:text-primary transition-colors"
              >
                {t("nav", "solutions")}
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={4} initial={{ opacity: 0, y: 20 }} animate={heroCtrl}
              className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-foreground/10 max-w-md"
            >
              {[
                { val: t("about", "stat1_val"), label: t("about", "stat1_label") },
                { val: t("about", "stat2_val"), label: t("about", "stat2_label") },
                { val: t("about", "stat3_val"), label: t("about", "stat3_label") },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-primary">{s.val}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MISSION — typographic strip
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-8 items-start">
              {/* gold vertical line */}
              <div className="hidden md:block w-[2px] self-stretch bg-gradient-to-b from-primary via-primary/50 to-transparent shrink-0" />

              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4"
                >
                  {t("about", "mission_title")}
                </motion.p>

                <motion.blockquote
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-2xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mb-6"
                >
                  "{t("about", "mission_text")}"
                </motion.blockquote>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base text-muted-foreground leading-relaxed max-w-2xl"
                >
                  <span className="text-foreground/70 font-medium">{t("about", "vision_title")}:</span>{" "}
                  {t("about", "vision_text")}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT WE DO — full-screen scroll
      ═══════════════════════════════════════ */}
      <FullScreenScrollFX
        key={resolvedTheme}
        sections={[
          {
            leftLabel: "01",
            title: t("divisions", "dist_title"),
            rightLabel: (
              <span className="block max-w-[300px] ml-auto normal-case tracking-normal text-[0.8rem] leading-relaxed font-normal">
                {t("divisions", "dist_text")}
              </span>
            ),
            background: resolvedTheme === "dark"
              ? "/assets/about/wwd-distribution.jpg"
              : "/assets/about/wwd-distribution-light.jpg",
          },
          {
            leftLabel: "02",
            title: t("divisions", "brand_title"),
            rightLabel: (
              <span className="block max-w-[300px] ml-auto normal-case tracking-normal text-[0.8rem] leading-relaxed font-normal">
                {t("divisions", "brand_text")}
              </span>
            ),
            background: resolvedTheme === "dark"
              ? "/assets/about/wwd-brand.jpg"
              : "/assets/about/wwd-brand-light.jpg",
          },
          {
            leftLabel: "03",
            title: t("divisions", "services_title"),
            rightLabel: (
              <span className="block max-w-[300px] ml-auto normal-case tracking-normal text-[0.8rem] leading-relaxed font-normal">
                {t("divisions", "services_text")}
              </span>
            ),
            background: resolvedTheme === "dark"
              ? "/assets/about/wwd-services.jpg"
              : "/assets/about/wwd-services-light.jpg",
          },
          {
            leftLabel: "04",
            title: t("divisions", "cyber_title2"),
            rightLabel: (
              <span className="block max-w-[300px] ml-auto normal-case tracking-normal text-[0.8rem] leading-relaxed font-normal">
                {t("divisions", "cyber_text2")}
              </span>
            ),
            background: resolvedTheme === "dark"
              ? "/assets/about/wwd-cyber.jpg"
              : "/assets/about/wwd-cyber-light.jpg",
          },
        ]}
        apiRef={whatWeDoApiRef}
        fontFamily='"Inter", system-ui, sans-serif'
        header={
          <div className="flex items-center justify-center pt-20">
            <span className="text-sm md:text-base uppercase tracking-[0.25em] opacity-70 font-semibold">
              {t("about", "what_we_do_title")}
            </span>
          </div>
        }
        durations={{ change: 1.0, snap: 1000 }}
        showProgress={true}
        colors={{
          text: resolvedTheme === "dark" ? "hsl(0, 0%, 96%)" : "#B00000",
          overlay: resolvedTheme === "dark" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.12)",
          pageBg: resolvedTheme === "dark" ? "hsl(0, 0%, 2%)" : "#FFFFFF",
          stageBg: resolvedTheme === "dark" ? "hsl(0, 0%, 2%)" : "#FFFFFF",
        }}
        inactiveOpacity={resolvedTheme === "dark" ? 0.35 : 0.75}
      />

      {/* ═══════════════════════════════════════
          GLOBAL PRESENCE — globe + hubs
      ═══════════════════════════════════════ */}
      <section className="section-dark overflow-hidden">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
              {t("about", "global_presence_title")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("contact", "global_net")}
            </h2>
          </motion.div>

          {/* Globe + Hub cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <GuardedGlobe className="w-full max-w-[520px]" />
            </motion.div>

            {/* Hub cards */}
            <div className="flex flex-col gap-4">
              {hubs.map((hub, i) => (
                <motion.div
                  key={hub.labelKey}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="card-hover rounded-2xl bg-[hsl(var(--surface-card))] p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0 mt-0.5">{hub.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-primary mb-1">
                        {t("contact", hub.labelKey)}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {hub.detail}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hub.markets.map((m) => (
                          <span
                            key={m}
                            className="inline-flex items-center gap-1.5 text-xs text-foreground/65
                              bg-foreground/5 rounded-full px-2.5 py-1 border border-border/20"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary/50 shrink-0" />
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="grid grid-cols-3 gap-3 mt-2"
              >
                {[
                  { val: "15+", label: "Countries" },
                  { val: "2",   label: "Regional Hubs" },
                  { val: "10+", label: "Active Markets" },
                ].map((s) => (
                  <div key={s.label}
                    className="card-hover rounded-xl bg-[hsl(var(--surface-card))] border border-border/20 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{s.val}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TIMELINE — editorial
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
              {t("about", "milestones")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("about", "journey_title")}
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px
              bg-gradient-to-b from-primary/60 via-primary/30 to-transparent
              rtl:left-auto rtl:right-6 md:rtl:right-1/2" />

            <div className="space-y-14">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-start md:items-center"
                  >
                    {/* dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2
                      rtl:left-auto rtl:right-6 md:rtl:right-1/2 rtl:translate-x-1/2
                      z-10 w-4 h-4 rounded-full bg-primary
                      shadow-[0_0_16px_hsl(var(--primary)/0.6)]" />

                    {/* card */}
                    <div
                      className={`
                        ltr:ml-16 rtl:mr-16 md:ltr:ml-0 md:rtl:mr-0
                        md:w-[calc(50%-2.5rem)]
                        ${isLeft
                          ? "md:ltr:mr-auto md:rtl:ml-auto md:ltr:pr-10 md:rtl:pl-10"
                          : "md:ltr:ml-auto md:rtl:mr-auto md:ltr:pl-10 md:rtl:pr-10"}
                      `}
                    >
                      <div className="card-hover rounded-2xl bg-[hsl(var(--surface-card))] p-7">
                        <span className="inline-block text-xs font-bold text-primary
                          bg-primary/10 px-3 py-1 rounded-full mb-4">
                          {m.year}
                        </span>
                        <h3 className="text-base font-bold text-foreground mb-2">
                          {t("about", m.titleKey)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t("about", m.textKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CERTIFICATIONS — static cards
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
              {t("about", "cert_badge")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("about", "cert_title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              {t("about", "cert_subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="card-hover rounded-2xl bg-[hsl(var(--surface-card))] p-6 flex flex-col items-center text-center"
              >
                <img
                  src={cert.img}
                  alt={cert.name}
                  loading="lazy"
                  className="w-14 h-14 object-contain mb-4 opacity-90"
                />
                <h4 className="text-sm font-bold text-foreground mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("about", cert.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA — partner
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden
              bg-[hsl(var(--surface-card))] p-12 md:p-16 text-center"
          >
            {/* glow */}

            <p className="relative text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              {t("about", "cta_partner_title").split("?")[0] + "?"}
            </p>
            <h2 className="relative text-2xl md:text-3xl font-bold text-foreground mb-8">
              {t("nav", "contact")} Guarded
            </h2>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center gap-2 bg-primary text-primary-foreground
                  font-semibold text-sm px-8 py-3.5 rounded-full
                  hover:bg-primary/90 transition-colors"
              >
                {t("about", "cta_partner_btn")}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
