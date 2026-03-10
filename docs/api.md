# Messaging App – API Specification

## Base URL

The server is mounted at the root path (`/`).
(The earlier draft mentioned `/api`; the current implementation uses `/messages` directly.)

---

## Login

The frontend handles authentication entirely in the browser. There is no server-side
login endpoint in this simple version; the username is stored in `localStorage` and
included with every message.

---

## Authentication

### GET /auth/google

Redirects the browser to Google's OAuth consent screen. After the user grants
permission, Google will call back to `/auth/google/callback` on the backend.  The
backend then stores or retrieves the user in MongoDB, sets a session cookie, and
serves a small HTML script that saves the profile in `localStorage` before
redirecting to the frontend chat page.

### GET /auth/google/callback

OAuth callback endpoint used by Google. Not meant to be called directly from the
frontend; the redirect script it returns handles storing the profile.

---

## Get Messages

### GET /messages

Returns the list of recent messages.

Response:

[
  {
    "id": "string",
    "user": "string",
    "avatar": "string (optional)",
    "text": "string",
    "createdAt": "date"
  }
]

Messages should be returned ordered by creation time.

---

## Send Message

### POST /messages

Allows a logged-in user to send a message.

Request:

{
  "user": "string",
  "text": "string"
}

Response:

{
  "id": "string",
  "user": "string",
  "text": "string",
  "createdAt": "date"
}