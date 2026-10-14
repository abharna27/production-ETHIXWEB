import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND } from "../content/landing";
import { triggerProjectTransition } from "./PageCurtain";

interface MenuItem {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  image: string;
  caption: string;
  tag: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "services",
    label: "Services",
    subtitle: "22 capabilities & pricing",
    href: "/services",
    image: "/images/case-studies/garys-pipeline/showcase-devices-1024w.webp",
    caption: "Full-stack digital operations, AI workflows & transparent pricing",
    tag: "Services & Pricing",
  },
  {
    id: "about",
    label: "About (India)",
    subtitle: "US to India story",
    href: "/about",
    image: "/images/case-studies/all-phase-plumbing/spotlight-homeowner-framed-1024w.webp",
    caption: "Seattle craft + Bangalore scale: 24/7 continuous engineering",
    tag: "India Expansion",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Direct enquiry desk",
    href: "/contact",
    image: "/images/case-studies/all-phase-plumbing/hero-1024w.webp",
    caption: "Live consultation desk connected to Neon DB & Calendly",
    tag: "Get in touch",
  },
  {
    id: "work",
    label: "Work",
    subtitle: "4 projects",
    href: "/#work",
    image: "/images/case-studies/all-phase-plumbing/after-screenshot-1024w.webp",
    caption: "Ethixweb Projects and case studies",
    tag: "Case Studies",
  },
  {
    id: "process",
    label: "Process",
    subtitle: "8 phase process",
    href: "/#the-build",
    image: "/images/case-studies/all-phase-plumbing/devices-mockup-cutout-1024w.webp",
    caption: "Phase-gated architectural execution & delivery",
    tag: "8 phases",
  },
  {
    id: "admin",
    label: "Admin CRM",
    subtitle: "Protected leads portal",
    href: "/admin",
    image: "/images/case-studies/garys-pipeline/spotlight-chat-assistant-1024w.webp",
    caption: "Live database leads management & telemetry",
    tag: "Protected CRM",
  },
];

interface ArchitecturalMenuProps {
  isOpen: boolean;
  onClose: () => void;
  origin: { x: number; y: number; radius: number };
  xray: boolean;
  toggleXray: () => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
}

export function ArchitecturalMenu({
  isOpen,
  onClose,
  origin,
  xray,
  toggleXray,
  soundOn,
  setSoundOn,
}: ArchitecturalMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const playClickSound = () => {
    if (!soundOn) return;
    try {
      const audio = new Audio("/click-sound-effects-copyright-free_NBeVl5YB.mp3");
      audio.volume = 0.12;
      audio.play().catch(() => {});
    } catch {}
  };

  const handleNavClick = (href: string) => {
    playClickSound();
    onClose();

    setTimeout(() => {
      if (href.startsWith("/#")) {
        const targetId = href.replace("/#", "");
        if (location.pathname !== "/") {
          navigate(`/#${targetId}`);
        } else {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else {
        navigate(href);
      }
    }, 150);
  };

  // Lock body scroll while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="architectural-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Menu"
          initial={{
            clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
          }}
          animate={{
            clipPath: `circle(${origin.radius}px at ${origin.x}px ${origin.y}px)`,
          }}
          exit={{
            clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`fixed inset-0 z-[100] flex flex-col justify-between select-none overflow-y-auto lg:overflow-hidden transition-colors duration-300 ${
            xray
              ? "bg-[#f6f6f4] text-[#121214]"
              : "bg-[#0b0b0e] text-[#f4f4f4]"
          }`}
        >
          {/* Top Bar inside Menu */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between shrink-0">
            {/* Brand Wordmark & Sound Indicator */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                onClick={onClose}
                className={`flex items-center text-lg sm:text-xl font-bold tracking-tight select-none font-display ${
                  xray ? "text-[#121214]" : "text-white"
                }`}
                aria-label="Ethixweb home"
              >
                <span>{BRAND.name}</span>
                <span className="text-accent ml-0.5">.</span>
              </Link>

              <button
                type="button"
                onClick={() => setSoundOn(!soundOn)}
                title={soundOn ? "Ambient pulse on" : "Ambient pulse off"}
                aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
                className={`flex items-center justify-center h-7 w-7 transition-colors cursor-pointer ${
                  xray ? "text-[#121214]/60 hover:text-[#121214]" : "text-white/60 hover:text-white"
                }`}
              >
                <span className={`sound-bars ${soundOn ? "is-on" : ""}`} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </div>

            {/* Right Pill: X-ray + Start a project + Close (✕) */}
            <div
              className={`flex items-center gap-4 sm:gap-6 rounded-full px-4 py-1.5 backdrop-blur-md transition-colors ${
                xray
                  ? "border border-black/10 bg-black/[0.04] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
                  : "border border-white/15 bg-white/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
              }`}
            >
              <button
                type="button"
                onClick={toggleXray}
                title="Toggle architectural X-ray"
                aria-label="Toggle architectural blueprint X-ray mode"
                aria-pressed={xray}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-tight transition-colors cursor-pointer ${
                  xray
                    ? "text-accent font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Search className={`h-3.5 w-3.5 ${xray ? "text-accent stroke-[2.5]" : "text-white/70"}`} />
                <span>X-ray</span>
                {xray && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </button>

              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  const btn = e.currentTarget;
                  onClose();
                  setTimeout(() => triggerProjectTransition(btn), 150);
                }}
                className={`hidden sm:inline-block text-xs sm:text-sm font-medium tracking-tight hover:text-accent transition-colors ${
                  xray ? "text-[#121214]" : "text-white"
                }`}
              >
                Start a project
              </a>

              {/* Close Button */}
              <button
                id="menu-close-btn"
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 cursor-pointer shadow-xs ${
                  xray
                    ? "bg-[#121214] text-white hover:bg-accent hover:text-white"
                    : "bg-white text-black hover:bg-accent hover:text-white"
                }`}
              >
                <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90 duration-200 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Center Area: Left Nav Items + Right Preview Card */}
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 my-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Massive Architectural Links */}
              <nav className="lg:col-span-7 flex flex-col justify-center">
                <ul className="flex flex-col space-y-2 sm:space-y-3.5">
                  {MENU_ITEMS.map((item, index) => {
                    const isHovered = hoveredIndex === index;
                    return (
                      <li key={item.id}>
                        <a
                          id={`menu-item-${item.id}`}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          onMouseEnter={() => {
                            setHoveredIndex(index);
                            playClickSound();
                          }}
                          onFocus={() => setHoveredIndex(index)}
                          className="group flex items-baseline gap-4 sm:gap-6 py-1 select-none transition-all duration-200"
                        >
                          {/* Main Word */}
                          <span
                            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05] transition-all duration-200 ${
                              xray
                                ? isHovered
                                  ? "text-[#121214] translate-x-1.5"
                                  : "text-[#121214]/35 hover:text-[#121214]/80"
                                : isHovered
                                ? "text-white translate-x-1.5"
                                : "text-white/35 hover:text-white/75"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Monospace count / subtitle */}
                          <span
                            className={`font-mono text-xs sm:text-sm tracking-wider transition-colors duration-200 ${
                              xray
                                ? isHovered ? "text-[#121214]/80 font-medium" : "text-[#121214]/25"
                                : isHovered ? "text-white/80 font-medium" : "text-white/25"
                            }`}
                          >
                            {item.subtitle}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Right Column: Large Dynamic Preview Card */}
              <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
                <div
                  className={`relative w-full max-w-[580px] aspect-[16/10] rounded-2xl overflow-hidden border transition-all ${
                    xray
                      ? "border-black/10 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.14)]"
                      : "border-white/15 bg-[#141418] shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
                  }`}
                >
                  {/* Animated Image Preview */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={MENU_ITEMS[hoveredIndex].image}
                        alt={MENU_ITEMS[hoveredIndex].label}
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Soft architectural vignette */}
                      <div
                        className={`absolute inset-0 pointer-events-none ${
                          xray
                            ? "bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                            : "bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom Caption Pill */}
                  <div
                    className={`absolute bottom-4 inset-x-4 flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono z-10 shadow-lg backdrop-blur-md transition-colors ${
                      xray
                        ? "bg-white/95 border border-black/10 text-[#121214]"
                        : "bg-black/70 border border-white/10 text-white/90"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse shrink-0" />
                      <span className="truncate">{MENU_ITEMS[hoveredIndex].caption}</span>
                    </div>
                    <span className={`shrink-0 font-medium ${xray ? "text-[#121214]/50" : "text-white/40"}`}>
                      {MENU_ITEMS[hoveredIndex].tag}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Row Footer */}
          <div
            className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 shrink-0 transition-colors ${
              xray ? "border-t border-black/10" : "border-t border-white/10"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
              {/* Left: Start a project CTA with red circle arrow */}
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  const btn = e.currentTarget;
                  onClose();
                  if (location.pathname === "/" || location.pathname === "") {
                    setTimeout(() => triggerProjectTransition(btn), 150);
                  } else {
                    setTimeout(() => navigate("/contact"), 150);
                  }
                }}
                className={`group inline-flex items-center gap-3 text-sm sm:text-base font-medium hover:text-accent transition-colors cursor-pointer ${
                  xray ? "text-[#121214]" : "text-white"
                }`}
              >
                <span>Start a project</span>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-accent text-white group-hover:scale-110 group-hover:rotate-45 transition-all duration-200">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>

              {/* Center: Email & HQ location */}
              <div className={`flex flex-col ${xray ? "text-[#121214]/65" : "text-white/60"}`}>
                <a
                  href="mailto:info@ethixweb.com"
                  className={xray ? "hover:text-[#121214] transition-colors" : "hover:text-white transition-colors"}
                >
                  info@ethixweb.com
                </a>
                <span className={xray ? "text-[#121214]/40" : "text-white/40"}>
                  Kent · Seattle, Washington, USA
                </span>
              </div>

              {/* Right: Language Pill, Theme Toggle, Imprint */}
              <div className={`flex items-center gap-4 ${xray ? "text-[#121214]/65" : "text-white/60"}`}>
                <div
                  className={`flex items-center rounded-full p-0.5 text-[11px] ${
                    xray ? "bg-black/5 border border-black/10" : "bg-white/5 border border-white/10"
                  }`}
                >
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-medium ${
                      xray ? "bg-black/10 text-[#121214]" : "bg-white/15 text-white"
                    }`}
                  >
                    EN
                  </span>
                  <span className={`px-2.5 py-0.5 ${xray ? "text-[#121214]/40" : "text-white/40"}`}>
                    USA
                  </span>
                </div>

                {/* Light / Dark Mode Toggle Pill */}
                <div
                  className={`flex items-center rounded-full p-0.5 text-[11px] ${
                    xray ? "bg-black/5 border border-black/10" : "bg-white/5 border border-white/10"
                  }`}
                >
                  <button
                    id="menu-theme-light-btn"
                    type="button"
                    onClick={() => {
                      if (xray) toggleXray();
                    }}
                    className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                      !xray
                        ? "bg-white text-black font-semibold shadow-xs"
                        : "text-[#121214]/60 hover:text-[#121214]"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    id="menu-theme-dark-btn"
                    type="button"
                    onClick={() => {
                      if (!xray) toggleXray();
                    }}
                    className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                      xray
                        ? "bg-accent text-white font-semibold shadow-xs"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Dark
                  </button>
                </div>

                <div className={`hidden md:flex items-center gap-3 text-[11px] ${xray ? "text-[#121214]/40" : "text-white/40"}`}>
                  <Link
                    to="/contact"
                    onClick={onClose}
                    className={xray ? "hover:text-[#121214] transition-colors" : "hover:text-white transition-colors"}
                  >
                    Enquiry Desk
                  </Link>
                  <span>·</span>
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className={xray ? "hover:text-[#121214] transition-colors" : "hover:text-white transition-colors"}
                  >
                    Admin CRM
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
