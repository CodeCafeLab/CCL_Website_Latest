// @ts-nocheck
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/lib/constants";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 800,
          alt: service.title,
        },
      ],
    },
  };
}

type Props = { params: { slug: string } }

export default async function Page({ params }: Props) {
  const { slug } = params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES_DATA.filter(
    (s) => s.categories === service.categories && s.slug !== service.slug
  ).slice(0, 3);

  const processSteps = [
    {
      num: 1,
      title: "Discovery & Strategy",
      description:
        "We start by understanding your vision, goals, and challenges to define a clear roadmap.",
    },
    {
      num: 2,
      title: "Design & Prototyping",
      description:
        "Our team crafts intuitive UI/UX designs and interactive prototypes for your approval.",
    },
    {
      num: 3,
      title: "Development & Testing",
      description:
        "Expert developers bring the designs to life with clean code, followed by rigorous testing.",
    },
    {
      num: 4,
      title: "Launch & Optimization",
      description:
        "We deploy your solution and monitor its performance for continuous improvement and growth.",
    },
  ];

  const faqItems = [
    {
      value: "item-1",
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on the complexity and scope. A simple project might take a few weeks, while a more complex application could take several months. We provide a detailed timeline after our initial discovery phase.",
    },
    {
      value: "item-2",
      question: "How do you handle project communication?",
      answer:
        "We believe in transparent and frequent communication. You'll have a dedicated project manager and regular check-ins via your preferred method (email, calls, Slack). We also provide access to a project management tool to track progress.",
    },
    {
      value: "item-3",
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing models, including hourly rates, fixed project-based costs, and retainer agreements for ongoing work. We'll work with you to determine the best model for your needs and budget.",
    },
  ];

  return (
    <ServiceDetailClient
      service={service}
      relatedServices={relatedServices}
      processSteps={processSteps}
      faqItems={faqItems}
    />
  );
}
