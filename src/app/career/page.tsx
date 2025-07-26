
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient, type Career } from "@/lib/api";
import JobCard from "./../../components/Jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => (
  <div className="p-6 bg-card rounded-xl shadow-md border border-border/60 flex flex-col gap-3">
    <div className="flex justify-between items-start">
      <Skeleton className="h-6 w-3/4 bg-muted" />
      <Skeleton className="h-5 w-16 bg-muted rounded-full" />
    </div>
    <div className="flex gap-3">
      <Skeleton className="h-4 w-24 bg-muted" />
      <Skeleton className="h-4 w-24 bg-muted" />
    </div>
    <Skeleton className="h-5 w-1/3 bg-muted" />
    <div className="flex flex-wrap gap-2 mt-2">
      <Skeleton className="h-5 w-12 bg-muted rounded-full" />
      <Skeleton className="h-5 w-20 bg-muted rounded-full" />
      <Skeleton className="h-5 w-16 bg-muted rounded-full" />
    </div>
  </div>
);


export default function CareerPage() {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/careers")
      .then((res) => setJobs(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Open Positions</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => <JobCardSkeleton key={index} />)}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Open Positions</h1>
      <div className="flex justify-end mb-6">
        <Button asChild variant="outline">
          <Link href="/career/applied">Show Applied Jobs</Link>
        </Button>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jobs
          .filter((job) => job.id !== undefined) // (optional: skip jobs without id)
          .map((job) => (
            <JobCard
              key={job.id ?? ""}
              job={{
                ...job,
                id: job.id ?? "",
                salary_min: job.salary_min?.toString(),
                salary_max: job.salary_max?.toString(),
                featured: job.featured ? 1 : 0, // Convert boolean to number
              }}
            />
          ))}
      </div>
    </div>
  );
}
