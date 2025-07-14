import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const backendRes = await fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
export async function GET() {
  const backendRes = await fetch("http://localhost:5000/api/contact");
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
