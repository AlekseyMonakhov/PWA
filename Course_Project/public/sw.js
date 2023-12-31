var CACHE_STATIC_NAME = 'static-v12'
var CACHE_DYNAMIC_NAME = 'dynamic-v2'

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then((cache) => {
            cache.addAll([
                '/',
                './index.html',
                './offline.html',
                './src/js/app.js',
                './src/js/feed.js',
                './src/js/promise.js',
                './src/js/fetch.js',
                './src/js/material.min.js',
                './src/css/app.css',
                './src/css/feed.css',
                './src/images/main-image.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
            ])
        })
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (
                        key !== CACHE_STATIC_NAME &&
                        key !== CACHE_DYNAMIC_NAME
                    ) {
                        return caches.delete(key)
                    }
                })
            )
        })
    )

    return self.clients.claim()
})

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then((res) => {
//             if (res) {
//                 return res
//             } else {
//                 return fetch(event.request)
//                     .then((response) => {
//                         return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//                             cache.put(event.request.url, response.clone())
//                             return response
//                         })
//                     })
//                     .catch((err) => {
//                         return caches.open(CACHE_STATIC_NAME).then((caches) => {
//                             return caches.match('/offline.html')
//                         })
//                     })
//             }
//         })
//     )
// })

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then((res) => {
                return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                    cache.put(event.request.url, res.clone())
                    return res
                })
            })
            .catch((err) => {
                console.log('privetiki');
                return caches.match(event.request)
            })
    )
})
