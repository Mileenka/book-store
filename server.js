import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

import booksRoutes from './routes/books.js';

dotenv.config();

const PORT = process.env.PORT || 3005;

const __fileName = fileURLToPath(import.meta.url);
const PATH = dirname(__fileName);

const app = express();

// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static folder
app.use(express.static(path.join(PATH, 'public')));
app.use('/api/books', booksRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        message: `Oh dear! It seems these books have embarked on a whimsical journey through the pages of alternate realities and couldn't be located in our library. Please double-check your literary coordinates and let's try that book hunt again!`
    });
});

app.use('/api/books', booksRoutes),
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
