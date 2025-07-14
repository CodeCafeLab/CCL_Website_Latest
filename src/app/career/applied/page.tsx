"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // If you have user context
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppliedJobsPage() {
  const { user } = useAuth(); // Get logged-in user (must be implemented)
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    apiClient
      .get(`/job-applications?email=${encodeURIComponent(user.email)}`)
      .then((res) => setJobs(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (!user?.email) {
    return <div className="text-center py-12">Please log in to view your applied jobs.</div>;
  }

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto py-12">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/career">Back to Careers</Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">My Applied Jobs</h1>
      {jobs.length === 0 ? (
        <div className="text-center text-muted-foreground">You have not applied to any jobs yet.</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.job_title || job.jobId}</CardTitle>
              </CardHeader>
              <CardContent>
                <div><strong>Status:</strong> {job.status}</div>
                <div><strong>Applied on:</strong> {job.created_at ? new Date(job.created_at).toLocaleDateString() : "N/A"}</div>
                {/* Add more job info as needed */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
