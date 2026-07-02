const CACHE_VERSION = "portfolio-room-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const STATIC_ASSET_PATTERN =
  /\.(?:js|css|woff2?|png|jpg|jpeg|webp|avif|ico|svg|glb|gltf|ktx2|hdr|exr)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => !key.startsWith(CACHE_VERSION)).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/").then((response) => response ?? Response.error()),
      ),
    );
    return;
  }

  if (STATIC_ASSET_PATTERN.test(url.pathname) || url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);

        if (cached) {
          return cached;
        }

        const response = await fetch(request);

        if (response.ok) {
          await cache.put(request, response.clone());
        }

        return response;
      }),
    );
  }
});
