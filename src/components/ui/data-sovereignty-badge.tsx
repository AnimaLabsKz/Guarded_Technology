import { ShieldCheck, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function DataSovereigntyBadge() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-card border border-primary/30 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 blur-3xl rounded-full pointer-events-none" />
      <div className="bg-muted p-4 rounded-full border border-border">
        <Server className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
          {t("sovereignty", "title")}
          <ShieldCheck className="w-5 h-5 text-green-500" />
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
          {t("sovereignty", "desc")}
        </p>
      </div>
    </div>
  );
}
