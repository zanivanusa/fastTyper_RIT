import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';

// const file paths
const __filename = fileURLToPath(import.meta.url);
const __backend = path.dirname(__filename);
const __projectRoot = path.join(__backend, '..');
const __frontend = path.join(__projectRoot, 'frontend');
export const __pagesDir = path.join(__frontend, 'pages');

// mongodb connect
var mongoDB = 'mongodb://127.0.0.1/fast-typer';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


const app = express();

// body parse to get post data from req.body
app.use(bodyParser.urlencoded({ extended: false }));

//session management
app.use(session({
    secret: 'skupna6sipv',
    resave: true,
    saveUninitialized: false
}));

const PORT = process.env.PORT || 3000;

import { userRouter } from './routes/userRoutes.js';

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.sendFile(__pagesDir + "/index.html");
});

app.get('/text', (req, res) => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliqu';
    return res.json({ text });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
