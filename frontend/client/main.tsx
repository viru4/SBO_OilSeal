import { createRoot, Root } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

const w = window as unknown as { __root?: Root };
if (!w.__root) {
  w.__root = createRoot(container);
}

w.__root.render(<App />);

// Global error handling for unhandled promise rejections and console errors
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason);
  // Prevent the error from appearing in console if it's a known service worker issue
  if (event.reason?.toString().includes('Failed to convert value to \'Response\'') ||
      event.reason?.toString().includes('rum') ||
      event.reason?.toString().includes('.netlify/scripts')) {
    event.preventDefault();
  }
});

window.addEventListener('error', (event) => {
  // Suppress known service worker and resource loading errors
  if (event.message?.includes('Failed to convert value to \'Response\'') ||
      event.filename?.includes('sw.js') ||
      event.filename?.includes('.netlify/scripts/rum')) {
    event.preventDefault();
    return false;
  }
});

// Mobile-specific optimizations
if ('navigator' in window && 'connection' in navigator) {
  const connection = (navigator as any).connection;
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    // Disable service worker on slow connections
    console.log('Slow connection detected, skipping heavy features');
  }
}

// Prevent iOS bounce effect and zoom
document.addEventListener('touchmove', (e) => {
  // Prevent page bounce on iOS
  if (e.touches.length > 1) { 
    e.preventDefault(); 
  }
}, { passive: false });

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Register service worker for offline capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Update available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker available, please refresh');
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.warn('SW registration failed: ', registrationError);
        // Don't block the app if SW fails
      });
  });
}