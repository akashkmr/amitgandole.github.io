/** An empty service worker! */

/*
self.addEventListener('fetch', function(event) {
  if (event.request.url == 'https://amitgandole.github.io/') {
    console.info('responding to everything fetch with Service Worker! 🤓');
    event.respondWith(fetch(event.request).catch(function(e) {
      let out = '/index.html';
      return new Response(out);
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
*/

self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );

      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})


//NOT WORKING STILL
self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Got Push?', {
      body: 'Push Message received'
   }));
});


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/aa.html',
        '/manifest.json',
        
        '/site.js'
      
      ]);
    })
  );
});

