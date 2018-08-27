importScripts('/scrum-poker/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/scrum-poker/_nuxt/app.274c6f5ca271fa655977.js",
    "revision": "b5b9288fcff9d56271eef3269bc1b76a"
  },
  {
    "url": "/scrum-poker/_nuxt/app.62c8c770607ab0a7335d9473b532473a.css",
    "revision": "3ed6f30190c18f5d620c4cbb81b593a2"
  },
  {
    "url": "/scrum-poker/_nuxt/layouts_default.6583fbfa8627de12f538.js",
    "revision": "5c0adfb7118c39f00ea5fb5ac83b9429"
  },
  {
    "url": "/scrum-poker/_nuxt/manifest.12cf70c911778f9b2f8c.js",
    "revision": "24ba9ed8fe935f57b2581f0920b013f7"
  },
  {
    "url": "/scrum-poker/_nuxt/pages_index.46139f4cddf74478f148.js",
    "revision": "dcde22a22d71ece01a937c15b169e85b"
  },
  {
    "url": "/scrum-poker/_nuxt/vendor.b6c174c46c2b35da9d01.js",
    "revision": "42eac31010e6125b24d04eb67b5adef8"
  }
], {
  "cacheId": "scrum-poker",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/scrum-poker/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/scrum-poker/.*'), workbox.strategies.networkFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/scrum-poker/_nuxt/.*'), workbox.strategies.staleWhileRevalidate({}), 'GET')





