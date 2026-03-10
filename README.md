# Messaging App

A simple real-time messaging application built as part of a technical assignment.

The application allows users to log in with a username and send messages that are visible to all connected users.

---

## Getting Started

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (you can copy `.env.example`):
   ```bash
   cp .env.example .env
   ```
   and adjust `MONGO_URI` or `CLIENT_URL` if needed.
4. Start the server:
   ```bash
   npm run dev    # or npm start for production
   ```
   The backend listens on port 4000 by default.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file if you need to override the API URL:
   ```bash
   cp .env.example .env
   ```
   (Vite requires the `VITE_API_URL` prefix for environment variables.)
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on port 4000 by default.

You can then open `http://localhost:4000` in your browser to use the chat app.

---


---

# Tech Stack

Frontend
React + Vite

Backend
Node.js + Express

Database
MongoDB

Realtime Communication
Socket.io

Deployment
Frontend: Vercel  
Backend: Render / Railway

---

# Architecture

The system follows a client-server architecture.

Frontend communicates with the backend using REST APIs.

Real-time updates are implemented using Socket.io.

When a user sends a message:
1. The frontend sends the message to the backend.
2. The backend stores the message in MongoDB.
3. The backend broadcasts the message to all connected clients.
4. Clients update the UI in real time.

---

# AI Tools Used

The system was developed using AI-assisted development.

Tools used:

- ChatGPT
- GitHub Copilot

AI was used for:

- generating initial architecture
- creating API structure
- implementing backend routes
- building React components
- refining code and improving structure

---

# How AI Was Used

The development process followed a **Spec Driven Development** approach.

First, specifications were written describing:

- product requirements
- system architecture
- API structure

AI tools were then used to implement features based on those specifications.

This approach helped accelerate development while keeping the system organized.

---

# Future Improvements

With additional development time, the following improvements could be implemented:

- proper authentication (JWT / OAuth)
- message history pagination
- private messages
- user presence indicators
- improved UI/UX
- message editing and deletion