# Backend API Map

Start the backend from the project root:

```powershell
npm start
```

Database:

- By default it connects to `mongodb://127.0.0.1:27017/movieBooking`.
- To use MongoDB Atlas or another database, set `MONGO_URI` before starting:

```powershell
$env:MONGO_URI="your-mongodb-connection-string"
npm start
```

Endpoints:

- `POST /api/auth/register` creates a user and returns `token`, `user._id`, `user.name`, and `user.email`.
- `POST /api/auth/login` logs in a user and returns the same session data.
- `GET /api/auth/me` returns the logged-in user when `Authorization: Bearer <token>` is sent.
- `GET /api/seats?movie=<movie>&time=<time>` returns seats already booked for that show.
- `POST /api/bookings` creates the booking, payment, and ticket for the logged-in user.
- `GET /api/bookings/my` returns bookings for the logged-in user.
- `GET /api/tickets/my` returns tickets for the logged-in user.
- `GET /api/tickets/:ticketId` returns one ticket only if it belongs to the logged-in user.

Frontend flow:

- Registration page calls `/api/auth/register`.
- Login popup calls `/api/auth/login`.
- Seat page calls `/api/seats` and blocks seats already in the database.
- Payment page calls `/api/bookings`.
- Ticket page reads the saved backend ticket and can also fetch it from `/api/tickets/:ticketId`.
