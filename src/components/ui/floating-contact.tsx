import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon, TelegramIcon } from "./brand-icons";
import { useLanguage } from "@/contexts/LanguageContext";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const waNumber = (lang === "ru" || lang === "kk") ? "77477190996" : "971542812578";

  return (
    <>
      {/* Mobile edge toggle — pinned to right edge, small rounded-left tab */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "md:hidden fixed bottom-6 right-0 z-50 flex h-11 w-7 items-center justify-center",
          "rounded-l-xl bg-foreground/90 text-background shadow-lg",
          "transition-transform duration-300"
        )}
        aria-label={open ? "Hide contacts" : "Show contacts"}
      >
        <ChevronLeft
          className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {/* Contact buttons */}
      <div
        className={cn(
          "fixed bottom-6 z-50 flex flex-col gap-3 transition-transform duration-300 ease-out",
          // mobile: sits to the left of the arrow tab, slides off-screen when closed
          "right-9 md:right-6",
          "md:!translate-x-0",
          open ? "translate-x-0" : "translate-x-[calc(100%+2.5rem)]"
        )}
      >
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-[#25D366]/40"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon size={22} />
        </a>

        <a
          href="https://t.me/guarded_sales"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-[#229ED9]/40"
          aria-label="Telegram"
        >
          <TelegramIcon size={20} />
        </a>
      </div>
    </>
  );
}
