
import clientPromise from '../../lib/mongodb'; // The MongoDB connection helper

import { NextResponse } from 'next/server'; 

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const usersCollection = db.collection('users');
    const ordersCollection = db.collection('orders');
    const productsCollection = db.collection('products');
    const trafficCollection = db.collection('traffic');

    const totalUsers = await usersCollection.countDocuments();
    const totalOrders = await ordersCollection.countDocuments();
    const totalProducts = await productsCollection.countDocuments();
    const websiteTraffic = await trafficCollection.countDocuments();

    return NextResponse.json({
      users: totalUsers,
      orders: totalOrders,
      totalProducts: totalProducts,
      traffic: websiteTraffic,
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ message: 'Error fetching metrics' }, { status: 500 });
  }
}
