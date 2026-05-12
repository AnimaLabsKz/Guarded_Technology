import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Eye, Building2, ArrowRight, MapPin, CheckCircle2, Activity, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataSovereigntyBadge } from "@/components/ui/data-sovereignty-badge";
import { motion } from "framer-motion";

/* ─── Mock threat monitoring data ─── */
const mockThreatItems = [
  { label: "Perimeter Intrusion Detection", status: "ACTIVE", dot: "bg-green-400" },
  { label: "Network Traffic Analysis", status: "MONITORING", dot: "bg-green-400" },
  { label: "Endpoint Behavioral Analysis", status: "ACTIVE", dot: "bg-green-400" },
  { label: "Zero-Day Vulnerability Scan", status: "SCANNING", dot: "bg-primary/80" },
  { label: "DDoS Mitigation Layer", status: "STANDBY", dot: "bg-green-400/60" },
  { label: "Threat Intelligence Feed", status: "SYNCING", dot: "bg-primary/80" },
  { label: "Incident Response Protocol", status: "READY", dot: "bg-green-400" },
];

/* ─── Regional hubs ─── */
const hubs = [
  {
    emoji: "🇦🇪",
    labelKey: "hub_me",
    cityKey: "city_me",
    detail: "8F22, 1st floor, LOB 8, JAFZA",
    markets: ["UAE", "Saudi Arabia", "Qatar", "Kuwait"],
  },
  {
    emoji: "🇰🇿",
    labelKey: "hub_ca",
    cityKey: "city_ca",
    detail: "Almaty Tech Garden",
    markets: ["Kazakhstan", "Uzbekistan", "Kyrgyzstan"],
  },
];

const Services = () => {
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, titleKey: "feat1_title", descKey: "feat1_desc" },
    { icon: Eye, titleKey: "feat2_title", descKey: "feat2_desc" },
    { icon: Building2, titleKey: "feat3_title", descKey: "feat3_desc" },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          HERO — dramatic full viewport
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-24">
        {/* CSS grid background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23D4A020' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold radial glow — left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_15%_50%,hsl(var(--primary)/0.06),transparent_65%)]" />
        {/* Cyber bg image overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: "url('/assets/services/hero-cyber.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-5"
              >
                Guarded Cyber Security
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.08] mb-5"
              >
                {t("services", "title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg text-primary font-medium mb-5"
              >
                {t("services", "subtitle")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-muted-foreground max-w-lg mb-10 leading-relaxed"
              >
                {t("services", "intro")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7 }}
              >
                <Link to="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 gap-2">
                    {t("services", "cta_btn")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right — DataSovereignty card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <DataSovereigntyBadge />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          SOC CAPABILITIES — numbered manifest
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3">
              Core Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              SOC as a Service
            </h2>
          </motion.div>

          <div className="max-w-4xl">
            {features.map((feat, i) => (
              <motion.div
                key={feat.titleKey}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[72px_1fr] gap-8 py-10 border-b border-border/20 last:border-0 group"
              >
                <div className="flex flex-col items-center pt-1">
                  <span className="text-5xl font-bold text-primary/15 tabular-nums leading-none group-hover:text-primary/25 transition-colors duration-500">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <feat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{t("services", feat.titleKey)}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{t("services", feat.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THREAT MONITORING PANEL — decorative
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
                24/7 Threat Monitoring
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Real-Time<br />SOC Operations
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                {t("services", "feat2_desc")}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_hsl(142_76%_56%/0.6)]" />
                <span className="text-sm text-foreground/70">All systems operational</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl bg-[hsl(var(--surface-card))] border border-border/20 overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/20 bg-[hsl(var(--surface-card-hover))]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                </div>
                <span className="text-xs text-muted-foreground tracking-widest uppercase ms-2">SOC Live Feed</span>
                <div className="ms-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_hsl(142_76%_56%/0.8)] animate-pulse" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Monitoring rows */}
              <div className="divide-y divide-border/40">
                {mockThreatItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-foreground/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.dot} shrink-0`} />
                      <span className="text-sm text-foreground/65">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-primary/60 px-2.5 py-1 rounded bg-primary/5 tracking-wider uppercase">
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DATA SOVEREIGNTY
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
              "{t("sovereignty", "title")}"
            </blockquote>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("sovereignty", "desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <DataSovereigntyBadge />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          REGIONAL PRESENCE
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              Regional Data Centers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Local Infrastructure, Global Coverage
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubs.map((hub, i) => (
              <motion.div
                key={hub.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card-hover rounded-3xl bg-[hsl(var(--surface-card))] p-8"
              >
                <div className="text-3xl mb-4">{hub.emoji}</div>
                <h3 className="text-sm font-semibold text-primary mb-1">
                  {t("contact", hub.labelKey)}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {hub.detail}
                </div>
                <div className="h-px bg-foreground/6 mb-5" />
                <ul className="space-y-2">
                  {hub.markets.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA — enhanced
      ═══════════════════════════════════════ */}
      <section className="section-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[hsl(var(--surface-card))] p-12 md:p-16 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h2 className="relative text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("services", "cta_title")}
            </h2>
            <p className="relative text-sm text-muted-foreground max-w-lg mx-auto mb-8">
              {t("services", "intro")}
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center gap-2 bg-primary text-primary-foreground
                  font-semibold text-sm px-8 py-3.5 rounded-full
                  hover:bg-primary/90 transition-colors"
              >
                {t("services", "cta_btn")}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
