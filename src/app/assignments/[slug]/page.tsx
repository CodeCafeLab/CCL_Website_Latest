"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Tag, Clock, Star, FileText } from "lucide-react";

export default function AssignmentDetailPage() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/assignments/${id}`)
      .then(res => setAssignment(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!assignment) return <div className="text-center py-12">Assignment not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-3xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/assignments" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Assignments
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Image */}
        {assignment.file_url && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={assignment.file_url}
              alt={assignment.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {assignment.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {assignment.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {assignment.estimated_time} hr
            </span>
            <span className="flex items-center gap-1">
              Status: <span className={assignment.status === "published" ? "text-green-600" : "text-yellow-600"}>{assignment.status}</span>
            </span>
          </div>
        </div>
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{assignment.description}</p>
        </div>
        {/* Requirements */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{assignment.requirements}</div>
        </div>
        {/* Tags */}
        {assignment.tags && assignment.tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" /> Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {assignment.tags.map((tag: string, idx: number) => (
                <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Solution Link */}
        {assignment.solution_url && (
          <div className="mb-6">
            <a
              href={assignment.solution_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 font-semibold transition"
            >
              View Solution
            </a>
          </div>
        )}
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          Created: {new Date(assignment.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(assignment.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
