self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('soundboard-static-v1').then(function (cache) {
            return cache.addAll([
                '/style.css',
                '/shake.js',
                '/app.js',
                '/index.html'
            ])
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