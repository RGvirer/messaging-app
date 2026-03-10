import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Login from './Login';
import Chat from './Chat';
import { useEffect } from 'react';

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      try {
        const payload = jwt_decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar
        }));
      } catch (e) {
        console.error('Invalid token', e);
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return <App />;
}

function App() {
  const storedToken = localStorage.getItem('token');

  const user = (() => {
    if (!storedToken) return null;
    try {
      const payload = jwt_decode(storedToken);
      if (payload.exp * 1000 < Date.now()) return null;
      return { name: payload.name, email: payload.email, avatar: payload.avatar };
    } catch {
      return null;
    }
  })();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={user ? <Chat /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}