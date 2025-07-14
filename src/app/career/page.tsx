"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient, type Career } from "@/lib/api";
import JobCard from "./../../components/Jobs/JobCard";
import { Button } from "@/components/ui/button";

export default function CareerPage() {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/careers")
      .then((res) => setJobs(res.data))
      .finally(() => setLoading(false));
  }, []);

  console.log(jobs, "jobs");

  if (loading) return <div>Loading...</div>;

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
