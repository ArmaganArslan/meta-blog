"use client";

import Image from "next/image";
import Link from "next/link";
import { PostType } from "@/lib/types";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";
import { Card } from "@/components/ui/card";

interface HeroSectionProps {
  post: PostType;
}

export function HeroSection({ post }: HeroSectionProps) {
  return (
    <section className="container max-w-7xl mx-auto px-6">
      <Link href={`/blog/${post.id}`} className="block">
        <div className="relative h-[600px] w-full rounded-xl mb-16 group">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0">
            <div className="container h-full px-4 flex items-end md:justify-start justify-center">
              <Card className="max-w-xl bg-background p-8 rounded-xl translate-y-16 transition-shadow duration-300 hover:shadow-xl md:ml-6 mx-4">
                <CategoryBadge category={post.category} variant="featured" className="mb-4" />
                <h1 className="mb-6 text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h1>
                <AuthorInfo 
                  author={post.author}
                  date={post.date}
                />
              </Card>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}