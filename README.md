# Movie Token Management System

A full-stack movie booking and token management application for browsing movies, selecting seats, completing bookings, and generating tickets. The project includes a web frontend, an Express/MongoDB backend API, and Capacitor support for building an Android app.

## Features

- User registration and login with token-based sessions
- Movie listing and booking flow
- Seat selection with booked-seat tracking
- Payment and booking record creation
- Ticket generation and ticket lookup
- Admin-facing page structure
- Android project support through Capacitor

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Mobile | Capacitor, Android |
| Authentication | PBKDF2 password hashing, session tokens |

## Project Structure

```text
.
|-- backend/              # Express API, routes, models, database config
|-- css/                  # Stylesheets for frontend pages
|-- html/                 # Frontend HTML pages
|-- images/               # Movie posters and related assets
|-- js/                   # Frontend scripts and API configuration
|-- android/              # Native Android project generated for Capacitor
|-- scripts/              # Helper scripts for Capacitor sync/build
|-- index.html            # Main browser entry page
|-- package.json          # Node dependencies and scripts
`-- capacitor.config.json # Capacitor app configuration
```

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB Atlas connection string
- Android Studio and JDK 24 if you want to build the Android app

## Setup

Clone the repository:

```bash
git clone https://github.com/Sneha1623/Movie-Token-Management-System.git
cd Movie-Token-Management-System
```

Install dependencies:

```bash
npm install
```

Create a `.env` file if you want to use MongoDB Atlas or a custom database:

```env
MONGO_URI=your-mongodb-connection-string
PORT=5002
```

If `MONGO_URI` is not set, the backend uses:

```text
mongodb://127.0.0.1:27017/movieBooking
```

Start the backend:

```bash
npm start
```

The API runs at:

```text
http://localhost:5002/api
```

For the frontend, update `js/config.js` if needed:

```javascript
window.APP_CONFIG = {
    API_BASE: "http://localhost:5002/api"
};
```

Then open `index.html` in a browser, or serve the project with a local web server.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check API and database status |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in an existing user |
| `GET` | `/api/auth/me` | Get the current logged-in user |
| `GET` | `/api/seats` | Get booked seats for a movie and time |
| `POST` | `/api/bookings` | Create a booking, payment, and ticket |
| `GET` | `/api/bookings/my` | Get bookings for the current user |
| `GET` | `/api/tickets/my` | Get tickets for the current user |
| `GET` | `/api/tickets/:ticketId` | Get a specific ticket |

Protected endpoints require:

```text
Authorization: Bearer <token>
```

## Useful Commands

| Command | Description |
| --- | --- |
| `npm start` | Start the backend server |
| `npm run dev` | Start the backend server |
| `npm test` | Run JavaScript syntax checks for backend files |
| `npm run android:sync` | Prepare web assets and sync the Android project |
| `npm run android:open` | Open the Android project in Android Studio |
| `npm run android:build` | Build a debug Android APK |

## Android Build

To build the Android app:

```bash
npm run android:sync
npm run android:open
```

For a debug APK:

```bash
npm run android:build
```

Before testing on a physical Android device, set `API_BASE` in `js/config.js` to your computer's local network IP address, for example:

```javascript
window.APP_CONFIG = {
    API_BASE: "http://192.168.1.10:5002/api"
};
```

The phone and computer must be connected to the same network.

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `5002` | Backend server port |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/movieBooking` | MongoDB connection string |

## Security Notes

- Do not commit `.env` files or real database credentials.
- Use `.env.example` as a template for local configuration.
- Rotate database passwords immediately if they were ever shared or committed accidentally.

## License

This project is licensed under the ISC license.
