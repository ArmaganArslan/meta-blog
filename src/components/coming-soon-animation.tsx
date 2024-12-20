"use client";

import { motion } from "framer-motion";
import { Code, Coffee } from "lucide-react";

export function ComingSoonAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4">
          <Code className="w-8 h-8 text-primary" />
          <Coffee className="w-8 h-8 text-primary" />
        </div>
      </motion.div>
      <h1 className="text-2xl font-bold mb-4">Coming Soon</h1>
      <p className="text-muted-foreground text-center max-w-md">
        We’re working on this page right now. Stay tuned, great content is on its way!
      </p>
    </div>
  );
} 