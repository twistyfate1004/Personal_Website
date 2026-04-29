import { PostCard } from "@/components/writing/PostCard";
import { Container } from "@/components/layout/Container";
import { getAllPosts } from "@/lib/mdx";

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        Writing
      </h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
