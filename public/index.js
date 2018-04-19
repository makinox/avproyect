;
// Registro de Características de PWA's
((d, w, n, c) => {
  // Registro de SW
  if ('serviceWorker' in n) {
    w.addEventListener('load', () => {
      n.serviceWorker.register('./public/weaqua.js')
        .then(registration => {
          // c(registration)
          c('%cStop!', 'color: red;font-size:2.5rem;font-weight:bold;')
          c('%cEste es un espacio solo para los desarrolladores, si intentas ingresar algún código malicioso seras baneado. 😀', 'font-size:1.25rem;line-height:1.1;margin-top:.5em')
          
          c(
            'Service Worker registrado con éxito 🤗',
            registration.scope
          )
        })
        .catch(err => c(`Registro de Service Worker fallido 😌 \n${err.message}`))
    })
  }

  // Activar Notificaciones
  if (w.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(status => {
      console.log(status)
      let n = new Notification('Utopia', {
        body: 'Bienvenido a WeAqua 😊',
        icon: 'public/favicon-32x32.png'
      })
    })
  }

  // Activar Sincronización de Fondo
  if ('serviceWorker' in n && 'SyncManager' in w) {
    function registerBGSync () {
      n.serviceWorker.ready
        .then(registration => {
          return registration.sync.register('utopia')
            .then(() => c('Sincronización de Fondo Registrada'))
            .catch(err => c('Fallo la Sincronización de Fondo', err))
        })
    }

    registerBGSync()
  }

  // Compartiendo contenido con el API Share
  // if ( n.share !== undefined ) {
  //   d.addEventListener('DOMContentLoaded', e => {
  //     let shareBtn = d.getElementById('share')

  //     shareBtn.addEventListener('click', e => {
  //       n.share({
  //         title: d.title,
  //         text: 'Hola soy un contenido para compartir',
  //         url: w.location.href
  //       })
  //       .then(() => c.log('Contenido compartido con éxito') )
  //         .catch( err => c.log('Error al compartir: ', err) )
  //     })
  //   })
  // }
})(document, window, navigator, console.log);