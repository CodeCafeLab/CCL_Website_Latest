"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Briefcase, Layers, Calendar, DollarSign, Star } from "lucide-react";

export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/case-studies/${id}`)
      .then(res => setCaseStudy(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!caseStudy) return <div className="text-center py-12">Case study not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Image */}
        {caseStudy.image_url && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={caseStudy.image_url}
              alt={caseStudy.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{caseStudy.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {caseStudy.client_name}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> {caseStudy.industry}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {caseStudy.duration} mo
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" /> ₹{caseStudy.budget}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" /> {caseStudy.status}
            </span>
          </div>
        </div>
        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-muted-foreground">{caseStudy.summary}</p>
        </div>
        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{caseStudy.content}</div>
        </div>
        {/* Technologies */}
        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" /> Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech: string, idx: number) => (
                <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Results */}
        {caseStudy.results && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <div className="bg-accent/10 p-4 rounded-lg text-sm">{caseStudy.results}</div>
          </div>
        )}
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          Created: {new Date(caseStudy.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(caseStudy.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
