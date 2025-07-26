import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Registration is disabled
  return NextResponse.json(
    { message: "Registration is disabled" },
    { status: 404 }
  );
}
