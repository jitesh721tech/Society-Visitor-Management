import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login/`, form);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      const meResponse = await axios.get(`${API_URL}/auth/me/`, {
        headers: { Authorization: `Bearer ${response.data.access}` },
      });

      onLogin(meResponse.data);
      navigate('/resident/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="page-shell">
      <div className="auth-card">
        <h1>Resident Login</h1>
        <p>Welcome back. Sign in to manage your visitors.</p>

        {error && <div className="alert danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          New resident? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
