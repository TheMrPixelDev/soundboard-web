var urlsToCache = [
    '/style.css',
    '/shake.js',
    '/app.js',
    '/index.html'
]

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('soundboard-static-v1').then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        if ("navigationPreload" in self.registration) await self.registration.navigationPreload.enable();
    })());
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) return preloadResponse;
            } catch (error) {
            }
            return fetch(event.request).then(function (response) {
                if (!response || response.status !== 200 || response.type !== 'basic' || !response.url.match("^(http|https)://"))
                    return response;
                let responseToCache = response.clone();
                caches.open(urlsToCache.includes(event.request.url.replaceAll(/.*:\/\/?([^\/]+)/g, "")) ? "soundboard-static-v1" : "other")
                    .then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });
                return response;
            }).catch(function () {
                console.log("no wifi");
                return caches.match(event.request);
            });
        })()
    );
});