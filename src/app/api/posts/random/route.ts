import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Rastgele bir post getir
    const postsCount = await prisma.post.count();
    const skip = Math.floor(Math.random() * postsCount);
    
    const post = await prisma.post.findFirst({
      skip: skip,
      take: 1,
    });

    if (!post) {
      return NextResponse.json({ error: "Post bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 