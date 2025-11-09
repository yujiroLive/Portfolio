# Environment Variables for Deployment

## Required Environment Variables

Add these in your hosting platform's environment variables section:

### 1. APP_KEY (REQUIRED - Most Important!)
**Name:** `APP_KEY`  
**Value:** `base64:wj2Gk//V/BUcahyTiPSCKVQSRuZEBTiJNmHaNO7nn58=`

> ⚠️ **Important:** Generate a NEW key for production! Use: `php artisan key:generate --show` and use that value instead.

### 2. APP_NAME
**Name:** `APP_NAME`  
**Value:** `Portfolio`

### 3. APP_ENV
**Name:** `APP_ENV`  
**Value:** `production`

### 4. APP_DEBUG
**Name:** `APP_DEBUG`  
**Value:** `false`

### 5. APP_URL
**Name:** `APP_URL`  
**Value:** `https://your-app-name.onrender.com` (or your actual domain)

> Replace `your-app-name` with your actual Render/Railway app name

---

## Database Variables (If using Render's Free PostgreSQL)

If you're using Render's free PostgreSQL database, you'll get these values from Render's database dashboard:

### 6. DB_CONNECTION
**Name:** `DB_CONNECTION`  
**Value:** `pgsql`

### 7. DB_HOST
**Name:** `DB_HOST`  
**Value:** (Get from Render database dashboard - looks like: `dpg-xxxxx-a.oregon-postgres.render.com`)

### 8. DB_PORT
**Name:** `DB_PORT`  
**Value:** `5432`

### 9. DB_DATABASE
**Name:** `DB_DATABASE`  
**Value:** (Get from Render database dashboard)

### 10. DB_USERNAME
**Name:** `DB_USERNAME`  
**Value:** (Get from Render database dashboard)

### 11. DB_PASSWORD
**Name:** `DB_PASSWORD`  
**Value:** (Get from Render database dashboard - this is sensitive!)

---

## Mail Configuration (Optional - Only if you use contact form)

If your contact form sends emails, add these:

### 12. MAIL_MAILER
**Name:** `MAIL_MAILER`  
**Value:** `smtp`

### 13. MAIL_HOST
**Name:** `MAIL_HOST`  
**Value:** `smtp.gmail.com` (or your email provider)

### 14. MAIL_PORT
**Name:** `MAIL_PORT`  
**Value:** `587`

### 15. MAIL_USERNAME
**Name:** `MAIL_USERNAME`  
**Value:** `your-email@gmail.com`

### 16. MAIL_PASSWORD
**Name:** `MAIL_PASSWORD`  
**Value:** `your-app-password` (use app-specific password, not regular password)

### 17. MAIL_ENCRYPTION
**Name:** `MAIL_ENCRYPTION`  
**Value:** `tls`

### 18. MAIL_FROM_ADDRESS
**Name:** `MAIL_FROM_ADDRESS`  
**Value:** `your-email@gmail.com`

### 19. MAIL_FROM_NAME
**Name:** `MAIL_FROM_NAME`  
**Value:** `Portfolio`

---

## Quick Copy-Paste List (Minimum Required)

For a basic deployment, you MUST have at least these:

```
APP_KEY=base64:wj2Gk//V/BUcahyTiPSCKVQSRuZEBTiJNmHaNO7nn58=
APP_NAME=Portfolio
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.onrender.com
DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_PORT=5432
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
```

---

## How to Add in Render.com

1. Go to your Web Service in Render dashboard
2. Click on **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Enter the **Name** and **Value** for each variable above
5. Click **"Save Changes"**
6. Your app will automatically redeploy

---

## How to Get Database Credentials from Render

1. In Render dashboard, go to **"Databases"** → **"New +"** → **"PostgreSQL"**
2. Create a free PostgreSQL database
3. Once created, click on the database
4. You'll see:
   - **Internal Database URL** (contains all info)
   - Or individual fields: Host, Port, Database, User, Password
5. Copy these values to your environment variables

---

## Security Notes

- ✅ Never share your `APP_KEY` or `DB_PASSWORD` publicly
- ✅ Always use `APP_DEBUG=false` in production
- ✅ Use strong passwords for database
- ✅ Keep your environment variables secure

