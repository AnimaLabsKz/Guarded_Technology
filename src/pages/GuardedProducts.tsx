import { useLanguage } from "@/contexts/LanguageContext";
import { ProductScrollHero, ProductCategory } from "@/components/ui/product-scroll-hero";

const GuardedProducts = () => {
  const { t } = useLanguage();

  const categories: ProductCategory[] = [
    {
      tag: t("products", "ipc_tag"),
      title: t("products", "ipc_title"),
      desc: t("products", "ipc_desc"),
      pdf: "/assets/Guarded%20IPC%20Cameras.200126.pdf",
      products: [
        { model: "GT-IPC-T24-IL(U)", image: "/assets/products/ipc/GT-IPC-T24-IL(U).png" },
        { model: "GT-IPC-T26-L-X",   image: "/assets/products/ipc/GT-IPC-T26-L-X.png" },
        { model: "GT-IPC-B25-IL",    image: "/assets/products/ipc/GT-IPC-B25-IL.png" },
        { model: "GT-IPC-B28-L-X",   image: "/assets/products/ipc/GT-IPC-B28-L-X.png" },
        { model: "GT-IPC-B38-IL(E)", image: "/assets/products/ipc/GT-IPC-B38-IL(E).png" },
        { model: "GT-IPC-B38-ZIL",   image: "/assets/products/ipc/GT-IPC-B38-ZIL.png" },
      ],
    },
    {
      tag: t("products", "solar_cam_tag"),
      title: t("products", "solar_cam_title"),
      desc: t("products", "solar_cam_desc"),
      pdf: "/assets/Guarded%20Solar%20Cameras.291225.pdf",
      products: [
        { model: "GT-CS5 · 4G · 4G-SA", image: "/assets/products/solar/GT-CS5.png" },
        { model: "GT-AOV04-4G",   image: "/assets/products/solar/GT-AOV04-4G.png" },
        { model: "GT-4GS20L-20X", image: "/assets/products/solar/GT-4GS20L-20X.png" },
        { model: "GT-WS20L-20X",  image: "/assets/products/solar/GT-WS20L-20X.png" },
        { model: "GT-WS22",       image: "/assets/products/solar/GT-WS22.png" },
      ],
    },
    {
      tag: t("products", "smart_lock_tag"),
      title: t("products", "smart_lock_title"),
      desc: t("products", "smart_lock_desc"),
      pdf: "/assets/Guarded-AI-Smart-L8.pdf",
      products: [
        { model: "AI Smart L8", image: "/assets/products/smart-lock/cgi-smart-lock.png" },
      ],
    },
    {
      tag: t("products", "nvr_tag"),
      title: t("products", "nvr_title"),
      desc: t("products", "nvr_desc"),
      products: [
        { model: "GT-NVR2108-8P", image: "/assets/products/nvr/GT-NVR2108-8P.png" },
        { model: "GT-NVR3216P",   image: "/assets/products/nvr/GT-NVR3216P.png" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ProductScrollHero
        categories={categories}
        header={t("products", "hw_title")}
        showScrollHint={false}
      />
    </div>
  );
};

export default GuardedProducts;
