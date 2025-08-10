import express from 'express'
import { addToCart, getCartByUser, removeFromCart, updateCartItem } from '../controllers/CartController.js';



const router = express.Router();

router.get("/:user_id", getCartByUser);
router.post("/", addToCart);
router.patch("/:id", updateCartItem);
router.delete("/:id", removeFromCart);


export default router