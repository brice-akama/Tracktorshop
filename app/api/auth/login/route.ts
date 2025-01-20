import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if email matches
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Verify the password (compare plaintext password directly)
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  return NextResponse.json({ token });
}
