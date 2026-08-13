import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import GeasLogo from '../assets/Logo-GEAS-2.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin
        ? { email, password }
        : { email, password, name };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante l\'autenticazione');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={GeasLogo} alt="GEAS Basket Logo" className="login-logo" />
        <h1>GEAS Basket</h1>
        <p className="login-subtitle">
          {isLogin ? 'Accedi al gestionale' : 'Registrati al gestionale'}
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="login-input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Caricamento...' : isLogin ? 'Accedi' : 'Registrati'}
          </button>
        </form>

        <div className="login-toggle">
          <p>
            {isLogin ? 'Non hai un account? ' : 'Hai già un account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="login-toggle-button"
            >
              {isLogin ? 'Registrati' : 'Accedi'}
            </button>
          </p>
        </div>

        <div className="login-footer">
          <p>Property of Gianmarco Di Matteo</p>
        </div>
      </div>
    </div>
  );
}
