"use client";

import { usePathname } from "next/navigation";
import type { SiteConfig } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDataResource } from "@/hooks/useDataResource";

/**
 * Site footer with copyright and social links
 */
export function Footer() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const config = useDataResource<SiteConfig | null>("config", language, null);
  const currentYear = new Date().getFullYear();

  if (pathname === "/" || !config) {
    return null;
  }

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground break-words">
            © {currentYear} {config.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
            {config.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
