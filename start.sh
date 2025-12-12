#!/bin/bash
set -e

echo "=========================================="
echo "Starting Laravel Application on Render"
echo "=========================================="

# Generate APP_KEY if it's missing or invalid
# Laravel requires APP_KEY to start with "base64:" and be properly formatted (44 chars after base64:)
if [ -z "$APP_KEY" ] || [[ ! "$APP_KEY" =~ ^base64: ]] || [ ${#APP_KEY} -lt 50 ]; then
    echo "⚠️ APP_KEY is missing or invalid. Generating new APP_KEY..."
    php artisan key:generate --force || echo "⚠️ Failed to generate APP_KEY, but continuing..."
fi

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
