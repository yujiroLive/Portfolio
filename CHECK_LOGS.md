# How to Check Railway Logs for 500 Error

## Step 1: Check Railway Logs

1. Go to your Railway dashboard
2. Click on your service
3. Click **"Logs"** tab (not Deploy Logs, but the live **Logs** tab)
4. Look for **red error messages** or **stack traces**
5. Scroll through the logs to find the actual error

## Step 2: Check Deploy Logs

1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"Deploy Logs"** 
4. Look for any errors during the build or startup

## Step 3: Common Issues to Look For

### Database Connection Error
Look for:
- `SQLSTATE[HY000]`
- `Connection refused`
- `Access denied for user`
- `No such file or directory` (SQLite)

**Fix:** Either set up a database or disable database connection

### Missing File Error
Look for:
- `file_get_contents(): Failed to open stream`
- `No such file or directory`
- `View [welcome] not found`

### Permission Error
Look for:
- `Permission denied`
- `failed to open stream: Permission denied`

**Fix:** Storage permissions issue

### Class Not Found
Look for:
- `Class 'X' not found`
- `Call to undefined function`

**Fix:** Missing dependency or autoload issue

## Step 4: Share the Error

Copy the **exact error message** from the logs and share it here so we can fix it!

