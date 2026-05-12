import { useRef } from "react";
import { Camera, ArrowLeft, ArrowRight, Plus, DoorOpen, Network, ShieldCheck, Monitor, Sun, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealTitle,
  CardCurtain,
  CardCurtainRevealDescription,
} from "@/components/ui/card-curtain-reveal";

import dahuaImg from "/assets/partners/dahua.png";
import leelenImg from "/assets/partners/leelen.png";
import witekImg from "/assets/partners/witek.png";
import qaxImg from "/assets/partners/qax.png";
import maxhubImg from "/assets/partners/maxhub.png";
import lamproImg from "/assets/partners/lampro.png";
import teldImg from "/assets/partners/teld.png";

const distributionPartners = [
  {
    name: "Dahua Technology",
    category: "Video Surveillance",
    description: "Enterprise-grade AI cameras, NVRs, and intelligent video analytics for comprehensive security coverage.",
    url: "https://www.dahuasecurity.com",
    image: dahuaImg,
    icon: Camera,
  },
  {
    name: "Leelen Technology",
    category: "Smart Intercom",
    description: "Intelligent video intercom systems and smart access control for residential and commercial properties.",
    url: "https://www.leelen.com",
    image: leelenImg,
    icon: DoorOpen,
  },
  {
    name: "Witek & Wiking",
    category: "Network Infrastructure",
    description: "Industrial-grade networking equipment, PoE switches, and fiber optic solutions for enterprise deployments.",
    url: "https://www.wireless-tek.com",
    image: witekImg,
    icon: Network,
  },
  {
    name: "QAX",
    category: "Cyber Security",
    description: "Next-generation threat detection, SOC platforms, and enterprise-level cybersecurity defense systems.",
    url: "https://www.qianxin.com",
    image: qaxImg,
    icon: ShieldCheck,
  },
  {
    name: "Maxhub",
    category: "Smart Displays",
    description: "Interactive flat panels, video conferencing systems, and digital signage for modern workplaces.",
    url: "https://www.maxhub.com",
    image: maxhubImg,
    icon: Monitor,
  },
  {
    name: "Lampro",
    category: "LED & Lighting",
    description: "Professional LED display panels, smart lighting solutions, and large-format digital signage systems.",
    url: "https://www.lampro.net",
    image: lamproImg,
    icon: Sun,
  },
  {
    name: "Teld",
    category: "EV Charging",
    description: "Smart electric vehicle charging stations and energy management platforms for sustainable infrastructure.",
    url: "https://www.teld.cn",
    image: teldImg,
    icon: Zap,
  },
];

const Products = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.clientWidth || 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          HERO — static text only
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[52vh] md:min-h-[60vh] flex items-center justify-center bg-background pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_70%,hsl(var(--primary)/0.05),transparent_70%)]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4 md:mb-5">
            Guarded Technology
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-foreground tracking-tight leading-[1.08] mb-5 md:mb-6">
            {t("products", "hero_title")}
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("products", "hero_subtitle")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DISTRIBUTION PARTNERS — Apple-style carousel
      ═══════════════════════════════════════ */}
      <section className="section-alt">
        {/* Title stays inside container */}
        <div className="section-container mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-3">
            {t("products", "dist_title")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            {t("products", "dist_subtitle")}
          </p>
        </div>

        {/* Carousel track — 100% in padding refers to section width (= viewport width) */}
        <div className="py-8 md:py-16" style={{ overflowX: "clip", overflowY: "visible" }}>
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingLeft: "max(20px, calc((100vw - 1152px) / 2 + 24px))",
              paddingRight: "max(20px, calc((100vw - 1152px) / 2 + 24px))",
              scrollPaddingLeft: "max(20px, calc((100vw - 1152px) / 2 + 24px))",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
          {distributionPartners.map((partner) => (
            <CardCurtainReveal
              key={partner.name}
              className="flex-shrink-0 snap-start w-[280px] md:w-[320px] h-[420px] rounded-3xl z-0 hover:z-50 bg-[hsl(var(--surface-card))] shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            >
              <CardCurtainRevealBody className="flex flex-col items-center justify-center h-full text-center">
                <partner.icon className="mb-4 h-10 w-10 text-primary" />
                <CardCurtainRevealTitle className="text-xl font-bold text-foreground">
                  {partner.name}
                </CardCurtainRevealTitle>
              </CardCurtainRevealBody>

              <CardCurtain />

              <CardCurtainRevealDescription className="p-8 flex flex-col h-full">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {partner.category}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-2 leading-tight">
                  {partner.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed line-clamp-3">
                  {partner.description}
                </p>
                <div className="mt-auto flex items-center justify-center pt-4">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    loading="lazy"
                    className="w-full h-48 object-contain drop-shadow-lg"
                  />
                </div>
                {partner.url !== "#" && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-5 end-5 w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label={`Visit ${partner.name}`}
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </a>
                )}
              </CardCurtainRevealDescription>
            </CardCurtainReveal>
          ))}
          </div>
        </div>

        {/* Arrows aligned to container right edge */}
        <div className="section-container">
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border border-foreground/15 bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border border-foreground/15 bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
