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
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
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
    async jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && user) {
        const sessionToken = randomUUID();
        
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        
        try {
          await prisma.session.create({
            data: {
              sessionToken: sessionToken,
              userId: user.id,
              expires: new Date(Date.now() + 30 * 60 * 1000),
            },
          });
        } catch (error) {
          console.error("Session creation error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    }
  },
  events: {
    async signIn({ user }) {
      await prisma.session.deleteMany({
        where: {
          OR: [
            { expires: { lte: new Date() } },
            { userId: user.id }
          ]
        }
      });

      const sessionToken = randomUUID();
      const expires = new Date(Date.now() + 30 * 60 * 1000);

      await prisma.session.create({
        data: {
          sessionToken,
          userId: user.id,
          expires
        }
      });
    },
    async signOut({ session }) {
      if (session?.user?.id) {
        await prisma.session.deleteMany({
          where: {
            userId: session.user.id
          }
        });
      }
    }
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 