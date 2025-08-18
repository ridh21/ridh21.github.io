import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, ModelMessage, streamText, UIMessage } from "ai";
import { MongoClient, ServerApiVersion } from 'mongodb'; // Import MongoClient

// IMPORTANT: Move your API key to a .env.local file
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const model = google("gemini-2.5-flash-lite");

// MongoDB connection details
const uri = process.env.MONGODB_URI || ""; // Use environment variable for URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  let systemPrompt = "";

  try {
    await client.connect();
    const database = client.db("information");
    const collection = database.collection("system_prompts");

    const document = await collection.findOne({ prompt_type: "Dhruv_AI_Persona" });

    if (document && document.content) {
      systemPrompt = document.content;
    } else {
      console.warn("System prompt document not found or content is empty in MongoDB. Using a fallback or default prompt might be necessary.");
      // Optionally, define a fallback systemPrompt here if the database query fails
      systemPrompt = `You are an AI assistant.`; 
    }

    const result = await streamText({
      model: model,
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Failed to fetch system prompt from MongoDB:", error);
    // Handle the error appropriately, e.g., return an error response
    return new Response("Error processing request: Could not retrieve AI persona.", { status: 500 });
  } finally {
    await client.close();
  }
}