"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { Project } from "@/lib/data";
import { useDataResource } from "@/hooks/useDataResource";

export default function ProjectsPage() {
  const { language, t } = useLanguage();
  const projects = useDataResource<Project[]>("projects", language, []);

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        {t.projects.title}
      </h1>

      <p className="mb-10 text-base text-muted-foreground sm:mb-12 sm:text-lg">
        {t.projects.description}
      </p>

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  );
}
