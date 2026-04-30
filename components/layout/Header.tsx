"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

function TeruTeruMark() {
  return (
    <svg
      className="site-mark-logo"
      viewBox="0 0 88 104"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M44 13V4"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <path
        d="M21 53C15.6 60.3 11.3 74.1 8.4 91.4C17 88.9 23 90.7 28.3 95.1C33 99 39 98.3 44 91.8C49 98.3 55 99 59.7 95.1C65 90.7 71 88.9 79.6 91.4C76.7 74.1 72.4 60.3 67 53"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 55.7C33.8 61.3 54.2 61.3 64.5 55.7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.72"
      />
      <circle
        cx="44"
        cy="35"
        r="27"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M34 32.8H34.2"
        stroke="currentColor"
        strokeWidth="4.8"
        strokeLinecap="round"
      />
      <path
        d="M53.8 32.8H54"
        stroke="currentColor"
        strokeWidth="4.8"
        strokeLinecap="round"
      />
      <path
        d="M34.2 44.3C37 48.5 40.2 50.3 44 50.3C47.8 50.3 51 48.5 53.8 44.3"
        stroke="currentColor"
        strokeWidth="2.9"
        strokeLinecap="round"
      />
      <path
        d="M62.2 69.8C64.4 75 65.8 80.2 66.6 85.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.46"
      />
    </svg>
  );
}

/**
 * Site header with navigation, theme toggle and language toggle
 */
export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname === "/") {
    return null;
  }

  const navigation = [
    { name: t.nav.home, href: "/home" },
    { name: t.nav.projects, href: "/projects" },
    { name: t.nav.workExperience, href: "/work-experience" },
    { name: t.nav.education, href: "/education" },
    { name: t.nav.lives, href: "/lives" },
  ];

  return (
    <header className="border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-3">
          {/* Logo/name */}
          <Link
            href="/home"
            className="site-mark"
            aria-label="返回首页"
            title={t.nav.home}
          >
            <TeruTeruMark />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex min-w-0 items-center justify-end gap-x-6 gap-y-2 lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent whitespace-nowrap",
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button, theme toggle & language toggle */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="返回封面页"
              title="返回封面页"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <LanguageToggle />
            <ThemeToggle />
            {/* Mobile menu could be added here */}
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium leading-7 transition-colors hover:text-accent",
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
