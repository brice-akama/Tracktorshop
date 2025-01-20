import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);
const db = client.db("tracktorshop"); // Replace with your DB name
const usersCollection = db.collection("users");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a strong secret key

export async function POST(request: NextRequest) {
  try {
    console.log("Login API called"); // Debugging
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token validity: 1 hour
    );

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling login:", error); // Log errors
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
