import { MDXRemote } from "next-mdx-remote/rsc";

interface MDXContentProps {
  content: string;
}

/**
 * Component to render MDX content
 */
export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote source={content} />
    </div>
  );
}
