"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  discoverAIProducts,
  type AIProductDiscoveryInput,
  type AIProductDiscoveryOutput,
} from "@/ai/flows/ai-product-discovery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  userInterest: z
    .string()
    .min(5, "Please describe your interest in a bit more detail.")
    .max(500)
    .optional(),
  currentTrends: z
    .string()
    .min(5, "Please describe current trends in a bit more detail.")
    .max(500)
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AIProductDiscoveryClient() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AIProductDiscoveryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInterest: "",
      currentTrends: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const response = await discoverAIProducts(
          data as AIProductDiscoveryInput
        );
        setResult(response);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
      }
    });
  };

  const handleDiscover = async () => {
    setError(null);
    setGeneratedContent(null);
    const userInterests = form.getValues("userInterest");
    const aiTrends = form.getValues("currentTrends");
    const prompt = `User interests: ${userInterests}. AI trends: ${aiTrends}. Suggest relevant AI solutions.`;
    try {
      const res = await fetch("http://localhost:5000/api/ai-gen/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setGeneratedContent(text || "No result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
    }
  };

  function handleLearnMore(product: any) {
    alert(`Learn more about: ${product.name}`);
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Wand2 className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl">
                Discover Our AI Solutions
              </CardTitle>
              <CardDescription>
                Tell us about your interests or current AI trends, and we'll
                suggest relevant CodeCafe Lab products.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="userInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Your Interests (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'automating customer support', 'AI for healthcare', 'creative content generation'"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormDescription>
                      What are you passionate about or looking to achieve with AI?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentTrends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current AI Trends (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Large Language Models', 'Generative AI in media', 'Ethical AI development'"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormDescription>
                      What AI trends are you currently following or interested in?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="w-full md:w-auto"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Discovering...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" /> Discover Products
                  </>
                )}
              </Button>
              {/* Optionally, you can add a separate button for handleDiscover if needed */}
              {/* <Button
                type="button"
                onClick={handleDiscover}
                disabled={isPending}
                size="lg"
                className="w-full md:w-auto ml-4"
              >
                Generate AI Suggestions
              </Button> */}
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {generatedContent && (
        <Card className="mt-8 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Sparkles className="h-7 w-7" /> AI-Generated Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{generatedContent}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-8 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Sparkles className="h-7 w-7" /> AI-Curated Product Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Reasoning:</h3>
              <p className="text-muted-foreground italic bg-muted/50 p-4 rounded-md">
                {result.reasoning}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Suggested Products:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {result.selectedProducts?.map((product, index) => (
                  <Card
                    key={index}
                    className="shadow-xl transition"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-accent">
                        {product.name}
                      </CardTitle>
                      <CardDescription>
                        Relevance Score: {product.relevanceScore}/10
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">{product.description}</p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Tech Stack:</strong> {product.stack}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="link"
                        className="px-0 text-primary"
                        onClick={() => handleLearnMore(product)}
                      >
                        Learn more about {product.name}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
