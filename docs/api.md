# Messaging App – API Specification

## Base URL

/api

---

## Login

### POST /login

Allows a user to log in using a username.

Request:

{
  "username": "string"
}

Response:

{
  "username": "string"
}

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