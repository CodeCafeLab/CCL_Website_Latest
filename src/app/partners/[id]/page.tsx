
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Building, Mail, Phone, Globe, FileText, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Partner } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DetailPageSkeleton = () => (
    <div className="max-w-4xl mx-auto">
        <Skeleton className="h-8 w-40 mb-8 bg-muted" />
        <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                    <Skeleton className="h-10 w-64 mb-3 bg-muted" />
                    <Skeleton className="h-5 w-48 bg-muted" />
                </div>
                <Skeleton className="h-7 w-24 rounded-full bg-muted" />
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <Skeleton className="h-5 w-full bg-muted" />
                <Skeleton className="h-5 w-full bg-muted" />
                <Skeleton className="h-5 w-full bg-muted" />
                <Skeleton className="h-5 w-full bg-muted" />
            </div>
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-6 w-32 mb-3 bg-muted" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20 rounded-full bg-muted" />
                        <Skeleton className="h-6 w-24 rounded-full bg-muted" />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-40 mb-3 bg-muted" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-28 rounded-full bg-muted" />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-48 mb-3 bg-muted" />
                    <Skeleton className="h-20 w-full bg-muted rounded-lg" />
                </div>
                 <div>
                    <Skeleton className="h-6 w-40 mb-3 bg-muted" />
                    <Skeleton className="h-8 w-32 bg-muted" />
                </div>
            </div>
            <Skeleton className="h-px w-full my-8 bg-border" />
            <Skeleton className="h-5 w-56 bg-muted" />
        </div>
    </div>
);


export default function PartnerDetailPage() {
  const { id } = useParams();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/partners/${id}`)
      .then(res => setPartner(res.data))
      .catch(err => console.error("Failed to fetch partner details", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DetailPageSkeleton />;
  if (!partner) return <div className="text-center py-12">Partner request not found.</div>;

  const statusConfig = {
      approved: {
          icon: CheckCircle,
          className: "bg-green-100 text-green-800 border-green-200"
      },
      pending: {
          icon: Clock,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200"
      },
      rejected: {
          icon: XCircle,
          className: "bg-red-100 text-red-800 border-red-200"
      }
  }
  const currentStatus = statusConfig[partner.status] || { icon: AlertCircle, className: "bg-muted text-muted-foreground" };
  
  const getAsArray = (value: string | string[] | undefined): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim() !== '') return [value];
    return [];
  }

  const areaOfInterest = getAsArray(partner.area_of_interest || partner.areaOfInterest);
  const productsOfInterest = getAsArray(partner.products_of_interest || partner.productsOfInterest);
  const portfolioUrl = partner.portfolio_url || partner.portfolioUrl;

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <div className="mb-6">
        <Link href="/partners" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Partner Requests
        </Link>
      </div>
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <User className="h-8 w-8 text-primary" />
              {partner.full_name || partner.fullName}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-lg"><Building className="h-5 w-5" />{partner.company}</p>
          </div>
          <Badge className={cn("capitalize self-start mt-2 text-base px-4 py-1", currentStatus.className)}>
            <currentStatus.icon className="h-4 w-4 mr-2" />
            {partner.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-md border-t border-b border-border/60 py-6">
          <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-muted-foreground" /> <a href={`mailto:${partner.email}`} className="text-primary hover:underline truncate">{partner.email}</a></div>
          <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-muted-foreground" /> {partner.phone}</div>
          <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-muted-foreground" /> {partner.city_country || partner.cityCountry}</div>
          {partner.website && <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-muted-foreground" /> <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{partner.website}</a></div>}
        </div>

        <div className="space-y-8">
          {areaOfInterest.length > 0 && (
            <div>
              <h3 className="font-semibold text-xl mb-3">Area of Interest</h3>
              <div className="flex flex-wrap gap-2">
                {areaOfInterest.map((interest: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-md px-3 py-1">{interest}</Badge>
                ))}
              </div>
            </div>
          )}
           {productsOfInterest.length > 0 && (
             <div>
              <h3 className="font-semibold text-xl mb-3">Products of Interest</h3>
              <div className="flex flex-wrap gap-2">
                {productsOfInterest.map((product: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-md px-3 py-1">{product}</Badge>
                ))}
              </div>
            </div>
           )}
          <div>
            <h3 className="font-semibold text-xl mb-3">Collaboration Plan</h3>
            <div className="bg-muted p-4 rounded-lg text-md whitespace-pre-line border">{partner.collaboration_plan || partner.collaborationPlan}</div>
          </div>
          {portfolioUrl ? (
             <div>
                <h3 className="font-semibold text-xl mb-3">Portfolio/Proposal</h3>
                <Button asChild variant="outline">
                    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        <FileText className="h-4 w-4" /> View Document
                    </a>
                </Button>
            </div>
          ) : partner.portfolio && (
             <div>
                <h3 className="font-semibold text-xl mb-3">Portfolio/Proposal</h3>
                <div className="bg-muted p-4 rounded-lg text-md whitespace-pre-line border">{partner.portfolio}</div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Submitted on: {new Date(partner.created_at || partner.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
