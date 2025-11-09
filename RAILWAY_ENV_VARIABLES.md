# Complete Railway Environment Variables

Copy and paste these into Railway → Your Service → Variables tab

## 🔴 REQUIRED VARIABLES (Must Have)

### 1. APP_KEY (CRITICAL - Most Important!)
**Name:** `APP_KEY`  
**Value:** Generate a new one with: `php artisan key:generate --show`  
**OR use this (for testing):** `base64:wj2Gk//V/BUcahyTiPSCKVQSRuZEBTiJNmHaNO7nn58=`

⚠️ **IMPORTANT:** Generate a NEW key for production! Don't use the example above in production.

### 2. APP_NAME
**Name:** `APP_NAME`  
**Value:** `Portfolio`

### 3. APP_ENV
**Name:** `APP_ENV`  
**Value:** `production`

### 4. APP_DEBUG
**Name:** `APP_DEBUG`  
**Value:** `false` (or `true` for debugging - shows detailed errors)

### 5. APP_URL
**Name:** `APP_URL`  
**Value:** `https://your-app-name.up.railway.app`  
**Note:** Replace `your-app-name` with your actual Railway app name. You'll get this after first deployment.

### 6. DB_CONNECTION
**Name:** `DB_CONNECTION`  
**Value:** `sqlite`

---

## 🟡 DATABASE VARIABLES (For SQLite - Already Set by Default)

Since you're using SQLite, these are optional but can be set:

### 7. DB_DATABASE (Optional)
**Name:** `DB_DATABASE`  
**Value:** (Leave empty - defaults to `database/database.sqlite`)

### 8. DB_FOREIGN_KEYS (Optional)
**Name:** `DB_FOREIGN_KEYS`  
**Value:** `true`

---

## 🟢 MAIL VARIABLES (For Contact Form - Choose One Option)

### Option A: Gmail SMTP (Recommended)

**8. MAIL_MAILER**
**Name:** `MAIL_MAILER`  
**Value:** `smtp`

**9. MAIL_HOST**
**Name:** `MAIL_HOST`  
**Value:** `smtp.gmail.com`

**10. MAIL_PORT**
**Name:** `MAIL_PORT`  
**Value:** `587`

**11. MAIL_USERNAME**
**Name:** `MAIL_USERNAME`  
**Value:** `yuji.jiro21@gmail.com` (or your Gmail)

**12. MAIL_PASSWORD**
**Name:** `MAIL_PASSWORD`  
**Value:** `[Your Gmail App Password]`  
**How to get:** https://myaccount.google.com/apppasswords  
1. Enable 2-Step Verification
2. Generate App Password for "Mail"
3. Use the 16-character password (no spaces)

**13. MAIL_ENCRYPTION**
**Name:** `MAIL_ENCRYPTION`  
**Value:** `tls`

**14. MAIL_FROM_ADDRESS**
**Name:** `MAIL_FROM_ADDRESS`  
**Value:** `yuji.jiro21@gmail.com` (same as MAIL_USERNAME)

**15. MAIL_FROM_NAME**
**Name:** `MAIL_FROM_NAME`  
**Value:** `Portfolio`

---

### Option B: Log Mailer (For Testing - No Email Setup Needed)

If you don't want to set up email yet, use this:

**8. MAIL_MAILER**
**Name:** `MAIL_MAILER`  
**Value:** `log`

**9. MAIL_FROM_ADDRESS**
**Name:** `MAIL_FROM_ADDRESS`  
**Value:** `noreply@portfolio.com`

**10. MAIL_FROM_NAME**
**Name:** `MAIL_FROM_NAME`  
**Value:** `Portfolio`

**Note:** With `log` mailer, emails are saved to `storage/logs/laravel.log` instead of being sent.

---

## 🔵 OPTIONAL VARIABLES (Not Required but Recommended)

### 11. LOG_CHANNEL
**Name:** `LOG_CHANNEL`  
**Value:** `stderr` (for Railway - logs to console)

### 12. SESSION_DRIVER
**Name:** `SESSION_DRIVER`  
**Value:** `file` (default)

### 13. SESSION_LIFETIME
**Name:** `SESSION_LIFETIME`  
**Value:** `120` (minutes)

---

## 📋 QUICK COPY-PASTE LIST (Minimum Required)

For Railway Variables tab, add these **minimum required** variables:

```
APP_KEY=base64:wj2Gk//V/BUcahyTiPSCKVQSRuZEBTiJNmHaNO7nn58=
APP_NAME=Portfolio
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app-name.up.railway.app
DB_CONNECTION=sqlite
LOG_CHANNEL=stderr
```

**Then add mail variables (choose Option A or B above)**

---

## 🚀 How to Add in Railway

1. Go to Railway Dashboard
2. Click on your service
3. Go to **Variables** tab
4. Click **"New Variable"**
5. Add each variable one by one:
   - **Name:** (variable name)
   - **Value:** (variable value)
6. Click **"Add"**
7. Repeat for all variables
8. Railway will automatically redeploy

---

## ⚠️ Important Notes

1. **APP_KEY:** Generate a NEW one for production! Use: `php artisan key:generate --show`
2. **APP_URL:** Update this AFTER your first deployment when you get your Railway URL
3. **MAIL_PASSWORD:** Use Gmail App Password, NOT your regular Gmail password
4. **APP_DEBUG:** Set to `true` temporarily if you need to see errors, then change back to `false`

---

## ✅ Verification

After adding variables, check:
1. Railway → Deployments → Latest deployment should succeed
2. Healthcheck should pass
3. Visit your Railway URL to see if the site loads

