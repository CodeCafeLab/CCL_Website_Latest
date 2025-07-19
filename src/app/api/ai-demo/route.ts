import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/ai/genkit";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }
    // Use your Genkit LLM to generate a response
    const { output } = await ai.generate({ prompt });
    return NextResponse.json({ response: output });
  } catch (error: any) {
    // Check for Google model overload
    if (
      error?.message?.includes("model is overloaded") ||
      error?.status === 503
    ) {
      return NextResponse.json(
        {
          error:
            "The AI model is currently overloaded. Please try again in a few moments.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: error.message || "AI error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Example static demo info, replace with your logic
  return NextResponse.json({
    message: "Welcome to the AI Demo! Ask anything to see Gemini in action.",
    examplePrompt: "Tell me a fun fact about AI.",
  });
}
