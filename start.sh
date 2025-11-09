#!/bin/bash
set -e

echo "=========================================="
echo "Starting Laravel Application on Railway"
echo "=========================================="

# Check if APP_KEY is set
if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY is not set!"
    echo "Please set APP_KEY in Railway variables"
    exit 1
fi

echo "✓ APP_KEY is set"

# Clear caches
echo "Clearing caches..."
php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Ensure database directory exists
echo "Setting up database..."
mkdir -p database
chmod 775 database || true

# Create SQLite database if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    chmod 664 database/database.sqlite
    echo "✓ Created database/database.sqlite"
else
    echo "✓ Database file exists"
fi

# Run migrations
echo "Running migrations..."
php artisan migrate --force || {
    echo "⚠️ Migrations failed, but continuing..."
}

# Test if routes are working
echo "Testing routes..."
php artisan route:list | head -5 || echo "⚠️ Could not list routes"

# Start the server
echo "=========================================="
echo "Starting PHP server on 0.0.0.0:$PORT"
echo "=========================================="
exec php artisan serve --host=0.0.0.0 --port=$PORT

