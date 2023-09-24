// src/components/LoginPage.js
import React, { useState } from 'react';


const LoginPage = () => {
	const [formData, setFormData] = useState({
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
			const response = await fetch('http://localhost:5000/api/users/login', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log("logged in successfully")
			} else {
				console.log("error");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold mb-4">Login</h2>
				{/* Add login form here */}
				<form onSubmit={handleSubmit}>

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

				</form>
				<div className="mb-4 flex justify-between">
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
					>
						Login
					</button>
					<button

						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
					>

						Sign Up
					</button>

				</div>
			</div >
		</div >
	);
}

export default LoginPage;
