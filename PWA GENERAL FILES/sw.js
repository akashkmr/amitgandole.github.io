/** An empty service worker! */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

navigator.serviceWorker && navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
const publicKey ='BHlNRf0EG5a7LmaFr0PD6j0kfSZSeVgIS0sJko8xbRpF2U3QsKbp51AtHyNDm_HSyAMR10VEiEj1VckpUXTLSt4';
  serviceWorkerRegistration.pushManager.getSubscription()  
    .then(function(subscription) {  
      if (subscription) {
        console.info('Got existing', subscription);
        window.subscription = subscription;
        return;  // got one, yay
      }

      const applicationServerKey = urlB64ToUint8Array(publicKey);
      serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
      })
        .then(function(subscription) { 
          console.info('Newly subscribed to push!', subscription);
          window.subscription = subscription;
        });
    });
});

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Got Push?', {
      body: 'Push Message received'
   }));
});


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
    });
  );
});


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        
        '/manifest.json',
        
        '/site.js'
      
      ]);
    })
  );
});

