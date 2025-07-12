import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const backendRes = await fetch("http://localhost:5000/api/teams", {
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

  const backendRes = await fetch("http://localhost:5000/api/teams", {
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
