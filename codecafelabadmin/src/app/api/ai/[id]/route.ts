// src/app/api/ai/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Fetch all AI items from your backend
  const backendRes = await fetch("http://localhost:5000/api/ai");
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
