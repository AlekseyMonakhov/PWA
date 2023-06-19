self.addEventListener('install', (e) => {
    console.log(e, 'worker installing');
});


self.addEventListener('activate', (e) => {
    console.log(e, 'worker activating');
    return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    console.log(e, 'fetching some....')
    e.respondWith(fetch(e.request));
})
