// src/components/SignupForm.js
import React, { useState } from 'react';

const SignupForm = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5000/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log("singned up successfully")
			} else {
				console.log("error");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
			<h2 className="text-xl font-semibold mb-4">Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="username" className="block text-sm font-medium">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block text-sm font-medium">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
						required
					/>
				</div>
				<div className="mb-4 flex justify-between">
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
					>
						Sign Up
					</button>
					<button

						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
					>
						Login
					</button>

				</div>
			</form>

		</div>
	);
}

export default SignupForm;
