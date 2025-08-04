
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Handshake, Loader2, UploadCloud, FileText, User, Building, Mail, Phone, Globe, Link as LinkIcon, Edit, Package, Check, ClipboardList } from "lucide-react";
import { createPartnerRequest } from "@/lib/api";
import Link from 'next/link';

const partnershipFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  cityCountry: z.string().min(2, "Please enter your location."),
  website: z.string().url("Please enter a valid website URL."),
  areaOfInterest: z.string().min(1, "Please select an area of interest."),
  productsOfInterest: z.string().min(1, "Please select at least one product."),
  collaborationPlan: z.string().min(20, "Please describe your plan in at least 20 characters."),
  portfolio: z.any().optional(),
});

type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

const productList = [
  "Trackzy (Time Tracker)", "AutoCleanse (Car Cleaning)", "QConnect (Scan & Connect)",
  "SwiftDrop (Parcel Delivery)", "ClientNest (CRM)", "EduFlow (School Management)",
  "DineOS (Restaurant POS)", "WizZap (WhatsApp Automation)",
];

const interestList = ["Sales", "Marketing", "Integration", "Support", "Investment", "Reseller"];

export default function PartnersPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipFormSchema),
    defaultValues: {
      fullName: "", company: "", email: "", phone: "",
      cityCountry: "", website: "", areaOfInterest: "",
      productsOfInterest: "", collaborationPlan: "", portfolio: undefined,
    },
  });

  const onSubmit: SubmitHandler<PartnershipFormData> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'portfolio' && value?.[0]) {
        formData.append(key, value[0]);
      } else if (value) {
        formData.append(key, value as string);
      }
    });

    try {
      await createPartnerRequest(formData);
      toast({
        title: "Partnership Request Submitted!",
        description: "Our team will review your request and get back to you shortly.",
      });
      form.reset();
      setFileName(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Handshake className="h-10 w-10 text-primary" />
              Become a Partner
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our ecosystem of innovators and collaborators. Fill out the form below to start your journey with us.
            </p>
        </div>
      
      <Card className="max-w-4xl mx-auto shadow-xl border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Partnership Application Form</CardTitle>
          <CardDescription>
            Provide your details and let us know how you'd like to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {/* Section 1: Contact Information */}
              <div className="space-y-4 p-6 border rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5 text-primary"/>Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              {/* Section 2: Partnership Details */}
              <div className="space-y-4 p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary"/>Partnership Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                     <FormField control={form.control} name="cityCountry" render={({ field }) => (
                      <FormItem><FormLabel>City & Country</FormLabel><FormControl><Input placeholder="e.g., Jaipur, India" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="website" render={({ field }) => (
                      <FormItem><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://yourcompany.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="areaOfInterest" render={({ field }) => (
                        <FormItem><FormLabel>Area of Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select an interest..." /></SelectTrigger></FormControl>
                            <SelectContent>{interestList.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                          </Select>
                        <FormMessage /></FormItem>
                      )} />
                    <FormField control={form.control} name="productsOfInterest" render={({ field }) => (
                      <FormItem><FormLabel>Product of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a product..." /></SelectTrigger></FormControl>
                          <SelectContent>{productList.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                        </Select>
                      <FormMessage /></FormItem>
                    )} />
                  </div>
                   <FormField control={form.control} name="collaborationPlan" render={({ field }) => (
                    <FormItem><FormLabel>Collaboration Plan</FormLabel><FormControl><Textarea rows={4} placeholder="Describe how you'd like to collaborate, your target audience, and potential strategies..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="portfolio" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Portfolio/Proposal (Optional)</FormLabel>
                      <FormControl>
                        <label htmlFor="portfolio-upload" className="flex items-center gap-3 w-full border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/75 p-3">
                          <UploadCloud className="h-8 w-8 text-muted-foreground" />
                          <div className="text-sm">
                            {fileName ? (
                                <p className="font-semibold text-primary">{fileName}</p>
                            ) : (
                                <p className="text-muted-foreground">Click to upload or drag & drop</p>
                            )}
                            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                          </div>
                          <Input id="portfolio-upload" type="file" className="hidden" onChange={(e) => { field.onChange(e.target.files); setFileName(e.target.files?.[0]?.name || null); }} accept=".pdf,.doc,.docx" />
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>) : "Submit Request"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
