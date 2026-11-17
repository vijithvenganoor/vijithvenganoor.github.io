import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import EngineeringSection from '@/components/sections/EngineeringSection';
import ProductsSection from '@/components/sections/ProductsSection';
import StoryGallerySection from '@/components/sections/StoryGallerySection';
import ContactFooter from '@/components/sections/ContactFooter';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <HeroSection />
      <EngineeringSection />
      <ProductsSection />
      <StoryGallerySection />
      <ContactFooter />
    </main>
  );
}
