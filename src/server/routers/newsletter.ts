import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { type Newsletter } from '@prisma/client';

const subscribeSchema = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz"),
});

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(subscribeSchema)
    .mutation(async ({ input }): Promise<Newsletter> => {
      try {
        const existingSubscriber = await prisma.newsletter.findUnique({
          where: {
            email: input.email,
          },
        });

        if (existingSubscriber) {
          throw new Error("Bu email adresi zaten kayıtlı!");
        }

        return await prisma.newsletter.create({
          data: {
            email: input.email,
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Newsletter kaydı sırasında bir hata oluştu");
      }
    }),
}); 