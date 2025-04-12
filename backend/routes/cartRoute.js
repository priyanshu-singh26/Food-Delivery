import express from "express";
import { addToCart, removeToCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
// cartRouter.post("/remove", authMiddleware, removeToCart);
cartRouter.delete("/remove", authMiddleware, removeToCart);
cartRouter.get("/get", authMiddleware, getCart);



export default cartRouter;