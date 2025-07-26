
"use client";

import { useEffect, useState } from "react";
import { apiClient, TeamMember } from "@/lib/api";
import TeamCard from "./../../components/teams/TeamCard";
import { Skeleton } from "@/components/ui/skeleton";

const TeamCardSkeleton = () => (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out border rounded-lg">
        <Skeleton className="w-full aspect-square bg-muted" />
        <div className="p-6 flex-grow flex flex-col items-center">
            <Skeleton className="h-6 w-3/4 mb-1 bg-muted" />
            <Skeleton className="h-4 w-1/2 mb-2 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-full mt-2 bg-muted" />
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
                <Skeleton className="h-5 w-16 bg-muted rounded-full" />
                <Skeleton className="h-5 w-20 bg-muted rounded-full" />
            </div>
        </div>
        <div className="p-6 pt-0 flex justify-center gap-3">
             <Skeleton className="h-6 w-6 rounded-full bg-muted" />
             <Skeleton className="h-6 w-6 rounded-full bg-muted" />
             <Skeleton className="h-6 w-6 rounded-full bg-muted" />
        </div>
    </div>
);


export default function TeamsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/teams/active")
      .then((res) => setTeam(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Meet Our Team
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <TeamCardSkeleton key={index} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Meet Our Team
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {team.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
