// app/api/logTraffic/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

const fetchLocationData = async (ip: string) => {
  const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_API_KEY}`);
  const data = await response.json();
  return data;
};

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('traffic');
    const trafficCollection = db.collection('traffic');

    // Get the IP address from the request headers (use 'x-forwarded-for' in case of proxies)
    const ipAddress = req.headers.get('x-forwarded-for') || 'Unknown IP'; // Handle the case where ipAddress is undefined
    const userAgent = req.headers.get('user-agent');

    let country = 'Unknown';

    if (ipAddress !== 'Unknown IP') {
      // Look up geolocation data for the IP
      const locationData = await fetchLocationData(ipAddress);
      country = locationData.country || 'Unknown'; // Default to 'Unknown' if no country info is available
    }

    // Log the traffic with additional information
    await trafficCollection.insertOne({
      timestamp: new Date(),
      ipAddress: ipAddress || 'Unknown IP',
      userAgent: userAgent || 'Unknown User Agent',
      country: country,
    });

    return NextResponse.json({ message: 'Traffic logged' });
  } catch (error) {
    console.error('Error logging traffic:', error);
    return NextResponse.json({ message: 'Error logging traffic' }, { status: 500 });
  }
}
