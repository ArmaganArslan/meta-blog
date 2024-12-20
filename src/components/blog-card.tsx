"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";
import { type PostType } from "@/lib/types";

type BlogCardProps = PostType;

export default function BlogCard({
  id,
  category,
  title,
  author,
  createdAt,
  image,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="overflow-hidden border rounded-xl hover:shadow-lg transition-all p-4 h-[450px] flex flex-col group">
        <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-xl">
          <Image
            src={image || "/placeholder-image.jpg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col flex-grow space-y-4">
          <div className="inline-flex">
            <CategoryBadge 
              category={category} 
              variant="secondary"
            />
          </div>
          <h3 className="text-xl font-semibold line-clamp-3 hover:text-blue-600 transition-colors flex-grow">
            {title}
          </h3>
          <AuthorInfo 
            author={{
              name: author.name || "Anonim",
              image: author.image || ""
            }}
            date={createdAt.toISOString()}
            className="text-muted-foreground mt-auto"
          />
        </div>
      </Card>
    </Link>
  );
}