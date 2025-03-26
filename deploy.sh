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
# Frontend build script already copies files to backend/public

echo "Setting up environment for production..."
cd ..
export NODE_ENV=production

echo "Starting backend server..."
cd backend
node seedData.js # Optional: seed the database on first deployment
node server.js 