import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb"; // Import MongoDB client promise

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    // Connect to MongoDB and get the newsletter collection
    const client = await clientPromise;
    const db = client.db(); // Use the default database from the connection string
    const collection = db.collection("newsletter"); // Specify the collection name

    // Insert the email into the collection
    await collection.insertOne({ email, subscribedAt: new Date() });

    return NextResponse.json({ message: "Thank you for subscribing!" });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
