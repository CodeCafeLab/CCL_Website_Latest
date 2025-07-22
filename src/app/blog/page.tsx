"use client";

import { Suspense } from "react";
import BlogClient from "./BlogClient";

export default function BlogPage() {
  // Data fetching is now done in BlogClient
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
