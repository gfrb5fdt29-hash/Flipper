// Offline support: the first visit saves the game, its icons and fonts on the device.
const CACHE = 'nebula-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Bungee&family=Chakra+Petch:wght@500;600;700&display=swap';

// the stylesheet only names the font files, so fetch it and save each file it points to
async function cacheFonts(cache) {
  try {
    const res = await fetch(FONT_CSS);
    if (!res.ok) return;
    const css = await res.clone().text();
    await cache.put(FONT_CSS, res);
    const files = [...css.matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]);
    await Promise.all(files.map(u => fetch(u).then(r => r.ok && cache.put(u, r)).catch(() => {})));
  } catch {
    // without fonts the game still runs on the fallback typefaces
  }
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(cache => cache.addAll(CORE).then(() => cacheFonts(cache)))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const within = (ms, promise) => Promise.race([promise, new Promise((_, reject) => setTimeout(reject, ms))]);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    // the page: prefer a fresh copy so updates arrive, fall back to the saved one offline
    e.respondWith(within(4000, fetch(req))
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
        return res;
      })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // icons and fonts: saved copy first, otherwise fetch and save it for next time
  e.respondWith(caches.match(req, { ignoreVary: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
