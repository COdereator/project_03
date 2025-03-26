#!/bin/bash
set -e

echo "DEPLOYMENT STARTED"

# Install dependencies for backend and frontend
echo "Installing backend dependencies..."
cd backend
npm install

echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Build frontend
echo "Building frontend..."
npm run build

# The frontend build script already copies the build output to backend/public

echo "Setting up environment for production..."
cd ..
export NODE_ENV=production

# No need to run the server here - Render will do that with the start command
echo "Deployment preparation completed successfully!" 