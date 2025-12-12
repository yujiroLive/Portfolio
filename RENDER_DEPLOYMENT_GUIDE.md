# Render Deployment Guide

This guide will help you deploy your Laravel portfolio application on Render.

## Prerequisites

- A GitHub account
- Your code pushed to a GitHub repository
- A Render account (sign up at https://render.com)

## Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub. The `render.yaml` file is already configured in your repository root.

## Step 2: Deploy Using Blueprint (Recommended)

This is the easiest method - Render will automatically read your `render.yaml` file.

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in or create an account

2. **Create New Blueprint**
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub account if not already connected
   - Select your repository: `yujiroLive/Portfolio` (or your repo name)
   - Click **"Apply"**

3. **Review Configuration**
   - Render will detect your `render.yaml` file
   - Review the services it will create:
     - Web Service: `portfolio-laravel`
     - (Optional) Database: `portfolio-db` (if you uncommented it)
   - Click **"Apply"** to create the services

## Step 3: Configure Environment Variables

After the services are created, you need to set up environment variables:

1. **Go to your Web Service**
   - Click on `portfolio-laravel` in your dashboard

2. **Go to Environment Tab**
   - Click on **"Environment"** tab

3. **Set Required Variables**

   **Critical - APP_URL:**
   - After your first deployment, Render will give you a URL like: `https://portfolio-laravel-xxxx.onrender.com`
   - Add/Update: `APP_URL` = `https://portfolio-laravel-xxxx.onrender.com` (use your actual URL)

   **If using SQLite (default):**
   - The database is already configured in `render.yaml`
   - No additional DB variables needed

   **If using PostgreSQL:**
   - Uncomment the PostgreSQL database section in `render.yaml` and redeploy
   - Or manually add these variables:
     - `DB_CONNECTION` = `pgsql`
     - `DB_HOST` = (from database dashboard)
     - `DB_PORT` = `5432`
     - `DB_DATABASE` = (from database dashboard)
     - `DB_USERNAME` = (from database dashboard)
     - `DB_PASSWORD` = (from database dashboard)

4. **Run Migrations**
   - After setting up the database, go to **"Shell"** tab in your web service
   - Run: `php artisan migrate --force`

## Step 4: Manual Deployment (Alternative Method)

If you prefer to set up manually without using Blueprint:

1. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - **Important:** Select **"Environment: PHP"** (not Node.js!)

2. **Configure Service**
   - **Name:** `portfolio-laravel`
   - **Environment:** `PHP`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** (leave empty)
   - **Runtime:** `PHP`
   - **Build Command:**
     ```
     composer install --no-dev --optimize-autoloader --ignore-platform-reqs && npm install --legacy-peer-deps && npm run production && php artisan config:clear || true && php artisan cache:clear || true && php artisan view:clear || true && php artisan route:clear || true && mkdir -p database || true && touch database/database.sqlite || true && chmod 664 database/database.sqlite || true
     ```
   - **Start Command:**
     ```
     php artisan serve --host=0.0.0.0 --port=$PORT
     ```

3. **Add Environment Variables**
   - Go to **"Environment"** tab
   - Add all variables from `DEPLOYMENT_ENV_VARS.md`

4. **Create Database (Optional)**
   - Click **"New +"** → **"PostgreSQL"**
   - Name: `portfolio-db`
   - Plan: `Free`
   - Click **"Create Database"**
   - Copy the connection details to your web service environment variables

## Step 5: Verify Deployment

1. **Check Build Logs**
   - Go to your web service → **"Logs"** tab
   - Watch for build completion
   - Look for any errors

2. **Test Your Application**
   - Once deployed, visit your app URL
   - Test the health endpoint: `https://your-app.onrender.com/health`
   - Should return: `{"status":"ok",...}`

3. **Check Application Logs**
   - Go to **"Logs"** tab
   - Look for any runtime errors

## Troubleshooting

### Build Fails with "composer: command not found"
- **Solution:** Make sure Environment is set to **PHP**, not Node.js
- Go to Settings → Environment → Change to PHP

### Database Connection Errors
- **If using SQLite:** Make sure the database file path is correct
- **If using PostgreSQL:** Verify all DB_* environment variables are set correctly
- Check database is running in Render dashboard

### 500 Internal Server Error
- Check **Logs** tab for detailed error messages
- Verify `APP_KEY` is set (it should auto-generate)
- Make sure `APP_DEBUG=false` in production
- Check database migrations ran successfully

### Assets Not Loading
- Verify `npm run production` completed successfully in build logs
- Check `public/mix-manifest.json` exists
- Clear browser cache

### Health Check Failing
- Verify `/health` route exists (it does in your code)
- Check PHP is running: `php -v` in Shell tab
- Verify port is set: `echo $PORT` in Shell tab

## Important Notes

1. **Free Tier Limitations:**
   - Render free tier services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading for production use

2. **Database:**
   - SQLite works but is not recommended for production
   - PostgreSQL is better for production (free tier available)
   - Database data persists even when service spins down

3. **Environment Variables:**
   - Never commit `.env` file to Git
   - All sensitive data should be in Render's Environment Variables
   - `APP_KEY` is auto-generated by Render (good!)

4. **Updates:**
   - Push to GitHub to trigger automatic redeployment
   - Or manually trigger from Render dashboard

## Next Steps

- Set up a custom domain (optional)
- Configure email sending (if using contact form)
- Set up monitoring and alerts
- Consider upgrading to paid plan for better performance

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Laravel Docs: https://laravel.com/docs

