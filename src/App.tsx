import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Rulers } from "./components/Rulers";
import { PageCurtain } from "./components/PageCurtain";
import { HomePage } from "./pages/HomePage";

const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const AboutIndiaPage = lazy(() => import("./pages/AboutIndiaPage").then((m) => ({ default: m.AboutIndiaPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const AdminPage = lazy(() => import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })));

function PageFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [xray, setXray] = useState(false);
  const [activeSection, setActiveSection] = useState("Intro");
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (xray) {
      root.setAttribute("data-theme", "dark");
      root.classList.add("xray");
    } else {
      root.removeAttribute("data-theme");
      root.classList.remove("xray");
    }
  }, [xray]);

  useEffect(() => {
    if (location.pathname === "/services") {
      setActiveSection("Services");
      return;
    }
    if (location.pathname === "/about") {
      setActiveSection("India Story");
      return;
    }
    if (location.pathname === "/contact") {
      setActiveSection("Contact");
      return;
    }
    if (location.pathname === "/admin") {
      setActiveSection("Admin CRM");
      return;
    }

    const sections = [
      { id: "overview", label: "Intro" },
      { id: "the-build", label: "The Build" },
      { id: "services", label: "Services" },
      { id: "work", label: "Work" },
      { id: "network", label: "Network" },
      { id: "reviews", label: "Reviews" },
      { id: "faq", label: "FAQ" },
      { id: "cta", label: "Contact" },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-paper text-ink transition-colors duration-300 ${xray ? "outline-dashed outline-1 outline-accent" : ""}`}>
      <ScrollToTop />

      {/* Dual Vertical Measuring Scales on both sides + Scroll Red Dot Indicator */}
      <Rulers activeSection={activeSection} />

      {/* X-Ray Indicator Floating Banner */}
      {xray && (
        <div className="fixed bottom-4 left-6 z-50 rounded-full border border-accent bg-paper px-4 py-1.5 text-xs font-mono text-accent shadow-lg flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
          <span>X-RAY BLUEPRINT ACTIVE // ARCHITECTURAL GUIDES VISIBLE</span>
        </div>
      )}

      {/* Clean Navigation */}
      <Navbar
        xray={xray}
        toggleXray={() => setXray(!xray)}
        activeSection={activeSection}
      />

      {/* Circular Expanding/Shrinking Dot Curtain for Start a Project Transitions */}
      <PageCurtain />

      {/* Main Content Sections via Router */}
      <main id="main-content">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutIndiaPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
