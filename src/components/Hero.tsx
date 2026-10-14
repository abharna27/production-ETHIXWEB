import { Crosshair, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { BRAND } from "../content/landing";
import { InspectorTarget } from "./InspectorTarget";
import { ArchitecturalWeb } from "./ArchitecturalWeb";
import { triggerProjectTransition } from "./PageCurtain";

export function Hero() {
  // Smooth GPU-composited glide animation for initial page load
  const blurReveal: Variants = {
    hidden: {
      opacity: 0.85,
      y: 16,
    },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: custom * 0.08,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="overview"
      className="relative flex min-h-[92svh] flex-col justify-end pb-16 pt-[calc(var(--nav-h)+2rem)] md:pb-24 overflow-hidden bg-paper"
    >
      {/* Draftsman Coordinates Annotation */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={blurReveal}
        className="pointer-events-none absolute left-[var(--shell)] top-[calc(var(--nav-h)+1.5rem)] hidden select-none md:flex items-center gap-3 text-steel/80 text-xs font-mono"
      >
        <Crosshair className="h-3.5 w-3.5 text-accent animate-spin-slow" />
        <span>{BRAND.coordinates} · ST. SEATTLE / KENT REGION</span>
      </motion.div>

      <div className="shell frame relative z-10 w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Left Column: Headlines & Primary CTA */}
          <div className="lg:col-span-7">
            {/* Display Headline with Blur Reveal & Clean Figma Inspector */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={blurReveal}
              className="mb-6"
            >
              <InspectorTarget tag="Heading" magneticFactor={0.08} className="w-full">
                <h1 className="display-1 text-ink">
                  <span className="block">
                    <span>We run the </span>
                    <span className="relative inline-block text-ink font-semibold">
                      tech<span className="text-accent">.</span>
                    </span>
                  </span>
                  <span className="block mt-1 sm:mt-2">
                    <span className="italic font-normal tracking-tight">You run the </span>
                    <span className="relative inline-block font-bold">
                      business
                      <span className="text-accent">.</span>
                      {/* Wavy hand-drawn underline */}
                      <svg
                        aria-hidden="true"
                        className="absolute -bottom-2.5 left-0 w-full text-accent h-2 overflow-visible"
                        viewBox="0 0 100 8"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,4 Q 10,0 20,4 T 40,4 T 60,4 T 80,4 T 100,4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        />
                      </svg>
                    </span>
                  </span>
                </h1>
              </InspectorTarget>
            </motion.div>

            {/* Lead Narrative Description */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={blurReveal}
              className="mb-8"
            >
              <InspectorTarget tag="Paragraph" magneticFactor={0.08}>
                <p className="lead max-w-xl text-ink-2">
                  {BRAND.subtext}
                </p>
              </InspectorTarget>
            </motion.div>

            {/* Actions & Verification Badges */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={blurReveal}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary Button */}
              <InspectorTarget tag="Button" magneticFactor={0.22}>
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerProjectTransition(e.currentTarget);
                  }}
                  className="btn btn-primary h-[52px] !px-6 text-sm font-semibold tracking-wide"
                >
                  <span>Start a project</span>
                  <span className="btn-dot">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </InspectorTarget>

              {/* Secondary Work Button */}
              <InspectorTarget tag="Button" magneticFactor={0.22}>
                <a
                  href="#work"
                  className="btn btn-secondary h-[52px] !px-6 text-sm font-semibold tracking-wide"
                >
                  <span>See our work</span>
                  <span className="btn-dot !bg-line text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </InspectorTarget>

              {/* Handwritten Engineer Note */}
              <InspectorTarget tag="Callout" magneticFactor={0.15}>
                <span className="font-hand text-xl text-accent -rotate-2 select-none inline-block">
                  Direct access to senior engineers
                </span>
              </InspectorTarget>
            </motion.div>
          </div>

          {/* Right Column: Authentic Architectural Spiderweb Visual */}
          <div className="lg:col-span-5">
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={blurReveal}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              <ArchitecturalWeb />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
