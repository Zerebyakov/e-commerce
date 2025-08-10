import express from 'express'
import { getTransactionItems } from '../controllers/TransactionItemsController.js';

const router = express.Router();

router.get('/:transaction_id', getTransactionItems)
router.delete('/:id', getTransactionItems)


export default router