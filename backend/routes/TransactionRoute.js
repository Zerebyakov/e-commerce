import express from "express";
import {
  getTransactionsByUser,
  createTransactionFromCart,
  updateTransactionStatus,
  getTransactionById
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/transactions/:user_id", getTransactionsByUser);
router.get("/transactions/detail/:id", getTransactionById);
router.post("/transactions", createTransactionFromCart);
router.put("/transactions/:id", updateTransactionStatus);

export default router;
