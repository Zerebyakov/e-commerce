import express from 'express'
import { createUsers, deleteUser, getUserById, getUsers, updateUsers } from '../controllers/UsersController.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';



const router = express.Router();
router.get('/users' ,verifyUser,adminOnly,getUsers)
router.get('/users/:id', getUserById)
router.post('/users',createUsers)
router.patch('/users/:id',updateUsers)
router.delete('/users/:id',deleteUser)



export default router