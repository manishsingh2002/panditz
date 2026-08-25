import { useI18n } from "./i18n";
import { LandingHeader } from "./LandingHeader";
import { Hero } from "./Hero";
import { TrustHighlights } from "./TrustHighlights";
import { HowItWorks } from "./HowItWorks";
import { ServiceCategories, FeaturedPujas } from "./Services";
import { WhyPanditZ, VerificationSection } from "./WhyPanditZ";
import { PanditCTA } from "./PanditCTA";
import { SocialProof } from "./SocialProof";
import { FinalCTA } from "./FinalCTA";
import { LandingFooter } from "./LandingFooter";

/* ============================================================
   LandingPage — public route ("/"). No auth required.
   Section order follows the PanditZ story:
   promise → trust → process → services → why → verification
   → priests → proof → final CTA.
   ============================================================ */

export function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <button
        onClick={() => document.getElementById("main")?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-sm focus:bg-kesari-600 focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-bold focus:text-surface-3"
      >
        {t.a11y.skip}
      </button>

      <div className="noise-overlay" aria-hidden="true" />

      <LandingHeader />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <TrustHighlights />
        <HowItWorks />
        <ServiceCategories />
        <FeaturedPujas />
        <WhyPanditZ />
        <VerificationSection />
        <PanditCTA />
        <SocialProof />
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
