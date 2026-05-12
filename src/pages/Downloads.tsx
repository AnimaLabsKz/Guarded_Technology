import { Camera, Sun, Monitor, Phone, Presentation, Shield, Battery, Download, Plug, Video, Network, ExternalLink, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

type DownloadItem = {
  titleKey: string;
  icon: LucideIcon;
  href?: string;
  accent?: string;
  comingSoon?: boolean;
  isWebsite?: boolean;
};

const guardedFiles: DownloadItem[] = [
  { titleKey: "dl_ipc", icon: Camera, accent: "primary", href: "/assets/Guarded%20IPC%20Cameras.200126.pdf" },
  { titleKey: "dl_solar", icon: Sun, accent: "primary", href: "/assets/Guarded%20Solar%20Cameras.291225.pdf" },
];

const partnerFiles: DownloadItem[] = [
  { titleKey: "dl_dahua", icon: Video, href: "https://www.dahuasecurity.com", isWebsite: true },
  { titleKey: "dl_witek", icon: Network, href: "https://www.wireless-tek.com", isWebsite: true },
  { titleKey: "dl_lampro", icon: Monitor, href: "/assets/LAMPRO-Typical%20Fixed%20Solutions%20Catalog%20(2).pdf" },
  { titleKey: "dl_leelen", icon: Phone, href: "/assets/LEELEN%20Prodcuts%20Catalog.pdf" },
  { titleKey: "dl_maxhub", icon: Presentation, href: "/assets/MAXHUB%20Company%20Intro_20250414.pdf" },
  { titleKey: "dl_qax", icon: Shield, href: "/assets/QAX%20Company%20Introduction%20PPT%20(1).pdf" },
  { titleKey: "dl_teld", icon: Plug, href: "https://www.teld.cn", isWebsite: true },
  { titleKey: "dl_voltis", icon: Battery, href: "/assets/Voltis%20Online%20UPS%20Catalogue.pdf" },
];

const Downloads = () => {
  const { t } = useLanguage();

  const renderCard = (item: DownloadItem, _isGuarded: boolean, index: number) => {
    const isComingSoon = item.comingSoon;
    const isWebsite = item.isWebsite;
    return (
      <motion.div
        key={item.titleKey}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
      >
        <a
          href={isComingSoon ? undefined : item.href}
          download={isWebsite || isComingSoon ? undefined : true}
          target={isComingSoon ? undefined : "_blank"}
          rel={isComingSoon ? undefined : "noopener noreferrer"}
          className={`group flex flex-col justify-between rounded-3xl bg-[hsl(var(--surface-card))] p-6 h-full ${isComingSoon ? "opacity-60 cursor-default" : "card-hover"}`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
              <item.icon className="text-primary" size={24} />
            </div>
            <div className="pt-1">
              <h3 className="text-sm font-semibold text-foreground leading-snug">
                {t("downloads", item.titleKey)}
              </h3>
              {isComingSoon && (
                <Badge variant="outline" className="mt-1.5 text-[10px] border-muted-foreground/30 text-muted-foreground">
                  {t("downloads", "coming_soon")}
                </Badge>
              )}
            </div>
          </div>
          {!isComingSoon && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-muted-foreground/30 text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors"
            >
              {isWebsite ? (
                <>
                  <ExternalLink className="ltr:mr-2 rtl:ml-2" size={14} />
                  {t("downloads", "visit_website")}
                </>
              ) : (
                <>
                  <Download className="ltr:mr-2 rtl:ml-2" size={14} />
                  {t("downloads", "download_pdf")}
                </>
              )}
            </Button>
          )}
        </a>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="section-dark pt-24">
        <div className="section-container text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.05),transparent_70%)]" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative z-10">
            {t("downloads", "title")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto relative z-10">
            {t("downloads", "subtitle")}
          </p>
        </div>
      </section>

      {/* Guarded Hardware */}
      <section className="section-alt">
        <div className="section-container">
          <h2 className="text-xl font-bold text-foreground mb-6">
            {t("downloads", "section_guarded")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guardedFiles.map((f, i) => renderCard(f, true, i))}
          </div>
        </div>
      </section>

      {/* Distribution Partners */}
      <section className="section-dark">
        <div className="section-container">
          <h2 className="text-xl font-bold text-foreground mb-6">
            {t("downloads", "section_partners")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerFiles.map((f, i) => renderCard(f, false, i))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
