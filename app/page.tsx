"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { PersonalInfo } from "@/components/home/PersonalInfo";
import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkillsAndInterests, SkillCategory, TimelineItem } from "@/lib/data";

const typeIcons: { [key: string]: string } = {
  work: "💼",
  education: "🎓",
  other: "📍",
};

export default function Home() {
  const { language, t } = useLanguage();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [skillsAndInterests, setSkillsAndInterests] = useState<SkillsAndInterests>({
    skills: [],
    interests: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [timelineRes, skillsRes] = await Promise.all([
          fetch(`/api/data/timeline?lang=${language}`),
          fetch(`/api/data/skills-interests?lang=${language}`),
        ]);

        const [timelineData, skillsData] = await Promise.all([
          timelineRes.json() as Promise<TimelineItem[]>,
          skillsRes.json() as Promise<SkillsAndInterests>,
        ]);

        setTimeline(timelineData);
        setSkillsAndInterests(skillsData);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }

    fetchData();
  }, [language]);

  return (
    <Container>
      <Hero />
      <PersonalInfo />

      {/* Skills section */}
      {skillsAndInterests.skills && skillsAndInterests.skills.length > 0 && (
        <section id="skills" className="py-8 border-t border-border">
          <h2 className="text-sm font-semibold text-foreground tracking-wide mb-6">
            {t.home.skills}
          </h2>
          <div className="space-y-6">
            {skillsAndInterests.skills.map((skillGroup: SkillCategory) => (
              <div key={skillGroup.category}>
                <h3 className="text-sm font-semibold text-foreground tracking-wide mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-muted rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests section */}
      {skillsAndInterests.interests && skillsAndInterests.interests.length > 0 && (
        <section id="interests" className="py-8 border-t border-border">
          <h2 className="text-sm font-semibold text-foreground tracking-wide mb-6">
            {t.home.interests}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsAndInterests.interests.map((interest: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Timeline section */}
      {timeline.length > 0 && (
        <section id="timeline" className="py-8 border-t border-border">
          <h2 className="text-sm font-semibold text-foreground tracking-wide mb-6">
            {t.home.timeline}
          </h2>
          <div className="space-y-6">
            {timeline.map((item: TimelineItem, index: number) => (
              <div
                key={index}
                className="relative pl-6 pb-6 border-l-2 border-border last:pb-0 last:border-0"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[9px] rounded-full bg-accent" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    {typeIcons[item.type]} {item.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {item.year}
                  </span>
                </div>

                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
