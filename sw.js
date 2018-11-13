/** An empty service worker! */
self.addEventListener('fetch', function(event) {
  /** An empty fetch handler! */
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
