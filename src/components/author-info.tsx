"use client";

import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { type AuthorInfoProps } from "@/lib/types";

export function AuthorInfo({ author, date, className = "" }: AuthorInfoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={author.image || "/default-avatar.jpg"}
            alt={author.name || "Anonymous"}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="font-medium text-sm">{author.name || "Anonymous"}</span>
      </div>
      <time className="text-sm font-medium text-muted-foreground ml-8">
        {formatDate(date)}
      </time>
    </div>
  );
}