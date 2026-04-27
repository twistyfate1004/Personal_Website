import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const contentDirectory = path.join(process.cwd(), "content");

export interface PostMetadata {
  title: string;
  date: string;
  summary: string;
  slug: string;
  readingTime?: number;
}

export interface Post extends PostMetadata {
  content: string;
}

/**
 * Get all posts from content/writing directory
 */
export function getAllPosts(): PostMetadata[] {
  const writingDir = path.join(contentDirectory, "writing");

  // Check if directory exists
  if (!fs.existsSync(writingDir)) {
    return [];
  }

  const filenames = fs.readdirSync(writingDir);
  const posts = filenames
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(writingDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      // Extract slug from filename (remove date prefix and extension)
      const slug = filename
        .replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/\.(mdx|md)$/, "");

      return {
        title: data.title || "",
        date: data.date || "",
        summary: data.summary || "",
        slug,
      };
    });

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  const writingDir = path.join(contentDirectory, "writing");

  if (!fs.existsSync(writingDir)) {
    return null;
  }

  // Find the file matching the slug
  const filenames = fs.readdirSync(writingDir);
  const filename = filenames.find((f) => f.endsWith(`${slug}.mdx`) || f.endsWith(`${slug}.md`));

  if (!filename) {
    return null;
  }

  const filePath = path.join(writingDir, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || "",
    date: data.date || "",
    summary: data.summary || "",
    slug,
    content,
  };
}

/**
 * Serialize MDX content for rendering
 */
export async function serializeMDX(content: string) {
  return await serialize(content);
}
