import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./../../../lib/auth";

export async function GET(req: NextRequest) {
  const user = await verifyAuth(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ... your API logic for authenticated users ...
  return NextResponse.json({ data: "Secret data" });
}
