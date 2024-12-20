import "next-auth";
import { type DefaultSession } from "next-auth";
import { type Post, type User, type Category } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export interface Author {
  id?: string;
  name: string | null;
  image: string | null;
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface PostContent {
  sections: Array<{
    type: "paragraph" | "heading" | "image";
    content: string;
    imageUrl?: string;
  }>;
}

export interface PostType {
  id: string;
  title: string;
  content: PostContent;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  category: CategoryType;
}

export type PostWithDetails = Post & {
  author: User;
  category: Category;
  content: PostContent;
};

export interface AuthorInfoProps {
  author: Author;
  date: string;
  className?: string;
}

export interface CategoryBadgeProps {
  category: CategoryType;
  variant?: "default" | "featured" | "primary" | "secondary";
  className?: string;
}