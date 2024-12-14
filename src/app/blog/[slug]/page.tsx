import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";
import { AdvertisementSection } from "@/components/advertisement-section";
import { Footer } from "@/components/footer";
import type { PostContent, Post } from '@/lib/types';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Statik sayfaları oluşturmak için gerekli olan fonksiyon
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => ({
    slug: post.id,
  }));
}

interface ExtendedPost extends Post {
  author: {
    id: string;
    name: string | null;
    image: string | null;
    // ... diğer author özellikleri
  };
}

// Page component'ini async olarak işaretle
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    // params'ı await ile çözümle
    const resolvedParams = await params;
    
    const post = await prisma.post.findUnique({
      where: {
        id: resolvedParams.slug,
      },
      include: {
        author: true,
      },
    }) as ExtendedPost | null;

    if (!post) {
      notFound();
    }

    const content = JSON.parse(post.content as string) as PostContent;

    return (
      <>
        <main className="flex min-h-screen flex-col items-center pt-8">
          {/* Breadcrumb */}
          {/* <div className="container max-w-7xl mx-auto px-6 mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">Ana Sayfa</a>
              <span>/</span>
              <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>
          </div> */}

          {/* Hero Section */}
          <div className="container max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto mb-12">
              <CategoryBadge 
                category={post.category} 
                variant="featured"
                className="mb-4 bg-[#4B6BFB] text-white hover:bg-[#4B6BFB]" 
              />
              <h1 className="text-4xl font-bold mb-4">
                {post.title}
              </h1>
              <AuthorInfo 
                author={{
                  name: post.author.name || "Anonim",
                  image: post.author.image || "/default-avatar.jpg"
                }}
                date={post.createdAt.toISOString()}
              />
            </div>

            {/* Featured Image */}
            <div className="max-w-3xl mx-auto">
              <div className="relative aspect-[800/462] w-full rounded-xl overflow-hidden mb-12">
                <Image
                  src={post.image || 'https://images.unsplash.com/photo-1488085061387-422e29b40080'}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert mb-16">
              {content.sections.map((section, index) => {
                if (section.type === 'paragraph') {
                  return <p key={index}>{section.content}</p>;
                }
                if (section.type === 'heading') {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>;
                }
                if (section.type === 'image') {
                  return (
                    <div key={index} className="relative aspect-[16/9] my-8">
                      <Image
                        src={section.imageUrl || ''}
                        alt={section.content}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Advertisement */}
            <AdvertisementSection spacing="small" />
          </div>
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Blog yazısı yüklenirken hata oluştu:', error);
    return <div>Blog yazısı yüklenirken bir hata oluştu.</div>;
  }
} 