import express from 'express'
import { createTransactionFromCart, getTransactionsByUser, updateTransactionStatus } from '../controllers/TransactionController.js';

const router = express.Router();


router.get("/:user_id", getTransactionsByUser);
router.post("/", createTransactionFromCart);
router.patch("/:id", updateTransactionStatus);

export default router;