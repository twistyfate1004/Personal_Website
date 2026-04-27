import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

/**
 * Card component for displaying project information
 */
export function ProjectCard({ project }: ProjectCardProps) {
  // Handle description that can be either string or array
  const description = typeof project.description === 'string'
    ? [project.description]
    : project.description;

  return (
    <article className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-muted/30">
      {/* Header with title */}
      <div className="mb-3">
        <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
      </div>

      {/* Description */}
      {description && description.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-1">
            {description.map((item, idx) => {
              // Check if item is an object with isHeading property
              const isHeading = typeof item === 'object' && item.isHeading;
              const text = typeof item === 'object' ? item.title : item;

              return (
                <li key={idx} className={`${isHeading ? 'text-foreground font-semibold' : 'text-muted-foreground'} flex gap-2 text-sm`}>
                  {!isHeading && <span className="text-accent">•</span>}
                  <span className={isHeading ? 'mt-2 mb-1 block' : ''}>{text}</span>
                </li>
              );
            })}
          </ul>
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
      <div className="flex items-center gap-4">
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
