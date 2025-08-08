import express from 'express'
import { createUsers, deleteUser, getUserById, getUsers, updateUsers } from '../controllers/UsersController.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';



const router = express.Router();
router.get('/users' ,verifyUser,adminOnly,getUsers)
router.get('/users/:id',verifyUser,adminOnly, getUserById)
router.post('/users',verifyUser,adminOnly,createUsers)
router.patch('/users/:id',verifyUser,adminOnly,updateUsers)
router.delete('/users/:id',verifyUser,adminOnly,deleteUser)



export default router