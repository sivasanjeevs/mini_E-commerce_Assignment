import { Router } from 'express';
import { deleteAllOrders, getOrderById, getOrders } from '../controllers/order.controller.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.delete('/', deleteAllOrders);

export default router;

