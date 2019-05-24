const cachedApiEndpoints = [
  '/api/users/me',
  '/api/drives',
  '/api/cars',
  '/api/passengers',
  '/api/projects',
];

const cachedUrls = [
  '/',
  '/login',
  '/drive',
  '/drives',
];

/**
 * Each time SW is installed, it fetches the HTML for URLs from cachedUrls.
 * This allows for offline navigation to those URLS.
 * So if user enters https://<domain>.<tld>/<URL> then they get the page
 * offline even if they have only ever visited another page.
 *
 * The HTML file must be cached each time because it contains
 * links to hashed CSS an JS files.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
  event.waitUntil(
    caches.open('requests').then((cache) => {
      return cache.addAll(cachedUrls);
    }),
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('fetch', (event) => {
  // Only GET requests are candidates for caching.
  // Skip everything that is not a GET request.
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  // For cached URLs, try to fetch first and fallback to cache
  if (
    cachedUrls.some(url => event.request.url.endsWith(url))
    || cachedApiEndpoints.some(url => event.request.url.endsWith(url))
  ) {
    event.respondWith(
      fetch(event.request)
        .catch((err) => {
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              throw err;
            })
        })
        .then((response) => {
          const responseToCache = response.clone();
          caches.open('requests')
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'LOGOUT') {
    caches.delete('requests');
  }
});
