"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { Project } from "@/lib/data";

export default function ProjectsPage() {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`/api/data/projects?lang=${language}`);
        const data = await res.json() as Project[];
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }

    fetchProjects();
  }, [language]);

  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {t.projects.title}
      </h1>

      <p className="text-lg text-muted-foreground mb-12">
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
