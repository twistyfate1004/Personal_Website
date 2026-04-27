import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getConfig } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("lang") || "en";

  try {
    const config = getConfig(language);
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: "Failed to load config" }, { status: 500 });
  }
}
