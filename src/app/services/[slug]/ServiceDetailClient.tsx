"use client";
import { useState } from "react";
import QuoteFormSheet from "@/components/pricing/QuoteFormSheet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Accept props as needed (e.g. service data)
export default function ServiceDetailClient({
  service,
  relatedServices,
  processSteps,
  faqItems,
}: {
  service: any;
  relatedServices: any[];
  processSteps: { num: number; title: string; description: string }[];
  faqItems: { value: string; question: string; answer: string }[];
}) {
  const [isQuoteSheetOpen, setIsQuoteSheetOpen] = useState(false);

  return (
    <>
      {/* ...your service detail UI... */}
      <Button
        size="lg"
        className="w-full"
        onClick={() => setIsQuoteSheetOpen(true)}
      >
        Request a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      {/* ...repeat for other buttons as needed... */}
      <QuoteFormSheet
        isOpen={isQuoteSheetOpen}
        onOpenChange={setIsQuoteSheetOpen}
      />
    </>
  );
}
