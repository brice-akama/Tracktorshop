import clientPromise from '../../lib/mongodb';  
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';  // Import uuid

// Define the types for the request and cart item
interface CartItem {
  price: number;
  quantity: number;
}

interface OrderRequestBody {
  paymentMethod: string;
  cart: { items: CartItem[] };
  billingDetails: Record<string, any>; // Use a more specific type based on your billing details structure
  agreedTerms: boolean;
}

export async function POST(req: Request) {
  try {
    // Parse the request body with type safety
    const { paymentMethod, cart, billingDetails, agreedTerms }: OrderRequestBody = await req.json();

    // Validate agreedTerms
    if (!agreedTerms) {
      return NextResponse.json({ error: 'You must agree to the terms of use.' }, { status: 400 });
    }

    // Validate the cart
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    // Calculate the total price
    const total = cart.items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    // Connect to the database
    const client = await clientPromise;
    const db = client.db('order');
    const ordersCollection = db.collection('orders');

    // Create the order object
    const order = {
      orderId: uuidv4(), // Generate a unique ID
      paymentMethod,
      cart,
      total,
      billingDetails,
      status: 'pending',
      createdAt: new Date(),
    };

    console.log('Order before insertion:', order);

    // Insert the order into the database
    const result = await ordersCollection.insertOne(order);

    // Respond with success
    return NextResponse.json(
      {
        message: 'Order placed successfully!',
        orderId: result.insertedId.toString(),
        billingDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to process the order.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db('order');
    const ordersCollection = db.collection('orders');

    // Fetch all orders from the database
    const orders = await ordersCollection.find().toArray();

    // Respond with the list of orders
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 });
  }
}