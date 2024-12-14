"use client";

import { useState } from "react";
import BlogCard from "@/components/blog-card";
import type { PostType } from "@/lib/types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BlogListProps {
  initialPosts: PostType[];
  showViewAll?: boolean;
  title?: string;
}

export function BlogList({ initialPosts, showViewAll = false, title }: BlogListProps) {
  const [displayCount, setDisplayCount] = useState(9);

  // Kart animasyonu için varyantlar
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Her kart sırayla görünecek
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-8 pt-16 w-full">
      {title && <h2 className="text-2xl font-bold mb-8">{title}</h2>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {initialPosts.slice(0, displayCount).map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index % 9} // Her yeni yüklemede 0'dan başlayacak
              layout // Smooth geçişler için
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center mt-8">
        {showViewAll ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/blog"
              className="px-6 py-2 border rounded-lg text-sm font-medium text-[#696A75] hover:bg-muted transition-colors"
            >
              View All Post
            </Link>
          </motion.div>
        ) : (
          initialPosts.length > displayCount && (
            <motion.button 
              onClick={() => setDisplayCount(prev => prev + 9)}
              className="px-6 py-2 border rounded-lg text-sm font-medium text-[#696A75] hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          )
        )}
      </div>
    </div>
  );
} 