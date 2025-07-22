
"use client";

import BlogClient from "./BlogClient";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
