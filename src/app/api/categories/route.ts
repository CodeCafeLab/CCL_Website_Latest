import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api";

export async function GET() {
  try {
    const res = await apiClient.get(`/categories`);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("API Error fetching categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories", error: error.message },
      { status: 500 }
    );
  }
}
