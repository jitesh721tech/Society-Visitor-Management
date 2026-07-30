import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function SignupPage({ onSignup }) {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const signupResponse = await axios.post(`${API_URL}/auth/register/`, form);
      const loginResponse = await axios.post(`${API_URL}/auth/login/`, { email: form.email, password: form.password });

      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);

      const meResponse = await axios.get(`${API_URL}/auth/me/`, {
        headers: { Authorization: `Bearer ${loginResponse.data.access}` },
      });

      onSignup(meResponse.data);
      navigate('/resident/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="page-shell">
      <div className="auth-card">
        <h1>Create Resident Account</h1>
        <p>Register as a resident to start managing visitor requests.</p>

        {error && <div className="alert danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />

          <label>Phone Number</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />

          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

          <button type="submit">Create Account</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
