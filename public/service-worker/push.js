self.addEventListener("install", () => {
  self.skipWaiting();
});


self.addEventListener('push', onPush)
function onPush(event) {
    console.log('[Push] payload reçu', event.data?.text())

  if (!event.data) return

  const data = event.data.json()
  const { title, ...rest } = data

  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    clients.forEach((client) => client.postMessage(data))

    await self.registration.showNotification(title, {
      ...rest,
    })
  })())
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification?.data?.url || '/dashboard'

  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })

    for (const client of clients) {
      if ('focus' in client) {
        if ('navigate' in client) {
          await client.navigate(url)
        }
        await client.focus()
        return
      }
    }

    if (self.clients.openWindow) {
      await self.clients.openWindow(url)
    }
  })())
})