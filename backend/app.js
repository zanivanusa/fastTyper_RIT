import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';
import * as dotenv from 'dotenv'
import cors from 'cors';

// const file paths
const __filename = fileURLToPath(import.meta.url);
const __backend = path.dirname(__filename);
const __projectRoot = path.join(__backend, '..');
const __frontend = path.join(__projectRoot, 'frontend');
export const __pagesDir = path.join(__frontend, 'pages');

import { connectToMongoAtlas } from './database.js';

await connectToMongoAtlas();

var db = mongoose.connection;
db.on('error', (err) => console.log(`Could not connect: ${err}`));
db.on('error', () => console.log("Connected to Atlas DB"));

const app = express();
app.use(cors());

// body parse to get post data from req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//session management
app.use(session({
    secret: 'skupna6sipv',
    resave: true,
    saveUninitialized: false
}));

const PORT = process.env.PORT || 3000;

import { userRouter } from './routes/userRoutes.js';
import { textRouter } from './routes/textRoutes.js';
import { statRouter } from './routes/statRoutes.js';

app.use('/users', userRouter);
app.use('/texts', textRouter);
app.use('/stats', statRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
