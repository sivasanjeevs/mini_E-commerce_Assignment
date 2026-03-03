import { calculatePricing } from '../services/pricing.service.js';

export async function checkout(req, res) {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const pricing = await calculatePricing(items);

    return res.json({
      subtotal: pricing.subtotal,
      discounts: pricing.discounts,
      total: pricing.total,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Checkout failed:', err);
    return res.status(500).json({ message: 'Checkout failed' });
  }
}

