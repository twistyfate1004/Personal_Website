import { PostCard } from "@/components/writing/PostCard";
import { Container } from "@/components/layout/Container";
import { getAllPosts } from "@/lib/mdx";

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
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
