#!/bin/bash
set -e

echo "=========================================="
echo "Starting Laravel Application on Render"
echo "=========================================="

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env 2>/dev/null || touch .env
fi

# Generate APP_KEY if it's missing or invalid
# Laravel requires APP_KEY to start with "base64:" and be properly formatted (44 chars after base64:)
if [ -z "$APP_KEY" ] || [[ ! "$APP_KEY" =~ ^base64: ]] || [ ${#APP_KEY} -lt 50 ]; then
    echo "⚠️ APP_KEY is missing or invalid. Generating new APP_KEY..."
    
    # Generate a proper Laravel encryption key (32 bytes = 256 bits, base64 encoded)
    # This matches what Laravel's key:generate command does
    NEW_KEY=$(php -r "echo 'base64:' . base64_encode(random_bytes(32));")
    
    if [ -n "$NEW_KEY" ] && [[ "$NEW_KEY" =~ ^base64: ]]; then
        # Write to .env file
        if grep -q "^APP_KEY=" .env 2>/dev/null; then
            # Update existing APP_KEY line
            sed -i "s|^APP_KEY=.*|APP_KEY=$NEW_KEY|" .env
        else
            # Add APP_KEY if it doesn't exist
            echo "APP_KEY=$NEW_KEY" >> .env
        fi
        
        # Export as environment variable (takes precedence over .env)
        export APP_KEY="$NEW_KEY"
        echo "✓ APP_KEY generated and set: ${NEW_KEY:0:20}..."
    else
        echo "❌ Failed to generate APP_KEY!"
        exit 1
    fi
else
    echo "✓ APP_KEY is set: ${APP_KEY:0:20}..."
    # Ensure .env also has it for consistency
    if [ -f .env ] && ! grep -q "^APP_KEY=$APP_KEY" .env 2>/dev/null; then
        if grep -q "^APP_KEY=" .env 2>/dev/null; then
            sed -i "s|^APP_KEY=.*|APP_KEY=$APP_KEY|" .env
        else
            echo "APP_KEY=$APP_KEY" >> .env
        fi
    fi
fi

# Create database directory if it doesn't exist
mkdir -p database || true

# Create SQLite database if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    chmod 664 database/database.sqlite
    echo "✓ Created database/database.sqlite"
fi

# Ensure database file is writable
chmod 664 database/database.sqlite || true
chown www-data:www-data database/database.sqlite || true

# Clear caches FIRST to ensure Laravel picks up the new APP_KEY
echo "Clearing caches to ensure fresh config..."
php artisan config:clear || true
php artisan cache:clear || true
php artisan view:clear || true
php artisan route:clear || true

# Show database configuration for debugging
echo "Database configuration:"
echo "  DB_CONNECTION: ${DB_CONNECTION:-not set}"
echo "  DB_DATABASE: ${DB_DATABASE:-not set}"
echo "  Database file exists: $([ -f database/database.sqlite ] && echo 'yes' || echo 'no')"
echo "  Database file writable: $([ -w database/database.sqlite ] && echo 'yes' || echo 'no')"

# Run migrations with detailed output
echo "Running migrations..."
MIGRATION_OUTPUT=$(php artisan migrate --force 2>&1)
MIGRATION_EXIT_CODE=$?

if [ $MIGRATION_EXIT_CODE -eq 0 ]; then
    echo "✓ Migrations completed successfully"
else
    echo "❌ Migrations failed with exit code: $MIGRATION_EXIT_CODE"
    echo "Migration output:"
    echo "$MIGRATION_OUTPUT"
    echo "⚠️ Attempting to continue anyway, but database operations may fail..."
fi

# Start the server
echo "=========================================="
echo "Starting PHP server on 0.0.0.0:$PORT"
echo "=========================================="

exec php artisan serve --host=0.0.0.0 --port=$PORT

