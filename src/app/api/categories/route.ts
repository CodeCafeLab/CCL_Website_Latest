import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:5000/api";

if (!API_BASE_URL) {
  throw new Error("BACKEND_API_URL environment variable is not set.");
}

export async function GET() {
  try {
    const res = await fetch(`http://localhost:5000/api/categories`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error fetching categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories", error: error.message },
      { status: 500 }
    );
  }
}
