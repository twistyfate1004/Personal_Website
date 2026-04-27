"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuickLink {
  href: string;
  title: string;
  description: string;
}

const quickLinksEN: QuickLink[] = [
  {
    href: "/projects",
    title: "Projects",
    description: "See what I've been working on",
  },
  {
    href: "/lives",
    title: "Lives",
    description: "My daily life and moments",
  },
];

const quickLinksZH: QuickLink[] = [
  {
    href: "/projects",
    title: "项目",
    description: "查看我的项目作品",
  },
  {
    href: "/lives",
    title: "生活",
    description: "我的日常生活记录",
  },
];

/**
 * Quick links to main sections
 */
export function QuickLinks() {
  const { language, t } = useLanguage();
  const quickLinks = language === "zh" ? quickLinksZH : quickLinksEN;

  return (
    <section className="py-8 border-t border-border">
      <h2 className="text-sm font-semibold text-foreground tracking-wide mb-6">
        {t.home.quickLinks}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group p-6 rounded-lg border border-border hover:border-accent hover:bg-muted/50 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{link.title}</h3>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
