"use client";

import { Suspense } from "react";
import BlogClient from "./BlogClient";

export default function BlogPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
