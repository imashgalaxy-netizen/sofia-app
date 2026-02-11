\const CACHE_NAME = 'sofia-v-1.0.2'; // Увеличивай версию (1.0.3 и т.д.), чтобы пользователи получили обновление
const ASSETS = [
  './',
  'index.html',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});