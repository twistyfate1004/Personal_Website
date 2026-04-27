import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getEducation } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const education = getEducation(language);
    return NextResponse.json(education);
  } catch {
    return NextResponse.json({ error: "Failed to load education" }, { status: 500 });
  }
}
