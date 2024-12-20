import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login",
  },
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
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          throw new Error("Email veya şifre hatalı");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Email veya şifre hatalı");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: profile?.name || user.name,
            image: profile?.image || user.image,
            email: profile?.email || user.email,
          },
        });
      }

      const existingSession = await prisma.session.findFirst({
        where: { userId: user.id }
      });

      if (existingSession) {
        await prisma.session.update({
          where: { id: existingSession.id },
          data: {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        });
      } else {
        await prisma.session.create({
          data: {
            sessionToken: Math.random().toString(36).substring(2),
            userId: user.id,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        });
      }
    }
  },
}; 