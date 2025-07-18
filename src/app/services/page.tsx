import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES_DATA } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore the range of software development, AI/ML, mobile app, DevOps, and UI/UX design services offered by CodeCafe Lab.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We offer a comprehensive suite of services to transform your ideas
          into reality, leveraging the latest technologies and agile
          methodologies.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => {
          const MaybeIcon =
            LucideIcons[service.icon as keyof typeof LucideIcons];
          const Icon =
            typeof MaybeIcon === "function" ||
            (typeof MaybeIcon === "object" &&
              MaybeIcon !== null &&
              "$$typeof" in MaybeIcon)
              ? (MaybeIcon as React.ElementType)
              : LucideIcons["Globe"];
          return (
            <Card
              key={service.slug}
              className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {Icon && <Icon className="h-8 w-8 text-primary" />}
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Link href={`/services/${service.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
