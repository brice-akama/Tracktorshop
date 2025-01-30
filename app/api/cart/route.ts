// app/api/cart/route.ts
// app/api/cart/route.ts
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

type Cart = {
  guestId: string;
  items: CartItem[];
};

export async function POST(req: Request) {
  const { productId, quantity } = await req.json();

  // Extract or generate guestId
  const cookies = req.headers.get('cookie') || '';
  const newGuestId = 'guest-' + Date.now();
  const guestId =
    cookies.split('; ').find((c) => c.startsWith('guestId='))?.split('=')[1] || newGuestId;

  console.log(`[POST] Adding item to cart. GuestID: ${guestId}, ProductID: ${productId}, Quantity: ${quantity}`);

  // Validate input
  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return NextResponse.json({ error: 'Quantity must be a positive integer' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('product'); // Correct database
    const cartCollection = db.collection('cart');
    const productCollection = db.collection('products');

    // Validate productId and fetch product
    let objectId;
    try {
      objectId = new ObjectId(productId.trim());
    } catch {
      return NextResponse.json({ error: 'Invalid productId format' }, { status: 400 });
    }

    const product = await productCollection.findOne({ _id: objectId });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Fetch or create the cart
    let cart = (await cartCollection.findOne({ guestId })) as Cart | null;

    if (!cart) {
      cart = {
        guestId,
        items: [
          {
            productId,
            quantity,
            name: product.name,
            price: product.price,
            image: product.mainImage,
          },
        ],
      };
      await cartCollection.insertOne(cart);
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId === productId);
      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity; // Update quantity
      } else {
        cart.items.push({
          productId,
          quantity,
          name: product.name,
          price: product.price,
          image: product.mainImage,
        });
      }
      await cartCollection.updateOne({ guestId }, { $set: { items: cart.items } });
    }

    // Set guestId in cookies if it was newly generated
    const headers = new Headers();
    if (newGuestId === guestId) {
      headers.append('Set-Cookie', `guestId=${guestId}; Path=/; HttpOnly; SameSite=Strict`);
    }

    // Fetch updated cart and return
    const updatedCart = await cartCollection.findOne({ guestId });
    return NextResponse.json(
      { message: 'Item added to cart', cart: updatedCart },
      { headers }
    );
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Extract or generate guestId
  const cookies = req.headers.get('cookie') || '';
  const newGuestId = 'guest-' + Date.now();
  const guestId =
    cookies.split('; ').find((c) => c.startsWith('guestId='))?.split('=')[1] || newGuestId;

  console.log(`[GET] Fetching cart. GuestID: ${guestId}`);

  try {
    const client = await clientPromise;
    const db = client.db('product'); // Correct database
    const cartCollection = db.collection('cart');

    // Fetch the cart for the given guestId
    const cart = (await cartCollection.findOne({ guestId })) as Cart | null;

    const headers = new Headers();
    if (newGuestId === guestId) {
      headers.append('Set-Cookie', `guestId=${guestId}; Path=/; HttpOnly; SameSite=Strict`);
    }

    if (!cart) {
      return NextResponse.json(
        { message: 'Cart is empty', cart: null },
        { headers }
      );
    }

    // Return the cart data
    return NextResponse.json({ cart }, { headers });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}




// Update quantity
export async function PUT(req: Request) {
  const { productId, quantity } = await req.json();
  const cookies = req.headers.get('cookie') || '';
  const guestId =
    cookies.split('; ').find((c) => c.startsWith('guestId='))?.split('=')[1];

  if (!guestId || !productId || !Number.isInteger(quantity) || quantity < 0) {
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("product");
    const cartCollection = db.collection('cart');

    const cart = await cartCollection.findOne({ guestId }) as Cart | null;

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Product not found in cart' }, { status: 404 });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
    } else {
      cart.items[itemIndex].quantity = quantity; // Update quantity
    }

    await cartCollection.updateOne({ guestId }, { $set: { items: cart.items } });

    const updatedCart = await cartCollection.findOne({ guestId });
    return NextResponse.json({ message: 'Cart updated successfully', cart: updatedCart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

// Remove item from cart
export async function DELETE(req: Request) {
  const { productId } = await req.json();
  const cookies = req.headers.get('cookie') || '';
  const guestId =
    cookies.split('; ').find((c) => c.startsWith('guestId='))?.split('=')[1];

  if (!guestId || !productId) {
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("product");
    const cartCollection = db.collection('cart');

    const cart = await cartCollection.findOne({ guestId }) as Cart | null;

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Product not found in cart' }, { status: 404 });
    }

    cart.items.splice(itemIndex, 1);

    await cartCollection.updateOne({ guestId }, { $set: { items: cart.items } });

    const updatedCart = await cartCollection.findOne({ guestId });
    return NextResponse.json({ message: 'Item removed from cart', cart: updatedCart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
}