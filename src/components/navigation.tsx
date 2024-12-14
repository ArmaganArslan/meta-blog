"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();

  const handleRandomPost = async () => {
    try {
      const response = await fetch("/api/posts/random");
      const post = await response.json();
      
      if (post.id) {
        router.push(`/blog/${post.id}`);
      }
    } catch (error) {
      console.error("Rastgele post getirilirken hata oluştu:", error);
    }
  };

  return (
    <nav className="hidden lg:flex flex-1 justify-center">
      <ul className="flex items-center space-x-6">
        <li><Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link></li>
        <li><Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link></li>
        <li>
          <button 
            onClick={handleRandomPost} 
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