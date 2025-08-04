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
  Loader2,
  CheckCircle,
  BadgePercent,
  TrendingUp,
  GitMerge,
} from "lucide-react";
import { createPartner } from "@/lib/api";

const partnershipFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  cityCountry: z.string().min(2, "Please enter your location."),
  website: z.string().url("Please enter a valid website URL."),
  areaOfInterest: z.array(z.string()).min(1, "Select at least one area of interest."),
  productsOfInterest: z.array(z.string()).min(1, "Select at least one product."),
  collaborationPlan: z.string().min(10, "Please describe your collaboration plan."),
  portfolio: z.any().optional(),
});

type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

const partnershipTypes = [
  { name: "Reseller Partner", icon: BadgePercent, description: "Sell our products and earn commissions." },
  { name: "Referral Partner", icon: TrendingUp, description: "Refer clients and earn a finder's fee." },
  { name: "Technology Partner", icon: GitMerge, description: "Integrate your tech with ours." },
  { name: "Strategic Alliance", icon: Handshake, description: "Collaborate for mutual growth." },
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

const interestList = ["Sales", "Marketing", "Integration", "Support", "Investment", "Reseller"];

export default function PartnersPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipFormSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      cityCountry: "",
      website: "",
      areaOfInterest: [],
      productsOfInterest: [],
      collaborationPlan: "",
      portfolio: undefined,
    },
  });

  const onSubmit: SubmitHandler<PartnershipFormData> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("company", data.company);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("cityCountry", data.cityCountry);
    formData.append("website", data.website);
    data.areaOfInterest.forEach((interest) => formData.append("areaOfInterest[]", interest));
    data.productsOfInterest.forEach((product) => formData.append("productsOfInterest[]", product));
    formData.append("collaborationPlan", data.collaborationPlan);
    if (data.portfolio?.[0]) {
      formData.append("portfolio", data.portfolio[0]);
    }

    try {
      await createPartner(formData);
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
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Handshake className="h-10 w-10 text-primary" />
          Partners & Affiliations Program
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Join us in delivering innovative tech solutions. Let's grow together through collaboration.
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
              Fill out the form to start your journey with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl><Input placeholder="Company Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input type="tel" placeholder="+1234567890" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="cityCountry" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City & Country</FormLabel>
                    <FormControl><Input placeholder="e.g., Jaipur, India" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="website" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl><Input placeholder="https://yourcompany.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />


                <FormField
                  control={form.control}
                  name="areaOfInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold mb-1">
                        Area of Interest
                      </FormLabel>
                      <FormControl>
                        <select
                          multiple
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:border-gray-400"
                          onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                            field.onChange(selected);
                          }}
                        >
                          {interestList.map((interest) => (
                            <option key={interest} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productsOfInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold mb-1">
                        Products of Interest
                      </FormLabel>
                      <FormControl>
                        <select
                          multiple
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition duration-200 ease-in-out focus:border-purple-500 focus:ring-2 focus:ring-purple-400 hover:border-gray-400"
                          onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                            field.onChange(selected);
                          }}
                        >
                          {productList.map((product) => (
                            <option key={product} value={product}>
                              {product}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                <FormField control={form.control} name="collaborationPlan" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collaboration Plan</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Describe how you'd like to collaborate with us..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="portfolio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Portfolio/Proposal</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={(e) => {
                        field.onChange(e.target.files);
                        setFileName(e.target.files?.[0]?.name || null);
                      }} accept=".pdf,.doc,.docx" />
                    </FormControl>
                    {fileName && <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
                    <FormMessage />
                  </FormItem>
                )} />

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
