import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { AdvertisementSection } from "@/components/advertisement-section";
import { BlogList } from "@/components/blog-list";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center pt-8">
        <HeroSection />

        <div className="container max-w-7xl mx-auto px-6">
          <AdvertisementSection />
        </div>

        <BlogList showViewAll={true} title="Latest Post" />

        <div className="container max-w-7xl mx-auto px-6">
          <AdvertisementSection />
        </div>
      </main>
      <Footer />
    </>
  );
}