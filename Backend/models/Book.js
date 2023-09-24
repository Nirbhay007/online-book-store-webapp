import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		authors: {
			type: String,
			required: true,
		},
		average_rating: Number,
		isbn: String,
		isbn13: String,
		language_code: String,
		num_pages: Number,
		ratings_count: Number,
		text_reviews_count: Number,
		publication_date: Date,
		publisher: String,
		image: { type: Buffer, required: true },
		price: { type: Number, required: true },
	},
	{ collection: 'booksdata' }
);

export const Book = mongoose.model('Book', bookSchema);


