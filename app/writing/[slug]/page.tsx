import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MDXContent } from "@/components/writing/MDXContent";
import { TableOfContents } from "@/components/writing/TableOfContents";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-10 sm:py-12">
      <TableOfContents />

      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all posts
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readingTime && (
              <span>• {post.readingTime} min read</span>
            )}
          </div>
        </header>

        <MDXContent content={post.content} />
      </article>
    </Container>
  );
}
