"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { RichTextItem, WorkExperience } from "@/lib/data";

export default function WorkExperiencePage() {
  const { language, t } = useLanguage();
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  useEffect(() => {
    async function fetchWorkExperiences() {
      try {
        const res = await fetch(`/api/data/work-experience?lang=${language}`);
        const data = await res.json() as WorkExperience[];
        setExperiences(data);
      } catch (error) {
        console.error("Failed to load work experiences:", error);
      }
    }

    fetchWorkExperiences();
  }, [language]);

  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {t.workExperience.title}
      </h1>

      <p className="text-lg text-muted-foreground mb-12">
        {t.workExperience.description}
      </p>

      {experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-muted/30"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
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
                <ul className="space-y-1">
                  {exp.description.map((item: RichTextItem, idx: number) => {
                    // Check if item is an object with isHeading property
                    const isHeading = typeof item === "object" && item.isHeading;
                    const text = typeof item === "object" ? item.title : item;

                    return (
                      <li key={idx} className={`${isHeading ? "text-foreground font-semibold" : "text-muted-foreground"} flex gap-2 text-sm`}>
                        {!isHeading && <span className="text-accent">•</span>}
                        <span className={isHeading ? "mt-2 mb-1 block" : ""}>{text}</span>
                      </li>
                    );
                  })}
                </ul>
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
