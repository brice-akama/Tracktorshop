import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tracktorshop");

    // Accessing notifications collection
    const notificationsCollection = db.collection("notifications");

    // Fetch the latest notifications, you can modify the query to suit your needs
    const notifications = await notificationsCollection.find().sort({ createdAt: -1 }).limit(5).toArray();

    return NextResponse.json({
      notifications
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ message: "Error fetching notifications" }, { status: 500 });
  }
}
