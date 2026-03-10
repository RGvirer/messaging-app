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
2. System displays login screen with a "Sign in with Google" button.
3. User clicks the button and is redirected to Google's OAuth consent page.
4. After granting permission, Google redirects back to the backend callback.
5. Backend verifies the token and creates or fetches a user record in MongoDB.
6. Backend returns a small script that stores the profile in localStorage.
7. Browser is redirected to the chat page.
8. Username (from Google profile) is used for all messages sent by the user.

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