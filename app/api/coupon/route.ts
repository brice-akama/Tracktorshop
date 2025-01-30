import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("your_database_name");
    const couponsCollection = db.collection("coupons");

    if (body.code && body.discount && body.type) {
      // Admin: Create a Coupon
      const { code, discount, type, expiresAt, usageLimit } = body;

      // Validate required fields
      if (!code || !discount || !type) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }

      // Check for duplicate coupon
      const existingCoupon = await couponsCollection.findOne({ code });
      if (existingCoupon) {
        return NextResponse.json(
          { message: "Coupon code already exists" },
          { status: 400 }
        );
      }

      // Insert coupon into database
      await couponsCollection.insertOne({
        code,
        discount,
        type,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        usageLimit: usageLimit || null,
        usageCount: 0,
        createdAt: new Date(),
      });

      return NextResponse.json({ message: "Coupon created successfully" });
    } else if (body.coupon) {
      // User: Validate and Apply Coupon
      const { coupon } = body;
      const cartTotal = 100; // Example cart total (replace with actual cart data)

      // Validate required field
      if (!coupon) {
        return NextResponse.json(
          { message: "Coupon code is required" },
          { status: 400 }
        );
      }

      // Fetch coupon from the database
      const validCoupon = await couponsCollection.findOne({ code: coupon });
      if (!validCoupon) {
        return NextResponse.json(
          { message: "Invalid coupon code" },
          { status: 400 }
        );
      }

      const { discount, type, expiresAt, usageLimit, usageCount } = validCoupon;

      // Check if coupon is expired
      if (expiresAt && new Date(expiresAt) < new Date()) {
        return NextResponse.json(
          { message: "Coupon has expired" },
          { status: 400 }
        );
      }

      // Check if usage limit is reached
      if (usageLimit && usageCount >= usageLimit) {
        return NextResponse.json(
          { message: "Coupon usage limit reached" },
          { status: 400 }
        );
      }

      // Calculate the discount
      let discountAmount = 0;
      if (type === "percentage") {
        discountAmount = Math.min((cartTotal * discount) / 100, cartTotal);
      } else if (type === "flat") {
        discountAmount = Math.min(discount, cartTotal);
      }

      const newTotal = cartTotal - discountAmount;

      // Update usage count
      await couponsCollection.updateOne(
        { code: coupon },
        { $inc: { usageCount: 1 } }
      );

      return NextResponse.json({
        discount: discountAmount,
        newTotal,
      });
    }

    return NextResponse.json(
      { message: "Invalid request payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
