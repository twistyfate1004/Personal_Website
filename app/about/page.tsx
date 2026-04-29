import { Container } from "@/components/layout/Container";
import { getConfig, getTimeline, getSkillsAndInterests } from "@/lib/data";

const typeIcons = {
  work: "💼",
  education: "🎓",
  other: "📍",
};

export default function AboutPage() {
  const config = getConfig();
  const timeline = getTimeline();
  const skillsAndInterests = getSkillsAndInterests();

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl md:text-5xl">
        About
      </h1>

      {/* Bio section */}
      <section className="mb-12">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed whitespace-pre-line sm:text-lg">
            {config.bio}
          </p>
        </div>
      </section>

      {/* Skills section */}
      {skillsAndInterests.skills && skillsAndInterests.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="space-y-6">
            {skillsAndInterests.skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-muted-foreground tracking-wide mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
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
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {skillsAndInterests.interests.map((interest, index) => (
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
        <section>
          <h2 className="text-2xl font-bold mb-6">Timeline</h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative pl-6 pb-6 border-l-2 border-border last:pb-0 last:border-0"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[9px] rounded-full bg-accent" />

                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {typeIcons[item.type]} {item.title}
                  </h3>
                  <span className="text-sm text-muted-foreground sm:whitespace-nowrap">
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
