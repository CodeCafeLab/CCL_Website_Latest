import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Star } from "lucide-react";

interface JobCardProps {
  job: {
    id: number | string;
    title: string;
    slug: string;
    location: string;
    type: string;
    experience_level: string;
    salary_min?: string;
    salary_max?: string;
    featured?: number;
    department?: string;
    tags?: string[];
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/career/${job.id}`} className="block h-full group">
      <Card className="h-full flex flex-col justify-between rounded-xl shadow-md border border-border/60 hover:shadow-xl transition-shadow duration-300 bg-card group-hover:border-primary/60">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {job.title}
              {job.featured ? (
                <span title="Featured">
                  <Star className="h-4 w-4 text-yellow-500" />
                </span>
              ) : null}
            </CardTitle>
            {job.department && (
              <div className="text-xs text-muted-foreground mt-1">{job.department}</div>
            )}
          </div>
          <Badge variant="outline" className="capitalize text-xs px-2 py-1">
            {job.type}
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> {job.experience_level}
            </span>
          </div>
          {job.salary_min && job.salary_max && (
            <div className="text-sm text-foreground font-medium">
              <span className="text-muted-foreground">Salary:</span>{" "}
              ₹{job.salary_min} - ₹{job.salary_max} <span className="text-xs text-muted-foreground">/ month</span>
            </div>
          )}
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {job.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
