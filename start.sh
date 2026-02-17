#!/bin/bash
# Setup and Start Script for Freelancing Marketplace

echo "================================"
echo "Freelancing Marketplace - Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "📝 Creating .env file..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_DEBUG=false
REACT_APP_ENV=development
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "================================"
echo "⚙️  Configuration:"
echo "================================"
echo "Backend API: http://localhost:8080/api"
echo "Frontend: http://localhost:3000"
echo ""

echo "🧪 Test Credentials:"
echo "  Admin:      admin@marketplace.com / admin123"
echo "  Client:     client@example.com / client123"
echo "  Freelancer: freelancer@example.com / freelancer123"
echo ""

echo "================================"
echo "🚀 Starting Development Server"
echo "================================"
echo ""
echo "Frontend will open at http://localhost:3000"
echo "Make sure your backend is running on port 8080!"
echo ""

npm start
