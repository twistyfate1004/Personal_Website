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
      className="group block min-w-0 rounded-lg border border-border p-4 transition-all hover:border-accent hover:bg-muted/50 sm:p-6"
    >
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
