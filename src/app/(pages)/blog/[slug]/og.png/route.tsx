/* eslint-disable @next/next/no-img-element */
// [slug]/og.png/route.ts

import { getAllPosts, getPostBySlug } from "@/lib/api";
import { BASE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

const size = {
  width: 1200,
  height: 630,
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function GET(req: Request, { params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const absoluteImageUrl = BASE_URL + post.posterImage.url;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: post.posterImage.bgColor || "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={absoluteImageUrl} alt={post.title} width={500} height={500} />
      </div>
    ),
    {
      ...size,
    }
  );
}
