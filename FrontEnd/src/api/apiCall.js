import axios from 'axios';

export const userBaseUrl = axios.create({
	baseURL: 'http://localhost:5000/api/users'
});
