import { RichTextItem } from "@/lib/data";

interface RichTextListProps {
  items: RichTextItem[];
}

export function RichTextList({ items }: RichTextListProps) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => {
        const isHeading = typeof item === "object" && item.isHeading;
        const text = typeof item === "object" ? item.title : item;

        return (
          <li
            key={index}
            className={`${
              isHeading
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            } flex gap-2 text-sm`}
          >
            {!isHeading && <span className="text-accent">•</span>}
            <span className={isHeading ? "mt-2 mb-1 block" : ""}>
              {text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
