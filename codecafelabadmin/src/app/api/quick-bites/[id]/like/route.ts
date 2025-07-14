import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const backendRes = await fetch(`http://localhost:5000/api/quick-bites/${params.id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
} 