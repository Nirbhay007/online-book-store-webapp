import express from "express";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes"
import { database, server } from "./config";
import userRoutes from "./routes/userRoutes"

const app = express();
app.use(express.json());

app.use('/api/books', booksRoutes); // Use the booksRoutes for /api/books
app.use('/api/user', userRoutes);

mongoose.connect(database.url).then(() => {
	console.log("Connected to database")
	app.listen(server.port, () => {
		console.log(`Server listening on port ${server.port}`)
	});
}).catch((error) => console.log(
	`${error}`
))

