import { ObjectId } from 'mongodb'; // Import ObjectId from MongoDB package
import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) chunks.push(value);
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

// Helper function to upload to Cloudinary
async function uploadToCloudinary(buffer: Buffer, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result.secure_url);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });
}

// Create a new blog post
export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Parse the form data
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile) {
      const imageBuffer = await streamToBuffer(imageFile.stream()); // Convert stream to buffer
      imageUrl = await uploadToCloudinary(imageBuffer, 'blog_posts'); // Upload to Cloudinary
    }

    const client = await clientPromise;
    const db = client.db('blog');
    const result = await db.collection('blogPosts').insertOne({
      title,
      content,
      author,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}


// Update an existing blog post
export async function PUT(req: Request) {
  try {
    const { id, title, content, author, image } = await req.json();

    const client = await clientPromise;
    const db = client.db('blog');

    let imageUrl = '';
    if (image) {
      // Upload the new image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'blog_posts',
      });
      imageUrl = uploadResponse.secure_url;
    }

    const updatedPost = {
      title,
      content,
      author,
      ...(imageUrl && { imageUrl }), // Add imageUrl if provided
      updatedAt: new Date(),
    };

    const result = await db.collection('blogPosts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPost }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// Delete a blog post
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db('blog');

    const result = await db.collection('blogPosts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}


// Fetch a single blog post
// Updated API to fetch all posts or specific post based on ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const client = await clientPromise;
  const db = client.db('blog');
  
  try {
    if (id) {
      // Fetch a specific post by ID
      const post = await db.collection('blogPosts').findOne({ _id: new ObjectId(id) });

      if (!post) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }

      return NextResponse.json(post);
    } else {
      // Fetch all blog posts if no ID is provided
      const posts = await db.collection('blogPosts').find().toArray();
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
