"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Bot, User, Copy } from "lucide-react";
import { apiClient } from "@/lib/api";

export default function InteractiveAIDemo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);
  const [copied, setCopied] = useState(false);

  const MAX_RETRIES = 10;

  const [demoInfo, setDemoInfo] = useState<{
    message: string;
    examplePrompt: string;
  } | null>(null);

  useEffect(() => {
    apiClient.get("/ai-demo")
      .then(res => setDemoInfo(res.data))
      .catch(() => setDemoInfo(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setLoading(true);

    let retries = 0;
    let success = false;

    while (retries < MAX_RETRIES && !success) {
      try {
        const res = await apiClient.post("/ai-demo", { prompt });

        const data = res.data;

        if (res.status === 503 && data.error?.includes("overloaded")) {
          retries++;
          if (retries < MAX_RETRIES) {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s before retry
            continue;
          } else {
            setError("The AI model is overloaded. Please try again later.");
            break;
          }
        }

        if (res.status !== 200) {
          // Check for quota/billing error
          if (
            data.error?.toLowerCase().includes("quota") ||
            data.details?.toLowerCase().includes("quota") ||
            data.details?.toLowerCase().includes("billing")
          ) {
            setError(
              "The AI service quota has been exceeded. Please try again later or contact the site administrator."
            );
          } else {
            setError(data.error || "An error occurred.");
          }
          break;
        }

        setResponse(data.answer || data.response);
        success = true;
      } catch (err: any) {
        setError(err.response?.data?.error || "Network error. Please check your connection.");
        break;
      }
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <Card className="shadow-lg bg-card p-8 md:p-12 rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-2">
          <Bot className="h-8 w-8 text-accent" />
          Interactive AI Demo
        </CardTitle>
      </CardHeader>
      {demoInfo && (
        <div className="mb-6 p-4 bg-muted border rounded">
          <div className="font-semibold">{demoInfo.message}</div>
          <div className="text-sm text-muted-foreground mt-1">
            <span className="font-medium">Example:</span>{" "}
            {demoInfo.examplePrompt}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask our AI anything..."
              disabled={loading || cooldown}
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
            />
            <Button
              type="submit"
              disabled={loading || !prompt.trim() || cooldown}
              className=""
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Ask AI"}
            </Button>
          </div>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col items-stretch w-full">
        {error && (
          <div className="text-red-600 mt-2 bg-red-50 border border-red-200 rounded p-3 text-sm">
            {error}
          </div>
        )}
        {/* Chat-like Q&A display */}
        {prompt && response && (
          <div className="mt-6 space-y-4">
            {/* User question bubble */}
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-foreground max-w-2xl shadow-sm">
                <span className="font-medium text-primary">You:</span> {prompt}
              </div>
            </div>
            {/* AI answer bubble */}
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-accent/10 p-2 mt-1">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div className="relative bg-accent/5 border border-accent/10 rounded-xl px-4 py-3 text-foreground max-w-2xl shadow-sm flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-accent">AI:</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="ml-1 p-1 rounded hover:bg-accent/20 transition"
                    title="Copy answer"
                  >
                    <Copy className="h-4 w-4 text-accent" />
                  </button>
                  {copied && <span className="text-xs text-green-600 ml-1">Copied!</span>}
                </div>
                <div className="whitespace-pre-line text-base leading-relaxed">
                  {response}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
