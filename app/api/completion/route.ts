import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, UIMessage, streamText } from "ai";
import { getDatabase } from "../../lib/mongodb"; // Import the database function

// IMPORTANT: Move your API key to a .env.local file
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const model = google("gemini-2.5-flash-lite");

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  let systemPrompt = "";

  try {
    // Get the database connection (uses cached connection if available)
    const db = await getDatabase();
    const collection = db.collection("system_prompts");

    const document = await collection.findOne({ prompt_type: "Dhruv_AI_Persona" });

    if (document && document.content) {
      systemPrompt = document.content;
    } else {
      console.warn("System prompt document not found or content is empty in MongoDB. Using a fallback or default prompt might be necessary.");
      systemPrompt = `You are an AI assistant.`; // Fallback prompt
    }

    const result = await streamText({
      model: model,
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in /api/completion:", error);
    // Return a proper HTTP error response to the client
    return new Response(`Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}