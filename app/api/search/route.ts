import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for type-checking and validation

export async function GET(req: Request) {
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);

    // Return empty results if no search query is provided
    if (!search || search.trim() === "") {
      return NextResponse.json({ results: [] });
    }

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    // Check if the search matches a product by ID
    let productById = null;
    if (ObjectId.isValid(search)) {
      productById = await productsCollection.findOne({ _id: new ObjectId(search) });
    }
    if (productById) {
      return NextResponse.json({ redirectTo: `/product/${productById._id}` });
    }

    // Check if the search matches a category
    const category = await productsCollection.findOne({
      category: { $regex: search, $options: "i" },
    });
    if (category) {
      return NextResponse.json({
        redirectTo: `/product?category=${encodeURIComponent(category.category)}`,
      });
    }

    // Check if the search matches a product name
    const productByName = await productsCollection.findOne({
      name: { $regex: search, $options: "i" },
    });
    if (productByName) {
      return NextResponse.json({ redirectTo: `/product/${productByName._id}` });
    }

    // If no matches are found, return no results
    return NextResponse.json({ redirectTo: null });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
