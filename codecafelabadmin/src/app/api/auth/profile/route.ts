import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  // console.log("Proxy received Authorization header:", authHeader);

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Forward the request to your backend API
  const backendRes = await fetch("http://localhost:5000/api/auth/profile", {
    method: "GET",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });

  const data = await backendRes.json();
  // console.log("Backend response from /profile:", data);

  return NextResponse.json(data, { status: backendRes.status });
}
