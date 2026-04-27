import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getLives } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const lives = getLives(language);
    return NextResponse.json(lives);
  } catch {
    return NextResponse.json({ error: "Failed to load lives" }, { status: 500 });
  }
}
