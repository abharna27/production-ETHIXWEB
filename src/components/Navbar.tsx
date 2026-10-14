import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { BRAND } from "../content/landing";
import { InspectorTarget } from "./InspectorTarget";
import { triggerProjectTransition } from "./PageCurtain";

const ArchitecturalMenu = lazy(() =>
  import("./ArchitecturalMenu").then((m) => ({ default: m.ArchitecturalMenu }))
);

interface NavbarProps {
  xray: boolean;
  toggleXray: () => void;
  activeSection?: string;
}

export function Navbar({ xray, toggleXray, activeSection = "Intro" }: NavbarProps) {
  const [isTop, setIsTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [origin, setOrigin] = useState({ x: 0, y: 0, radius: 2500 });
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Measure origin for the circular clipPath reveal
  const updateOrigin = () => {
    const btn = hamburgerRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      const maxDist = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      setOrigin({
        x,
        y,
        radius: Math.ceil(maxDist * 1.15),
      });
    } else {
      const x = window.innerWidth - 48;
      const y = 36;
      const maxDist = Math.hypot(window.innerWidth, window.innerHeight);
      setOrigin({
        x,
        y,
        radius: Math.ceil(maxDist * 1.15),
      });
    }
  };

  const playClickSound = () => {
    if (!soundOn) return;
    try {
      const audio = new Audio("/click-sound-effects-copyright-free_NBeVl5YB.mp3");
      audio.volume = 0.12;
      audio.play().catch(() => {});
    } catch {}
  };

  const handleOpenMenu = () => {
    updateOrigin();
    playClickSound();
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    playClickSound();
    setMenuOpen(false);
  };

  // Lock body scroll while menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Handle scroll detection for navbar conversion
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 24) {
        setIsTop(true);
        setIsVisible(true);
      } else {
        setIsTop(false);

        if (delta > 5 && currentScrollY > 140) {
          setIsVisible(false);
        } else if (delta < -3) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-[var(--ease-lens)] pointer-events-none ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 transition-all duration-300 ${
            isTop ? "py-6" : "py-3"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left Section: Wordmark + Sound Indicator (Converts to pill on scroll) */}
            <div
              className={`flex items-center gap-2 transition-all duration-300 pointer-events-auto ${
                isTop
                  ? "bg-transparent p-0"
                  : "rounded-full border border-line bg-white/95 dark:bg-[#141416]/95 px-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-md"
              }`}
            >
              <InspectorTarget tag="Brand" magneticFactor={0.12}>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-ink select-none font-display group"
                  aria-label="Ethixweb home"
                >
                  <img
                    src="/emblem.webp"
                    alt="Ethixweb logo"
                    className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    width={24}
                    height={27}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="flex items-center">
                    <span>{BRAND.name}</span>
                    <span className="text-accent ml-0.5">.</span>
                  </span>
                </Link>
              </InspectorTarget>

              {/* Minimal inline sound wave indicator */}
              <button
                type="button"
                onClick={() => setSoundOn(!soundOn)}
                title={soundOn ? "Ambient pulse on" : "Ambient pulse off"}
                aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
                className="flex items-center justify-center h-7 w-7 text-ink/70 hover:text-ink transition-colors cursor-pointer"
              >
                <span className={`sound-bars ${soundOn ? "is-on" : ""}`} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </div>

            {/* Center Desktop Navigation Links & Chapter Readout */}
            <div className="hidden md:flex items-center gap-6 font-mono text-[11px] pointer-events-auto">
              <Link
                to="/services"
                className={`transition-colors uppercase tracking-wider ${
                  location.pathname === "/services" ? "text-accent font-semibold" : "text-steel hover:text-ink"
                }`}
              >
                Services
              </Link>
              <Link
                to="/about"
                className={`transition-colors uppercase tracking-wider ${
                  location.pathname === "/about" ? "text-accent font-semibold" : "text-steel hover:text-ink"
                }`}
              >
                About (India)
              </Link>
              <Link
                to="/contact"
                className={`transition-colors uppercase tracking-wider ${
                  location.pathname === "/contact" ? "text-accent font-semibold" : "text-steel hover:text-ink"
                }`}
              >
                Contact
              </Link>
              <Link
                to="/admin"
                className={`transition-colors uppercase tracking-wider ${
                  location.pathname === "/admin" ? "text-accent font-semibold" : "text-steel/70 hover:text-accent"
                }`}
              >
                Admin
              </Link>
              {!isTop && (
                <div
                  aria-hidden="true"
                  className="hidden xl:flex items-center gap-3 font-mono text-[11px] text-steel/80 pointer-events-none select-none transition-opacity duration-300 ml-2"
                >
                  <span className="w-8 h-[1px] bg-line/80" />
                  <span>{activeSection}</span>
                </div>
              )}
            </div>

            {/* Right Section: X-ray, Start a project, Hamburger Menu (Converts to pill on scroll) */}
            <div
              className={`flex items-center gap-4 sm:gap-6 transition-all duration-300 pointer-events-auto ${
                isTop
                  ? "bg-transparent p-0"
                  : "rounded-full border border-line bg-white/95 dark:bg-[#141416]/95 px-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-md"
              }`}
            >
              {/* X-Ray Mode Toggle */}
              <InspectorTarget tag="Button" magneticFactor={0.14}>
                <button
                  id="navbar-xray-btn"
                  type="button"
                  onClick={toggleXray}
                  title="Toggle architectural X-ray"
                  aria-label="Toggle architectural blueprint X-ray mode"
                  aria-pressed={xray}
                  className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-tight transition-colors cursor-pointer ${
                    xray
                      ? "text-accent font-semibold"
                      : "text-ink/80 hover:text-ink"
                  }`}
                >
                  <Search className={`h-3.5 w-3.5 ${xray ? "text-accent stroke-[2.5]" : "text-ink/70"}`} />
                  <span>X-ray</span>
                  {xray && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </button>
              </InspectorTarget>

              {/* Start a project clean link */}
              <InspectorTarget tag="Button" magneticFactor={0.14}>
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname === "/" || location.pathname === "") {
                      triggerProjectTransition(e.currentTarget);
                    } else {
                      navigate("/contact");
                    }
                  }}
                  className="hidden sm:inline-block text-xs sm:text-sm font-medium tracking-tight text-ink hover:text-accent transition-colors"
                >
                  Start a project
                </a>
              </InspectorTarget>

              {/* Circular Hamburger / Trigger */}
              <InspectorTarget tag="Button" magneticFactor={0.18}>
                <button
                  id="navbar-hamburger-btn"
                  ref={hamburgerRef}
                  type="button"
                  onClick={handleOpenMenu}
                  aria-expanded={menuOpen}
                  aria-label="Open navigation menu"
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-200 hover:scale-105 cursor-pointer shadow-xs"
                >
                  <div className="flex flex-col gap-[3.5px] items-center justify-center w-3.5" aria-hidden="true">
                    <span className="block h-[1.5px] w-3.5 bg-paper rounded-full transition-all" />
                    <span className="block h-[1.5px] w-3.5 bg-paper rounded-full transition-all" />
                  </div>
                </button>
              </InspectorTarget>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Menu (Dynamically Loaded on Demand) */}
      <Suspense fallback={null}>
        {menuOpen && (
          <ArchitecturalMenu
            isOpen={menuOpen}
            onClose={handleCloseMenu}
            origin={origin}
            xray={xray}
            toggleXray={toggleXray}
            soundOn={soundOn}
            setSoundOn={setSoundOn}
          />
        )}
      </Suspense>
    </>
  );
}
