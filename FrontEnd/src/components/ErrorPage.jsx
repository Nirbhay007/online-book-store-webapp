// src/components/ErrorPage.js
import React from 'react';

function ErrorPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-semibold mb-4">404 - Not Found</h1>
				<p className="text-gray-600">The page you're looking for does not exist.</p>
			</div>
		</div>
	);
}

export default ErrorPage;
