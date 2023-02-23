let cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntill(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.fef40c7e.chunk.js",
        "/static/js/2.d8c80119.chunk.js",
        "/static/js/bundle.js",
        "index.html",
        "/",
        "/static/media/meals.2971f633.jpg",
        "/static/css/main.cb55be55.chunk.css",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  console.warn("navigator.onLine", navigator.onLine);
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) return result;

        let requestURL = event.request.clone();
        return fetch(requestURL);
      })
    );
  }
});
