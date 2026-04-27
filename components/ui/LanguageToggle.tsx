"use client";

import { Languages } from "lucide-react";

/**
 * Language toggle button to switch between English and Chinese
 */
export function LanguageToggle() {
  return (
    <button
      disabled
      className="p-2 rounded-lg opacity-50 cursor-not-allowed flex items-center gap-1"
      aria-label="Language toggle disabled"
      title="当前仅支持中文 / Chinese only"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">
        中文
      </span>
    </button>
  );
}
