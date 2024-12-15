import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { AdvertisementSection } from "@/components/advertisement-section";
import { prisma } from "@/lib/prisma";
import { BlogList } from "@/components/blog-list";

export const revalidate = 0; // Her istekte yeni veriyi çek

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10 // Hero için 1 + grid için 9
  });

  // İlk post'u hero section için ayır
  const [heroPost, ...otherPosts] = posts;

  // Diğer postları UI formatına dönüştür
  const formattedPosts = otherPosts.map((post) => ({
    id: post.id,
    category: post.category,
    title: post.title,
    author: {
      name: post.author.name || "Anonim",
      image: post.author.image || "/default-avatar.jpg"
    },
    date: post.createdAt.toISOString(),
    image: post.image || "",
  }));

  return (
    <>
      <main className="flex flex-col items-center pt-8">
        {/* Hero Section */}
        {heroPost && <HeroSection post={{
          id: heroPost.id,
          title: heroPost.title,
          category: heroPost.category,
          image: heroPost.image || "",
          date: heroPost.createdAt.toISOString(),
          author: {
            name: heroPost.author.name || "Anonim",
            image: heroPost.author.image || "/default-avatar.jpg"
          }
        }} />}

        {/* First Advertisement */}
        <div className="container max-w-7xl mx-auto px-6">
          <AdvertisementSection />
        </div>

        {/* Blog List */}
        <BlogList 
          initialPosts={formattedPosts} 
          showViewAll={true} 
          title="Latest Post"
        />

        {/* Second Advertisement */}
        <div className="container max-w-7xl mx-auto px-6">
          <AdvertisementSection spacing="small" />
        </div>
      </main>
      <Footer />
    </>
  );
}