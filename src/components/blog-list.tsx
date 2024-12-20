"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./blog-card";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { LoadingAnimation } from "@/components/loading-animation";
import { type PostWithDetails } from "@/lib/types";

export function BlogList({ 
  showViewAll = false, 
  title 
}: { 
  showViewAll?: boolean;
  title?: string;
}) {
  const [displayCount, setDisplayCount] = useState(9);
  const { data: posts, isLoading } = trpc.post.getPosts.useQuery<PostWithDetails[]>();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const hasMorePosts = posts && posts.length > displayCount;

  const loadMore = () => {
    setDisplayCount((prev) => prev + 9);
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-8 pt-16 w-full">
      {title && <h2 className="text-2xl font-bold mb-8">{title}</h2>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {posts?.slice(0, displayCount).map((post, index) => {
            return (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index % 9}
                layout
              >
                <BlogCard {...post} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {showViewAll ? (
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/blog">
            <motion.button
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium border rounded-lg px-8 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Posts
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        hasMorePosts && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={loadMore}
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium border rounded-lg px-8 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          </motion.div>
        )
      )}
    </div>
  );
} 