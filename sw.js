// Retires the PWA service worker that the old Chirpy-based scaffold
// registered (pwa.enabled: true, before the custom theme rewrite). This
// file's only job is to replace that old worker, wipe its offline cache,
// unregister itself, and reload any open tabs so they fetch the real
// site from the network again. Safe to remove once enough time has
// passed that no visitor's browser could still have the old worker
// installed (Service Workers self-check for updates periodically).
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      })
  );
});
