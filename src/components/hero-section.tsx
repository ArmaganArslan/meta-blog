"use client";

import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";
import { Card } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";
import { type PostWithDetails } from "@/lib/types";

export function HeroSection() {
  const { data: posts, isLoading } = trpc.post.getPosts.useQuery<PostWithDetails[]>();
  const heroPost = posts?.[0];

  if (isLoading || !heroPost) {
    return null;
  }

  return (
    <section className="container max-w-7xl mx-auto px-6">
      <Link href={`/blog/${heroPost.id}`} className="block">
        <div className="relative h-[600px] w-full rounded-xl mb-16 group">
          <Image
            src={heroPost.image || "/placeholder-image.jpg"}
            alt={heroPost.title}
            fill
            priority
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0">
            <div className="container h-full px-4 flex items-end md:justify-start justify-center">
              <Card className="max-w-xl bg-background p-8 rounded-xl translate-y-16 transition-shadow duration-300 hover:shadow-xl md:ml-6 mx-4">
                <CategoryBadge 
                  category={heroPost.category} 
                  variant="primary" 
                  className="mb-4" 
                />
                <h1 className="mb-6 text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {heroPost.title}
                </h1>
                <AuthorInfo 
                  author={{
                    name: heroPost.author.name || "Anonymous",
                    image: heroPost.author.image || ""
                  }}
                  date={heroPost.createdAt.toISOString()}
                />
              </Card>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}