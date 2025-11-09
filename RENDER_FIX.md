# Fix Render Deployment Error

## Problem
Render is detecting your project as Node.js instead of PHP, causing the error:
```
bash: line 1: composer: command not found
```

## Solution: Fix in Render Dashboard

### Option 1: Update Service Settings (Easiest)

1. Go to your Render dashboard
2. Click on your **Web Service** (portfolio-laravel)
3. Go to **Settings** tab
4. Find **"Environment"** section
5. Change **"Environment"** from `Node` to `PHP`
6. Scroll down and click **"Save Changes"**
7. Render will automatically redeploy

### Option 2: Delete and Recreate (If Option 1 doesn't work)

1. **Delete the current service:**
   - Go to your service
   - Click **Settings** → **Delete Service**

2. **Create a new service:**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repo: `https://github.com/yujiroLive/Portfolio.git`
   - **IMPORTANT:** Make sure to select **"Environment: PHP"** (not Node.js)
   - Configure:
     - **Name**: `portfolio-laravel`
     - **Environment**: `PHP` ⚠️ (This is critical!)
     - **Build Command**: 
       ```
       composer install --no-dev --optimize-autoloader && npm install && npm run production
       ```
     - **Start Command**: 
       ```
       php artisan serve --host=0.0.0.0 --port=$PORT
       ```
   - Add your environment variables
   - Click **"Create Web Service"**

### Option 3: Use render.yaml (Advanced)

If you want to use the `render.yaml` file:

1. Make sure `render.yaml` is in your repository root
2. In Render dashboard:
   - Go to **Dashboard** → **New +** → **Blueprint**
   - Connect your GitHub repo
   - Render will automatically detect and use `render.yaml`

## After Fixing

Once you've set the environment to PHP, your deployment should work! The build process will:
1. Install PHP dependencies with Composer
2. Install Node.js dependencies with npm
3. Build your assets
4. Start your Laravel application

## Still Having Issues?

If you still see errors, check:
- ✅ Environment is set to **PHP** (not Node.js)
- ✅ Build command includes `composer install`
- ✅ All environment variables are set (especially APP_KEY)
- ✅ Database is created and credentials are correct

