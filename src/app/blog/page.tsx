"use client";

import { Footer } from "@/components/footer";
import { AdvertisementSection } from "@/components/advertisement-section";
import { BlogList } from "@/components/blog-list";
import { HeroSection } from "@/components/blog-hero";
import { trpc } from "@/utils/trpc";
import { type PostType } from "@/lib/types";
import { LoadingAnimation } from "@/components/loading-animation";

export default function BlogPage() {
  const { data: posts, isLoading } = trpc.post.getPosts.useQuery();
  const heroPost = posts?.[0] as PostType;

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center pt-8">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold mb-4">Page Title</h1>
          <nav className="flex items-center justify-center gap-4">
            <a href="/" className="text-sm font-medium text-[#3B3C4A] dark:text-white hover:text-primary transition-colors">Home</a>
            <span className="text-gray-400">|</span>
            <a href="/blog" className="text-sm font-medium text-[#3B3C4A] dark:text-white hover:text-primary transition-colors">Link One</a>
          </nav>
        </div>

        {heroPost && (
          <div className="w-full">
            <HeroSection post={heroPost} />
          </div>
        )}

        <BlogList />

        <div className="container max-w-7xl mx-auto px-6 mt-8">
          <AdvertisementSection />
        </div>
      </main>
      <Footer />
    </>
  );
}