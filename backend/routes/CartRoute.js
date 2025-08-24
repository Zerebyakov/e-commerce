import express from "express";
import {
  getCartByUser,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/CartController.js";

const router = express.Router();

router.get("/cart/:user_id", getCartByUser);
router.post("/cart", addToCart);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", removeFromCart);
router.delete("/cart/clear/:user_id", clearCart);

export default router;