# Fix "Database (laravel) does not exist" Error

## The Problem
Laravel is trying to use MySQL database named "laravel" instead of SQLite.

## Solution: Set These Variables in Railway

Go to Railway → Your Service → **Variables** tab and make sure you have:

### Required Variables:
1. **DB_CONNECTION** = `sqlite`
2. **DB_DATABASE** = (leave empty or set to `database/database.sqlite`)

### Optional but Recommended:
- Remove or don't set these MySQL variables:
  - `DB_HOST`
  - `DB_PORT` 
  - `DB_USERNAME`
  - `DB_PASSWORD`

## Step-by-Step:

1. **Go to Railway Variables tab**
2. **Find `DB_CONNECTION`**:
   - If it exists: Change value to `sqlite`
   - If it doesn't exist: Add new variable `DB_CONNECTION` = `sqlite`

3. **Check `DB_DATABASE`**:
   - If it's set to `laravel` or `mysql`, either:
     - Delete the variable, OR
     - Set it to empty string `""`, OR  
     - Set it to `database/database.sqlite`

4. **Clear cached config** (already done in code, but you can verify):
   - The start command now includes `php artisan config:clear`

5. **Save and Redeploy**

## What the Code Does Now:

- Creates `database/database.sqlite` file automatically
- Clears config cache before starting
- Runs migrations automatically
- Uses SQLite instead of MySQL

## After Setting Variables:

1. Save variables in Railway
2. Go to Deployments tab
3. Click "Redeploy"
4. Wait for deployment
5. Database should work!


