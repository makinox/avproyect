const CACHE_NAME = 'weaquav1',
  urlsToCache = [
    'android-chrome-192x192.webp',
    'index.js',
    'weaqua'
  ]

self.addEventListener('install', e => {
  // console.log('Evento: SW Instalado')
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // console.log('Archivos en cache')
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
        // skipWaiting forza al SW a activarse
      })
      // .catch(err => console.log(`Falló registro de cache ${err.message}`))
  )
})

self.addEventListener('activate', e => {
  // console.log('Evento: SW Activado')
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Eliminamos lo que ya no se necesita en cache
          if (cacheWhitelist.indexOf(cacheName) === -1) { return caches.delete(cacheName) }
        })
      )
    })
      .then(() => {
        // console.log('Cache actualizado')
        // Le indica al SW activar el cache actual
        return self.clients.claim()
      })
  )
})

// self.addEventListener('fetch', e => {
//   // console.log('Evento: SW Recuperando')

//   e.respondWith( 
//   //   async () => {
//   //   const cachedResponse = await caches.match(e.request)

//   //   if (cachedResponse) return cachedResponse

//   //   return fetch(e.request)
//   // }
//     // Miramos si la petición coincide con algún elemento del cache
//     caches.match(e.request)
//       .then(res => {
//         // console.log('Recuperando cache')
//         if (res) {
//           // Si coincide lo retornamos del cache
//           return res
//         }
//         // Sino, lo solicitamos a la red
//         return fetch(e.request)
//       })
//   )
// })

// self.addEventListener('push', e => {
//   // console.log('Evento: Push')

//   let title = 'Utopia',
//     options = {
//       body: 'Quiero saber que piensas',
//       icon: 'favicon-16x16.webp',
//       vibrate: [100, 50, 100],
//       data: { id: 1 },
//       actions: [
//         { 'action': 'Si', 'title': 'Te gusta esta aplicación? 😀', icon: 'favicon-16x16.webp' },
//         { 'action': 'No', 'title': 'No me gusta esta aplicación 😔', icon: 'favicon-16x16.webp' }
//       ]
//     }

//   e.waitUntil(self.registration.showNotification(title, options))
// })