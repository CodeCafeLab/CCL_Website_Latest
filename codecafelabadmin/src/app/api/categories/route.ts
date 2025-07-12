import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const backendRes = await fetch("http://localhost:5000/api/categories", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const backendRes = await fetch("http://localhost:5000/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(request.headers.get("authorization") && { Authorization: request.headers.get("authorization")! }) },
    body: JSON.stringify(body),
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
} 