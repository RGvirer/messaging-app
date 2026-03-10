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

## Get Messages

### GET /messages

Returns the list of recent messages.

Response:

[
  {
    "id": "string",
    "user": "string",
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