# Messaging App

A real-time messaging application built as part of a technical assignment.

Users can log in with a username or via Google OAuth and send messages that are visible to all connected users.

---

**Live URLs**  

| Environment | URL |
|------------|-----|
| Frontend   | [https://rivkis-messaging-application.netlify.app/](https://rivkis-messaging-application.netlify.app/) |
| Backend    | [https://messaging-app-ql5h.onrender.com](https://messaging-app-ql5h.onrender.com) |

---

## Getting Started

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (new OAuth packages were added):
   ```bash
   npm install
   ```
3. Create a `.env` file (you can copy `.env.example`):
   ```bash
   cp .env.example .env
   ```
   and adjust `MONGO_URI`, `FRONTEND_URL` or other values as needed.
4. (Optional) if you're enabling Google login, update the OAuth values described
   below.
5. Start the server:
   ```bash
   npm run dev    # or npm start for production
   ```
   The backend listens on port 4000 by default.
   For deployment on Netlify, run:
   npm run build

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (the UI now uses Tailwind CSS):
   ```bash
   npm install
   ```
   If Tailwind packages were not pulled automatically, run:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
   The workspace already contains a `tailwind.config.js` and `postcss.config.js`.
3. Copy the example environment file if you need to override the API URL:
   ```bash
   cp .env.example .env
   ```
   (Vite requires the `VITE_API_URL` prefix for environment variables.)
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on port 3000 by default.

You can then open `http://localhost:3000` in your browser to use the chat app.

> **UI redesign:**
> The application now features a modern SaaS-style layout with a gradient login screen, polished chat interface, and responsive components built with Tailwind CSS. The code has been refactored into reusable React functional components for maintainability.

---

## Google OAuth Setup

To enable Google login you need to create credentials in the Google Cloud Console:

1. Create a new OAuth 2.0 Client ID (type "Web application").
2. Add the following redirect URI to the client configuration:
   ```
   https://messaging-app-ql5h.onrender.com/auth/google/callback
   ```
   (or whatever `BACKEND_URL` you are using).
3. Copy the **Client ID** and **Client Secret**.

Set the following environment variables in `backend/.env`:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BACKEND_URL=https://messaging-app-ql5h.onrender.com   # must match the redirect URI
FRONTEND_URL=http://localhost:3000

# JWT settings
JWT_SECRET=a_long_random_string
JWT_EXPIRES_IN=1h               # token lifetime
```

After restarting the backend, clicking the "Sign in with Google" button on the login page
will start the OAuth flow. On success the backend will save the user to MongoDB, create a
JSON Web Token containing the user's profile, and redirect the browser to `/chat?token=…`.
The frontend reads the token from the query string, stores it in `localStorage`, and
includes it in all subsequent API and WebSocket requests.

---

# Tech Stack

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Realtime Communication: Socket.io
- Deployment:
  - Frontend: Netlify
  - Backend: Render
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

1. **Specification phase:**  
   - Detailed specifications were written covering:
     - Product requirements
     - System architecture
     - API structure
   - These specifications served as the blueprint for all subsequent development.

2. **AI-assisted implementation:**  
   - **GitHub Copilot (Agent mode)** was used for:
     - Writing boilerplate code and repetitive tasks
     - Generating backend and frontend components based on specs
     - Accelerating the development workflow while maintaining code consistency
   - **ChatGPT** was used for:
     - Debugging and fixing complex issues
     - Reviewing and improving system architecture decisions
     - Guidance on best practices and deployment strategies
     - Troubleshooting integration with external services and servers

3. **Impact on development:**  
   - Reduced development time by automating routine coding tasks
   - Maintained high code quality and adherence to specifications
   - Enabled rapid iteration and experimentation with features
   - Streamlined deployment and integration with external systems

This approach combined structured planning with AI-assisted coding, resulting in an organized, efficient, and high-quality development process.

---

## Notes

- Basic authentication is already implemented using JWT tokens.
- Google OAuth is available for login.

---

# Future Improvements

With additional development time, the following improvements could be implemented:

- message history pagination
- private messages
- user presence indicators
- improved UI/UX
- message editing and deletion
