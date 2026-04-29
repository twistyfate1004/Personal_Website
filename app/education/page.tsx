"use client";

import { Container } from "@/components/layout/Container";
import { MapPin, Calendar, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Education } from "@/lib/data";
import { useDataResource } from "@/hooks/useDataResource";
import { RichTextList } from "@/components/ui/RichTextList";

export default function EducationPage() {
  const { language, t } = useLanguage();
  const education = useDataResource<Education[]>("education", language, []);

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        {t.education.title}
      </h1>

      <p className="mb-10 text-base text-muted-foreground sm:mb-12 sm:text-lg">
        {t.education.description}
      </p>

      {education.length > 0 ? (
        <div className="space-y-8">
          {education.map((edu) => (
            <article
              key={edu.id}
              className="min-w-0 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:border-accent sm:p-6"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold mb-1">{edu.institution}</h2>
                    <p className="text-lg text-muted-foreground">
                      {edu.degree}{language === "en" ? (edu.major ? " in " : "") : (edu.major ? " —— " : "")}{edu.major}
                    </p>
                  </div>
                  {edu.current && (
                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium whitespace-nowrap">
                      {t.education.current}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {edu.startDate} - {edu.current ? t.education.current : edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{t.education.gpa}: {edu.gpa}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coursework */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {t.education.relevantCoursework}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-muted rounded-md text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {t.education.achievements}
                  </h3>
                  <RichTextList items={edu.achievements} />
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t.education.noData}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.education.addData}
          </p>
        </div>
      )}
    </Container>
  );
}
