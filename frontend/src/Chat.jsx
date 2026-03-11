import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// ui components
import Header from "./components/Header";
import MessageBubble from "./components/MessageBubble";
import ChatInput from "./components/ChatInput";
import Layout from "./components/Layout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
axios.defaults.withCredentials = true;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Load token once
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      const payload = jwtDecode(token);
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate('/login');
      } else {
        user = {
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
        };
      }
    } catch {
      localStorage.removeItem("token");
      navigate('/login');
    }
  } else {
    navigate('/login');
  }

  // Fetch messages once and setup socket once
  useEffect(() => {
    if (!token || !user) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/messages`);
        setMessages(res.data.reverse());
      } catch (err) {
        console.error("Failed to load messages", err);
        setError("Failed to load messages");
      }
    };

    fetchMessages();

    socketRef.current = io(API_URL, { auth: { token } });

    socketRef.current.on("connect", () => console.log("Socket connected:", socketRef.current.id));
    socketRef.current.on("disconnect", (reason) => console.log("Socket disconnected:", reason));
    socketRef.current.on("new_message", (msg) => setMessages((prev) => [...prev, msg]));

    return () => socketRef.current?.disconnect();
  }, [token]); // token should not change during session

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!user) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 500) {
      setError("Message too long");
      return;
    }

    axios
      .post(`${API_URL}/messages`, { text: trimmed })
      .then((res) => {
        setMessages((prev) => [...prev, res.data]);
        setText("");
        setError("");
      })
      .catch((err) => {
        console.error(err.response || err);
        setError("Failed to send message");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <Layout className="h-screen bg-neutral">
      <Header user={user} onLogout={handleLogout} />

      {error && <div className="text-center text-red-600 py-2">{error}</div>}

      <div className="flex-1 overflow-auto p-4 space-y-2 scroll-smooth">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No messages yet. Say hello! 👋</p>
        )}
        {messages.map((m, idx) => (
          <MessageBubble key={idx} message={m} isOwn={user && m.user === user.name} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput text={text} setText={setText} onSend={sendMessage} />
    </Layout>
  );
}

export default Chat;