import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getWorkExperiences } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const workExperiences = getWorkExperiences(language);
    return NextResponse.json(workExperiences);
  } catch {
    return NextResponse.json({ error: "Failed to load work experiences" }, { status: 500 });
  }
}
