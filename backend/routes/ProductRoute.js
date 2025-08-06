import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/ProductControllers.js';


const router = express.Router();
router.get('/products',getProducts)
router.post('/products',createProduct)
router.get('/products/:id',getProductById)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id',deleteProduct)

export default router