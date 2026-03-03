# Simple E‑Commerce App (MERN)

This project is a simple e‑commerce application scaffolded with:

- **Frontend**: React (Vite) in the `frontend` folder
- **Backend**: Node.js + Express in the `backend` folder
- **Database**: MongoDB (via Mongoose, connection configured in `backend/src/config/db.js`)

## Folder structure

- `frontend/`
  - `src/`
    - `main.jsx`: React entry point, wraps the app in `CartProvider`
    - `App.jsx`: Top‑level shell (header, main content, footer)
    - `context/CartContext.jsx`: Basic cart context (add/clear items)
- `backend/`
  - `.env.example`: Example environment variables (`PORT`, `MONGODB_URI`)
  - `src/`
    - `server.js`: Server entry (bootstraps DB and starts HTTP server)
    - `app.js`: Express app configuration and basic `/api/health` route
    - `config/db.js`: MongoDB connection helper using Mongoose
    - `routes/`, `controllers/`, `models/`, `middlewares/`: Empty folders ready for features

## Running the app

### 1. Backend (API)

```bash
cd backend
cp .env.example .env   # then edit MONGODB_URI if needed
npm install            # already done once, but safe to run
npm run dev            # starts API with nodemon on http://localhost:5000
```

### 2. Frontend (React)

```bash
cd frontend
npm install            # install React/Vite dependencies
npm run dev            # starts Vite dev server (usually http://localhost:5173)
```

Next steps:

- Add product browsing UI under `frontend/src/components` and `frontend/src/pages`
- Implement product, cart, and order models in `backend/src/models`
- Add API routes/controllers under `backend/src/routes` and `backend/src/controllers`

