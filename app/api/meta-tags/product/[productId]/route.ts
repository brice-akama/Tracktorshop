// app/api/meta-tags/product/[productId]/route.ts
import { ObjectId } from 'mongodb';
import clientPromise from "../../../../lib/mongodb"; // Adjust the path to your database connection
import { NextResponse } from 'next/server';

// Typing the context properly
export async function GET(request: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params;  // No need to use await here

    // Validate product ID
    if (!ObjectId.isValid(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("product"); // Adjust DB name if necessary
    const productsCollection = db.collection("products");

    // Find the product by ID
    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

    // If the product is not found
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Construct the meta tags for the product
    const metaTags = {
      title: product.name,
      description: product.description,
      keywords: product.keywords || [],
      canonical: `/product/${productId}`,
      robots: 'index, follow',
      openGraph: {
        title: product.name,
        description: product.description,
        image: product.image || '/default-image.jpg',
        url: `/product/${productId}`,
      },
    };

    // Return the meta tags
    return NextResponse.json(metaTags);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params;

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const body = await request.json();

    const { title, description, keywords, canonical, productDescription } = body;

    if (!title || !description || !canonical || !productDescription) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    // Update or create meta tags and product description for the product
    const updateResult = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          "meta.title": title,
          "meta.description": description,
          "meta.keywords": keywords || [],
          "meta.canonical": canonical,
          "description": productDescription, // Update the product description
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      message: updateResult.modifiedCount > 0 ? 'Product updated' : 'Product created',
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
