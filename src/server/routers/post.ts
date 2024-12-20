import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { type PostWithDetails, type PostContent } from '@/lib/types';

const createPostSchema = z.object({
  title: z.string().min(1, "Başlık gerekli"),
  content: z.object({
    sections: z.array(z.object({
      type: z.enum(["paragraph", "heading", "image"]),
      content: z.string(),
      imageUrl: z.string().optional()
    }))
  }) satisfies z.ZodType<PostContent>,
  categoryId: z.string().min(1, "Kategori gerekli"),
  image: z.string().optional(),
});

export const postRouter = router({
  getPosts: publicProcedure
    .query(async (): Promise<PostWithDetails[]> => {
      const posts = await prisma.post.findMany({
        include: {
          author: true,
          category: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return posts.map(post => ({
        ...post,
        content: typeof post.content === 'string' ? JSON.parse(post.content) : post.content
      }));
    }),

  getPostById: publicProcedure
    .input(z.string())
    .query(async ({ input }): Promise<PostWithDetails> => {
      const post = await prisma.post.findUnique({
        where: {
          id: input,
        },
        include: {
          author: true,
          category: true,
        },
      });

      if (!post) {
        throw new Error("Post bulunamadı");
      }

      return {
        ...post,
        content: typeof post.content === 'string' ? JSON.parse(post.content) : post.content
      };
    }),

  createPost: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }): Promise<PostWithDetails> => {
      return await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: JSON.stringify(input.content),
          categoryId: input.categoryId,
          image: input.image || null,
          authorId: ctx.session.user.id,
        },
        include: {
          author: true,
          category: true,
        }
      }).then(post => ({
        ...post,
        content: typeof post.content === 'string' ? JSON.parse(post.content) : post.content
      }));
    }),

  getRandomPost: publicProcedure
    .mutation(async (): Promise<PostWithDetails | null> => {
      const count = await prisma.post.count();
      const skip = Math.floor(Math.random() * count);
      
      const post = await prisma.post.findFirst({
        skip,
        include: {
          author: true,
          category: true,
        },
      });

      if (!post) {
        return null;
      }

      return {
        ...post,
        content: typeof post.content === 'string' ? JSON.parse(post.content) : post.content
      };
    }),
}); 