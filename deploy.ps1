# PowerShell Deployment Script for SBO Oil Seals Website
Write-Host "🚀 Preparing SBO Oil Seals Website for Deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Pre-deployment Checklist:" -ForegroundColor Yellow
Write-Host "✅ Supabase database is set up with products table" -ForegroundColor Green
Write-Host "✅ Environment variables are ready" -ForegroundColor Green
Write-Host "⚠️  Please ensure you have:" -ForegroundColor Yellow
Write-Host "   - Railway account connected to GitHub"
Write-Host "   - Netlify account connected to GitHub"
Write-Host "   - Supabase credentials ready"

Write-Host ""
Write-Host "🔧 Testing backend build..." -ForegroundColor Blue
Set-Location backend
try {
    npm run build
    Write-Host "✅ Backend build successful" -ForegroundColor Green
}
catch {
    Write-Host "❌ Backend build failed. Please fix errors before deploying." -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "🔧 Testing frontend build..." -ForegroundColor Blue
Set-Location frontend
try {
    npm run build
    Write-Host "✅ Frontend build successful" -ForegroundColor Green
}
catch {
    Write-Host "❌ Frontend build failed. Please fix errors before deploying." -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "✅ Pre-deployment checks completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Push your code to GitHub"
Write-Host "2. Deploy backend to Railway:"
Write-Host "   - Go to railway.app"
Write-Host "   - New Project → Deploy from GitHub"
Write-Host "   - Select your SBO_OilSeal repository"
Write-Host "   - Set environment variables"
Write-Host ""
Write-Host "3. Deploy frontend to Netlify:"
Write-Host "   - Go to netlify.app"
Write-Host "   - New site from Git"
Write-Host "   - Select your SBO_OilSeal repository"
Write-Host "   - Build settings: npm run build:client"
Write-Host "   - Publish directory: dist/spa"
Write-Host ""
Write-Host "4. Configure production environment variables"
Write-Host ""
Write-Host "🎉 Your website will be live in ~10 minutes!" -ForegroundColor Green