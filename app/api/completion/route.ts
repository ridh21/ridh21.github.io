import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, UIMessage, streamText } from "ai";
import { getSystemPromptsCollection } from "app/lib/collections";

const nvidia = createOpenAI({
  baseURL: process.env.NVIDIA_API_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const model = nvidia.chat("nvidia/llama-3.1-nemotron-nano-vl-8b-v1");

const FALLBACK_PROMPT = "You are Ridham Patel's AI assistant. Answer questions about his work, skills, and experience. If you don't know something, suggest reaching out at ridhampatel2k4@gmail.com.";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    // Load system prompt from MongoDB
    const promptCol = await getSystemPromptsCollection();
    const promptDoc = await promptCol.findOne({ prompt_type: "Ridham_AI_Persona" });
    const systemPrompt = promptDoc?.content || FALLBACK_PROMPT;

    const chatMessages = convertToModelMessages(messages);

    // NVIDIA's OpenAI-compatible endpoint rejects the `developer` role.
    // For unknown model IDs, OpenAI provider maps system prompts to `developer`.
    // Inject persona instructions as a user message to keep roles NVIDIA-safe.
    const nvidiaSafeMessages = [
      {
        role: "user" as const,
        content: [{ type: "text" as const, text: `Follow these instructions for this entire conversation:\n${systemPrompt}` }],
      },
      ...chatMessages,
    ];

    const result = streamText({
      model: model,
      messages: nvidiaSafeMessages,
      temperature: 1,
      topP: 0.01,
      maxOutputTokens: 1024,
      maxRetries: 0,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/completion:", error);

    // Detect provider rate limit errors
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