"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Bot } from "lucide-react";

export default function InteractiveAIDemo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const MAX_RETRIES = 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setLoading(true);

    let retries = 0;
    let success = false;

    while (retries < MAX_RETRIES && !success) {
      try {
        const res = await fetch("http://localhost:5000/api/ai-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();

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

        if (!res.ok) {
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

        setResponse(data.response);
        success = true;
      } catch (err: any) {
        setError("Network error. Please check your connection.");
        break;
      }
    }

    setLoading(false);
  };

  return (
    <Card className="shadow-lg bg-card p-8 md:p-12 rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-2">
          <Bot className="h-8 w-8 text-accent" />
          Interactive AI Demo
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask our AI anything..."
            disabled={loading || cooldown}
            className="mb-4"
          />
          <Button
            type="submit"
            disabled={loading || !prompt.trim() || cooldown}
            className="w-full"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Ask AI"}
          </Button>
        </CardContent>
      </form>
      <CardFooter>
        {error && (
          <div className="text-red-600 mt-2">
            {error}
            {error.includes("overloaded") && (
              <button onClick={handleSubmit} className="ml-2 underline">
                Try Again
              </button>
            )}
            {/* No retry for quota errors */}
          </div>
        )}
        {response && (
          <div className="mt-4 p-4 bg-muted rounded">
            <strong>AI:</strong> {response}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
