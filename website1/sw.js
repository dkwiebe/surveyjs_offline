//Bump this version number if dependencies change.
var CACHE_VERSION = '201909121345';

var urlsToCache = [
    '/',
    'https://unpkg.com/axios/dist/axios.min.js',
    'https://unpkg.com/sweetalert@2.1.2/dist/sweetalert.min.js',
    'https://fonts.googleapis.com/css?family=Raleway:300,400,600',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
    //'https://cdn.polyfill.io/v2/polyfill.min.js',
    'https://kit.fontawesome.com/29eb626f63.js',
    'https://code.jquery.com/jquery-3.2.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
    'https://unpkg.com/axios@0.19.0/dist/axios.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.3/es6-shim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/mouse0270-bootstrap-notify/3.1.7/bootstrap-notify.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js',
    'https://unpkg.com/sweetalert/dist/sweetalert.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment-with-locales.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.3.2/bootbox.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js',
    'https://surveyjs.azureedge.net/1.1.10/survey.jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/worker-json.js',
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/mode-json.js',
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ext-language_tools.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js',
    'https://cdn.jsdelivr.net/npm/uuid-random@1.0.9/uuid-random.min.js'
];


self.addEventListener('install', function(event) {
    console.log('Install Event');
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', function(event) {
    console.log('Fetch Event');
    console.log(event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                console.log('hit');
                return response;
            }
            console.log('miss');
            return fetch(event.request);
        })
    );
});

function clearCaches() {
    return caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(key) {
                return key.indexOf(CACHE_VERSION) !== 0;
            }).map(function(key) {
                return caches.delete(key);
            })
        );
    })
}

self.addEventListener('activate', function(event) {
    event.waitUntil(
        clearCaches().then( function(event) {
            return self.clients.claim();
        })
    );
});
