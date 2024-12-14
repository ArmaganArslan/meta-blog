import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export interface Author {
  name: string;
  image: string;
}

export interface PostType {
  id: string;
  category: string;
  title: string;
  author: Author;
  date: string;
  image: string;
}

export interface PostContent {
  sections: {
    type: 'paragraph' | 'heading' | 'image';
    content: string;
    imageUrl?: string;
  }[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface PrismaPost extends Omit<Post, 'content'> {
  content: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}