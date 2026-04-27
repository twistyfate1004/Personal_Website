"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Force language to be Chinese only - English disabled but code preserved
  const [language, setLanguageState] = useState<Language>("zh");

  const setLanguage = () => {
    // Language switching disabled - always use Chinese
    // setLanguageState(lang);
    // localStorage.setItem("language", lang);

    // Keep language as Chinese
    setLanguageState("zh");
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
