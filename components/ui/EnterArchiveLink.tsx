"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

export function EnterArchiveLink() {
  const { setTheme } = useTheme();

  return (
    <Link
      href="/home"
      className="cover-enter-button"
      onClick={() => setTheme("dark")}
    >
      <span>Enter Archive</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
