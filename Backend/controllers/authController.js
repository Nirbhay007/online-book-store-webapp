// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { secret } from '../config';

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
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
