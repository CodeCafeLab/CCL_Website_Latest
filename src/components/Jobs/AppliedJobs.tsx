import { useEffect, useState } from "react";
import { apiClient, JobApplication, Career } from "@/lib/api";
import JobCard from "./JobCard";

export default function AppliedJobs({
  applicantEmail,
}: {
  applicantEmail: string;
}) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!applicantEmail) return;
    apiClient
      .get(
        `/job-applications?applicant_email=${encodeURIComponent(
          applicantEmail
        )}`
      )
      .then(async (res) => {
        setApplications(res.data);
        // Fetch job details for each application
        const jobDetails = await Promise.all(
          res.data.map((app: JobApplication) =>
            apiClient.get(`/careers/${app.job_id}`).then((res) => res.data)
          )
        );
        setJobs(jobDetails);
      })
      .finally(() => setLoading(false));
  }, [applicantEmail]);

  if (loading) return <div>Loading your applications...</div>;
  if (jobs.length === 0)
    return <div>You have not applied to any jobs yet.</div>;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job, idx) => (
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
  );
}
