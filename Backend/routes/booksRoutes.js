import express from "express";
import booksController from "../controllers/booksController"
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware";

router.use('/', booksController);


export default router;