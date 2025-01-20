import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";  // MongoDB URI from .env.local
const options = {};

// Initialize MongoDB client
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use global for development to prevent multiple connections during HMR
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // For production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
