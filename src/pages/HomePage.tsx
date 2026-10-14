import { Hero } from "../components/Hero";
import { TheBuild } from "../components/TheBuild";
import { Stance } from "../components/Stance";
import { Services } from "../components/Services";
import { SelectedWork } from "../components/SelectedWork";
import { GlobalNetwork } from "../components/GlobalNetwork";
import { Proof } from "../components/Proof";
import { SystemShift } from "../components/SystemShift";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <TheBuild />
      <Stance />
      <Services />
      <SelectedWork />
      <GlobalNetwork />
      <Proof />
      <SystemShift />
      <FAQ />
      <CTA />
    </>
  );
}
