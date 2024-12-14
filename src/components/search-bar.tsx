"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full lg:w-[200px] ${className}`}>
      <Input
        type="text"
        placeholder="Search"
        className="bg-muted pr-8"
      />
      <Search 
        className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" 
      />
    </div>
  );
} 