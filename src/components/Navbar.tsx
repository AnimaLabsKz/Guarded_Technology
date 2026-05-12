import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, ChevronRight, Phone, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, langCodes, type Lang } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Mega-menu structure ─── */
interface SubItem {
  labelKey: string;
  section: string; // translation section
  path: string;
}

interface NavItem {
  key: string;
  path: string;
  children?: { heading?: string; headingKey?: string; headingSection?: string; items: SubItem[] }[];
}

const navItems: NavItem[] = [
  { key: "home", path: "/" },
  {
    key: "about",
    path: "/about",
    children: [
      {
        headingKey: "explore_about",
        headingSection: "nav",
        items: [
          { labelKey: "mission_title", section: "about", path: "/about" },
          { labelKey: "vision_title", section: "about", path: "/about" },
          { labelKey: "journey_title", section: "about", path: "/about" },
          { labelKey: "cert_title", section: "about", path: "/about" },
        ],
      },
    ],
  },
  {
    key: "distribution",
    path: "/products",
  },
  {
    key: "products",
    path: "/guarded-products",
    children: [
      {
        headingKey: "hw_title",
        headingSection: "products",
        items: [
          { labelKey: "ipc_title", section: "products", path: "/guarded-products" },
          { labelKey: "solar_cam_title", section: "products", path: "/guarded-products" },
          { labelKey: "smart_lock_title", section: "products", path: "/guarded-products" },
        ],
      },
    ],
  },
  {
    key: "solutions",
    path: "/solutions",
    children: [
      {
        headingKey: "explore_solutions",
        headingSection: "nav",
        items: [
          { labelKey: "cctv_title", section: "solutions", path: "/solutions" },
          { labelKey: "living_title", section: "solutions", path: "/solutions" },
          { labelKey: "energy_title", section: "solutions", path: "/solutions" },
        ],
      },
    ],
  },
  {
    key: "services",
    path: "/services",
    children: [
      {
        headingKey: "explore_services",
        headingSection: "nav",
        items: [
          { labelKey: "feat1_title", section: "services", path: "/services" },
          { labelKey: "feat2_title", section: "services", path: "/services" },
          { labelKey: "feat3_title", section: "services", path: "/services" },
        ],
      },
    ],
  },
  {
    key: "projects",
    path: "/projects",
    children: [
      {
        headingKey: "explore_projects",
        headingSection: "nav",
        items: [
          { labelKey: "title1", section: "projects", path: "/projects" },
          { labelKey: "title2", section: "projects", path: "/projects" },
          { labelKey: "title3", section: "projects", path: "/projects" },
        ],
      },
    ],
  },
  { key: "downloads", path: "/downloads" },
  { key: "news", path: "/news" },
  { key: "contact", path: "/contact" },
];

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "kk", label: "Қазақша" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = useCallback((key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const currentItem = navItems.find((n) => n.key === activeMenu);
  const hasChildren = currentItem?.children && currentItem.children.length > 0;

  return (
    <>
      <nav
        ref={navRef}
        className="relative z-50 bg-[hsl(var(--nav-bg))] backdrop-blur-2xl"
        onMouseLeave={handleMouseLeave}
      >
        {/* Main bar */}
        <div className="container flex h-11 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={resolvedTheme === "light" ? "/assets/logo_white.jpg" : "/assets/logo.jpg"}
              alt="Guarded Technology"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-xs font-medium transition-colors py-3 ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onMouseEnter={() =>
                  item.children ? handleMouseEnter(item.key) : setActiveMenu(null)
                }
              >
                {t("nav", item.key)}
              </Link>
            ))}
          </div>

          {/* Right: language + theme + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs text-muted-foreground hover:text-foreground h-7 px-2"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {langCodes[lang]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((l) => (
                  <DropdownMenuItem key={l.code} onClick={() => setLang(l.code)}>
                    {langCodes[l.code]} — {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </Button>

            <Link to="/contact">
              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <Phone className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile controls: lang + theme + hamburger (hamburger on the far right) */}
          <div className="flex items-center gap-1 lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs text-muted-foreground hover:text-foreground h-7 px-2"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {langCodes[lang]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((l) => (
                  <DropdownMenuItem key={l.code} onClick={() => setLang(l.code)}>
                    {langCodes[l.code]} — {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </Button>

            <button
              className="text-foreground p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega menu panel (Desktop) */}
        <AnimatePresence>
          {hasChildren && activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block absolute left-0 right-0 top-full overflow-hidden bg-[hsl(var(--nav-bg))]"
              onMouseEnter={handlePanelEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container py-8 px-16 lg:px-24">
                <div className="grid grid-cols-4 gap-10">
                  {currentItem!.children!.map((col, ci) => (
                    <div key={ci}>
                      {col.headingKey && (
                        <h3 className="text-xs font-medium text-muted-foreground mb-5 uppercase tracking-wider">
                          {t(col.headingSection || "nav", col.headingKey)}
                        </h3>
                      )}
                      <ul className={ci === 0 ? "space-y-2" : "space-y-3"}>
                        {col.items.map((sub, si) => (
                          <li key={si}>
                            <Link
                              to={sub.path}
                              className={cn(
                                "block transition-colors hover:text-foreground",
                                ci === 0
                                  ? "text-base font-semibold text-foreground/90"
                                  : "text-sm font-medium text-foreground/70"
                              )}
                              onClick={() => setActiveMenu(null)}
                            >
                              {t(sub.section, sub.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop overlay when mega menu is open */}
      <AnimatePresence>
        {hasChildren && activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm hidden lg:block"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-11 z-50 bg-[hsl(var(--nav-bg))] lg:hidden overflow-y-auto"
          >
            <div className="container py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.key}>
                  {item.children ? (
                    <>
                      <button
                        className={`flex w-full items-center justify-between py-3 text-sm font-medium transition-colors ${
                          location.pathname === item.path
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.key ? null : item.key
                          )
                        }
                      >
                        {t("nav", item.key)}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            mobileExpanded === item.key ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-3 space-y-4">
                              {item.children!.map((col, ci) => (
                                <div key={ci}>
                                  {col.headingKey && (
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                      {t(col.headingSection || "nav", col.headingKey)}
                                    </p>
                                  )}
                                  {col.items.map((sub, si) => (
                                    <Link
                                      key={si}
                                      to={sub.path}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-2 py-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                      <ChevronRight className="h-3 w-3 text-primary" />
                                      {t(sub.section, sub.labelKey)}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {t("nav", item.key)}
                    </Link>
                  )}
                </div>
              ))}

              <div className="flex items-center pt-4 mt-4 border-t border-border/30">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="font-semibold rounded-full">
                    {t("nav", "cta")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
