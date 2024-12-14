"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { IoIosSunny } from "react-icons/io";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[64px] h-[32px]" />; // Placeholder
  }

  return (
    <motion.div
      className="flex relative w-[64px] h-[32px] rounded-full cursor-pointer"
      style={{
        backgroundColor: theme === "dark" ? "#4B6BFB" : "hsl(var(--muted))"
      }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      layout
    >
      <motion.div
        className="absolute top-[4px] left-[4px] w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center"
        layout
        animate={{
          x: theme === "dark" ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      >
        <IoIosSunny className="h-4 w-4 text-[#52535F]" />
      </motion.div>
    </motion.div>
  );
} 