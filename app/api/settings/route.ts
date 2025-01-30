import clientPromise from "../../lib/mongodb"; // Ensure this points to your MongoDB connection
import { ObjectId } from "mongodb";

// GET handler
export async function GET(req: Request) {
  console.log("GET request received");
  try {
    const client = await clientPromise;
    const db = client.db("tractorshop"); // Replace with your actual database name
    const settingsCollection = db.collection("settings");

    let settings = await settingsCollection.findOne({});

    if (!settings) {
      console.log("No settings found, inserting default settings");
      const defaultSettings = {
        general: { siteName: "PowerPlow", siteLogo: "PowerPlow" },
        user: { maxLoginAttempts: 5, allowSocialLogin: true },
        security: { enable2FA: true, passwordMinLength: 8 },
        appearance: { theme: "dark", layout: "grid" },
        seo: { metaTitle: "PowerPlow - The Best", metaDescription: "Best site for tractor parts" },
        backup: { autoBackup: true, backupFrequency: "daily" },
        performance: { cacheEnabled: true, compressionEnabled: true },
        createdAt: new Date()
      };

      const result = await settingsCollection.insertOne(defaultSettings);
      settings = await settingsCollection.findOne({ _id: result.insertedId });
    }

    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    console.error("Error retrieving settings:", error);
    return new Response(
      JSON.stringify({ message: "Error retrieving settings", error }),
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(req: Request) {
  console.log("POST request received");
  try {
    const body = await req.json();
    const { settingsId, updatedSettings } = body;

    if (!settingsId) {
      console.log("Settings ID is required");
      return new Response(
        JSON.stringify({ message: "Settings ID is required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tractorshop"); // Replace with your actual database name
    const settingsCollection = db.collection("settings");

    // Ensure '_id' is excluded from the updatedSettings object
    const { _id, ...settingsToUpdate } = updatedSettings;

    // Perform the update without the '_id' field
    await settingsCollection.updateOne(
      { _id: new ObjectId(settingsId) },
      { $set: settingsToUpdate }
    );

    console.log("Settings updated successfully");
    return new Response(
      JSON.stringify({ message: "Settings updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating settings:", error);
    return new Response(
      JSON.stringify({ message: "Error updating settings", error }),
      { status: 500 }
    );
  }
}
