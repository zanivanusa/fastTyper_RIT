/**
 * userRouter.js
 *
 * @description :: Routing for authenticated users.
*/

import Router from 'express';
import { userController } from '../controllers/userController.js';
import { isAuthenticated, isAlreadyLoggedIn } from '../middleware/authMiddleware.js';

export var userRouter = Router();

userRouter.get('/logout', isAuthenticated ,userController.logout);
userRouter.post('/register', isAlreadyLoggedIn, userController.create);
userRouter.post('/login', isAlreadyLoggedIn, userController.login);
