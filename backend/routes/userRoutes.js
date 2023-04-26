/**
 * userRouter.js
 *
 * @description :: Routing for authenticated users.
*/


import Router from 'express';
import { userController } from '../controllers/userController.js';
import { isAuthenticated, isAlreadyLoggedIn } from '../middleware/authMiddleware.js';
import { __pagesDir } from '../app.js';

export var userRouter = Router();

userRouter.get('/', isAuthenticated, (req, res) => {
    res.send('You are authenticated!');
});
userRouter.get('/register', isAlreadyLoggedIn, (req, res) => {
    res.sendFile(__pagesDir + "/register.html");
});
userRouter.get('/login', isAlreadyLoggedIn, (req, res) => {
    res.sendFile(__pagesDir + "/login.html");
});

userRouter.get('/logout', isAuthenticated ,userController.logout);
userRouter.post('/', isAlreadyLoggedIn, userController.create);
userRouter.post('/login', isAlreadyLoggedIn, userController.login);
