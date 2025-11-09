#!/bin/bash
# Don't use set -e, we want to continue even if some commands fail

echo "=========================================="
echo "Starting Laravel Application on Railway"
echo "=========================================="

# Check if APP_KEY is set
if [ -z "$APP_KEY" ]; then
    echo "ERROR: APP_KEY is not set!"
    echo "Please set APP_KEY in Railway variables"
    exit 1
fi

echo "✓ APP_KEY is set: ${APP_KEY:0:20}..."

# Check if PORT is set
if [ -z "$PORT" ]; then
    echo "ERROR: PORT is not set!"
    exit 1
fi

echo "✓ PORT is set: $PORT"

# Clear caches
echo "Clearing caches..."
php artisan config:clear 2>&1 || echo "⚠️ Config clear failed"
php artisan cache:clear 2>&1 || echo "⚠️ Cache clear failed"
php artisan route:clear 2>&1 || echo "⚠️ Route clear failed"
php artisan view:clear 2>&1 || echo "⚠️ View clear failed"

# Ensure database directory exists
echo "Setting up database..."
mkdir -p database || echo "⚠️ Could not create database directory"
chmod 775 database 2>&1 || echo "⚠️ Could not set database permissions"

# Create SQLite database if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite 2>&1 || echo "⚠️ Could not create database file"
    chmod 664 database/database.sqlite 2>&1 || echo "⚠️ Could not set database file permissions"
    echo "✓ Created database/database.sqlite"
else
    echo "✓ Database file exists"
fi

# Run migrations
echo "Running migrations..."
php artisan migrate --force 2>&1 || {
    echo "⚠️ Migrations failed, but continuing..."
}

# Test if routes are working
echo "Testing routes..."
php artisan route:list 2>&1 | head -10 || echo "⚠️ Could not list routes"

# Verify welcome view exists
if [ -f "resources/views/welcome.blade.php" ]; then
    echo "✓ Welcome view exists"
else
    echo "⚠️ Warning: welcome.blade.php not found"
fi

# Start the server
echo "=========================================="
echo "Starting PHP server on 0.0.0.0:$PORT"
echo "=========================================="
echo "Server will be available at: http://0.0.0.0:$PORT"
echo "Health check: http://0.0.0.0:$PORT/health"
echo "=========================================="

# Use exec to replace shell with PHP process
exec php artisan serve --host=0.0.0.0 --port=$PORT

