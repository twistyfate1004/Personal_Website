"use client";

import { Container } from "@/components/layout/Container";
import { MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WorkExperience } from "@/lib/data";
import { useDataResource } from "@/hooks/useDataResource";
import { RichTextList } from "@/components/ui/RichTextList";

export default function WorkExperiencePage() {
  const { language, t } = useLanguage();
  const experiences = useDataResource<WorkExperience[]>(
    "work-experience",
    language,
    []
  );

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        {t.workExperience.title}
      </h1>

      <p className="mb-10 text-base text-muted-foreground sm:mb-12 sm:text-lg">
        {t.workExperience.description}
      </p>

      {experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="min-w-0 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:border-accent sm:p-6"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold mb-1">{exp.company}</h2>
                    <p className="text-lg text-muted-foreground">
                      {exp.position}
                    </p>
                  </div>
                  {exp.current && (
                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium whitespace-nowrap">
                      {t.workExperience.current}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {exp.startDate} - {exp.endDate || t.workExperience.current}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {t.workExperience.workDescription}
                </h3>
                <RichTextList items={exp.description} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t.workExperience.noData}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.workExperience.addData}
          </p>
        </div>
      )}
    </Container>
  );
}
