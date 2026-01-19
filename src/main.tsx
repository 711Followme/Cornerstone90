import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('🏛️ CORNERSTONE: 90 - Starting application...');
console.log('Device:', navigator.userAgent);

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error('❌ Root element not found!');
    throw new Error('Root element not found');
  }
  
  console.log('✅ Root element found, creating React app...');
  createRoot(rootElement).render(<App />);
  console.log('✅ React app rendered successfully');
} catch (error) {
  console.error('❌ Error rendering app:', error);
  
  // Show error message on page
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #DC2626;">Error Loading App</h1>
        <p>Failed to initialize application.</p>
        <p><small>${error instanceof Error ? error.message : String(error)}</small></p>
        <p style="margin-top: 20px;">
          <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3B82F6; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Reload Page
          </button>
        </p>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          Device: ${navigator.userAgent}
        </p>
      </div>
    `;
  }
}

// App version for cache busting
const APP_VERSION = '1.0.2-android-fix';
const VERSION_KEY = 'cornerstone90_app_version';

// Simple version check (Android compatible)
const checkForUpdates = () => {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    if (storedVersion && storedVersion !== APP_VERSION) {
      console.log('[Update] New version detected. Old:', storedVersion, 'New:', APP_VERSION);
      
      // Clear caches
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
      
      // Update version
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      
      // Reload
      console.log('[Update] Reloading to apply new version...');
      window.location.reload();
    } else if (!storedVersion) {
      // First time user
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      console.log('[Update] First visit - version', APP_VERSION);
    } else {
      console.log('[Update] Version up to date:', APP_VERSION);
    }
  } catch (error) {
    console.error('[Update] Error checking version:', error);
  }
};

// Check for updates on load
checkForUpdates();

// Register Service Worker for PWA (Android compatible)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('[PWA] Service Worker registration failed:', error);
        // Don't crash the app if SW fails - it's not critical
      });
  });
}

// Listen for install prompt (PWA install banner)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('[PWA] Install prompt available');
  localStorage.setItem('pwa_installable', 'true');
});

// Track PWA install
window.addEventListener('appinstalled', () => {
  console.log('[PWA] App installed successfully');
  localStorage.setItem('pwa_installed', 'true');
  deferredPrompt = null;
});

console.log('✅ CORNERSTONE: 90 initialized - Version', APP_VERSION);
console.log('📱 Android compatible build');
