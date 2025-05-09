export const fetchWrapper = async (url, method = 'GET', body = null, token = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Errore nella richiesta');
    }
  
    return response.json();
  };
  