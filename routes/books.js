import express from 'express';

import booksController from '../controllers/books.js';

const router = express.Router();

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBook);
router.post('/', booksController.postBook);
router.put('/:id', booksController.putBook);
router.delete('/:id', booksController.deleteBook);

export default router;
