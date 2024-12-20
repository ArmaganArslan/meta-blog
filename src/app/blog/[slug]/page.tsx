"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { LoadingAnimation } from "@/components/loading-animation";
import { type PostWithDetails } from "@/lib/types";
import Image from "next/image";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";
import { Footer } from "@/components/footer";
import { AdvertisementSection } from "@/components/advertisement-section";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.slug as string;
  
  const { data: post, isLoading, error } = trpc.post.getPostById.useQuery<PostWithDetails>(postId);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Blog yazısı yüklenirken bir hata oluştu.</div>;
  }

  if (!post) {
    return <div>Blog yazısı bulunamadı.</div>;
  }

  return (
    <>
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <CategoryBadge 
            category={post.category} 
            variant="primary"
            className="mb-4"
          />
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <AuthorInfo 
            author={{
              name: post.author.name || "",
              image: post.author.image || ""
            }}
            date={post.createdAt.toISOString()}
            className="mb-6"
          />

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={post.image || "/placeholder-image.jpg"}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          {post.content && typeof post.content === 'object' && 'sections' in post.content && 
            post.content.sections.map((section, index) => {
              switch (section.type) {
                case 'paragraph':
                  return <p key={index}>{section.content}</p>;
                case 'heading':
                  return <h2 key={index}>{section.content}</h2>;
                case 'image':
                  return (
                    <img
                      key={index}
                      src={section.imageUrl}
                      alt={section.content}
                      className="w-full rounded-lg my-4"
                    />
                  );
                default:
                  return null;
              }
            })
          }
        </div>
      </article>
      <AdvertisementSection />
      <Footer />
    </>
  );
} 