/* eslint-disable @next/next/no-img-element */
import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const contentType = "image/png";

export const size = {
  width: 1600,
  height: 800,
};

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={post.posterImage.url} alt={post.title} />
      </div>
    ),
    {
      ...size,
    }
  );
}
