import { NextRequest, NextResponse } from "next/server";
import {
  AdminLanguage,
  AdminResource,
  adminResources,
  getAdminDataFilename,
  readAdminData,
  writeAdminData,
} from "@/lib/admin-data";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseLanguage(value: string | null): AdminLanguage {
  return value === "zh" ? "zh" : "en";
}

function parseResource(value: string | null): AdminResource | null {
  if (value && adminResources.includes(value as AdminResource)) {
    return value as AdminResource;
  }

  return null;
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resource = parseResource(request.nextUrl.searchParams.get("resource"));
  const language = parseLanguage(request.nextUrl.searchParams.get("lang"));

  if (!resource) {
    return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
  }

  try {
    const data = await readAdminData(resource, language);
    return NextResponse.json({
      data,
      filename: getAdminDataFilename(resource, language),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resource = parseResource(request.nextUrl.searchParams.get("resource"));
  const language = parseLanguage(request.nextUrl.searchParams.get("lang"));

  if (!resource) {
    return NextResponse.json({ error: "Unsupported resource" }, { status: 400 });
  }

  try {
    const body = await request.json() as { data?: unknown };

    if (!Object.hasOwn(body, "data")) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const data = await writeAdminData(resource, language, body.data);
    return NextResponse.json({
      data,
      filename: getAdminDataFilename(resource, language),
    });
  } catch {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
