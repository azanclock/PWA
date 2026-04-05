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

/* precacheAndRoute above handles caching all build assets */
/* below we decide what happens on individual requests / fetches */

registerRoute("/", new NetworkFirst());
registerRoute("/privacy-policy/", new NetworkFirst());
registerRoute(({ url }) => url.hostname === 'cdn.jsdelivr.net', new StaleWhileRevalidate());
registerRoute("/reset/", new NetworkOnly());
registerRoute(({ url }) => url.href.includes('mp3quran'), new NetworkOnly());


