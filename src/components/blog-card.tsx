"use client";

import Image from "next/image";
import Link from "next/link";
import { PostType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/category-badge";
import { AuthorInfo } from "@/components/author-info";

interface BlogCardProps extends PostType {
  id: string;
}

export default function BlogCard({
  id,
  category,
  title,
  author,
  date,
  image,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="overflow-hidden border rounded-xl hover:shadow-lg transition-all p-4 h-[450px] flex flex-col group">
        <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col flex-grow space-y-4">
          <div className="inline-flex">
            <CategoryBadge category={category} />
          </div>
          <h3 className="text-xl font-semibold line-clamp-3 hover:text-blue-600 transition-colors flex-grow">
            {title}
          </h3>
          <AuthorInfo 
            author={author}
            date={date}
            className="text-muted-foreground mt-auto"
          />
        </div>
      </Card>
    </Link>
  );
}