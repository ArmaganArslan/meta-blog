import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { type User } from '@prisma/client';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterResponse = {
  success: boolean;
  user: User;
};

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }): Promise<RegisterResponse> => {
      const { name, email, password } = input;

      const exists = await prisma.user.findUnique({
        where: { email },
      });

      if (exists) {
        throw new Error("Bu email adresi zaten kayıtlı");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await prisma.account.create({
        data: {
          userId: user.id,
          type: "credentials",
          provider: "credentials",
          providerAccountId: user.id,
        },
      });

      return { success: true, user };
    }),
}); 