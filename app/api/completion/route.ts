import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, UIMessage, streamText } from "ai";
import { getSystemPromptsCollection } from "app/lib/collections";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = google("gemini-2.5-flash-lite");

const FALLBACK_PROMPT = "You are Ridham Patel's AI assistant. Answer questions about his work, skills, and experience. If you don't know something, suggest reaching out at ridhampatel21@gmail.com.";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    // Load system prompt from MongoDB
    const promptCol = await getSystemPromptsCollection();
    const promptDoc = await promptCol.findOne({ prompt_type: "Ridham_AI_Persona" });
    const systemPrompt = promptDoc?.content || FALLBACK_PROMPT;

    const result = streamText({
      model: model,
      system: systemPrompt,
      messages: convertToModelMessages(messages),
      maxRetries: 0,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/completion:", error);

    // Detect rate limit errors from Gemini
    const msg = error?.message?.toLowerCase?.() || "";
    const status = error?.status || error?.statusCode || 500;
    const isRateLimit =
      status === 429 ||
      msg.includes("rate limit") ||
      msg.includes("quota") ||
      msg.includes("resource exhausted") ||
      msg.includes("too many requests");

    if (isRateLimit) {
      return new Response(
        "Oops! Looks like I've been chatting too much and hit my limit. ☕ Please give me a minute to catch my breath and try again shortly!",
        { status: 429 }
      );
    }

    return new Response(
      "Something went wrong on my end. Please try again in a moment!",
      { status: 500 }
    );
  }
}