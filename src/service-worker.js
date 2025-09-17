/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly, NetworkFirst } from 'workbox-strategies';

clientsClaim();

self.skipWaiting();

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

precacheAndRoute(self.__WB_MANIFEST);

var CacheName = "appcache"
var urlsToCache = [
    '/privacy-policy/',
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/mstile-150x150.png',
    '/apple-touch-icon.png',
    '/icon48.png',
    '/icon72.png',
    '/icon144.png',
    '/icon192.png',
    '/icon512.png',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CacheName)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

/* everything above is related to storing things in the cache */
/* now we have to decide what happens on individual requests / fetches */

registerRoute("/", new NetworkFirst());
registerRoute("/privacy-policy/", new NetworkFirst());
registerRoute("/reset/", new NetworkOnly());
registerRoute(({ url }) => url.href.includes('mp3quran'), new NetworkOnly());


