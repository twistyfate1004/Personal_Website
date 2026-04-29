"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiteConfig } from "@/lib/data";
import { useDataResource } from "@/hooks/useDataResource";

/**
 * Hero section with name, tagline, motto, and avatar
 */
export function Hero() {
  const { language } = useLanguage();
  const config = useDataResource<SiteConfig | null>("config", language, null);

  if (!config) {
    return null;
  }

  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left side: Text content */}
        <div className="min-w-0 flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 break-words">
            {config.name}
          </h1>

          {config.tagline && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {config.tagline}
            </p>
          )}

          {config.motto && (
            <p className="text-lg md:text-xl text-muted-foreground/80 italic">
              &ldquo;{config.motto}&rdquo;
            </p>
          )}
        </div>

        {/* Right side: Avatar image */}
        {config.avatar && (
          <div className="flex-shrink-0">
            <div className="relative h-44 w-44 overflow-hidden rounded-lg bg-muted sm:h-48 sm:w-48 md:h-56 md:w-56">
              <Image
                src={config.avatar}
                alt={config.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
