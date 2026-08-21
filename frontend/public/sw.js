const CACHE_NAME = 'geas-basket-v99';

// Files to cache (only static assets)
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS).catch(err => {
        console.warn('Cache initialization error:', err);
      });
    })
  );
  self.skipWaiting();
});

// Check for updates periodically
setInterval(() => {
  fetch('/index.html?time=' + Date.now())
    .then(res => res.text())
    .then(html => {
      // Notify clients if there's a new version
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATE_AVAILABLE' });
        });
      });
    })
    .catch(err => console.log('Update check failed:', err));
}, 60000); // Check every 60 seconds

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Handle skip waiting message from client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch event - NETWORK FIRST for APIs, CACHE FIRST for static
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API requests - always go to network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(err => {
        console.error('API fetch error:', err);
        // Return offline response if needed
        return new Response(
          JSON.stringify({ error: 'Offline or server error' }),
          { status: 503, statusText: 'Service Unavailable' }
        );
      })
    );
    return;
  }

  // Static assets - cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(res => {
        // Cache successful responses
        if (res && res.status === 200) {
          const cache = caches.open(CACHE_NAME);
          cache.then(c => c.put(event.request, res.clone()));
        }
        return res;
      });
    }).catch(err => {
      console.error('Fetch error:', err);
      // Return cached page if offline
      return caches.match('/index.html');
    })
  );
});
