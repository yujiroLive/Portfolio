# Force Railway to Use Nixpacks (Not Docker)

## ⚠️ The Problem
Railway is still trying to use Docker instead of Nixpacks, which causes build failures.

## ✅ Solution: Force Nixpacks in Railway Dashboard

### Step 1: Go to Service Settings
1. Open your Railway project dashboard
2. Click on your **service** (the one that's failing)
3. Click **"Settings"** tab

### Step 2: Change Builder to Nixpacks
1. Scroll down to **"Build & Deploy"** section
2. Look for **"Builder"** or **"Build Method"** dropdown
3. **Change it from "Docker" to "Nixpacks"**
4. Click **"Save"**

### Step 3: Clear Build Cache
1. Go to **"Deployments"** tab
2. Click **"Clear Build Cache"** button
3. This removes any cached Docker builds

### Step 4: Redeploy
1. Still in **"Deployments"** tab
2. Click **"Redeploy"** or **"Deploy Latest Commit"**
3. Railway will now use Nixpacks!

## 🔍 How to Verify It's Using Nixpacks

In the build logs, you should see:
- ✅ **"Using Nixpacks"** message
- ✅ **"nixpacks.toml"** being read
- ✅ PHP 8.2 installation
- ✅ Composer installation
- ❌ **NO "Dockerfile"** mentioned

If you still see "Dockerfile" in logs, Railway is still using Docker - go back to Step 2.

## 📋 What I Fixed in the Code

1. ✅ **Upgraded @react-three/fiber** from v8.15.0 to v9.0.4 (to match rapier requirements)
2. ✅ **Added .npmrc** with `legacy-peer-deps=true` (fallback for any remaining conflicts)
3. ✅ **Updated nixpacks.toml** to use `--legacy-peer-deps` flag
4. ✅ **Removed all Docker files** (Dockerfile.backup, .dockerignore.backup)

## 🚀 After Fixing

Once Railway uses Nixpacks, the build will:
1. Install PHP 8.2 ✅
2. Install Composer ✅
3. Install Node.js 18 and NPM ✅
4. Run `composer install` ✅
5. Run `npm ci --legacy-peer-deps` ✅ (no more dependency conflicts!)
6. Run `npm run production` ✅
7. Start with `php artisan serve` ✅

## ❌ If Railway Still Uses Docker

If after changing to Nixpacks it still uses Docker:

1. **Delete the service** in Railway
2. **Create a new service** from your GitHub repo
3. When creating, Railway should auto-detect Laravel and use Nixpacks
4. If not, manually set Builder to "Nixpacks" in the new service settings

---

**All code fixes are pushed to GitHub. You just need to change the Builder setting in Railway dashboard!**

