
"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Handshake, PlusCircle, ArrowRight, User, Building, Mail, Phone, Globe, ArrowLeft } from 'lucide-react';
import { apiClient } from "@/lib/api";
import type { Partner } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const PartnerCardSkeleton = () => (
    <div className="p-6 bg-card rounded-xl shadow-md border border-border/60 flex flex-col gap-3">
        <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-3/4 bg-muted" />
        </div>
        <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
        </div>
        <div className="mt-auto pt-4">
            <Skeleton className="h-10 w-full bg-muted" />
        </div>
    </div>
);

export default function PartnersListPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await apiClient.get("/partners");
        setPartners(response.data);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center bg-card border border-border/60 rounded-xl shadow-lg p-8 md:p-12">
        <Handshake className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">
          Partners & Affiliations
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We believe in the power of collaboration. Explore our partnership programs or review incoming requests to join our growing ecosystem.
        </p>
         <div className="mt-8">
            <Button asChild size="lg">
                <Link href="/partners/apply">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Become a Partner
                </Link>
            </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Incoming Requests</h2>
        {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => <PartnerCardSkeleton key={i} />)}
            </div>
        ) : partners.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {partners.map((partner) => (
                    <Card key={partner.id} className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <User className="h-6 w-6 text-primary" />
                                {partner.fullName}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3 text-sm">
                            <p className="flex items-center gap-2 text-muted-foreground"><Building className="h-4 w-4 flex-shrink-0" /> {partner.company}</p>
                            <p className="flex items-center gap-2 text-muted-foreground truncate"><Mail className="h-4 w-4 flex-shrink-0" /> {partner.email}</p>
                            <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4 flex-shrink-0" /> {partner.phone}</p>
                             <p className="flex items-center gap-2 text-muted-foreground"><Globe className="h-4 w-4 flex-shrink-0" /> {partner.cityCountry}</p>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/partners/${partner.id}`}>
                                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        ) : (
            <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-dashed">
                <p>No partner requests found.</p>
            </div>
        )}
      </section>
    </div>
  );
}
