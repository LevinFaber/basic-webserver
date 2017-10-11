var cache = 'v1';
var myfiles = [
    './',
    './js/script.js',
    './style/style.css'
  ];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('v1').then(cache => 
    cache.addAll([
        './',
        './js/script.js',
        './style/style.css'
        ]))
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
            .catch(() => {
                if (event.request.mode == 'navigate') {
                    return console.log('failed');
            }
        })
    );
});

/*
this.addEventListener('install', event => {
    console.log('INSTALLED, caching...')    
    event.waitUntil(precache());
});
this.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('v1').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });

function precache() {
    return caches.open(cache).then(function (cache) {
        return cache.addAll([
            './',
            './js/script.js',
            './style/style.css'
          ]);
    });
}