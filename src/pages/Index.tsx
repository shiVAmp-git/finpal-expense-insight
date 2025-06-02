
import WelcomeHeader from "@/components/welcome/WelcomeHeader";
import HeroSection from "@/components/welcome/HeroSection";
import FeatureShowcase from "@/components/welcome/FeatureShowcase";
import TestimonialSection from "@/components/welcome/TestimonialSection";
import CTASection from "@/components/welcome/CTASection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <WelcomeHeader />
      <main>
        <HeroSection />
        <div id="features">
          <FeatureShowcase />
        </div>
        <div id="testimonials">
          <TestimonialSection />
        </div>
        <CTASection />
      </main>
    </div>
  );
}
