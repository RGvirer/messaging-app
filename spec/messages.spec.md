# Feature: Messaging System

## Goal

Allow authenticated users to send messages that are visible to all connected users.

Messages should appear in near real-time.

---

## Actors

Authenticated User

---

## Data Model

Message

Fields

id
user (string - display name)
avatar (optional string - URL to avatar image)
text
createdAt

---

## Main Flow: Send Message
1. Authenticated user (profile stored in localStorage) types a message in the input field.
2. User presses the send button.
3. Frontend sends POST request to /messages; the backend may also read the session cookie to
   determine the sender.
4. Backend validates message and the sender information.
5. Backend saves message (including optional avatar) in database.
5. Backend saves message in database.
6. Backend emits a "new_message" event via Socket.io.
7. All connected clients receive the event.
8. Clients append the message to the chat list.

---

## Main Flow: Load Messages

1. User opens the chat page.
2. Frontend requests GET /messages.
3. Backend returns the latest messages.
4. Frontend renders the message list.

---

## Edge Cases

Empty message

System should prevent sending empty messages.

Very long message

System should limit message length.

Backend failure

Frontend should show an error message.