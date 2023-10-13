let books = [
    {
        // id: 1,
        name: 'HarryPotter',
        author: 'J.K.Rowling',
        src: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTa2qWhvtJLoPYdfD0SkcYbxUTQSqlg3EFA00vIddRa4RfsaEEeTVTj8RmbRGSLl6FWrEwAJvceVTqokFD8VQZvl0LbBf48gO9U51_NUqA&usqp=CAc'
    },
    {
        id: 2,
        name: 'SherlockHolmes',
        author: 'Arthur Conan Doyle',
        src: 'https://almabooks.com/wp-content/uploads/2016/10/adventures-of-Sherlock-Holmes-600x928.jpg'
    },
    {
        id: 3,
        name: 'Atomic Habits',
        author: 'James Clear',
        src: 'https://m.media-amazon.com/images/I/61UkYQdV1cL._AC_UF1000,1000_QL80_.jpg'
    },
    {
        id: 4,
        name: 'The Canterville Ghost',
        author: 'Oscar Wilde',
        src: 'https://m.media-amazon.com/images/I/51d0MSTSaaL.jpg'
    },
    {
        id: 5,
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        src: 'https://www.winterparklibrary.org/sites/default/files/content/events/images/tkam.jpg'
    },
    {
        id: 6,
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        src: 'https://m.media-amazon.com/images/I/61OTNorhqVS._AC_UF894,1000_QL80_.jpg'
    },
    {
        id: 7,
        name: 'Pride and Prejudice',
        author: 'Jane Austen',
        src: 'https://i.pinimg.com/736x/66/1d/17/661d179ab722e67eed274d24b8965b0d.jpg'
    },
    {
        id: 8,
        name: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        src: 'https://images-cdn.bridgemanimages.com/api/1.0/image/600wm.XXX.0498890.7055475/985761.jpg'
    }
];

const getBooksById = (id) => {
    return books.find((book) => book.id === +id);
};

const booksController = {
    getBooks: (req, res) => {
        res.status(200).render('books', { books: books });
    },
    getBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);
        if (bookExist) {
            res.render('book', { book: bookExist });
        } else {
            res.status(404).render('error', {
                message: `"Seems like the book with ID ${id} has pulled a vanishing act worthy of the most elusive literary characters - it's off on a grand adventure through the hidden chapters of the book universe!"`
            });
        }
    },
    postBook: (req, res) => {
        const { name, author, src } = req.body;
        const newBook = {
            id: books.length + 1,
            name: name,
            author: author,
            src: src
        };
        books.push(newBook);

        res.status(201).json(newBook);
    },
    putBook: (req, res) => {
        const { id } = req.params;
        const { name, author, src } = req.body;

        const bookExist = getBooksById(id);
        if (bookExist) {
            const updatedBook = req.body;
            books = books.map((book) => {
                if (book.id === bookExist.id) {
                    return updatedBook;
                }
                return book;
            });
            res.status(200).json({
                message: `Book with id: ${id} updated`,
                book: getBooksById(id)
            });
        } else {
            res.status(404).json({
                message: `Book with id: ${id} does not exist`
            });
        }
    },

    deleteBook: (req, res) => {
        const { id } = req.params;
        const bookExist = getBooksById(id);
        if (bookExist) {
            books = books.filter((book) => book.id !== +id);
            res.status(200).json({ message: `Book with id: ${id} deleted` });
        } else {
            res.status(404).json({
                message: `Book with id: ${id} does not exist`
            });
        }
    }
};

export default booksController;
