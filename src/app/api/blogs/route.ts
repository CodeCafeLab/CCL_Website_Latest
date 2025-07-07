
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // In a real scenario, you would have your backend URL in an environment variable
    // const backendUrl = process.env.BACKEND_API_URL + '/blogs';
    const backendUrl = "http://localhost:5000/api/blogs";

    const backendRes = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Revalidate cache every 60 seconds
      next: { revalidate: 60 } 
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      console.error("Backend API error:", errorData);
      return NextResponse.json(
        { message: "Failed to fetch blogs from backend", error: errorData },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error in /api/blogs route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
