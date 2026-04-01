import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
  streamText,
} from "ai";
import {
  getPostsCollection,
  getProjectsCollection,
  getSystemPromptsCollection,
} from "app/lib/collections";

const nvidia = createOpenAI({
  baseURL: process.env.NVIDIA_API_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

const model = nvidia.chat("nvidia/llama-3.1-nemotron-nano-vl-8b-v1");

const FALLBACK_PROMPT = "You are Ridham Patel's AI assistant. Answer questions about his work, skills, and experience. If you don't know something, suggest reaching out at ridhampatel2k4@gmail.com.";
const HARD_GUARDRAIL =
  "You must only answer questions that are directly about Ridham Patel (his profile, experience, skills, projects, career, availability, contact, education, achievements). If asked anything outside this scope, politely refuse and redirect to asking about Ridham. Never infer or calculate missing facts (such as age) from other details. If a fact is missing, respond exactly with: I don't have that specific information about Ridham, but you can reach out to him directly at ridhampatel21@gmail.com.";

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
    /(ridham|who\s+are\s+you|about\s+you|your\s+(profile|portfolio|experience|skills|project|projects|background|work|career|cv|resume|contact|email|linkedin|github|blog|post|article|age)|his\s+(profile|experience|skills|project|projects|background|work|career|cv|resume|contact|blog|post|article|age)|hiring|availability|openxcell|aws certified|associate software engineer|anpr|deathstar|ldrp|student dropout|mental health meme|latest\s+(project|blog|post|article)|recent\s+(project|blog|post|article))/;

  return identityOrProfileRegex.test(text);
}

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function isLatestBlogQuestion(input: string): boolean {
  const text = normalize(input);
  return /\b(latest|recent|newest)\b.*\b(blog|post|article)\b|\b(blog|post|article)\b.*\b(latest|recent|newest)\b/.test(text);
}

function isLatestProjectQuestion(input: string): boolean {
  const text = normalize(input);
  return /\b(latest|recent|newest|current)\b.*\b(project|projects)\b|\b(project|projects)\b.*\b(latest|recent|newest|current)\b/.test(text);
}

function isProjectsListQuestion(input: string): boolean {
  const text = normalize(input);
  return /\b(projects?\s+list)\b|\blist\s+(his\s+)?projects?\b|\b(all|show|give)\b.*\bprojects?\b/.test(text);
}

function isAgeQuestion(input: string): boolean {
  const text = normalize(input);
  return /\bage\b|\bold\b|\bhow\s+old\b|\bdate\s+of\s+birth\b|\bdob\b/.test(text);
}

async function getDeterministicReply(input: string): Promise<string | null> {
  if (isAgeQuestion(input)) {
    return "I don't have Ridham's exact age or date of birth. You can reach him directly at ridhampatel21@gmail.com if needed.";
  }

  if (isLatestBlogQuestion(input)) {
    const postCol = await getPostsCollection();
    const latestPost = await postCol.find({ published: true }).sort({ publishedAt: -1 }).limit(1).next();

    if (!latestPost) {
      return "I don't have that specific information about Ridham, but you can reach out to him directly at ridhampatel21@gmail.com.";
    }

    return `Ridham's latest published blog is \"${latestPost.title}\" (${latestPost.publishedAt}). You can read it at /blog/${latestPost.slug}.`;
  }

  if (isLatestProjectQuestion(input)) {
    const projectsCol = await getProjectsCollection();
    const latestProject = await projectsCol.find({}).sort({ year: -1, order: 1 }).limit(1).next();

    if (!latestProject) {
      return "I don't have that specific information about Ridham, but you can reach out to him directly at ridhampatel21@gmail.com.";
    }

    return `Ridham's latest project listed is \"${latestProject.title}\" (${latestProject.year}). You can find it at ${latestProject.url}.`;
  }

  if (isProjectsListQuestion(input)) {
    const projectsCol = await getProjectsCollection();
    const projects = await projectsCol.find({}).sort({ year: -1, order: 1 }).toArray();

    if (!projects.length) {
      return "I don't have that specific information about Ridham, but you can reach out to him directly at ridhampatel21@gmail.com.";
    }

    const list = projects
      .slice(0, 8)
      .map((p) => `- ${p.title} (${p.year})`)
      .join("\n");

    return `Here are Ridham's projects:\n${list}`;
  }

  return null;
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

    const deterministicReply = await getDeterministicReply(latestUserText);
    if (deterministicReply) {
      return refusalStream(messages, deterministicReply);
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
      model: model as any,
      messages: nvidiaSafeMessages,
      temperature: 0.2,
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