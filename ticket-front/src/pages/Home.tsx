import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturedEvents from "../components/home/FeaturedEvents";
import Footer from "../components/layout/Footer";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeaturedEvents />
      <CTASection />
      <Footer />
    </div>
  );
}
