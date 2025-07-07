
import { NextResponse } from 'next/server';
import { getAllBlogs as fetchAllBlogsFromLib } from '@/lib/blog-data';

export async function GET() {
  try {
    const blogs = await fetchAllBlogsFromLib();
    // The library function handles error logging and returns an array.
    // We wrap it in a `blogs` object to provide a consistent API response structure.
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/blogs route handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
