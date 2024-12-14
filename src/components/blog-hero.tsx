"use client";

import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";

interface HeroSectionProps {
  post: {
    id: string;
    title: string;
    category: string;
    image: string | null;
    createdAt: Date;
    author: {
      name: string | null;
      image: string | null;
    };
  };
}

export function HeroSection({ post }: HeroSectionProps) {
  return (
    <div className="container max-w-7xl mx-auto px-6">
      <Link href={`/blog/${post.id}`} className="block">
        <section className="relative h-[500px] w-full rounded-xl overflow-hidden group">
          <Image
            src={post.image || ""}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
            <div className="absolute bottom-12 left-12 right-12">
              <CategoryBadge 
                category={post.category} 
                variant="featured" 
                className="mb-4 bg-[#4B6BFB] text-white hover:bg-[#4B6BFB]" 
              />
              <h1 className="text-4xl font-bold text-white mb-6 max-w-3xl">
                {post.title}
              </h1>
              <AuthorInfo 
                author={{
                  name: post.author.name || "Anonymous",
                  image: post.author.image || ""
                }}
                date={post.createdAt.toISOString()}
                className="text-white [&_time]:text-white"
              />
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
}