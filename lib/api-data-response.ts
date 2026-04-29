import { NextRequest, NextResponse } from "next/server";

type ContentLanguage = "en" | "zh";
type DataReader<T> = (language: ContentLanguage) => T;

function parseLanguage(request: NextRequest): ContentLanguage {
  return request.nextUrl.searchParams.get("lang") === "zh" ? "zh" : "en";
}

export function createDataGetHandler<T>(
  readData: DataReader<T>,
  errorMessage: string
) {
  return function GET(request: NextRequest) {
    try {
      return NextResponse.json(readData(parseLanguage(request)));
    } catch {
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  };
}
