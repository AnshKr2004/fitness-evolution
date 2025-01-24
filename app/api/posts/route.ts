import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { client as sanityClient } from "@/sanity/lib/client"

const prisma = new PrismaClient()

export async function GET() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    author->{name, image},
    body,
    publishedAt
  }`
  const posts = await sanityClient.fetch(query)

  const postsWithLikes = await Promise.all(
    posts.map(async (post: any) => ({
      ...post,
      likes: await prisma.like.count({
        where: { postId: post._id },
      }),
    })),
  )

  return NextResponse.json(postsWithLikes)
}