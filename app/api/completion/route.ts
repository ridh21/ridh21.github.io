import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
  streamText,
} from "ai";
import { getSystemPromptsCollection } from "app/lib/collections";

const nvidia = createOpenAI({
  baseURL: process.env.NVIDIA_API_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const model = nvidia.chat("nvidia/llama-3.1-nemotron-nano-vl-8b-v1");

const FALLBACK_PROMPT = "You are Ridham Patel's AI assistant. Answer questions about his work, skills, and experience. If you don't know something, suggest reaching out at ridhampatel2k4@gmail.com.";
const HARD_GUARDRAIL =
  "You must only answer questions that are directly about Ridham Patel (his profile, experience, skills, projects, career, availability, contact, education, achievements). If asked anything outside this scope, politely refuse and redirect to asking about Ridham.";

const OUT_OF_SCOPE_REPLY =
  "I can only help with questions about Ridham Patel's profile, work, skills, projects, and career. Please ask something about Ridham.";

function getLastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== "user") continue;

    const text = (message.parts ?? [])
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ")
      .trim();

    if (text) return text;
  }

  return "";
}

function isInScopeQuestion(input: string): boolean {
  const text = input.toLowerCase().trim();
  if (!text) return true;

  const greetingOnly = /^(hi|hello|hey|yo|hola|namaste|good\s+(morning|afternoon|evening))[!.?\s]*$/.test(text);
  if (greetingOnly) return true;

  const identityOrProfileRegex =
    /(ridham|who\s+are\s+you|about\s+you|your\s+(profile|portfolio|experience|skills|projects|background|work|career|cv|resume|contact|email|linkedin|github)|his\s+(profile|experience|skills|projects|background|work|career|cv|resume|contact)|hiring|availability|openxcell|aws certified|associate software engineer|anpr|deathstar|ldrp|student dropout|mental health meme)/;

  return identityOrProfileRegex.test(text);
}

function refusalStream(messages: UIMessage[], text: string): Response {
  const stream = createUIMessageStream({
    originalMessages: messages,
    execute: ({ writer }) => {
      const id = `text-${crypto.randomUUID()}`;
      writer.write({ type: "start" });
      writer.write({ type: "text-start", id });
      writer.write({ type: "text-delta", id, delta: text });
      writer.write({ type: "text-end", id });
      writer.write({ type: "finish" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  try {
    const latestUserText = getLastUserText(messages);
    if (!isInScopeQuestion(latestUserText)) {
      return refusalStream(messages, OUT_OF_SCOPE_REPLY);
    }

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
        content: [{ type: "text" as const, text: `Follow these instructions for this entire conversation:\n${systemPrompt}\n\n${HARD_GUARDRAIL}` }],
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