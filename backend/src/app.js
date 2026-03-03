import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ecommerce-api' });
});

app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);

export default app;

