# Messaging App – Architecture

## Overview

The system is a simple real-time messaging application that allows authenticated users to send messages that are visible to all connected users.

The system follows a **client-server architecture** with real-time communication.

---

## Tech Stack

### Frontend
React + Vite

Responsibilities:
- Login screen (now using Google OAuth)
- Display message list
- Send new messages
- Listen for real-time updates

### Backend
Node.js + Express

Responsibilities:
- Handle authentication
- Provide REST API
- Store messages
- Broadcast new messages

### Database
MongoDB

Used to store:
- users
- messages

### Realtime Communication
Socket.io

Used to:
- notify all clients when a new message is sent
- update message feed instantly

---

## System Components

Frontend (React)
↓
Backend API (Express)
↓
Database (MongoDB)

For real-time updates:

Backend
↕
Socket.io
↕
Clients

---

## Message Flow

1. User writes a message in the chat input.
2. Frontend sends a request to the backend.
3. Backend saves the message in the database.
4. Backend emits a `new_message` event using Socket.io.
5. All connected clients receive the event.
6. Clients update the message list in the UI.

---

## Authentication Flow

1. User clicks "Sign in with Google" on the login screen.
2. Browser is redirected to the backend's `/auth/google` endpoint.
3. Backend uses Passport with Google OAuth2 to verify the user and store or
   retrieve the profile from MongoDB.
4. On successful login the backend returns a small HTML snippet that stores the
   profile ({name,email,avatar}) in `localStorage` and then redirects to `/chat`.
5. Logged-in clients include their display name when posting messages; the
   backend will also read the session cookie and ignore any falsified user
   field.

---

## Future Improvements

If more development time were available, the system could be improved by:

- adding proper authentication (JWT / OAuth)
- message pagination
- message editing and deletion
- user presence indicators
- better UI/UX
- message persistence optimization