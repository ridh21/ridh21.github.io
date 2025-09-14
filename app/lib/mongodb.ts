import { MongoClient, Db } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

// Define a global type for the MongoDB client (for development caching)
const globalWithMongo = global as typeof global & {
  _mongoClient?: MongoClient;
};

// MongoDB connection URI from Vercel's native integration
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined. Ensure MongoDB Atlas integration is enabled in Vercel.");
}

// MongoDB client options (standard for Atlas)
const options = {
  serverApi: {
    version: "1" as const,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let cachedDb: Db | null = null;

// Initialize the client with Vercel's pool manager
if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
    attachDatabasePool(globalWithMongo._mongoClient);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
  attachDatabasePool(client);
}

// Function to get the database (with caching)
export async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    cachedDb = client.db("stack-dhruv"); // Replace with your database name if different
    console.log("Connected to MongoDB via Vercel integration");
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed.");
  }
}

// Optional: Export the client if needed elsewhere
export { client };