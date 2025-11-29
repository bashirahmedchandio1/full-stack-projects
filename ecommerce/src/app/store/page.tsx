"use client";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";

const Home = () => {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <CategoriesSection />
      <FlashSaleSection />
    </main>
  );
};

export default Home;
