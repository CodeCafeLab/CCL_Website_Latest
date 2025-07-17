import { NextRequest, NextResponse } from "next/server";

const aiItems: { id: string; title: string; description: string }[] = [
  { id: "1", title: "AI Tool 1", description: "Description for AI Tool 1" },
  { id: "2", title: "AI Tool 2", description: "Description for AI Tool 2" },
];

export async function GET() {
  return NextResponse.json(aiItems);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newItem = {
    id: (Date.now() + Math.random()).toString(),
    title: body.title,
    description: body.description,
  };
  aiItems.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}
