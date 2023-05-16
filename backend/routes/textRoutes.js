import express from 'express';
import { getRandomText } from '../controllers/textController.js';

export const textRouter = express.Router();

textRouter.get('/randomText', getRandomText);
