# 🚀 Deployment Guide - SBO Oil Seals Website

## Overview
We'll deploy your application using **free hosting services**:
- **Frontend**: Netlify (Free tier)
- **Backend**: Railway (Free tier with $5 monthly credit)
- **Database**: Supabase (Already set up)

## 📋 Prerequisites
- GitHub account
- Netlify account
- Railway account
- Your Supabase credentials ready

---

## 🔧 Step 1: Prepare for Deployment

### 1.1 Create Production Build Script
First, let's make sure your backend builds correctly.

```bash
# Test backend build
cd backend
npm run build
```

### 1.2 Update API Configuration for Production
We need to configure the frontend to work with the deployed backend URL.

---

## 🚀 Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your `SBO_OilSeal` repository
4. Railway will automatically detect and deploy your backend

### 2.3 Configure Environment Variables
In Railway dashboard, go to your project → Variables tab:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_TOKEN=your_secure_admin_token
NODE_ENV=production
PORT=8080
```

### 2.4 Set Custom Start Command
In Railway settings:
- **Root Directory**: `/backend`  
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

---

## 🌐 Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account
1. Go to [Netlify](https://netlify.app)
2. Sign up with GitHub

### 3.2 Deploy Frontend
1. Click "New site from Git"
2. Connect to GitHub
3. Select your `SBO_OilSeal` repository
4. Configure build settings:
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist/spa`
   - **Functions directory**: `netlify/functions`

### 3.3 Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
VITE_API_BASE_URL=https://your-railway-backend-url.up.railway.app
```

---

## ⚙️ Step 4: Update Code for Production

We'll need to update the API configuration to use the deployed backend URL.

---

## 🧪 Step 5: Test Your Deployment

1. **Test Backend**: Visit `https://your-backend.up.railway.app/api/products`
2. **Test Frontend**: Visit your Netlify site URL
3. **Test Admin**: Go to `/admin` and verify product management works
4. **Test Full Flow**: Add products via admin, verify they appear on the public site

---

## 🔗 Step 6: Custom Domain (Optional)

### For Frontend (Netlify):
1. Domain settings → Add custom domain
2. Follow DNS setup instructions

### For Backend (Railway):
1. Settings → Networking → Custom Domain
2. Add your API subdomain (e.g., `api.yourdomain.com`)

---

## ✅ Final Checklist

- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Netlify
- [ ] Environment variables configured
- [ ] API endpoints working
- [ ] Admin interface accessible
- [ ] Products display correctly
- [ ] SSL certificates active

## 📞 Need Help?

If you encounter issues:
1. Check Railway logs for backend errors
2. Check Netlify deploy logs for frontend issues
3. Verify all environment variables are set correctly
4. Test API endpoints directly

---

**Your website will be live at**: `https://your-site-name.netlify.app`
**Admin access**: `https://your-site-name.netlify.app/admin`

The deployment process typically takes 5-10 minutes total! 🎉
