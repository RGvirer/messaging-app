import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
axios.defaults.withCredentials = true;

// attach token header for all requests
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('token');
  let user = null;
  if (storedToken) {
    try {
      const payload = jwtDecode(storedToken);
      // check expiration
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      } else {
        user = { name: payload.name, email: payload.email, avatar: payload.avatar };
      }
    } catch {
      localStorage.removeItem('token');
    }
  }

useEffect(() => {
  if (!user) return;

  socketRef.current = io(API_URL, { auth: { token: localStorage.getItem('token') }, withCredentials: true });
  
  socketRef.current.on('new_message', (msg) => {
    setMessages(prev => [...prev, msg]);
  });

  return () => {
    socketRef.current?.disconnect();
  };
}, [user]);

  const sendMessage = () => {
    if (!user) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 500) {
      setError('Message too long');
      return;
    }
    axios
      .post(`${API_URL}/messages`, { user: user.name, text: trimmed })
      .then(() => setText(''))
      .catch(() => setError('Failed to send message'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat</h1>
      {user && (
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="me"
              style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
            />
          )}
          <span>Welcome, {user.name}</span>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '8px'
        }}
      >
        {messages.map((m, idx) => (
          <div key={idx} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            {m.avatar && (
              <img
                src={m.avatar}
                alt="avatar"
                style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8 }}
              />
            )}
            <div>
              <strong>{m.user}: </strong>
              <span>{m.text}</span>
              <div style={{ fontSize: '0.7em', color: '#999' }}>
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          style={{ width: '80%' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;