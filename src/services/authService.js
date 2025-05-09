// src/services/authService.js
import { fetchWrapper } from './fetchWrapper';

export const authService = {
  login,
};

async function login({ username, password }) {
  const res = await fetchWrapper.post('/api/auth/login', { username, password });
  return res.token;
}
