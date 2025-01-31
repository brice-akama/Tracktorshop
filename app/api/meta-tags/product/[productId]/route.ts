// app/api/meta-tags/product/[productId]/route.ts
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ productId: string }>; // Ensure params is treated as a Promise
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { productId } = await context.params; // ✅ Await params

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const metaTags = {
      title: product.name,
      description: product.description,
      keywords: product.keywords || [],
      canonical: `/product/${productId}`,
      robots: "index, follow",
      openGraph: {
        title: product.name,
        description: product.description,
        image: product.image || "/default-image.jpg",
        url: `/product/${productId}`,
      },
    };

    return NextResponse.json(metaTags);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}


export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { productId } = await context.params; // ✅ Await params

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, keywords, canonical, productDescription } = body;

    if (!title || !description || !canonical || !productDescription) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    const updateResult = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          "meta.title": title,
          "meta.description": description,
          "meta.keywords": keywords || [],
          "meta.canonical": canonical,
          "description": productDescription,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      message: updateResult.modifiedCount > 0 ? "Product updated" : "Product created",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}
