import { router, publicProcedure } from '../trpc';
import { type Category } from "@prisma/client";

export const categoryRouter = router({
  getCategories: publicProcedure
    .query(async ({ ctx }): Promise<Category[]> => {
      try {
        return await ctx.prisma.category.findMany({
          orderBy: {
            name: 'asc'
          }
        });
      } catch (error) {
        console.error('Kategori yüklenirken hata:', error);
        throw error;
      }
    }),
}); 