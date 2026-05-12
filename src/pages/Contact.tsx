import { useState } from "react";
import { GlobePulse } from "@/components/ui/cobe-globe-pulse";
import { Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function Contact() {
  const { t, lang } = useLanguage();
  const waNumber = (lang === "ru" || lang === "kk") ? "77477190996" : "971542812578";
  const waDisplay = (lang === "ru" || lang === "kk") ? "+7 747 719 0996" : "+971 54 281 2578";
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({ name: "", company: "", email: "", type: "Products", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const text = `🚨 New Guarded B2B Inquiry:\n\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nType: ${formData.type}\nMessage: ${formData.message}`;
    try {
      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
      }
      toast.success(t("contact", "success_msg"));
      setFormData({ name: "", company: "", email: "", type: "Products", message: "" });
    } catch {
      toast.error("Failed to send message. Please try WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT COLUMN */}
        <section className="section-dark flex flex-col justify-center !py-10 lg:!py-16 px-5 sm:px-8 lg:px-16">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t("contact", "global_net")}
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">
              {t("contact", "subtitle")}
            </p>
          </div>
          <div className="w-full max-w-md mx-auto">
            <GlobePulse />
          </div>

          {/* Branch Addresses */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: t("contact", "hub_me"), city: t("contact", "city_me"), detail: "8F22, 1st Floor, JAFZA 8, JAFZA, Dubai, UAE" },
              { label: t("contact", "hub_ca"), city: t("contact", "city_ca"), detail: "Prospect Raiymbekа 212A, Almaty, Kazakhstan" },
            ].map((hub) => (
              <div key={hub.label} className="card-hover bg-[hsl(var(--surface-card))] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="text-primary w-4 h-4" />
                  <h4 className="text-foreground font-semibold text-sm">{hub.label}</h4>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{hub.detail}<br />{hub.city}</p>
              </div>
            ))}
          </div>

          {/* Map Embed */}
          <div className="mt-8 rounded-2xl overflow-hidden">
            <iframe
              title="Guarded Technology Office Locations"
              src="https://maps.google.com/maps?q=Проспект+Райымбека+212А,+Алматы,+Казахстан&output=embed"
              width="100%"
              height="200"
              style={{ border: 0, filter: resolvedTheme === "dark" ? "invert(90%) hue-rotate(180deg)" : "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <section className="section-alt relative flex flex-col justify-center !py-10 lg:!py-16 px-5 sm:px-8 lg:px-16">
          <div className="relative z-10 max-w-lg w-full">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{t("contact", "title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t("contact", "subtitle")}</p>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 md:mb-10">
              <a href="mailto:hello@guardedtech.com" className="group bg-[hsl(var(--surface-card))] hover:bg-primary/10 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-xs font-medium text-foreground">hello@guardedtech.com</p>
                  </div>
                </div>
              </a>
              <a href="tel:+77477190996" className="group bg-[hsl(var(--surface-card))] hover:bg-primary/10 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-xs font-medium text-foreground">+7 747 719 09 96</p>
                  </div>
                </div>
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[hsl(var(--surface-card))] hover:bg-[#25D366]/10 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <WhatsAppIcon size={16} className="text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="text-xs font-medium text-foreground">{waDisplay}</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">{t("contact", "name")}</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[hsl(var(--surface-input))] border border-[hsl(var(--border-input))] rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-[hsl(var(--surface-elevated))] transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">{t("contact", "company")}</label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[hsl(var(--surface-input))] border border-[hsl(var(--border-input))] rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-[hsl(var(--surface-elevated))] transition-colors"
                    placeholder="Company"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">{t("contact", "email")}</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--surface-input))] border border-[hsl(var(--border-input))] rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-[hsl(var(--surface-elevated))] transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">{t("contact", "inquiry")}</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--surface-input))] border border-[hsl(var(--border-input))] rounded-lg px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:bg-[hsl(var(--surface-elevated))] transition-colors"
                >
                  <option value="Products">{t("contact", "opt_products")}</option>
                  <option value="Solutions">{t("contact", "opt_solutions")}</option>
                  <option value="Cyber Security">{t("contact", "opt_cyber")}</option>
                  <option value="Partnership">{t("contact", "opt_partnership")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">{t("contact", "message")}</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[hsl(var(--surface-input))] border border-[hsl(var(--border-input))] rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-[hsl(var(--surface-elevated))] transition-colors resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-6 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-2xl hover:bg-primary/85 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    {t("contact", "sending")}
                  </>
                ) : (
                  t("contact", "submit")
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
