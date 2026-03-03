import Order from '../models/order.model.js';

export async function getOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return res.json(orders);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch orders:', err);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
}

export async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).lean();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(order);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch order:', err);
    return res.status(500).json({ message: 'Failed to fetch order' });
  }
}

export async function deleteAllOrders(req, res) {
  try {
    await Order.deleteMany({});
    return res.json({ message: 'All orders deleted' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to delete orders:', err);
    return res.status(500).json({ message: 'Failed to delete orders' });
  }
}

