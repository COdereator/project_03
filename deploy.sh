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

# Run post-deployment script to ensure all data is properly seeded
echo "Running post-deployment data setup..."
cd backend
npm run post-deploy

echo "Deployment preparation completed successfully!" 