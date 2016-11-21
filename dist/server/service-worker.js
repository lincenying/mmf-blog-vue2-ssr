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

var precacheConfig = [["E:/web/webpack/mmf-blog-vue2-ssr/dist/favicon.ico","faeebb767fa6b74be3cf94ea8eb4b2dc"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/login.html","7a13985bee500c9209f8a8c0673908b7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/css/app.3444e31.css","e848acf506894047dbb163b8e176e954"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/css/login.3444e31.css","3ca119532f7030008aa8ecebbffc4447"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/css/editormd.css","ad9ba55a37121956b7598c1269f5b470"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/css/editormd.logo.css","bd73e04b4226baee9899cc98780bc182"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/css/editormd.logo.min.css","c951c7e2148b3b2aff4893eaac9fdcef"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/css/editormd.min.css","3cde3be49a4159a885b4276f764129ca"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/css/editormd.preview.css","344873d81a5d712f065dcf9a07a934ee"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/css/editormd.preview.min.css","1f11f1c7faeaaa841b6c0ad8a2912538"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/editormd.amd.js","75ef066edcb6cfa4499e4416e21bd003"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/editormd.amd.min.js","aadfd849166c527f51044ef9696dc9cb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/editormd.js","e60550336d95c39d9bec39fa9a3aff77"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/editormd.min.js","7367379bd0c227a92bb52fae52d0a042"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/FontAwesome.otf","0b462f5cc07779cab3bef252c0271f2b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/editormd-logo.eot","ce4bcd0fb98aea6ce2b921752ac2c6ac"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/editormd-logo.svg","84b6c2a97d555c0f2e330474604da4f1"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/editormd-logo.ttf","3ce5baf8e6d4064ff5fcd4f159ee224a"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/editormd-logo.woff","1599e9e1435acb162840d3d4459b6d68"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/fontawesome-webfont.eot","f7c2b4b747b1a225eb8dee034134a1b0"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/fontawesome-webfont.svg","139e74e298bca37a25d2bd5868552e04"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/fontawesome-webfont.ttf","706450d7bba6374ca02fe167d86685cb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/fontawesome-webfont.woff","d9ee23d59d0e0e727b51368b458a0bff"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/fonts/fontawesome-webfont.woff2","97493d3f11c0a3bd5cbd959f5d19b699"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/loading.gif","c929501e134da2f0d16f34a8ebbde90b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/loading@2x.gif","695405a980720cd34ccf87e2f69ebc28"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/loading@3x.gif","65eacf611a66b2de59a032b05daf962c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-favicon-16x16.ico","9072808279c82cce3dfd699fd0c852bc"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-favicon-24x24.ico","5dfd363c98a38ffd0a4743f3547e968c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-favicon-32x32.ico","4cff7ff80197619fd2ba3a5d610cf796"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-favicon-48x48.ico","12b6bbc96832088110ef726ef6255217"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-favicon-64x64.ico","b6b5255418f559d55949738dc53a432f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-114x114.png","724fb35a85b464bcbaf8c1014b3100d7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-120x120.png","974d44d3f40b662571cd1fb27cdbf267"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-144x144.png","8adbcfe98ab918726bca45bead697749"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-16x16.png","9b45be84df5c687eb1d05f8d643dceac"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-180x180.png","efc9adde9c1c483b22e05d21d68ee0e3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-240x240.png","2238c6784f04682e1059ecbb525cefe4"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-24x24.png","28150dbe51b332d633eb04ca46806c79"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-320x320.png","80b7e43f57377a6333d45265b50f7e32"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-32x32.png","6ee3972adf39e337735033b87337300c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-48x48.png","563f0dcbaee6fe0da02c005988b4b301"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-57x57.png","21b064d135f106b29c1dc3c5378d95fa"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-64x64.png","8d1362e1d0b485c43134ba46bdb73c65"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-72x72.png","9b69c3428eb6e07b78ab8a99c04dad0a"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/editormd-logo-96x96.png","1fa617884ce731b5f5fdb7e42a7964ec"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/images/logos/vi.png","e0054c48238b49166de0945496cc78f5"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/languages/en.js","758374bdff889cbce4c3828b65f5e9bd"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/languages/zh-tw.js","41e4964a40619f668d6ab1f02a22ec92"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/comment/comment.js","7e49495272148d26d682a482bf7562d6"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/comment/continuecomment.js","a709c3880fc37b04b7adec1bda14d100"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/dialog/dialog.css","195a9601897b0a1c12fd9ddb6773b050"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/dialog/dialog.js","e62cb19e382374465e51691ad94b5c1b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/display/fullscreen.css","19a653a913818273dd981a9434d1aa9e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/display/fullscreen.js","d4de0ad3456ad701964025b4a420d77a"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/display/panel.js","e19c4d93f38d6a6d4838aff4e0b62739"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/display/placeholder.js","6aed0fbabc832d8fec035382077ec0cb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/display/rulers.js","2c909238129662f32e8d595d637e73da"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/edit/closebrackets.js","93242dd90b287813fffc6cd70ffcd295"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/edit/closetag.js","83f60f3b7a8ad80722c684a117cf439c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/edit/continuelist.js","1730994c9c9b94b3fe5ee9757ab27ddc"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/edit/matchbrackets.js","615c8b28acb69eda0f62f888167f39e8"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/edit/matchtags.js","835680dd0cd18ef3853913676671ca6f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/edit/trailingspace.js","c2c9ced3ecec79824324c5e02f929091"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/brace-fold.js","acf9b18e4d75f3e5a1f94e761a663891"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/comment-fold.js","132863bd8d6e7d0c81396f10407137d8"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/foldcode.js","384288b380cfd85a5319975e77d7bddf"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/foldgutter.css","a46c1c03cac5efc5dd7ddc381fcdf719"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/foldgutter.js","ced0288848a20339a63ad8d68cb01ab3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/indent-fold.js","d87c988960eb7bcf634a7d2c155370cf"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/markdown-fold.js","8efc5e60ea71235dbb4a5ac1b6e2b9b9"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/fold/xml-fold.js","8b00e4d2e01fef2278c83d05a7681c59"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/anyword-hint.js","264f7f73d9087ec5f2d387b083750735"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/css-hint.js","5ec90a17139ee03f53986d2662619ad7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/html-hint.js","662d76f1b0d760400bd01371c9027828"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/javascript-hint.js","cd757c6ed76ffaff8bc866ebbf4d9452"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/show-hint.css","c1318fca069d71f8c1917a41484c0833"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/show-hint.js","d1d989302f253a0ebbf624ad46cb147d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/sql-hint.js","7b30f4b666beb19a1943832961f5fbee"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/hint/xml-hint.js","f69332a6efbcf938cf35e9db7e764665"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/coffeescript-lint.js","756996f370eed47598ba37010b598562"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/css-lint.js","3ebab71004d3fc6fa067dcfe6d4c8466"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/javascript-lint.js","a2b63501693184f70cf5d2ffaf17ab44"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/json-lint.js","8583df095d09c424fb3b9107d95e9afd"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/lint.css","022520c1271decf20eefc0ad80f5fb87"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/lint.js","5affc92a368ca2e960a9897880c3bc3b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/lint/yaml-lint.js","3458a76331c8119302a3f41294374a3c"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/merge/merge.css","f91eb2ae896d2d26e3fd16990bcc2c08"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/merge/merge.js","f9276facf9fef5f97c7846ea0c3e3820"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/mode/loadmode.js","987f05ef19ebb777f34590720e685bb2"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/mode/multiplex.js","098adca575f9ebca86c90e6518da049e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/mode/multiplex_test.js","f24ad1042239ae4eeabaf6c2f796c4ad"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/mode/overlay.js","c0bf41d0f645c78888a71e556c2e8b7f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/mode/simple.js","ccd743728988a6ac7a546fc810786043"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/runmode/colorize.js","e723a38705e5ed47018453d7b7ef4c94"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/runmode/runmode-standalone.js","787c7bb27c225d74f0fb77c495421892"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/runmode/runmode.js","7b19e7b3f05043e20f1422b9bd753f88"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/runmode/runmode.node.js","3bf6b16e22beb8419f53a6cafe7c7fc7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/scroll/annotatescrollbar.js","42cb6ecda4c0567607990462ec3fa648"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/scroll/scrollpastend.js","dde673955da0a8733bcb38ab8ef903f7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/scroll/simplescrollbars.css","2a172b13a6115bee2b83e90fafe4c719"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/scroll/simplescrollbars.js","21ee402df12483369ce6e2770d4da4e3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/search/match-highlighter.js","2787b3258dc39ded1d2b07a4503f8798"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/search/matchesonscrollbar.css","97f889039f323afc73370283f17282d1"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/search/matchesonscrollbar.js","46000adeb39265d453e9e23c7cfa9678"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/search/search.js","406984ec9771188bfb93bae30768f304"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/search/searchcursor.js","aed99751d583abdbc0aa25326366b205"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/selection/active-line.js","d2ec66876b2ff25d976c27f022efde50"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/selection/mark-selection.js","19e3935f154bdc5160af5e9c1871a282"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/selection/selection-pointer.js","75fb87bb3cc425eaee38a4cf61e26c44"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/tern/tern.css","28ca5e4ca29d0e48c20bf254d1abe62d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/tern/tern.js","baf97cc774fa6a58bc85a220b2b32d29"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/tern/worker.js","5905c2ea18f33366e46a41ebc98f8424"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addon/wrap/hardwrap.js","15b29029f873fb77dff587d0dcac6248"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/addons.min.js","82f8e43a1336b94b1edd9cd1668f1fdf"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/codemirror.min.css","9fd7fd4e8c2c2c216a1811a24fb3040d"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/codemirror.min.js","e4e42d9988ddc1c76e7eb90482d0fff3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/lib/codemirror.css","0e9b0a28f4d547463f7d325f7799e886"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/lib/codemirror.js","a4cd802a8497038494fabf71e1b6ece0"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/modes.min.js","bfedc5646009ac060ad73a92f06f70b8"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/3024-day.css","6839e8615825031a79bfb9635de25186"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/3024-night.css","674c74419e5249f42ca43cc41d52aa76"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/ambiance-mobile.css","a96afed4fb30aaa2827be1e687a806bb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/ambiance.css","62f980eaa39719617986ec7375737c72"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/base16-dark.css","127df077008da040fa9f32de2aa71d3e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/base16-light.css","a9d0d00214d3e21fa46338515907bc3e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/blackboard.css","8d04465f675ae439a22cecd129e0f8cd"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/cobalt.css","19071e250fa1cc59503127c14872fbf0"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/colorforth.css","f5f02cfec8cbf9426019feadee46ebb2"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/eclipse.css","073ceab5a65ab4bd36b0b3ed7306d329"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/elegant.css","4d3e7f92044f912b092b9b98b63e6aa9"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/erlang-dark.css","2b7314b83b2b78c40d56fcae5b8a4bce"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/lesser-dark.css","942e016d2aab597090002a6b9e3a838b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/mbo.css","a9c544389b9f34b19e83847ef217e6fb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/mdn-like.css","beee558c39b22b3e5ad7dcdc05cb39bd"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/midnight.css","b3661a277e48b30b5bcf69a3171dfb55"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/monokai.css","0375a1acb2fa6cb095d4349c7ec2abaf"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/neat.css","a1c620c3d3e893ee30bf74956198a5a7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/neo.css","269f9928d9269f3f3c9a23e1f341b8a5"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/night.css","34ca569fb45a59dc0b5e2ea4181688c9"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/paraiso-dark.css","df582f17c1889f496e2bf77c2e7e4b04"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/paraiso-light.css","c2fab10ed34dc577d2db76e704e282c3"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/pastel-on-dark.css","689ac6c246223fde1352a03bbd465b7b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/rubyblue.css","32fb84f00ebf7af10d09623d07d71265"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/solarized.css","ce0aa17a9d1b28c4738f38e6186e4872"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/the-matrix.css","db71d53a89dbf6c7f849e240b2c0262f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/tomorrow-night-bright.css","3a789cad8e03945b27ae262baaf4bf57"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/tomorrow-night-eighties.css","6f6cb03129eff9fcc555116c9c9cf8c8"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/twilight.css","cc25744aab57f3162ef7aff71265ad88"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/vibrant-ink.css","bb18365c8230f4d8e2a7d5f08b1398fb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/xq-dark.css","87fdd20843c8e2b4c5ca48eb385cd7a7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/xq-light.css","86232efb2444771c0f04defa5dd40e83"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/codemirror/theme/zenburn.css","697bd59e88d8b5a823771aab56928e2f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/flowchart.min.js","54e79b36ff5be2b5442e2adc29f212cc"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/jquery.flowchart.min.js","850185a9704c92714048a9bdb5a5e236"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/marked.min.js","1d27977870109a8b442da5780f7ba626"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/prettify.min.js","92cdf2d28ac4386a0a1060f16f26fb0f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/raphael.min.js","135022e7c2d199f8c011029151182b94"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/sequence-diagram.min.js","2804812f5e89ccfb604892564206ff9a"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/lib/underscore.min.js","5ffd8c6721af61ddccb510fa8835511b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/code-block-dialog/code-block-dialog.js","8add18bca1063680d293f5b6b278c4ee"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/emoji-dialog/emoji-dialog.js","aa63a5a712a7b2045f4e773c357367d7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/emoji-dialog/emoji.json","96083f6cf9490758705bb6e6a5358153"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/goto-line-dialog/goto-line-dialog.js","b8977fb735985e988b27fe17b021d142"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/help-dialog/help-dialog.js","0d74f019cbc3f01be091035d70d011ba"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/help-dialog/help.md","050a42aa5214c32a7155419d7fba013e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/html-entities-dialog/html-entities-dialog.js","71b536b7c2e8f14af3cdc0971530efcb"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/html-entities-dialog/html-entities.json","f9c0009d7c59a6b3a96b508b90948704"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/image-dialog/image-dialog.js","3572d0ec675a6b0a7bd1b7fdccbca905"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/link-dialog/link-dialog.js","3438909280d1328e8f5bc6d56f68034e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/plugin-template.js","60ed2385532b061e96b61c005f00860b"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/preformatted-text-dialog/preformatted-text-dialog.js","a1bfb2f5431c1b8ce1e7a2c09f70f9b7"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/reference-link-dialog/reference-link-dialog.js","51408e3cb9406aab8c04f978be6b3d9e"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/table-dialog/table-dialog.js","a0da921da38772df53887fc607954ade"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/plugins/test-plugin/test-plugin.js","5130ac2216dad46434042f3815637d10"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/editor.md/src/editormd.js","5a30cb36c86cac1f1d768ebcfb5fa336"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/arrow.0680bb3.jpg","0680bb38ded5744e52a08308723501af"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/icon.a2b690e.png","a2b690e932d0725bed7679c45c4ad749"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/logo.6c2ca3b.png","6c2ca3b318ea4a89e653316dbc3fcc10"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/w-icon-1.6d3ab87.png","6d3ab87282246fce0c066e0a89d76e3f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/w-icon-2.32ff2eb.png","32ff2eb1481c4566c09e2be1f91f725f"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/w-icon-3.3619c82.png","3619c82eb6bfabf021a090a4e2da152a"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/img/w-icon.570a6a1.png","570a6a19ac0f62e3ee098f66868b4d66"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/app.2e9b2c5.js","1b01890b99b603251f2fba489cc52158"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/login.1cabc69.js","914e4a191727b769ddd9b136149e93aa"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/manifest.91e090c.js","b66108a9547a209f9c28f20f8ee4edbf"],["E:/web/webpack/mmf-blog-vue2-ssr/dist/static/js/vendor.89f720e.js","aa0fae5d35df9796a080cc5ffbf1c458"]];
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







