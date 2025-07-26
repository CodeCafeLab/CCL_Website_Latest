import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const backendRes = await fetch(`${BASE_URL}/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const body = await request.json();

  const backendRes = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
