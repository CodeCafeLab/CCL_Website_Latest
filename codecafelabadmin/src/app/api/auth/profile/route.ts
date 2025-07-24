import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL; // Server-side only variable (no NEXT_PUBLIC_)

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendRes = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();

  return NextResponse.json(data, { status: backendRes.status });
}
