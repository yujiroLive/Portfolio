#!/bin/bash
set -e

echo "Starting Laravel application..."

# Clear caches
php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Ensure database directory exists
mkdir -p database

# Create SQLite database if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    chmod 664 database/database.sqlite
    echo "Created database/database.sqlite"
fi

# Run migrations (continue even if they fail)
php artisan migrate --force || echo "Migrations failed, continuing anyway..."

# Start the server
echo "Starting PHP development server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT

