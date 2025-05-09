import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Card, FormField, PrimaryButton, Spinner } from '../components';
import '../styles/pages/LoginPage.scss';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <Card>
        <h2 className="login-title">🚀 Accesso al Trading Journal</h2>
        <p className="login-subtitle">Inserisci le tue credenziali per continuare</p>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
         <div className="form-actions">
         <PrimaryButton
            text={loading ? 'Accesso...' : 'Login'}
            type="submit"
            disabled={loading}
          />
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>
        {loading && <Spinner />}
        <p className="register-link">
          Non hai un account? <Link to="/register">Registrati</Link>
        </p>
      </Card>
    </div>
  );
}


