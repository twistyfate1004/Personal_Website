import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getTimeline } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const timeline = getTimeline(language);
    return NextResponse.json(timeline);
  } catch {
    return NextResponse.json({ error: "Failed to load timeline" }, { status: 500 });
  }
}
