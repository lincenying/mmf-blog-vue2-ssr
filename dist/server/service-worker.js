/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["E:/web/webpack/mmf-blog-vue2-ssr/dist/admin-add.html","5e95a7d168822a2c1a5fa1bcc800b320"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/admin.html","c0a922d0ae3ba1210e96a83c92cab698"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/favicon.ico","faeebb767fa6b74be3cf94ea8eb4b2dc"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/robots.txt","25433372d4b5069807415ce7c1cdfa08"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/css/admin.d53fd3a.css","389564f9f400c1c01b3b1f0c6c3f6fc4"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/css/app.d53fd3a.css","d93ea08e92a1553a09f681fd441710c5"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/images/avatar.png","2b02841e980a26eec00f3587b5661880"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/images/topic-1.png","4cb37ea61ecb0ea8baf686c9675f8bcf"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-articles.0bf23e7.png","0bf23e7565c07711cc52a89d415c85a8"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-articles.49781fb.png","49781fb14cb56f50ca75f549067d8562"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-comment.0195d4d.png","0195d4d23f0699ebf6eb7a4d28b14f6b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-comment.dd8601c.png","dd8601c57e48da0bbc171f84291f9551"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-fav-active.118f075.png","118f075bbe75acf9cced20e1be1c4d95"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-fav-active.3b6860b.png","3b6860b9d3a18b71d4b319492e544341"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-fav.7be4267.png","7be4267fd71992293491c96400134f69"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-fav.d960b16.png","d960b16615dc93dfe231f2d54e3cae84"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-follow-active.24b8087.png","24b80877904fed2a6e6deb870f00bea2"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-follow-active.47fb103.png","47fb1038aa0be30af3aa8088960236a9"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-follow.a2f6226.png","a2f622656252cb1d2b503e445eac85ec"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-follow.f307dd5.png","f307dd592cbfe294848753d1bd67e604"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-share.0c981e0.png","0c981e082583aecf83a13de90156d050"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-share.60a1f56.png","60a1f56127eb567978e056fe9cea5c5f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-voteup-active.31f3d5c.png","31f3d5c69dd0acf663bd8f47a053ee35"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-voteup-active.a953d11.png","a953d110ea7e8c70c89794e704ac7b5c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-voteup.3253dc1.png","3253dc182b4a3b177256c9b3ec087dc7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/action-voteup.3637418.png","3637418d5669469f4d80cdf182301667"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/arrow-down.6879110.png","6879110dd89776e60e1ee082730a3b2d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/arrow-right-circle-green.64af7d6.png","64af7d65729be688d355f1e8a6fb9346"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/arrow-right-circle-green.9ae292b.png","9ae292befaa0306a1c06d1428bebdafd"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/arrow-right.b6be2c4.png","b6be2c4a4fb521879cfff1e5a1211d6f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/arrow-right.cc270c7.png","cc270c7c7c7dd613e24961f67851ad4d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/articles.0b691c9.png","0b691c9b9eb917f85709c8f2d7f0a88d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/articles.9b2c058.png","9b2c0584562fbb00afc891c37fbae2a0"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/circle-loading.49ad93c.png","49ad93c816dd185580e819f069dd367a"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/circle-loading.aca62c0.png","aca62c0e6d293a0de8ff9e4ce7598de0"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/close-black.d54f82c.png","d54f82cd26391e678a1f86e33504420f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/close-white.6c0b6a7.png","6c0b6a71fd36764deaf2ce33d2c36aad"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/close-white.c73e492.png","c73e49251a202cd1e12dd08ebf3ffeb3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/entry-people.071f787.png","071f787d1807eb6bb8308910add86434"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/entry-people.52dd707.png","52dd707f4f78bbdf7b77e2766c68ecbb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/loading.22f1acc.png","22f1acc8f9aa7a3cfd08d97547172c0d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/loading@2x.2bac303.png","2bac303086cdcca8d48b69d894c1f5d8"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-explore.8ce3f03.png","8ce3f03822e1276fc880cedf2e41633c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-explore.b83e319.png","b83e319b7789befb4302f8d309c8b6b0"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-features.5d74fdb.png","5d74fdb6017b921c634e0bdbd9ec4526"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-features.a99dc23.png","a99dc23f868cc9c5bca664d809d4df70"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-home.2590cbc.png","2590cbc0f07a4ed3b16d894ff3fee966"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-home.577282b.png","577282bf990c9005f8a2b5be0f4296e3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-logo.43cf7f4.png","43cf7f461c640cf3d0031567b938ab8c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/nav-logo.ee1b6ca.png","ee1b6cae7264df2d4fb5df44447580e7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/prev-black.7955a7d.png","7955a7dd18e61f3341e0e3a343bfe488"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/prev-black.c05a179.png","c05a1796b12ee8b0a24710a15770e5f3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/search-white.adcd353.png","adcd3535ce64d7622bd836c79c6f18ec"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/search-white.d31ff78.png","d31ff786b4d76ce043238803a7257254"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/admin.17053e7.js","f552256e37d1559c07d2dc9f0a45394d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/app.1ecfaa5.js","fefcca0567e61647f67f134ec2e1ba62"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/manifest.ed21498.js","1d9f01730a4ab7755bf60df4f615d907"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/vendor.9d06688.js","fcbd9ce8076fa24120f8094173821a2b"]];
var cacheName = 'sw-precache-v2-vue-hn-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







