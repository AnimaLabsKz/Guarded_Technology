import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();

  return (
    <footer className="bg-[hsl(var(--footer-bg))]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src={resolvedTheme === "light" ? "/assets/logo_white.jpg" : "/assets/logo.jpg"}
              alt="Guarded Technology"
              className="h-8 w-auto object-contain"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer", "tagline")}</p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.linkedin.com/company/guarded-technology" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Business Lines */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{t("footer", "business_lines")}</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("footer", "ft_distribution")}</Link></li>
              <li><Link to="/guarded-products" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("footer", "ft_hardware")}</Link></li>
              <li><Link to="/solutions" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("footer", "ft_services")}</Link></li>
              <li><Link to="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("footer", "ft_cyber")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{t("footer", "company")}</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("nav", "about")}</Link></li>
              <li><Link to="/projects" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("nav", "projects")}</Link></li>
              <li><Link to="/news" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("nav", "news")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{t("footer", "support")}</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("nav", "contact")}</Link></li>
              <li><Link to="/downloads" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("nav", "downloads")}</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("footer", "partner_apps")}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(var(--footer-bg))] border-t border-border/20">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row h-auto sm:h-14 items-center justify-between py-4 sm:py-0 gap-2">
          <p className="text-xs text-muted-foreground">{t("footer", "copyright")}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/50">
              Developed by{" "}
              <a href="https://animalabs.kz" target="_blank" rel="noopener noreferrer"
                className="hover:text-primary transition-colors">
                animalabs.kz
              </a>
            </span>
            <Link to="/contact" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">{t("footer", "privacy")}</Link>
            <Link to="/contact" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">{t("footer", "terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
