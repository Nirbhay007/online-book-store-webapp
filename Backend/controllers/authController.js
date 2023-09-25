// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { secret } from '../config';

export const register = async (req, res) => {
	try {

		const { username, password, email } = req.body; // Extract username, password, and email from req.body

		if (!username || !password || !email) {
			return res.status(400).json({ error: 'Username, password, and email are required' });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: 'Password should be at least 6 characters long' });
		}

		const emailCheck = await User.findOne({ email }); // Use await here to wait for the query to complete

		if (emailCheck) {
			return res.status(400).json({ error: 'Email already exists, please login' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();
		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Registration failed' });
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: 'Authentication failed' });
		}
		const token = jwt.sign({ userId: user._id }, secret.key, {
			expiresIn: '1h',
		});
		res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Login failed' });
	}
};
