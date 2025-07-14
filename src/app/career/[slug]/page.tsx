"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, BadgeCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ApplicationForm from "./ApplicationForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // adjust import as needed
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function JobDetailPage() {
  const { slug } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    apiClient
      .get(`/careers/${slug}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (!job) return <div className="text-center py-12">Job not found.</div>;

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Back to Careers Button */}
      <div className="mb-6">
        <Link href="/career">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Button>
        </Link>
      </div>
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
              {job.title}
              {job.featured ? (
                <span title="Featured">
                  <Star className="h-5 w-5 text-yellow-500" />
                </span>
              ) : null}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="capitalize">{job.type}</Badge>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {job.experience_level}
              </span>
              {job.department && (
                <Badge variant="secondary" className="ml-2">{job.department}</Badge>
              )}
            </div>
          </div>
          <Button
            className="mt-2 md:mt-0"
            size="lg"
            onClick={() => setIsFormOpen(true)}
          >
            Apply Now
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-muted-foreground">{job.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Requirements</h3>
            <p className="text-muted-foreground">{job.requirements}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-1">Responsibilities</h3>
            <p className="text-muted-foreground">{job.responsibilities}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Benefits</h3>
            <p className="text-muted-foreground">{job.benefits}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div>
            <h3 className="font-semibold mb-1">Salary</h3>
            <p className="text-foreground font-medium">
              ₹{job.salary_min} - ₹{job.salary_max} <span className="text-xs text-muted-foreground">/ month</span>
            </p>
          </div>
          {job.tags && job.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-6">
          Posted on: {new Date(job.created_at || job.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Application Form Sheet/Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent
          className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
          style={{ padding: 0 }}
        >
          <ApplicationForm
            jobId={job.id}
            jobTitle={job.title}
            onSuccess={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
