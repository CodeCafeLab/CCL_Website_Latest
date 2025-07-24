import { NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL; // Server-side environment variable

export async function GET() {
  const backendRes = await fetch(`${BASE_URL}/teams/featured`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
