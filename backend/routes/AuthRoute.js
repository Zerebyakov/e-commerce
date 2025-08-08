import express from 'express'
import { Login, logOUt, Me } from '../controllers/Auth.js';




const router = express.Router();

router.get('/me', Me)
router.post('/login', Login)
router.delete('/logout', logOUt)

export default router