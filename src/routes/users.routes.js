import { Router } from 'express'
import { getUser, getUsers, createUser, updateUser, deleteUser } from '../controllers/users.controllers.js';

const router = Router();

// Get all users
router.get('/users', getUsers);

//Get one user
router.get('/users/:id', getUser);

//Post a user
router.post('/users', createUser);

//Delete a user
router.delete('/users/:id', deleteUser);

//Edit a user
router.put('/users/:id', updateUser);

export default router;