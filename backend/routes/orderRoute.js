import express from 'express';
import authMiddlewar from '../middleware/auth.js'
import { placeOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/place", authMiddlewar, placeOrder);


export default orderRouter;