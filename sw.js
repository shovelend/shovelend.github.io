importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/manifest.json',
       '/index.html',
       '/css/styles.css',
       '/images/cater_me.png',
       '/images/profile.png',
       '/images/seylum_icon.png'
     ]);
   })
 );
});