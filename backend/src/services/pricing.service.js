import Product from '../models/product.model.js';

/**
 * Given cart items from client, look up products and calculate pricing.
 * @param {Array<{ productId: string, quantity: number }>} cartItems
 * @returns {Promise<{ lines: Array, subtotal: number, discounts: Array<{ label: string, amount: number }>, total: number }>}
 */
export async function calculatePricing(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { lines: [], subtotal: 0, discounts: [], total: 0 };
  }

  const productIds = cartItems.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } }).lean();

  const productMap = new Map(products.map((p) => [String(p._id), p]));

  const lines = [];
  for (const item of cartItems) {
    const product = productMap.get(String(item.productId));
    if (!product || !item.quantity || item.quantity <= 0) continue;

    const unitPrice = product.price;
    const lineSubtotal = unitPrice * item.quantity;

    lines.push({
      productId: String(product._id),
      name: product.name,
      category: product.category,
      quantity: item.quantity,
      unitPrice,
      lineSubtotal,
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineSubtotal, 0);
  const discounts = [];

  // Rule 1: Category threshold discount (generic).
  // For any category where the total value exceeds THRESHOLD, apply PERCENTAGE% off that category.
  const CATEGORY_THRESHOLD = 150;
  const CATEGORY_DISCOUNT_PERCENTAGE = 10;

  const categoryTotals = new Map();
  for (const line of lines) {
    const current = categoryTotals.get(line.category) ?? 0;
    categoryTotals.set(line.category, current + line.lineSubtotal);
  }

  for (const [category, categoryTotal] of categoryTotals.entries()) {
    if (categoryTotal > CATEGORY_THRESHOLD) {
      const amount = (categoryTotal * CATEGORY_DISCOUNT_PERCENTAGE) / 100;
      discounts.push({
        label: `${CATEGORY_DISCOUNT_PERCENTAGE}% off ${category} over ₹${CATEGORY_THRESHOLD}`,
        amount,
      });
    }
  }

  // Rule 2: Bulk discount for quantity >= 3 on a single product (5% off that product's total)
  const BULK_DISCOUNT_PERCENTAGE = 5;

  for (const line of lines) {
    if (line.quantity >= 3) {
      const amount = (line.lineSubtotal * BULK_DISCOUNT_PERCENTAGE) / 100;
      discounts.push({
        label: `Bulk discount on ${line.name} (${BULK_DISCOUNT_PERCENTAGE}% off)`,
        amount,
      });
    }
  }

  const totalDiscount = discounts.reduce((sum, d) => sum + d.amount, 0);
  const total = Math.max(0, subtotal - totalDiscount);

  return { lines, subtotal, discounts, total };
}

