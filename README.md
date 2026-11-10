# 📝 Notelify — Full-Stack Collaborative Note Application

**Notelify** is a modern, full-stack note management platform built on the MERN stack (MongoDB, Express, React, Node.js). It provides secure user authentication, responsive interface components, and custom **Resource-Based Ownership Access Control (RBAC)**—allowing authenticated users to explore shared notes across the community while strictly restricting edit and delete privileges to the original content creator.

---

## 💡 What is Notelify?

In standard note applications, users only see their own isolated data. Notelify bridges the gap between private note-taking and collaborative discovery. Authenticated users can browse a shared collection of notes posted by all registered members, but fine-grained authorization rules prevent unauthorized tampering or deletion of notes created by others.

---

## 🔥 Key Features & Capabilities

- **🔐 Secure Authentication & Session Control**
  - Full user registration and login workflows.
  - Sensitive passwords hashed securely using `bcrypt`.
  - Stateless authentication managed via JSON Web Tokens (JWT).
  - Private client-side routing with automatic session persistence.

- **🛡️ Resource-Based Ownership Access Control (RBAC)**
  - **Public Read Access**: Every authenticated user can read all notes created across the application.
  - **Owner-Only Mutations**: Editing and deleting notes are restricted strictly to the author who created them.
  - **Dual-Layer Enforcement**: Access rules are validated both on the React UI (hiding/disabling administrative controls) and on the Express server prior to database updates or deletions.

- **⚡ Complete CRUD Operations**
  - **Create**: Add new notes with real-time binding to your user account.
  - **Read**: Fetch and display community notes cleanly on the main dashboard.
  - **Update**: Edit existing note titles or body content through dynamic UI workflows.
  - **Delete**: Instantly remove owned notes from the MongoDB database.

- **🎨 Modern & Responsive UI**
  - Fast client side rendering using React (Vite) and Tailwind CSS v4.
  - Instant user feedback and alerts for authentication errors, unauthorized actions, and success states.

---

## 🛠️ Tech Stack

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Frontend** | React 18 (Vite) | Single-page client framework |
| **Styling** | Tailwind CSS v4 | Responsive utility-first styling |
| **HTTP Client** | Axios | REST API requests & token authorization headers |
| **Backend** | Node.js & Express.js | Server environment & RESTful API routes |
| **Database** | MongoDB & Mongoose ODM | Cloud document storage & schema data modeling |
| **Security** | JWT & `bcrypt` | Stateless access tokens & password hashing |

---

## 📁 Repository Structure

```text
Notelify_note_app/
├── backend/
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── model/
│   │   ├── note.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── note.route.js
│   │   └── user.route.js
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
