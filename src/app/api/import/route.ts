
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiClient } from "@/lib/api";

// This is a simplified parser. For production, a more robust library like 'papaparse' might be better.
const parseCsv = (csvText: string): Record<string, string>[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const header = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    if (values.length !== header.length) continue; // Skip malformed rows

    const rowObject = header.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {} as Record<string, string>);
    rows.push(rowObject);
  }
  return rows;
};

// Define Zod schemas for validation
const blogPostSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  status: z.enum(['published', 'draft']),
  category: z.string().optional(),
  tags: z.string().transform(val => val.split('|').map(t => t.trim())), // Assuming tags are pipe-separated in CSV
  read_time: z.string().optional(),
  summary: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  featured: z.preprocess(val => String(val).toLowerCase() === 'true' || val === '1', z.boolean()),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const importType = formData.get("importType") as string;
    const file = formData.get("file") as File | null;

    if (!importType || !file) {
      return NextResponse.json({ success: false, message: "Missing import type or file." }, { status: 400 });
    }

    if (file.type !== "text/csv") {
      return NextResponse.json({ success: false, message: "Invalid file type. Only CSV is accepted." }, { status: 400 });
    }

    const fileContent = await file.text();
    const data = parseCsv(fileContent);

    let successCount = 0;
    let errorCount = 0;
    const errors: { row: number; error: string }[] = [];

    // This is where you'd have a switch or if/else for different import types
    if (importType === "blogs") {
      for (const [index, row] of data.entries()) {
        const validation = blogPostSchema.safeParse(row);
        if (validation.success) {
          try {
            // Here you would call your backend API to create the blog post
            // For this example, we'll assume a `POST /blogs` endpoint exists.
            // await apiClient.post('/blogs', validation.data);
            console.log("Simulating API call for:", validation.data);
            await new Promise(res => setTimeout(res, 50)); // Simulate network delay
            successCount++;
          } catch (apiError: any) {
            errorCount++;
            errors.push({ row: index + 2, error: apiError.message || "API error" });
          }
        } else {
          errorCount++;
          errors.push({ row: index + 2, error: validation.error.flatten().fieldErrors.toString() });
        }
      }
    } else {
        return NextResponse.json({ success: false, message: `Import type '${importType}' is not supported.` }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Import for ${importType} processed.`,
      successCount,
      errorCount,
      errors,
    });

  } catch (error: any) {
    console.error("[IMPORT_API_ERROR]", error);
    return NextResponse.json({ success: false, message: error.message || "An internal server error occurred." }, { status: 500 });
  }
}
