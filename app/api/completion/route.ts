import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, UIMessage, streamText } from "ai";
import { MongoClient, ServerApiVersion, Db } from 'mongodb'; // Import Db type

// IMPORTANT: Move your API key to a .env.local file
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const model = google("gemini-2.5-flash-lite");

// MongoDB connection details
const uri = process.env.MONGODB_URI;

// Throw an error if URI is not defined, this will provide a clearer build error
// if the environment variable is missing on Vercel.
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local or Vercel project settings.');
}

// Cached connection pattern for Next.js API routes
// These variables will persist across invocations in a serverless environment
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
  // If a client and database connection are already cached, return them
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no cached client, create a new one
  const client = new MongoClient(uri!, { // Use non-null assertion as we checked `uri` above
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Attempt to connect
    await client.connect();
    const db = client.db("information");

    // Cache the client and database for future reuse
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Re-throw the error to ensure the API route fails if connection cannot be established
    throw new Error("Database connection failed.");
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  let systemPrompt = "";

  try {
    // Connect to the database (this will use the cached connection if available)
    const { db } = await connectToDatabase();
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
  // IMPORTANT: Do NOT close the client in a finally block here.
  // The cached connection should remain open for subsequent requests in a serverless environment.
}