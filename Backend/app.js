import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { database, server } from "./config";
import booksRoutes from "./routes/booksRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(cors({
	origin: ["http://localhost:5173"], // Specify the correct origin with the http:// protocol
	methods: ["GET", "PUT", "POST", "DELETE"],
	allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);

// Connect to the database
mongoose.connect(database.url)
	.then(() => {
		console.log("Connected to database");
		// Start the server
		app.listen(server.port, () => {
			console.log(`Server listening on port ${server.port}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});
