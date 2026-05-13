import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  UIMessage,
  streamText,
} from "ai";
import {
  getSystemPromptsCollection,
} from "app/lib/collections";

const nvidia = createOpenAI({
  baseURL: process.env.NVIDIA_API_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const model = nvidia.chat("nvidia/llama-3.1-nemotron-nano-vl-8b-v1");

const SYSTEM_PROMPT = `You are Ridham Patel's AI assistant. Answer questions about his work, skills, projects, experience, and background naturally and conversationally.

Rules:
- Only answer questions about Ridham Patel. For off-topic questions, politely redirect.
- Never invent or guess facts. If you don't know something, say "I don't have that information — you can reach Ridham at ridhampatel2k4@gmail.com".
- You do not know his age, date of birth, or personal details not listed in the context.
- Be friendly, concise, and helpful.`;

async function getSystemPrompt(): Promise<string> {
  try {
    const promptCol = await getSystemPromptsCollection();
    const promptDoc = await promptCol.findOne({ prompt_type: "Ridham_AI_Persona" });
    return promptDoc?.content || SYSTEM_PROMPT;
  } catch {
    return SYSTEM_PROMPT;
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const chatMessages = convertToModelMessages(messages);
    const systemPrompt = await getSystemPrompt();

    const nvidiaSafeMessages = [
      {
        role: "user" as const,
        content: [{ type: "text" as const, text: systemPrompt }],
      },
      ...chatMessages,
    ];

    const result = streamText({
      model: model as any,
      messages: nvidiaSafeMessages,
      temperature: 0.7,
      topP: 1,
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