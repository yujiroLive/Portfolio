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

## 📦 Deployment Options (100% FREE)

> **⚠️ Important:** GitHub Pages **does NOT support PHP/Laravel**. It only serves static files. You need a platform that supports PHP.

### 🆓 Completely FREE Hosting Options

#### ⭐ Option 1: Render.com (BEST FREE OPTION - Recommended)

**✅ 100% Free - No Credit Card Required**

1. Go to [Render.com](https://render.com) and sign up (completely free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `https://github.com/yujiroLive/Portfolio.git`
4. Configure:
   - **Name**: `portfolio-laravel`
   - **Environment**: `PHP`
   - **Build Command**: `composer install --no-dev --optimize-autoloader && npm install && npm run production`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
5. Add environment variables:
   - `APP_KEY` (generate with: `php artisan key:generate --show`)
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - Database credentials (use Render's free PostgreSQL)
6. Click **"Create Web Service"** - Done! 🎉

**Free Tier:** 
- ✅ 750 hours/month (enough for 24/7 hosting)
- ✅ Free SSL certificate
- ✅ Free PostgreSQL database
- ✅ No credit card required
- ✅ No ads

#### Option 2: Railway.app (FREE with $5 Credit)

**✅ Free - Requires Credit Card (but won't charge if you stay within free tier)**

1. Go to [Railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway auto-detects Laravel
5. Add environment variables in the dashboard
6. Deploy automatically!

**Free Tier:** 
- ✅ $5 credit/month (usually enough for small apps)
- ✅ Auto-deploys from GitHub
- ⚠️ Requires credit card (but free tier won't charge)

#### Option 3: Fly.io (100% FREE)

**✅ Completely Free - No Credit Card Required**

1. Install Fly CLI: 
   - Windows: Download from [fly.io/docs/hands-on/install-flyctl/](https://fly.io/docs/hands-on/install-flyctl/)
   - Or use: `powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"`
2. Login: `fly auth login`
3. Launch: `fly launch` (in your project directory)
4. Follow the prompts
5. Deploy: `fly deploy`

**Free Tier:** 
- ✅ 3 shared VMs
- ✅ 3GB storage
- ✅ Free SSL
- ✅ No credit card required

#### Option 4: 000webhost (100% FREE)

**✅ Completely Free - No Credit Card Required**

1. Sign up at [000webhost.com](https://www.000webhost.com)
2. Create a new website
3. Upload files via FTP (FileZilla) or use their file manager
4. Configure database in their dashboard
5. Update `.env` with their database credentials

**Free Tier:** 
- ✅ Free hosting
- ✅ Free database
- ⚠️ Limited resources
- ⚠️ Ads on free plan (but still free!)

#### Option 5: InfinityFree (100% FREE)

**✅ Completely Free - No Credit Card Required**

1. Sign up at [InfinityFree.net](https://www.infinityfree.net)
2. Create a new website
3. Upload via FTP (FileZilla)
4. Configure database in their control panel

**Free Tier:** 
- ✅ Unlimited bandwidth
- ✅ Free database
- ✅ No ads
- ✅ Free SSL
- ✅ No credit card required

### 💰 Paid Hosting Options (If You Need Better Performance Later)

#### Option 6: DigitalOcean App Platform

1. Go to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
2. Connect GitHub repository
3. Configure build settings:
   - **Build Command**: `npm install && npm run production && composer install --no-dev --optimize-autoloader`
   - **Run Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
4. Add environment variables
5. Deploy!

**Pricing:** Starts at $5/month

#### Option 7: Heroku

1. Install Heroku CLI and login: `heroku login`
2. Create app: `heroku create your-app-name`
3. Set environment variables:
   ```bash
   heroku config:set APP_KEY=$(php artisan key:generate --show)
   heroku config:set APP_ENV=production
   heroku config:set APP_DEBUG=false
   ```
4. Add buildpacks:
   ```bash
   heroku buildpacks:add heroku/php
   heroku buildpacks:add heroku/nodejs
   ```
5. Deploy: `git push heroku main`

**Pricing:** Starts at $7/month (no free tier anymore)

#### Option 8: Laravel Forge

1. Sign up at [Laravel Forge](https://forge.laravel.com)
2. Connect your server (DigitalOcean, AWS, etc.)
3. Create a new site
4. Connect your GitHub repository
5. Forge handles deployment automatically

**Pricing:** $12/month + server costs

#### Option 9: Cloudways

1. Sign up at [Cloudways.com](https://www.cloudways.com)
2. Launch server (DigitalOcean, AWS, etc.)
3. Deploy Laravel application
4. Connect GitHub for auto-deployment

**Pricing:** Starts at $10/month

#### Option 10: Vercel (Frontend Only) + Backend Separately

If you want to separate frontend and backend:
- **Frontend (React)**: Deploy to [Vercel](https://vercel.com) (free)
- **Backend (Laravel API)**: Deploy to Render/Railway

### 🖥️ VPS Hosting (Full Control)

#### Option 11: Deploy to VPS (DigitalOcean, Linode, AWS EC2)

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
