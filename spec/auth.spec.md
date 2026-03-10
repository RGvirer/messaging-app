# Feature: User Authentication

## Goal

Allow users to identify themselves before sending messages.

For this version of the system authentication will be simplified.

Users only provide a username.

The username is stored locally in the browser and attached to messages.

---

## Actors

User

---

## Preconditions

User opens the application.

User is not authenticated.

---

## Main Flow

1. User opens the application.
2. System displays login screen.
3. User enters username.
4. User presses "Enter".
5. Frontend stores username in localStorage.
6. User is redirected to chat page.
7. Username is used for all messages sent by the user.

---

## Postconditions

User is considered authenticated.

User can access the chat page and send messages.

---

## Edge Cases

Empty username

System should prevent login and show a validation message.

Very long username

System should limit username length.