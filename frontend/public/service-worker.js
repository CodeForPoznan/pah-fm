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

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('assets').then((cache) => {
      return cache.addAll(cachedUrls);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  if (cachedUrls.some(url => event.request.url.endsWith(url))) {
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
        }),
    );
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request.clone()).then((response) => {
          const isCachedUrl = cachedApiEndpoints
            .some(url => event.request.url.endsWith(url));
          const responseToCache = response.clone();
          if (isCachedUrl) {
            caches.open('api')
              .then(cache => cache.put(event.request, responseToCache))
          }
          return response;
        });
      }),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'LOGOUT') {
    caches.delete('api');
  }
});
