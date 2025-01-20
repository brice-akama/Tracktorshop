import clientPromise from "../../lib/mongodb"; // Import MongoDB client promise
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Establish connection to the database
    const client = await clientPromise;
    const db = client.db("your-database-name"); // Replace with your database name
    const collection = db.collection("contacts"); // Replace with your collection name

    // Save the message to the database
    const result = await collection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(), // Add timestamp
    });

    console.log("Saved Contact Message:", result);

    // Return success response
    return NextResponse.json({ message: "Your message has been received!" }, { status: 200 });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
