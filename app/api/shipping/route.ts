// app/api/shipping/route.ts
import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address, city, zip } = await req.json();

  // Simulating dynamic shipping rate calculation based on the zip code or other factors
  let shippingCost = 0;

  // Example calculation based on zip code (you can replace this with your own logic)
  if (zip.startsWith("9")) {
    shippingCost = 10; // Higher cost for certain areas (just an example)
  } else if (zip.startsWith("1")) {
    shippingCost = 5;  // Standard cost for other areas
  } else {
    shippingCost = 7;  // Default shipping cost
  }

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db('shipping');
  const shippingCollection = db.collection("shipping_rates");

  // Save the shipping data to the database
  const shippingData = {
    address,
    city,
    zip,
    shippingCost: shippingCost.toFixed(2),
    createdAt: new Date(),
  };

  try {
    // Insert the shipping data into the MongoDB collection
    await shippingCollection.insertOne(shippingData);
  } catch (error) {
    console.error("Error saving shipping data:", error);
    return NextResponse.json({ error: "Failed to save shipping data." }, { status: 500 });
  }

  // Return the calculated shipping cost
  return NextResponse.json({ shippingCost: shippingCost.toFixed(2) });
}
