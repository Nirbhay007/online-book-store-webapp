import express from "express";
import { Book } from "../models/Book";

const router = express.Router();

// Define routes for book-related operations
router.post('/', async (req, res) => {
	try {

		const title = req.body.title;
		const matchCaseTitle = Book.find({ "title": title });
		if (matchCaseTitle) {
			res.status(200).json("Book with the given title already exists.")
		}

		const newBook = new Book(req.body);
		await newBook.save();
		res.status(201).json(newBook);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to add the book.' });
	}
});

// Define the route for searching books with separate criteria
router.get('/search', async (req, res) => {
	const { title, authors, genre } = req.query;
	const searchCriteria = {};

	// Add criteria to the searchCriteria object based on user input
	if (title) {
		searchCriteria.title = { $regex: title, $options: 'i' }; // Case-insensitive title search
	}
	if (authors) {
		searchCriteria.authors = { $regex: authors, $options: 'i' }; // Case-insensitive author search
	}
	if (genre) {
		searchCriteria.genre = { $regex: genre, $options: 'i' }; // Case-insensitive genre search
	}

	try {
		console.log(searchCriteria);
		const books = await Book.find(searchCriteria);

		res.json(books);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to search for books.' });
	}
});

router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve books.' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ message: 'Book not found.' });
		}
		res.json(book);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve the book.' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedBook) {
			return res.status(404).json({ message: 'Book not found.' });
		}
		res.json(updatedBook);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update the book.' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedBook = await Book.findByIdAndRemove(req.params.id);
		if (!deletedBook) {
			return res.status(404).json({ message: 'Book not found.' });
		}
		res.json({ message: 'Book deleted successfully.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to delete the book.' });
	}
});



export default router;
