import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ve şifre gerekli");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            image: true
          }
        });

        if (!user || !user.password) {
          throw new Error("Email veya şifre hatalı");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Email veya şifre hatalı");
        }

        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user?.id || token.id as string;
      }
      return session;
    }
  },
  events: {
    async signIn({ user }) {
      // Önce süresi geçmiş session'ları temizle
      await prisma.session.deleteMany({
        where: {
          OR: [
            { expires: { lte: new Date() } },
            { userId: user.id }
          ]
        }
      });

      // Yeni session oluştur - 30 dakika
      const sessionToken = randomUUID();
      const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 dakika

      await prisma.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expires
        }
      });
    }
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 dakika (saniye cinsinden)
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 