---
description: How to start the Prolance project
---

# Starting the Prolance Project

This workflow guides you through starting the full-stack Prolance application.

## Prerequisites Check

1. Ensure Node.js is installed (v16 or higher)
   ```bash
   node --version
   ```

2. Navigate to the project root
   ```bash
   cd /Users/merazmz/Projects/prolance
   ```

## Method 1: Quick Start (Recommended)

Use the automated start script that runs both servers simultaneously:

// turbo
1. Run the start script
   ```bash
   ./start.sh
   ```

This will:
- Check if dependencies are installed (if not, install them automatically)
- Start backend on `http://localhost:8080`
- Start frontend on `http://localhost:5173`
- Both servers will run concurrently
- Press `Ctrl+C` to stop both servers at once

## Method 2: Manual Start

If you prefer to start servers separately in different terminals:

### Terminal 1 - Backend

1. Navigate to backend directory
   ```bash
   cd backend
   ```

2. Install dependencies (first time only)
   ```bash
   npm install
   ```

// turbo
3. Start the backend server
   ```bash
   npm start
   ```

   Backend will run on `http://localhost:8080`
   Verify by visiting: `http://localhost:8080/ping`

### Terminal 2 - Frontend

1. Navigate to frontend directory (in a new terminal)
   ```bash
   cd frontend
   ```

2. Install dependencies (first time only)
   ```bash
   npm install
   ```

// turbo
3. Start the development server
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173` (or next available port)

## Verify Installation

1. Backend health check:
   ```bash
   curl http://localhost:8080/ping
   ```
   Should return: `PONG`

2. Open frontend in browser:
   - Visit the URL shown in the terminal (typically `http://localhost:5173`)
   - You should see the login/signup page

## Common Issues

### Port Already in Use

**Backend (Port 8080):**
- Edit `backend/.env` and change `PORT=8080` to another port (e.g., `PORT=8081`)
- Update `frontend/.env` to match: `VITE_API_BASE_URL=http://localhost:8081`

**Frontend (Port 5173):**
- Vite will automatically use the next available port
- Check terminal output for the actual URL

### Dependencies Not Installing

```bash
# Clear npm cache and reinstall
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Database Connection Error

- Verify MongoDB Atlas connection string in `backend/.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure internet connection is stable

## Stopping the Servers

**If using start.sh:**
- Press `Ctrl+C` once (stops both servers)

**If running manually:**
- Press `Ctrl+C` in each terminal window

## Next Steps

After starting the application:
1. Open browser to `http://localhost:5173`
2. Create a new account (signup)
3. Login with your credentials
4. Access the dashboard and other protected routes

## Development Tips

- Backend uses **nodemon** - automatically restarts on file changes
- Frontend uses **Vite HMR** - instantly reflects changes without full reload
- Keep both terminals open to see logs from both servers
- Check browser console for frontend errors
- Check backend terminal for API errors
