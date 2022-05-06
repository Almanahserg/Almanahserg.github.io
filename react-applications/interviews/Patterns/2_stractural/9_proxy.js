/* Proxy - это структурный паттерн проектирования, который позволяет подставлять
вместо реальных объектов специальные объекты-заменители.
Эти объекты перехватывают вызовы к оригинальному объекту, позволяя
сделать что-то до или после передачи вызова оригиналу */

function networkFetch(url) {
  return `${url} - ответ с сервера`;
}

const cache = new Set();

const proxiedFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const url = args[0];
    if (cache.has(url)) {
      return `${url} - ответ из кэша`;
    } else {
      cache.add(url);
      return Reflect.apply(target, thisArg, args);
    }
  },
});

console.log(proxiedFetch('angular.io'));
// angular.io - ответ с сервера

console.log(proxiedFetch('react.io'));
// react.io - ответ с сервера

console.log(proxiedFetch('angular.io'));
// angular.io - ответ из кэша
