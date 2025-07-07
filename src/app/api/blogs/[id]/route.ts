
import { NextResponse, type NextRequest } from 'next/server';
import { getBlog as fetchBlogFromLib } from '@/lib/blog-data';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
  }

  try {
    const blog = await fetchBlogFromLib(id);

    if (!blog) {
      return NextResponse.json({ message: `Blog with ID ${id} not found` }, { status: 404 });
    }

    // Wrap the single blog post in a `blog` object for a consistent API response.
    return NextResponse.json({ blog }, { status: 200 });

  } catch (error) {
    console.error(`Error in /api/blogs/${id} route handler:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
