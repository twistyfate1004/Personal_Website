import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { PostMetadata } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: PostMetadata;
}

/**
 * Card component for displaying blog post information
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="block p-6 rounded-lg border border-border hover:border-accent hover:bg-muted/50 transition-all group"
    >
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        {post.readingTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
        {post.title}
      </h2>

      <p className="text-muted-foreground line-clamp-2">{post.summary}</p>
    </Link>
  );
}
