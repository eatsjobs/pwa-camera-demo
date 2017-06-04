var LOG_TAG = '[ServiceWorker]';
var versionCache = 'v5';
var cacheName = 'camera-app-cache-' + versionCache;
var toCache = ['index.html', 'bundle.js', 'manifest.json', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'];

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
    e.waitUntil(caches.keys().then(function(cacheNames){
        var deleteTask = cacheNames.map(function(storedCacheName){
            if (storedCacheName !== cacheName) {
                return caches.delete(cacheName)
            }
        });
        return Promise.all(deleteTask);
    }));
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