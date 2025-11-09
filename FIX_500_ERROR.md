# Fix 500 Server Error on Railway

## Common Causes of 500 Error in Laravel

### 1. Missing APP_KEY (Most Common!)
Laravel requires an APP_KEY to encrypt sessions and cookies.

**Fix:**
1. Go to Railway → Your Service → Variables tab
2. Add environment variable:
   - **Name:** `APP_KEY`
   - **Value:** Generate one with: `php artisan key:generate --show`
   - Or use: `base64:wj2Gk//V/BUcahyTiPSCKVQSRuZEBTiJNmHaNO7nn58=`
3. Save and redeploy

### 2. Missing Required Environment Variables

Make sure you have these set in Railway Variables:

**Required:**
- `APP_KEY` - Application encryption key
- `APP_NAME` - Your app name (e.g., "Portfolio")
- `APP_ENV` - Set to `production`
- `APP_DEBUG` - Set to `false` (or `true` for debugging)
- `APP_URL` - Your Railway URL (e.g., `https://your-app.up.railway.app`)

**If using database:**
- `DB_CONNECTION` - Database type (e.g., `pgsql` for PostgreSQL)
- `DB_HOST` - Database host
- `DB_PORT` - Database port (5432 for PostgreSQL)
- `DB_DATABASE` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

### 3. Storage Permissions Issue

Laravel needs write access to storage and cache directories.

**Fix:** Add this to your Railway deployment:
1. Go to Settings → Deploy tab
2. Add a "Pre-deploy" command:
   ```
   php artisan storage:link && chmod -R 775 storage bootstrap/cache
   ```

### 4. Database Connection Error

If you're using a database but haven't set it up:
- Either set up a Railway PostgreSQL database
- Or set `DB_CONNECTION=sqlite` and create `database/database.sqlite`

### 5. View Cache Issues

**Fix:** Add to pre-deploy or run manually:
```
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

## Quick Fix Steps

1. **Check Railway Logs:**
   - Go to your service → Logs tab
   - Look for the actual error message
   - It will tell you exactly what's wrong

2. **Add Missing Environment Variables:**
   - Go to Variables tab
   - Add all required variables listed above
   - Save

3. **Redeploy:**
   - Go to Deployments tab
   - Click Redeploy

4. **Check Logs Again:**
   - After redeploy, check logs for specific error
   - The error message will guide you to the fix

## Enable Debug Mode (Temporarily)

To see the actual error:
1. Set `APP_DEBUG=true` in Railway Variables
2. Redeploy
3. Visit your site - you'll see the detailed error
4. Fix the issue
5. Set `APP_DEBUG=false` again

## Most Likely Issue

**90% of the time, it's a missing APP_KEY!**

Make sure `APP_KEY` is set in Railway Variables.

