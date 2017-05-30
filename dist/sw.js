var LOG_TAG = '[ServiceWorker]';
var versionCache = 'v1';
var cacheName = 'camera-app-cache-' + versionCache;
var toCache = ['/', 'index.html', 'bundle.js', 'manifest.json']

function onInstall(e){
    console.log(LOG_TAG, "Install");
    var cacheTask = caches.open(cacheName)
        .then(function(cache){
            console.log(LOG_TAG, "Put in cache", toCache);
            return cache.addAll(toCache);
        })
        .then(function(){
            return self.skipWaiting();
        });
    e.waitUntil(cacheTask);
}

function onActivate(e){
    console.log(LOG_TAG, "Activate");
}


function onFetch(e){    
    console.log(LOG_TAG, "Fetch", e.request.url);
    e.respondWith(
        caches.match(e.request)
        .then(function(response) {
            if (response) {
                console.log(LOG_TAG, "Load from cache", response);
                return response;
            }
            return fetch(e.request);
        })
    );
}

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);