import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSkillsAndInterests } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const skillsAndInterests = getSkillsAndInterests(language);
    return NextResponse.json(skillsAndInterests);
  } catch {
    return NextResponse.json({ error: "Failed to load skills and interests" }, { status: 500 });
  }
}
