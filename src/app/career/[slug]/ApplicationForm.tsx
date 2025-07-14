"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { apiClient } from "@/lib/api";

const applicationSchema = z.object({
  applicant_name: z.string().min(2, "Name is required"),
  applicant_email: z.string().email("Valid email required"),
  applicant_phone: z.string().optional(),
  resume_url: z.string().url("Resume URL required").optional(),
  portfolio_url: z.string().url().optional(),
  linkedin_url: z.string().url().optional(),
  github_url: z.string().url().optional(),
  experience_years: z.coerce
    .number()
    .min(0, "Years of experience required")
    .optional(),
  current_company: z.string().optional(),
  current_position: z.string().optional(),
  expected_salary: z.coerce
    .number()
    .min(0, "Expected salary required")
    .optional(),
  notice_period: z.string().optional(),
  resume: z.any().optional(), // Accepts File
  cover_letter: z.any().optional(), // Accepts File
});

type ApplicationFormFields = z.infer<typeof applicationSchema>;

export default function ApplicationForm({
  jobId,
  jobTitle,
  onSuccess, // <-- add this prop
}: {
  jobId: string;
  jobTitle: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [coverLetterUrl, setCoverLetterUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormFields>({
    resolver: zodResolver(applicationSchema),
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setUrl: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Replace with your actual preset
      // For PDF/DOCX, use 'raw' resource type
      const res = await fetch("https://api.cloudinary.com/v1_1/dubvzmk7g/raw/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUrl(data.secure_url);
    }
  };

  const onSubmit = async (data: ApplicationFormFields) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...data,
        job_id: jobId,
        job_title: jobTitle,
        resume_url: resumeUrl,
        cover_letter_url: coverLetterUrl,
      };
      await apiClient.post("/job-applications", payload);
      setSuccess("Application submitted successfully!");
      reset();
      setResumeUrl(null);
      setCoverLetterUrl(null);
      if (onSuccess) onSuccess();
    } catch (e: any) {
      setError(e.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-12 shadow-xl border-primary/20 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary mb-2">
          Apply for this Position
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Fill out the form below to apply for <span className="font-semibold">{jobTitle}</span>.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Full Name *</label>
                <Input
                  {...register("applicant_name")}
                  placeholder="Your Name"
                  className={errors.applicant_name ? "border-red-500" : ""}
                />
                {errors.applicant_name && (
                  <span className="text-red-600 text-xs">{errors.applicant_name.message}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Email *</label>
                <Input
                  type="email"
                  {...register("applicant_email")}
                  placeholder="you@example.com"
                  className={errors.applicant_email ? "border-red-500" : ""}
                />
                {errors.applicant_email && (
                  <span className="text-red-600 text-xs">{errors.applicant_email.message}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <Input
                  {...register("applicant_phone")}
                  placeholder="Phone Number"
                />
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
            </div>
          </div>

          {/* Professional Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Professional Links</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Portfolio URL</label>
                <Input
                  {...register("portfolio_url")}
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">LinkedIn URL</label>
                <Input
                  {...register("linkedin_url")}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">GitHub URL</label>
                <Input
                  {...register("github_url")}
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Experience</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Years of Experience</label>
                <Input
                  type="number"
                  min={0}
                  {...register("experience_years")}
                  placeholder="e.g. 3"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Current Company</label>
                <Input
                  {...register("current_company")}
                  placeholder="Current company"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Current Position</label>
                <Input
                  {...register("current_position")}
                  placeholder="Current position"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Expected Salary (INR)</label>
                <Input
                  type="number"
                  min={0}
                  {...register("expected_salary")}
                  placeholder="e.g. 1200000"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Notice Period</label>
                <Input
                  {...register("notice_period")}
                  placeholder="e.g. 2 months"
                />
              </div>
            </div>
          </div>

          {/* File Uploads Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Documents</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="resume" className="block mb-1 font-medium">
                  Resume (PDF/DOCX):
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={e => handleFileUpload(e, setResumeUrl)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <span className="text-xs text-muted-foreground">Max 2MB. PDF or DOCX only.</span>
                {resumeUrl && (
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs">Resume uploaded</a>
                )}
              </div>
              <div>
                <label htmlFor="cover_letter" className="block mb-1 font-medium">
                  Cover Letter (PDF/DOCX):
                </label>
                <input
                  type="file"
                  id="cover_letter"
                  accept=".pdf,.doc,.docx"
                  onChange={e => handleFileUpload(e, setCoverLetterUrl)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <span className="text-xs text-muted-foreground">Optional. Max 2MB.</span>
                {coverLetterUrl && (
                  <a href={coverLetterUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs">Cover letter uploaded</a>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button and Feedback */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full text-lg flex items-center justify-center gap-2"
              size="lg"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
            {success && (
              <div className="text-green-600 text-center mt-4">{success}</div>
            )}
            {error && (
              <div className="text-red-600 text-center mt-4">{error}</div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
