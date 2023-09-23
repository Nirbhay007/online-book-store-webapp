import 'dotenv/config'

// Non-sensitive configuration options
export const server = {
	port: process.env.PORT || 5000,
};

// Database configuration
export const database = {
	url: process.env.MONGODB_URL,
};

// Feature flags
export const secret = {
	// Define your feature flags here
	key: process.env.SECRET_KEY,
};
