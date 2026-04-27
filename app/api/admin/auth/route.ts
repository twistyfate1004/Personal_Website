import { NextRequest, NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  createAdminSession,
  isAdminConfigured,
  isAdminRequest,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authenticated = await isAdminRequest(request);

  return NextResponse.json({
    authenticated,
    configured: isAdminConfigured(),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "管理员密码未配置，请先设置 ADMIN_PASSWORD 环境变量。" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json() as { password?: string };
    const password = body.password ?? "";

    if (!(await verifyAdminPassword(password))) {
      return NextResponse.json({ error: "密码不正确" }, { status: 401 });
    }

    const response = NextResponse.json({ authenticated: true });
    setAdminSessionCookie(response, await createAdminSession());
    return response;
  } catch {
    return NextResponse.json({ error: "登录失败" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  clearAdminSessionCookie(response);
  return response;
}
