import express from 'express';
import { isAuthenticated, isAlreadyLoggedIn } from '../middleware/authMiddleware.js';
import { statController } from '../controllers/statController.js';

export const statRouter = express.Router();

// gets all available stats from the player
statRouter.get('/getAllStats', isAuthenticated, 
              statController.listAll);

// gets the last stat from the player
statRouter.get('/getLastStat', isAuthenticated, 
              statController.showLatest);

// save a statistic from one run
statRouter.post('/saveStat', isAuthenticated, statController.create);

