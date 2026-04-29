"use client";

import { Mail, Phone, MapPin, Calendar, User, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiteConfig } from "@/lib/data";
import { useDataResource } from "@/hooks/useDataResource";

/**
 * Personal Information section
 * Displays contact details and basic info
 */
export function PersonalInfo() {
  const { language, t } = useLanguage();
  const config = useDataResource<SiteConfig | null>("config", language, null);

  if (!config) {
    return null;
  }

  const { personalInfo } = config;

  if (!personalInfo) {
    return null;
  }

  // Filter out empty fields
  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: personalInfo.email ? `mailto:${personalInfo.email}` : undefined,
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: personalInfo.phone ? `tel:${personalInfo.phone}` : undefined,
    },
    {
      icon: User,
      label: "MBTI",
      value: personalInfo.mbti,
    },
    {
      icon: Star,
      label: "Zodiac",
      value: personalInfo.zodiac,
    },
    {
      icon: Calendar,
      label: "Age",
      value: personalInfo.age ? `${personalInfo.age}岁` : undefined,
    },
    {
      icon: MapPin,
      label: "Hometown",
      value: personalInfo.hometown,
    },
    {
      icon: MapPin,
      label: "Base",
      value: personalInfo.baseLocation,
    },
  ].filter((item) => item.value !== undefined && item.value !== "");

  if (infoItems.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-8 border-t border-border">
        <h2 className="text-sm font-semibold text-foreground tracking-wide mb-6">
          {t.home.personalInfo}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground tracking-wide">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-medium hover:text-accent transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium">{item.value}</p>
                )}
              </>
            );

            return (
              <div
                key={index}
                className="flex min-w-0 flex-col rounded-lg bg-muted/30 p-4"
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* Self Description section */}
      {config.selfDescription && (
        <section className="py-8 border-t border-border">
          <h2 className="text-sm font-semibold text-foreground tracking-wide mb-4">
            {t.home.selfDescription}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {config.selfDescription}
          </p>
        </section>
      )}
    </>
  );
}
