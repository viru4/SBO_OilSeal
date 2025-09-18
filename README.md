# SBO OilSeals - Automotive Oil Seals & Motorcycle Shocker/Fork Seals

A modern, high-performance web application for SBO OilSeals, specializing in automotive oil seals with a focus on motorcycle shocker/fork seals.

## 🏗️ Project Structure

```
SBO_OilSeal/
├── frontend/                 # React frontend application
│   ├── client/              # React components and pages
│   ├── shared/              # Shared types and utilities
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Frontend build configuration
│   ├── tsconfig.json        # Frontend TypeScript config
│   └── tailwind.config.ts   # Tailwind CSS configuration
├── backend/                 # Express.js backend API
│   ├── server/              # Express server and routes
│   ├── shared/              # Shared types and utilities
│   ├── package.json         # Backend dependencies
│   ├── vite.config.ts       # Backend build configuration
│   └── tsconfig.json        # Backend TypeScript config
├── package.json             # Root workspace configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
# Install all dependencies (root, frontend, and backend)
npm run install:all

# Or install individually
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Development
```bash
# Start both frontend and backend in development mode
npm run dev

# Or start individually
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:8080
```

### Production
```bash
# Build both frontend and backend
npm run build

# Start production server
npm start
```

## 🎯 Features

### Frontend
- ⚡ **High Performance**: Lazy loading, code splitting, optimized bundles
- 🎨 **Modern UI**: Tailwind CSS with Radix UI components
- 📱 **Responsive**: Mobile-first design
- 🔄 **State Management**: React Query for server state
- 🛡️ **Error Handling**: Comprehensive error boundaries
- 📊 **Performance Monitoring**: Core Web Vitals tracking
- 🔧 **TypeScript**: Strict type checking
- 🎭 **Animations**: Framer Motion for smooth interactions

### Backend
- 🚀 **Express.js**: Fast, unopinionated web framework
- 🔒 **Type Safety**: Zod validation and TypeScript
- 🌐 **CORS**: Cross-origin resource sharing
- 📝 **API Routes**: RESTful endpoints
- 🔧 **Development**: Hot reload with tsx
- 📦 **Production**: Optimized builds with Vite

## 🛠️ Development Commands

```bash
# Type checking
npm run typecheck              # Check both frontend and backend
npm run typecheck:frontend     # Check frontend only
npm run typecheck:backend      # Check backend only

# Building
npm run build                  # Build both
npm run build:frontend         # Build frontend only
npm run build:backend          # Build backend only

# Cleaning
npm run clean                  # Remove all build artifacts and node_modules
```

## 📁 Directory Details

### Frontend (`/frontend`)
- **Client**: React application with components, pages, hooks, and utilities
- **Shared**: Common types and utilities used by both frontend and backend
- **Configuration**: Vite, TypeScript, and Tailwind configurations

### Backend (`/backend`)
- **Server**: Express.js server with routes and middleware
- **Shared**: Common types and utilities (duplicated from frontend for independence)
- **Configuration**: Vite and TypeScript configurations for Node.js

## 🔧 Configuration

### Frontend Configuration
- **Port**: 3000 (development)
- **Build Output**: `frontend/dist/`
- **TypeScript**: Strict mode enabled
- **Tailwind**: Custom theme with design system

### Backend Configuration
- **Port**: 8080 (development)
- **Build Output**: `backend/dist/`
- **TypeScript**: Strict mode enabled
- **Target**: Node.js 22

## 🚀 Performance Optimizations

- **Code Splitting**: Each page loads independently
- **Lazy Loading**: Components load on demand
- **Bundle Optimization**: Manual chunk splitting
- **Image Optimization**: Lazy loading with placeholders
- **Service Worker**: Offline capabilities
- **Caching**: Smart React Query caching strategies

## 📦 Deployment

### Frontend
The frontend builds to static files that can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Backend
The backend builds to a Node.js application that can be deployed to:
- Railway
- Heroku
- AWS EC2
- DigitalOcean
- Any Node.js hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## 📄 License

Private - SBO OilSeals
