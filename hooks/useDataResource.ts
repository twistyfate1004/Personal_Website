"use client";

import { useEffect, useState } from "react";
import { Language } from "@/lib/translations";

export function useDataResource<T>(
  resource: string,
  language: Language,
  initialValue: T
) {
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const params = new URLSearchParams({ lang: language });
        const response = await fetch(`/api/data/${resource}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load ${resource}: ${response.status}`);
        }

        setData((await response.json()) as T);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error(`Failed to load ${resource}:`, error);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [language, resource]);

  return data;
}
