import express from 'express';
import authMiddlewar from '../middleware/auth.js'
import { listOrders, placeOrder, userOrders } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/place", authMiddlewar, placeOrder);
orderRouter.post("/userOrders", authMiddlewar, userOrders);
orderRouter.post("/listOrders", listOrders);



export default orderRouter;