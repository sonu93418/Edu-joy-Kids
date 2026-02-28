import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// Lazy-load below-the-fold sections to speed up initial paint
const FeaturesSection = dynamic(
  () => import("@/components/landing/FeaturesSection"),
  { ssr: true },
);
const HowItWorksSection = dynamic(
  () => import("@/components/landing/HowItWorksSection"),
  { ssr: true },
);
const TestimonialsSection = dynamic(
  () => import("@/components/landing/TestimonialsSection"),
  { ssr: true },
);
const FAQSection = dynamic(() => import("@/components/landing/FAQSection"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
