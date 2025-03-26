# E-Commerce Project

A full-stack e-commerce application with React frontend and Node.js backend.

## Deployment to Render

### Option 1: Deploy as a single application (recommended)

1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Configure the following settings:
   - **Name**: Your project name
   - **Environment**: Node
   - **Build Command**: `chmod +x ./deploy.sh && ./deploy.sh`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or select the plan you prefer)

4. Add the following environment variables:
   - `PORT`: Default port for the app (e.g., 10000)
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication

5. Click "Create Web Service"

### Option 2: Deploy frontend and backend separately

#### Backend Deployment
1. Create a new Web Service in Render
2. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - Add environment variables (MONGODB_URI, JWT_SECRET, etc.)

#### Frontend Deployment
1. Create a new Static Site in Render
2. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - Add environment variable `VITE_API_URL` pointing to your backend URL

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   cd backend && npm install
   cd frontend && npm install
   ```
3. Start the backend:
   ```
   cd backend && npm run dev
   ```
4. Start the frontend:
   ```
   cd frontend && npm run dev
   ``` 