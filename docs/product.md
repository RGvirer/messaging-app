# Messaging App – Product Specification

## Goal
Build a simple messaging application where users can log in and send messages that are visible to all connected users.

The goal is to demonstrate the ability to quickly build a working system using AI-assisted development.

---

## Core Features

### User Login
Users must be able to identify themselves in the system.

For simplicity, the system will use:
- Username only (no password)

The username will be stored locally in the browser.

---

### Send Messages
After logging in, a user can:

- Write a message
- Send it to the system

---

### View Messages
All connected users should be able to see the list of messages.

When a new message is sent, it should appear for all users within a short time.

---

### User Interface

The application includes three main UI parts:

1. Login Screen
2. Chat Messages Area
3. Message Input Field

The design will remain minimal and functional.

---

## Non-Goals

The following features are intentionally out of scope for this task:

- advanced authentication
- private messages
- message editing
- file uploads
- advanced UI design

---

## Success Criteria

The system will be considered successful if:

- users can log in
- users can send messages
- all users can see messages
- new messages appear quickly
- the application is deployed and accessible via a public link