import Navbar from "./Navbar";
import Footer from "./Footer";
import { FloatingContact } from "./ui/floating-contact";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Layout;
