#!/bin/bash

echo "Setting up Donation Roulette project..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create necessary directories
echo "Creating project directories..."
mkdir -p public/images

echo "Setup complete! You can now start the development server with:"
echo "npm run dev" 