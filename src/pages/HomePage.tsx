import { lazy, Suspense } from "react";
import { Hero } from "../components/Hero";
import { DeferredSection } from "../components/DeferredSection";

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
      <DeferredSection id="the-build" minHeight="500px">
        <Suspense fallback={null}>
          <TheBuild />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="400px">
        <Suspense fallback={null}>
          <Stance />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="services" minHeight="500px">
        <Suspense fallback={null}>
          <Services />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="work" minHeight="500px">
        <Suspense fallback={null}>
          <SelectedWork />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="network" minHeight="400px">
        <Suspense fallback={null}>
          <GlobalNetwork />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="reviews" minHeight="400px">
        <Suspense fallback={null}>
          <Proof />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="400px">
        <Suspense fallback={null}>
          <SystemShift />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="faq" minHeight="400px">
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="cta" minHeight="400px">
        <Suspense fallback={null}>
          <CTA />
        </Suspense>
      </DeferredSection>
    </>
  );
}
