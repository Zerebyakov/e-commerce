import express from 'express'
import { createCategory, deleteCategory, getCategory } from '../controllers/CategoryController.js';

const router = express.Router();


router.get('/category', getCategory)
router.post('/category', createCategory)
router.delete('/category/:id', deleteCategory)


export default router
