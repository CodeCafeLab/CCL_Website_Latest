// src/app/social-automation/page.tsx
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { generateSocialMediaPosts, type SocialMediaPostInput, type SocialMediaPostOutput } from "@/ai/flows/social-media-flow";

// Form schema for input validation
const formSchema = z.object({
  postIdea: z.string().min(10, "Please describe your post idea in at least 10 characters.").max(1000, "Your idea is too long, please keep it under 1000 characters."),
});
type FormData = z.infer<typeof formSchema>;

const platformIcons: { [key: string]: React.ElementType } = {
  Twitter: Twitter,
  LinkedIn: Linkedin,
  Facebook: Facebook,
};

export default function SocialAutomationPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<SocialMediaPostOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postIdea: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsGenerating(true);
    setGeneratedPosts(null);
    try {
      const result = await generateSocialMediaPosts({ postIdea: data.postIdea });
      setGeneratedPosts(result);
      toast({
        title: "Posts Generated!",
        description: "Your social media posts have been crafted by AI.",
      });
    } catch (error: any) {
      console.error("Error generating social media posts:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Share2 className="h-10 w-10 text-primary" />
          Social Media Automation
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Craft the perfect message for every platform. Enter your core idea, and let our AI generate tailored posts for Twitter, LinkedIn, and Facebook.
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-xl border-primary/20">
        <CardHeader>
          <CardTitle>Create a New Social Post</CardTitle>
          <CardDescription>Enter your main idea, and we'll handle the rest.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="postIdea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Post Idea</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="e.g., 'Just launched our new AI-powered analytics tool! It helps businesses track user engagement in real-time...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Posts...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Posts
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedPosts && (
        <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Generated Posts</h2>
            <div className="space-y-6">
                {generatedPosts.posts.map((post, index) => {
                    const Icon = platformIcons[post.platform] || Share2;
                    return (
                        <Card key={index} className="shadow-lg transition-all hover:shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <Icon className="h-6 w-6 text-primary" />
                                    {post.platform} Post
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base whitespace-pre-line bg-muted/50 p-4 rounded-md">{post.content}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
      )}
    </div>
  );
}
