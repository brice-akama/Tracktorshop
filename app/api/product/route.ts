import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});

// POST: Add a new product
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);
    const description = formData.get("description") as string;
    const specialOffer = formData.get("specialOffer") === "true";
    const popularSet = formData.get("popularSet") === "true";
    const hydraulicPart = formData.get("hydraulicPart") === "true";
    const tractorBrands = formData.get("tractorBrands") === "true";

    const mainImageBase64 = formData.get("mainImage") as string;
    const mainImageUpload = await cloudinary.uploader.upload(mainImageBase64, {
      folder: "products/main",
    });

    const images: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("images[")) {
        const imageBase64 = value as string;
        const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
          folder: "products/extra",
        });
        images.push(uploadResponse.secure_url);
      }
    }

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    const newProduct = {
      name,
      category,
      price,
      quantity,
      description,
      specialOffer,
      popularSet,
      hydraulicPart,
      tractorBrands,
      mainImage: mainImageUpload.secure_url,
      images,
      createdAt: new Date(),
    };

    const result = await productsCollection.insertOne(newProduct);

    return NextResponse.json(
      {
        message: "Product added successfully!",
        product: newProduct,
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Failed to add product", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// GET: Retrieve products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get("productId");
    const specialOffer = searchParams.get("specialOffer") === "true";
    const popularSet = searchParams.get("popularSet") === "true";
    const hydraulicPart = searchParams.get("hydraulicPart") === "true";
    const tractorBrands = searchParams.get("tractorBrands") === "true";

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    if (productId) {
      const product = await productsCollection.findOne({
        _id: new ObjectId(productId),
      });

      if (product) {
        const relatedProducts = await productsCollection
          .find({ category: product.category, _id: { $ne: new ObjectId(productId) } })
          .limit(4)
          .toArray();

        return NextResponse.json(
          {
            message: "Product retrieved successfully!",
            product,
            relatedProducts,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Product not found!" },
        { status: 404 }
      );
    } else {
      const query: Record<string, unknown> = {};
      if (specialOffer) query.specialOffer = true;
      if (popularSet) query.popularSet = true;
      if (hydraulicPart) query.hydraulicPart = true;
      if (tractorBrands) query.tractorBrands = true;

      const products = await productsCollection.find(query).toArray();
      return NextResponse.json(
        {
          message: "Products retrieved successfully!",
          products,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// PUT: Update an existing product
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required!" }, { status: 400 });
    }

    const formData = await req.formData();
    const updatedFields: Record<string, any> = {};

    if (formData.has("name")) updatedFields.name = formData.get("name") as string;
    if (formData.has("category")) updatedFields.category = formData.get("category") as string;
    if (formData.has("price")) updatedFields.price = parseFloat(formData.get("price") as string);
    if (formData.has("quantity")) updatedFields.quantity = parseInt(formData.get("quantity") as string, 10);
    if (formData.has("description")) updatedFields.description = formData.get("description") as string;
    if (formData.has("specialOffer")) updatedFields.specialOffer = formData.get("specialOffer") === "true";
    if (formData.has("popularSet")) updatedFields.popularSet = formData.get("popularSet") === "true";
    if (formData.has("hydraulicPart")) updatedFields.hydraulicPart = formData.get("hydraulicPart") === "true";
    if (formData.has("tractorBrands")) updatedFields.tractorBrands = formData.get("tractorBrands") === "true";

    if (formData.has("mainImage")) {
      const mainImageBase64 = formData.get("mainImage") as string;
      const mainImageUpload = await cloudinary.uploader.upload(mainImageBase64, {
        folder: "products/main",
      });
      updatedFields.mainImage = mainImageUpload.secure_url;
    }

    const images: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("images[")) {
        const imageBase64 = value as string;
        const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
          folder: "products/extra",
        });
        images.push(uploadResponse.secure_url);
      }
    }
    if (images.length > 0) updatedFields.images = images;

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Product not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a product
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required!" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("product");
    const productsCollection = db.collection("products");

    const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Product not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

