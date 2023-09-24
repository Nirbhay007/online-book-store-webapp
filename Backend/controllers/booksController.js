import express from "express";
import { Book } from "../models/Book";
import multer from "multer";
const storage = multer.memoryStorage(); // Store the image in memory

const router = express.Router();

// Define a function to check if the file is an image based on its MIME type
const imageFileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image/')) {
		return cb(null, true);
	}
	cb(new Error('Not an image! Please upload an image file.'), false);
};

// Define a function to check the size of the uploaded image
const imageFileSizeLimit = 5 * 1024 * 1024; // 5 MB (adjust as needed)

const upload = multer({
	storage,
	fileFilter: imageFileFilter,
	limits: { fileSize: imageFileSizeLimit }, // Set the size limit
});


// Define routes for book-related operations
router.post('/', upload.single('image'), async (req, res) => {
	try {
		// Check if the image file was provided
		if (!req.file) {
			return res.status(400).json({ error: 'Image is required' });
		}

		// Check if other required fields are provided
		const { title, authors, price } = req.body;
		if (!title) {
			return res.status(400).json({ error: 'Title is required' });
		}
		if (!authors) {
			return res.status(400).json({ error: 'Authors are required' });
		}
		if (!price) {
			return res.status(400).json({ error: 'Price is required' });
		}

		// Check if a book with the same title already exists
		const existingBook = await Book.findOne({ title });
		if (existingBook) {
			return res.status(409).json({ error: 'A book with the same title already exists' });
		}

		// Create a new book document with the provided data
		const newBook = new Book({
			...req.body,
			image: req.file.buffer // Store the image as binary data
		});

		// Save the new book to the database
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
