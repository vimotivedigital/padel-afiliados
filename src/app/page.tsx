import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestReviews } from "@/components/home/LatestReviews";
import { PopularComparisons } from "@/components/home/PopularComparisons";
import { DealsSection } from "@/components/home/DealsSection";
import { RecentArticles } from "@/components/home/RecentArticles";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { NewsletterForm } from "@/components/home/NewsletterForm";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <DealsSection />
      <LatestReviews />
      <PopularComparisons />
      <RecentArticles />
      <BrandsStrip />
      <NewsletterForm />
    </div>
  );
}
