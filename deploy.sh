#!/bin/bash

# Deployment Script for SBO Oil Seals Website
echo "🚀 Preparing SBO Oil Seals Website for Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo "✅ Supabase database is set up with products table"
echo "✅ Environment variables are ready"
echo "⚠️  Please ensure you have:"
echo "   - Railway account connected to GitHub"
echo "   - Netlify account connected to GitHub"
echo "   - Supabase credentials ready"

echo ""
echo "🔧 Testing backend build..."
cd backend
if npm run build; then
    echo "✅ Backend build successful"
else
    echo "❌ Backend build failed. Please fix errors before deploying."
    exit 1
fi

cd ..

echo ""
echo "🔧 Testing frontend build..."
cd frontend
if npm run build; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed. Please fix errors before deploying."
    exit 1
fi

cd ..

echo ""
echo "✅ Pre-deployment checks completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway:"
echo "   - Go to railway.app"
echo "   - New Project → Deploy from GitHub"
echo "   - Select your SBO_OilSeal repository"
echo "   - Set environment variables"
echo ""
echo "3. Deploy frontend to Netlify:"
echo "   - Go to netlify.app"
echo "   - New site from Git"
echo "   - Select your SBO_OilSeal repository"
echo "   - Build settings: npm run build:client"
echo "   - Publish directory: dist/spa"
echo ""
echo "4. Configure production environment variables"
echo ""
echo "🎉 Your website will be live in ~10 minutes!"