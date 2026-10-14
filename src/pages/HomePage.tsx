import { lazy, Suspense } from "react";
import { Hero } from "../components/Hero";

const TheBuild = lazy(() => import("../components/TheBuild").then((m) => ({ default: m.TheBuild })));
const Stance = lazy(() => import("../components/Stance").then((m) => ({ default: m.Stance })));
const Services = lazy(() => import("../components/Services").then((m) => ({ default: m.Services })));
const SelectedWork = lazy(() => import("../components/SelectedWork").then((m) => ({ default: m.SelectedWork })));
const GlobalNetwork = lazy(() => import("../components/GlobalNetwork").then((m) => ({ default: m.GlobalNetwork })));
const Proof = lazy(() => import("../components/Proof").then((m) => ({ default: m.Proof })));
const SystemShift = lazy(() => import("../components/SystemShift").then((m) => ({ default: m.SystemShift })));
const FAQ = lazy(() => import("../components/FAQ").then((m) => ({ default: m.FAQ })));
const CTA = lazy(() => import("../components/CTA").then((m) => ({ default: m.CTA })));

export function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <TheBuild />
        <Stance />
        <Services />
        <SelectedWork />
        <GlobalNetwork />
        <Proof />
        <SystemShift />
        <FAQ />
        <CTA />
      </Suspense>
    </>
  );
}
