import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Layout from './components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173';

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
    window.location.href = `${API_URL}/auth/google?redirect_uri=${encodeURIComponent(
      CLIENT_URL + '/login'
    )}`;
  };

  return (
    <Layout className="items-center justify-center bg-gradient-to-br from-primary to-accent">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded hover:shadow-md transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4a320.1 320.1 0 0 0-5.2-59.5H272v112.7h146.9a125.3 125.3 0 0 1-54.3 82.3v68h87.8a248.3 248.3 0 0 0 72-203.5z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c73.6 0 135.4-24.4 180.6-66.3l-87.8-68c-24.4 16.5-55.6 26.2-92.8 26.2-71.4 0-132-48.1-153.5-112.7H28.4v70.8a272.7 272.7 0 0 0 243.6 149.2z"
            />
            <path
              fill="#FBBC05"
              d="M118.5 323.2a162.7 162.7 0 0 1 0-102.1v-70.8H28.4a272.7 272.7 0 0 0 0 243.6l90.1-70.7z"
            />
            <path
              fill="#EA4335"
              d="M272 109.5c39.9 0 75.8 13.6 104 40.3l78-78A272.6 272.6 0 0 0 28.4 166.3l90.1 70.8C140 157.6 200.6 109.5 272 109.5z"
            />
          </svg>
          Sign in with Google
        </button>
        </div>
    </Layout>
  );
}

export default Login;