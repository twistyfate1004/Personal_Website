import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getProjects } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const projects = getProjects(language);
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}
