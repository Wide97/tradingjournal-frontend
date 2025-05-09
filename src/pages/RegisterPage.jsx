import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWrapper } from '../services/fetchWrapper';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [uuid, setUuid] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetchWrapper.post('/api/trader', formData);
      setUuid(res.id);
      alert(`Registrazione avvenuta! ID utente: ${res.id}`);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrazione</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success" type="submit">
          Registrati
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {uuid && (
          <div className="alert alert-success mt-3">
            Il tuo ID è: <strong>{uuid}</strong>
          </div>
        )}
      </form>
    </div>
  );
}
