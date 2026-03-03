import Product from '../models/product.model.js';

const SAMPLE_PRODUCTS = [
  { name: 'Black T‑Shirt', price: 19.99, category: 'Apparel' },
  { name: 'Gray Hoodie', price: 39.99, category: 'Apparel' },
  { name: 'White Sneakers', price: 59.99, category: 'Footwear' },
  { name: 'Minimal Watch', price: 89.99, category: 'Accessories' },
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

