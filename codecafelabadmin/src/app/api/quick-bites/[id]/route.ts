import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const backendRes = await fetch(`http://localhost:5000/api/quick-bites/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");
  const body = await request.json();

  const backendRes = await fetch(`http://localhost:5000/api/quick-bites/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");

  const backendRes = await fetch(`http://localhost:5000/api/quick-bites/${params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
} 