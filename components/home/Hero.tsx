"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiteConfig } from "@/lib/data";

/**
 * Hero section with name, tagline, motto, and avatar
 */
export function Hero() {
  const { language } = useLanguage();
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(`/api/data/config?lang=${language}`);
        const data = await res.json() as SiteConfig;
        setConfig(data);
      } catch (error) {
        console.error("Failed to load config:", error);
      }
    }

    fetchConfig();
  }, [language]);

  if (!config) {
    return null;
  }

  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left side: Text content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
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
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden bg-muted">
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
