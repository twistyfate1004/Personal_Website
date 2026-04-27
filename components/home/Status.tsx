import { getStatus } from "@/lib/data";

/**
 * Current status / "now" section
 */
export function Status() {
  const status = getStatus();

  return (
    <section className="py-8 border-t border-border">
      <div className="flex items-start gap-3">
        {status.emoji && (
          <span className="text-2xl" role="img" aria-label="status emoji">
            {status.emoji}
          </span>
        )}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Now
          </h2>
          <p className="text-lg">{status.text}</p>
        </div>
      </div>
    </section>
  );
}
