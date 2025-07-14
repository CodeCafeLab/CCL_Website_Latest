import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const backendRes = await fetch("http://localhost:5000/api/teams/featured", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
} 