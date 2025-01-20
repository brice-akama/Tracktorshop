import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);
const db = client.db("tracktorshop"); // Replace with your DB name
const usersCollection = db.collection("users");

export async function POST(request: NextRequest) {
  try {
    console.log("Register API called"); // For debugging
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "Registration successful", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling registration:", error); // Log errors
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
