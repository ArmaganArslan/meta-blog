"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { trpc } from '@/utils/trpc';
import { type PostWithDetails } from "@/lib/types";

export function Navigation() {
  const router = useRouter();

  const { mutate: getRandomPost } = trpc.post.getRandomPost.useMutation({
    onSuccess: (post: PostWithDetails | null) => {
      if (post?.id) {
        router.push(`/blog/${post.id}`);
      }
    },
  });

  return (
    <nav className="hidden lg:flex flex-1 justify-center">
      <ul className="flex items-center space-x-6">
        <li><Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link></li>
        <li><Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link></li>
        <li>
          <button 
            onClick={() => getRandomPost()}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Single Post
          </button>
        </li>
        <li><Link href="/pages" className="text-sm font-medium hover:text-primary transition-colors">Pages</Link></li>
        <li><Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link></li>
      </ul>
    </nav>
  );
} 