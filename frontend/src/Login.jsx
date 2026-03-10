import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Login() {
  const navigate = useNavigate();

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    try {
      const payload = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar
      }));
    } catch (e) {
      console.error('Invalid token', e);
    }
    navigate('/chat', { replace: true });
    return;
  }

  if (localStorage.getItem('token')) {
    navigate('/chat', { replace: true });
  }
}, [navigate]);

  const handleGoogle = () => {
    window.location = `${API_URL}/auth/google`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <button onClick={handleGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Login;