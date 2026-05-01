"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { BrandMark } from "@/components/ui/BrandMark";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

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
            <BrandMark className="site-mark-logo" />
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
