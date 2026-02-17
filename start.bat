@echo off
REM Setup and Start Script for Freelancing Marketplace (Windows)

echo ================================
echo Freelancing Marketplace - Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ NPM version: %NPM_VERSION%
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ❌ .env file not found!
    echo 📝 Creating .env file...
    (
        echo REACT_APP_API_URL=http://localhost:8080/api
        echo REACT_APP_DEBUG=false
        echo REACT_APP_ENV=development
    ) > .env
    echo ✅ .env file created
) else (
    echo ✅ .env file exists
)

echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

echo ================================
echo ⚙️  Configuration:
echo ================================
echo Backend API: http://localhost:8080/api
echo Frontend: http://localhost:3000
echo.

echo 🧪 Test Credentials:
echo   Admin:      admin@marketplace.com / admin123
echo   Client:     client@example.com / client123
echo   Freelancer: freelancer@example.com / freelancer123
echo.

echo ================================
echo 🚀 Starting Development Server
echo ================================
echo.
echo Frontend will open at http://localhost:3000
echo Make sure your backend is running on port 8080!
echo.
timeout /t 3

call npm start
