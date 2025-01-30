import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb" // Use your clientPromise to connect to MongoDB

export async function POST(req: NextRequest) {
  try {
    const { productId, reviewerName, reviewText, rating } = await req.json();

    // Validate required fields
    if (!productId || !reviewerName || !reviewText || typeof rating !== "number") {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to the database using clientPromise
    const client = await clientPromise;
    const db = client.db("review"); // Replace with your database name
    const reviewsCollection = db.collection("reviews");

    // Create the review object
    const newReview = {
      productId,
      reviewerName,
      reviewText,
      rating,
      createdAt: new Date(),
    };

    // Insert the review into the database
    await reviewsCollection.insertOne(newReview);

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ message: "Error submitting review" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get the productId from the query parameters
    const productId = req.nextUrl.searchParams.get("productId");

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("review"); // Replace with your database name
    const reviewsCollection = db.collection("reviews");

    let reviews;

    if (productId) {
      // Fetch reviews for the given productId
      reviews = await reviewsCollection
        .find({ productId })
        .sort({ createdAt: -1 })
        .toArray();
    } else {
      // Fetch all reviews
      reviews = await reviewsCollection.find({}).sort({ createdAt: -1 }).toArray();
    }

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}


// Update a review
export async function PUT(req: NextRequest) {
  try {
    const { reviewId, reviewText, rating } = await req.json();

    if (!reviewId || !reviewText || typeof rating !== "number") {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("review");
    const reviewsCollection = db.collection("reviews");

    const updatedReview = await reviewsCollection.updateOne(
      { _id: new ObjectId(reviewId) },
      { $set: { reviewText, rating, updatedAt: new Date() } }
    );

    if (updatedReview.matchedCount === 0) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ message: "Error updating review" }, { status: 500 });
  }
}

// Delete a review
export async function DELETE(req: NextRequest) {
  try {
    const { reviewId } = await req.json();

    if (!reviewId) {
      return NextResponse.json({ message: "Review ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("review");
    const reviewsCollection = db.collection("reviews");

    const result = await reviewsCollection.deleteOne({ _id: new ObjectId(reviewId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ message: "Error deleting review" }, { status: 500 });
  }
}