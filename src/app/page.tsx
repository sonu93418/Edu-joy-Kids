import lazyLoad from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

// Lazy-load below-the-fold sections to speed up initial paint
const FeaturesSection = lazyLoad(
  () => import("@/components/landing/FeaturesSection"),
  { ssr: true },
);
const HowItWorksSection = lazyLoad(
  () => import("@/components/landing/HowItWorksSection"),
  { ssr: true },
);
const TestimonialsSection = lazyLoad(
  () => import("@/components/landing/TestimonialsSection"),
  { ssr: true },
);
const FAQSection = lazyLoad(() => import("@/components/landing/FAQSection"), {
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
