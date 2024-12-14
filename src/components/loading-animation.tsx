"use client";

import { motion } from "framer-motion";
import { Code, Coffee } from "lucide-react";

export function LoadingAnimation() {
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
      <h1 className="text-2xl font-bold mb-4">Sayfa Yapım Aşamasında</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Bu sayfa şu anda geliştiriliyor. Çok yakında burada harika içerikler olacak!
      </p>
    </div>
  );
} 