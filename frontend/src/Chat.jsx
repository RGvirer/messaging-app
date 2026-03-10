import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/login');
      return;
    }

    axios
      .get(`${API_URL}/messages`)
      .then((res) => {
        // backend returns newest-first, reverse for display order
        setMessages(res.data.reverse());
      })
      .catch(() => setError('Failed to load messages'));

    socketRef.current = io(API_URL);
    socketRef.current.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [navigate]);

  const sendMessage = () => {
    const username = localStorage.getItem('username');
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 500) {
      setError('Message too long');
      return;
    }
    axios
      .post(`${API_URL}/messages`, { user: username, text: trimmed })
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
          <div key={idx} style={{ marginBottom: '8px' }}>
            <strong>{m.user}: </strong>
            <span>{m.text}</span>
            <div style={{ fontSize: '0.7em', color: '#999' }}>
              {new Date(m.createdAt).toLocaleTimeString()}
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