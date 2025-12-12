#!/bin/bash
set -e

echo "=========================================="
echo "Starting Laravel Application on Render"
echo "=========================================="

# Create database directory if it doesn't exist
mkdir -p database || true

# Create SQLite database if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    chmod 664 database/database.sqlite
    echo "✓ Created database/database.sqlite"
fi

# Run migrations
echo "Running migrations..."
php artisan migrate --force || echo "⚠️ Migrations failed, but continuing..."

# Clear caches
echo "Clearing caches..."
php artisan config:clear || true
php artisan cache:clear || true
php artisan view:clear || true
php artisan route:clear || true

# Start the server
echo "=========================================="
echo "Starting PHP server on 0.0.0.0:$PORT"
echo "=========================================="

exec php artisan serve --host=0.0.0.0 --port=$PORT
