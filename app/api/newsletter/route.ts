import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb"; 
import { ObjectId } from 'mongodb';// Import MongoDB client promise

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
    const db = client.db('test'); // Use the default database from the connection string
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




// GET method to fetch all newsletter subscriptions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection("newsletter");

    // Fetch all subscriptions
    const subscriptions = await collection.find().toArray();

    return NextResponse.json({ subscriptions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching subscriptions." },
      { status: 500 }
    );
  }
}

// DELETE method to remove a newsletter subscription
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection("newsletter");

    // Delete the subscription by ID
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Subscription not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Subscription deleted successfully." });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting subscription." },
      { status: 500 }
    );
  }
}