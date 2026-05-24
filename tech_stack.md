# 🎬 Movie Token Management - Technical Stack & Documentation

This document provides a comprehensive overview of the technical architecture, requirements, and library usage for the Movie Token Management system.

---

## 🛠️ System Requirements

To run this project locally or build for Android, ensure you have the following installed:

| Requirement | Version | Notes |
| :--- | :--- | :--- |
| **Node.js** | >= 18.x | Required for backend and package management. |
| **Java (JDK)** | **24** | **Important:** Java 25 is too new; Java 24 is recommended for Gradle. |
| **Android SDK** | Latest | Required for Android APK builds (install via Android Studio). |
| **MongoDB** | 7.x / Atlas | Used for data persistence (Atlas cluster configured by default). |

---

## 🚀 Core Technology Stack

### 1. **Backend (Server-Side)**
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/) (v5.2.1)
- **Security:** Built-in `crypto` module for PBKDF2 password hashing and session token generation.
- **Entry Point:** `backend/server.js`

### 2. **Database (Data Layer)**
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ODM:** [Mongoose](https://mongoosejs.com/) (v9.4.1)
- **Schema:** Defined in `backend/models/` (User, Booking, Ticket, Payment).
- **Default Connection:** MongoDB Atlas Cloud Cluster.

### 3. **Frontend (Client-Side)**
- **Architecture:** Multi-page application using Vanilla HTML5, CSS3, and JavaScript.
- **Logic:** `js/` directory contains modular scripts for authentication, seat selection, and UI effects.
- **Storage:** Uses `window.localStorage` for session management (`authToken`, `userId`).
- **Communication:** Native `fetch` API for all backend interactions.

### 4. **Mobile Integration**
- **Platform:** [Capacitor.js](https://capacitorjs.com/) (v8.3.0)
- **Target:** Android (via `@capacitor/android`)
- **Config:** `capacitor.config.json` and `android/` directory.

---

## 📦 Libraries & Dependencies

### Backend Dependencies
| Library | Version | Description |
| :--- | :--- | :--- |
| **express** | ^5.2.1 | Minimalist web framework. |
| **mongoose** | ^9.4.1 | MongoDB object modeling. |
| **mongodb** | ^7.1.1 | Native MongoDB driver. |
| **cors** | ^2.8.6 | Enables Cross-Origin Resource Sharing. |
| **body-parser** | ^2.2.2 | Parses incoming request bodies. |

### Mobile/Build Dependencies
| Library | Version | Description |
| :--- | :--- | :--- |
| **@capacitor/core** | ^8.3.0 | Core Capacitor runtime. |
| **@capacitor/cli** | ^8.3.0 | Command-line tools for Capacitor. |
| **@capacitor/android** | ^8.3.0 | Android platform support. |

---

## 🔗 API Endpoints (RESTful)

All endpoints are prefixed with `/api`.

| Route | File | Functionality |
| :--- | :--- | :--- |
| **`POST /api/auth/register`** | `auth.js` | User signup with password hashing. |
| **`POST /api/auth/login`** | `auth.js` | User login and session creation. |
| **`GET /api/auth/me`** | `auth.js` | Fetch current logged-in user profile. |
| **`GET /api/seats`** | `seats.js` | Retrieve available seat data. |
| **`POST /api/bookings`** | `bookings.js` | Create a new movie booking. |
| **`GET /api/tickets`** | `ticket.js` | Generate or retrieve movie tickets. |
| **`GET /api/health`** | `server.js` | Server status check. |

---

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file (optional) or set variables in your environment:
- `PORT`: Server port (default: 5000).
- `MONGO_URI`: MongoDB connection string.

### Frontend API Base
Update `js/config.js` to point to your backend:
```javascript
window.APP_CONFIG = {
    API_BASE: "http://localhost:5000/api" // Use Laptop IP for Android testing
};
```

---

## 🛠️ Development & Build Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Start the backend server. |
| `npm run test` | Run syntax validation on backend files. |
| `npm run android:sync` | Sync web code with Android project. |
| `npm run android:open` | Open Android project in Android Studio. |
| `npm run android:build` | Build debug APK (outputs to `android/app/build/outputs/apk/debug/`). |

---

## 🧪 Testing the APIs

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name": "Admin", "email": "admin@example.com", "password": "password123"}'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@example.com", "password": "password123"}'
```
*(Copy the `token` from the response to use in protected routes)*

### 4. Authenticated Request
```bash
curl -H "Authorization: Bearer <YOUR_TOKEN>" http://localhost:5000/api/auth/me
```
