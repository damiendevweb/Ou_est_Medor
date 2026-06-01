self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener('push', onPush)

function onPush(event) {
  if (!event.data) return
  try {
    const data = event.data.json()
    const { title, body, icon, data: extraData, ...rest } = data
    const safeTitle = title || 'DoggyTracker'
    event.waitUntil((async () => {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      clients.forEach((client) => client.postMessage(data))
      await self.registration.showNotification(safeTitle, {
        body: body || '',
        icon: icon || '/icons/icon-192x192.png',
        data: { url: rest.url || extraData?.url || '/dashboard' },
        requireInteraction: true,
        ...rest,
      })
    })())
  } catch (err) {
    console.error('Push handler error:', err)
  }
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
