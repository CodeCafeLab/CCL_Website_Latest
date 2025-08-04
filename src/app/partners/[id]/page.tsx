
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Building, Mail, Phone, Globe, FileText, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Partner } from '@/types';

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

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!partner) return <div className="text-center py-12">Partner request not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <div className="mb-6">
        <Link href="/partners" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Partner Requests
        </Link>
      </div>
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <User className="h-8 w-8 text-primary" />
              {partner.fullName}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2"><Building className="h-4 w-4" />{partner.company}</p>
          </div>
          <Badge variant={partner.status === 'approved' ? 'default' : 'secondary'} className="capitalize self-start mt-2">
            {partner.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
          <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> <a href={`mailto:${partner.email}`} className="text-primary hover:underline">{partner.email}</a></div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {partner.phone}</div>
          <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" /> {partner.cityCountry}</div>
          <div className="flex items-center gap-2"><Link className="h-4 w-4 text-muted-foreground" /> <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{partner.website}</a></div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Area of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {partner.areaOfInterest.map((interest, idx) => (
                <Badge key={idx} variant="outline">{interest}</Badge>
              ))}
            </div>
          </div>
           <div>
            <h3 className="font-semibold text-lg mb-2">Products of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {partner.productsOfInterest.map((product, idx) => (
                <Badge key={idx} variant="secondary">{product}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Collaboration Plan</h3>
            <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{partner.collaborationPlan}</div>
          </div>
          {partner.portfolioUrl && (
             <div>
                <h3 className="font-semibold text-lg mb-2">Portfolio/Proposal</h3>
                <a href={partner.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                    <FileText className="h-4 w-4" /> View Document
                </a>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Submitted on: {new Date(partner.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
