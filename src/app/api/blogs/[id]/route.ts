
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
  }

  try {
    const backendUrl = `http://localhost:5000/api/blogs/${id}`;

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
      console.error(`Backend API error for blog ${id}:`, errorData);
      return NextResponse.json(
        { message: `Failed to fetch blog with ID ${id}`, error: errorData },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error(`Error in /api/blogs/${id} route:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
