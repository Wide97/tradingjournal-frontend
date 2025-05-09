// src/services/fetchWrapper.js

const API_URL = import.meta.env.VITE_API_URL;
console.log("🔍 Tutte le env:", import.meta.env);


function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, url, body) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${url}`, options);

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Errore nella richiesta');
  }

  return response.json();
}

export const fetchWrapper = {
  get: (url) => request('GET', url),
  post: (url, body) => request('POST', url, body),
  put: (url, body) => request('PUT', url, body),
  del: (url) => request('DELETE', url),
};
