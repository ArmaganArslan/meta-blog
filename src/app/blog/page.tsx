import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/blog-card";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/blog-hero";
import { AdvertisementSection } from "@/components/advertisement-section";
import { BlogList } from "@/components/blog-list";

export default async function BlogPage() {
  try {
    // Tüm blog yazılarını ve yazarlarını getir
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
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
      image: post.image || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&auto=format&fit=crop',
    }));

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
              <HeroSection post={{
                id: heroPost.id,
                title: heroPost.title,
                category: heroPost.category,
                image: heroPost.image,
                createdAt: heroPost.createdAt,
                author: {
                  name: heroPost.author.name,
                  image: heroPost.author.image
                }
              }} />
            </div>
          )}

          <BlogList initialPosts={formattedPosts} />

          <div className="container max-w-7xl mx-auto px-6 mt-8">
            <AdvertisementSection spacing="small" />
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Blog sayfası yüklenirken hata oluştu:', error);
    return <div>Blog yazıları yüklenirken bir hata oluştu.</div>;
  }
}