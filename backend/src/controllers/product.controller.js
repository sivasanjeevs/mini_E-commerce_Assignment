import Product from '../models/product.model.js';

const SAMPLE_PRODUCTS = [
  // Shoes
  { name: 'Classic White Sneakers', price: 1999, category: 'Shoes' },
  { name: 'Running Sport Shoes', price: 2499, category: 'Shoes' },
  { name: 'Casual Slip‑On Shoes', price: 1799, category: 'Shoes' },
  { name: 'High‑Top Street Sneakers', price: 2699, category: 'Shoes' },
  { name: 'Formal Leather Shoes', price: 3199, category: 'Shoes' },
  { name: 'Adidas Running Shoes', price: 3499, category: 'Shoes' },
  { name: 'Nike Air Sneakers', price: 3999, category: 'Shoes' },
  { name: 'Puma Training Shoes', price: 3299, category: 'Shoes' },
  { name: 'Woodland Trek Boots', price: 4599, category: 'Shoes' },

  // Clothing
  { name: 'Black Basic T‑Shirt', price: 799, category: 'Clothing' },
  { name: 'Everyday Blue Jeans', price: 1499, category: 'Clothing' },
  { name: 'Lightweight Hoodie', price: 1299, category: 'Clothing' },
  { name: 'Checked Casual Shirt', price: 1199, category: 'Clothing' },
  { name: 'Summer Chino Shorts', price: 999, category: 'Clothing' },
  { name: 'Classic White Shirt', price: 899, category: 'Clothing' },
  { name: 'Graphic T‑Shirt', price: 699, category: 'Clothing' },
  { name: 'Denim Shorts', price: 849, category: 'Clothing' },
  { name: 'Flared Skirt', price: 1099, category: 'Clothing' },
  { name: 'Casual Crop Top', price: 749, category: 'Clothing' },

  // Decor
  { name: 'Minimal Wall Frame', price: 899, category: 'Decor' },
  { name: 'Scented Candle Set', price: 699, category: 'Decor' },
  { name: 'Tabletop Plant Pot', price: 499, category: 'Decor' },
  { name: 'Decorative Throw Pillow', price: 649, category: 'Decor' },
  { name: 'String Fairy Lights', price: 549, category: 'Decor' },

  // Home
  { name: 'Soft Cotton Bedsheet', price: 1599, category: 'Home' },
  { name: 'Kitchen Utensil Set', price: 999, category: 'Home' },
  { name: 'Luxury Bath Towel', price: 699, category: 'Home' },
  { name: 'Non‑stick Frying Pan', price: 1399, category: 'Home' },
  { name: 'Glass Storage Jar Set', price: 799, category: 'Home' },
  { name: 'Comfort 3‑Seater Sofa', price: 11999, category: 'Home' },
  { name: 'Wooden Dining Table Set', price: 14999, category: 'Home' },

  // Accessories
  { name: 'Minimal Wrist Watch', price: 1899, category: 'Accessories' },
  { name: 'Leather Wallet', price: 899, category: 'Accessories' },
  { name: 'Everyday Backpack', price: 1599, category: 'Accessories' },
  { name: 'Aviator Sunglasses', price: 1299, category: 'Accessories' },
  { name: 'Classic Belt', price: 699, category: 'Accessories' },
  { name: 'Premium Analog Watch', price: 2499, category: 'Accessories' },
  { name: 'Gold‑Plated Chain', price: 1999, category: 'Accessories' },
  { name: 'Elegant Finger Ring', price: 1299, category: 'Accessories' },
];

export async function getProducts(req, res) {
  try {
    let products = await Product.find().lean();

    if (products.length === 0) {
      products = await Product.insertMany(SAMPLE_PRODUCTS);
    }

    res.json(products);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}

