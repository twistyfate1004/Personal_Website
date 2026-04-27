"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface PageTableOfContentsProps {
  title?: string;
}

/**
 * Page Table of Contents - Left side navigation
 * Automatically extracts headings from the page content
 */
export function PageTableOfContents({ title = "On this page" }: PageTableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from the main content
    const contentElement = document.querySelector("main");
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll("h2, h3, h4");

    const extractedHeadings: TocItem[] = Array.from(headingElements).map(
      (heading) => {
        const id = heading.id || `heading-${Math.random().toString(36).substr(2, 9)}`;

        // Add ID to the heading if it doesn't have one
        if (!heading.id) {
          heading.id = id;
        }

        return {
          id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1)),
        };
      }
    );

    const headingUpdate = window.setTimeout(() => {
      setHeadings(extractedHeadings);
    }, 0);

    // Set up intersection observer for active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      window.clearTimeout(headingUpdate);
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block fixed left-4 top-24 w-[110px] max-h-[calc(100vh-6rem)] overflow-y-auto">
      <nav className="space-y-2">
        <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          {title}
        </h4>
        <ul className="space-y-1 text-[10px]">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.5}rem` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full hover:text-accent transition-colors leading-snug break-words ${
                  activeId === heading.id
                    ? "text-accent font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
