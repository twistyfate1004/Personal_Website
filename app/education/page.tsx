"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { MapPin, Calendar, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Education, RichTextItem } from "@/lib/data";

export default function EducationPage() {
  const { language, t } = useLanguage();
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const res = await fetch(`/api/data/education?lang=${language}`);
        const data = await res.json() as Education[];
        setEducation(data);
      } catch (error) {
        console.error("Failed to load education:", error);
      }
    }

    fetchEducation();
  }, [language]);

  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        {t.education.title}
      </h1>

      <p className="text-lg text-muted-foreground mb-12">
        {t.education.description}
      </p>

      {education.length > 0 ? (
        <div className="space-y-8">
          {education.map((edu) => (
            <article
              key={edu.id}
              className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-muted/30"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
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
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement: RichTextItem, idx: number) => {
                      const isHeading = typeof achievement === "object" && achievement.isHeading;
                      const text = typeof achievement === "object" ? achievement.title : achievement;

                      return (
                        <li key={idx} className={`${isHeading ? "text-foreground font-semibold" : "text-muted-foreground"} flex gap-2 text-sm`}>
                          {!isHeading && <span className="text-accent">•</span>}
                          <span className={isHeading ? "mt-2 mb-1 block" : ""}>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
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
