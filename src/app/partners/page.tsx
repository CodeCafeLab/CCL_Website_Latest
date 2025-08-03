
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Handshake,
  Heart,
  Lightbulb,
  MessageSquare,
  BarChart3,
  Loader2,
  Users,
  Award,
  UploadCloud,
  Briefcase,
  GitMerge,
  BadgePercent,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { apiClient, createPartnerRequest } from "@/lib/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const partnershipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  partnershipType: z.string().min(1, "Please select a partnership type."),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Please provide a brief message."),
  file: z
    .any()
    .refine((files) => files?.length === 1, "File is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .optional(),
});

type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

const partnershipTypes = [
  {
    name: "Reseller Partner",
    icon: BadgePercent,
    description: "Sell our products and services to your clients and earn commissions.",
  },
  {
    name: "Referral Partner",
    icon: TrendingUp,
    description: "Refer clients to us and earn a finder's fee for successful projects.",
  },
  {
    name: "Technology Partner",
    icon: GitMerge,
    description: "Integrate your technology with ours to create powerful joint solutions.",
  },
  {
    name: "Strategic Alliance",
    icon: Handshake,
    description: "Collaborate on marketing, sales, and strategic initiatives for mutual growth.",
  },
];

const partnerBenefits = [
  "Access to our innovative product portfolio",
  "Competitive commission and revenue-sharing models",
  "Dedicated partner support and training",
  "Co-marketing and lead generation opportunities",
  "Early access to new products and features",
  "Collaborative growth and strategic alignment",
];

const productList = [
  "Trackzy (Time Tracker)",
  "AutoCleanse (Car Cleaning)",
  "QConnect (Scan & Connect)",
  "SwiftDrop (Parcel Delivery)",
  "ClientNest (CRM)",
  "EduFlow (School Management)",
  "DineOS (Restaurant POS)",
  "WizZap (WhatsApp Automation)",
];

export default function PartnersPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      partnershipType: "",
      productInterest: "",
      message: "",
      file: undefined,
    },
  });

  const onSubmit: SubmitHandler<PartnershipFormData> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("partnershipType", data.partnershipType);
    formData.append("productInterest", data.productInterest || "Not specified");
    formData.append("message", data.message);
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    try {
      const response = await createPartnerRequest(formData);

      toast({
        title: "Partnership Request Submitted!",
        description: "Thank you for your interest! Our team will review your request and get back to you shortly.",
      });
      form.reset();
      setFileName(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Handshake className="h-10 w-10 text-primary" />
          Partners & Affiliations Program
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Join us in our mission to deliver innovative technology solutions. We believe in the power of collaboration to drive mutual growth and success.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Types of Partnerships</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnershipTypes.map((ptype) => (
            <Card key={ptype.name} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-3 bg-primary/10 rounded-full inline-block">
                  <ptype.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-2">{ptype.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{ptype.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card p-8 md:p-12 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Partner Benefits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-4xl mx-auto">
          {partnerBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Card className="max-w-2xl mx-auto shadow-xl border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Become a Partner</CardTitle>
            <CardDescription>
              Fill out the form below to start your journey with us. Let's build the future together.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )}/>
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )}/>
                </div>
                 <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="partnershipType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Partnership</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl><SelectTrigger><SelectValue placeholder="Select partnership type..." /></SelectTrigger></FormControl>
                         <SelectContent>
                           {partnershipTypes.map(ptype => (<SelectItem key={ptype.name} value={ptype.name}>{ptype.name}</SelectItem>))}
                         </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="productInterest" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product of Interest (Optional)</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl><SelectTrigger><SelectValue placeholder="Select a product..." /></SelectTrigger></FormControl>
                         <SelectContent>
                          {productList.map(product => (<SelectItem key={product} value={product}>{product}</SelectItem>))}
                         </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea rows={4} placeholder="Tell us about your company and why you'd like to partner with us..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="file" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Proposal/Profile (Optional)</FormLabel>
                       <FormControl>
                        <Input type="file" onChange={(e) => {
                            field.onChange(e.target.files);
                            setFileName(e.target.files?.[0]?.name || null);
                        }} accept=".pdf,.doc,.docx" />
                      </FormControl>
                      {fileName && <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
                      <FormMessage />
                    </FormItem>
                )}/>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>) : "Submit Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
