# Portfolio - Laravel Application

A modern portfolio application built with Laravel and React.

## 🚀 Quick Start

### Prerequisites
- PHP >= 7.3
- Composer
- Node.js & NPM
- MySQL/PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yujiroLive/Portfolio.git
   cd Portfolio
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your `.env` file**
   - Set your database credentials
   - Configure mail settings
   - Set `APP_URL` to your domain

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Build assets**
   ```bash
   npm run production
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

## 📦 Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI** and login
   ```bash
   heroku login
   ```

2. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set APP_KEY=$(php artisan key:generate --show)
   heroku config:set APP_ENV=production
   heroku config:set APP_DEBUG=false
   # Add your database and other configs
   ```

4. **Add Heroku buildpacks**
   ```bash
   heroku buildpacks:add heroku/php
   heroku buildpacks:add heroku/nodejs
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 2: Deploy to DigitalOcean App Platform

1. Go to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `npm install && npm run production && composer install --no-dev --optimize-autoloader`
   - **Run Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
4. Add environment variables in the dashboard
5. Deploy!

### Option 3: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect Laravel
4. Add environment variables
5. Deploy!

### Option 4: Deploy to VPS (Manual)

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install required software**
   - PHP 7.3+ with extensions
   - Composer
   - Node.js & NPM
   - Nginx/Apache
   - MySQL/PostgreSQL

3. **Clone and setup**
   ```bash
   git clone https://github.com/yujiroLive/Portfolio.git
   cd Portfolio
   composer install --no-dev --optimize-autoloader
   npm install && npm run production
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure web server** (Nginx example)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/Portfolio/public;

       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-Content-Type-Options "nosniff";

       index index.php;

       charset utf-8;

       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }

       location ~ \.php$ {
           fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           include fastcgi_params;
       }

       location ~ /\.(?!well-known).* {
           deny all;
       }
   }
   ```

5. **Set permissions**
   ```bash
   chmod -R 755 storage bootstrap/cache
   chown -R www-data:www-data storage bootstrap/cache
   ```

6. **Run migrations**
   ```bash
   php artisan migrate --force
   ```

## 🔐 Important Security Notes

- **Never commit your `.env` file** - It contains sensitive information
- Always use `APP_DEBUG=false` in production
- Use strong `APP_KEY` in production
- Keep your dependencies updated
- Use HTTPS in production

## 📝 Environment Variables

Required environment variables:
- `APP_NAME` - Application name
- `APP_ENV` - Environment (local/production)
- `APP_KEY` - Application encryption key
- `APP_DEBUG` - Debug mode (false in production)
- `APP_URL` - Application URL
- `DB_CONNECTION` - Database type
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_DATABASE` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `MAIL_*` - Mail configuration

## 🛠️ Tech Stack

- **Backend**: Laravel 8
- **Frontend**: React 18
- **Styling**: Bootstrap 5, SCSS
- **Build Tool**: Laravel Mix

## 📄 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
