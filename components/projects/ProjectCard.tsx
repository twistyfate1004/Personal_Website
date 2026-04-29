import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/data";
import { RichTextList } from "@/components/ui/RichTextList";

interface ProjectCardProps {
  project: Project;
}

/**
 * Card component for displaying project information
 */
export function ProjectCard({ project }: ProjectCardProps) {
  // Handle description that can be either string or array
  const description = typeof project.description === "string"
    ? [project.description]
    : project.description;

  return (
    <article className="min-w-0 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:border-accent sm:p-6">
      {/* Header with title */}
      <div className="mb-3">
        <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
      </div>

      {/* Description */}
      {description && description.length > 0 && (
        <div className="mb-4">
          <RichTextList items={description} />
        </div>
      )}

      {/* Tech stack */}
      {project.tech && project.tech.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-muted rounded-md text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Demo and Code links */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Demo</span>
          </a>
        )}
      </div>
    </article>
  );
}
