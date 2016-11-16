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

var precacheConfig = [["/favicon.ico","faeebb767fa6b74be3cf94ea8eb4b2dc"],["/login.html","c23f2281518e03c403c63d8d3aacd7ae"],["/static/css/app.bbd7c1b.css","846e655574db56f151a6bb02516998cf"],["/static/css/login.bbd7c1b.css","33992ff71ad29383b31ebf5fc3e86d30"],["/static/editor.md/css/editormd.css","8a23780f7a4b0f184e727f22fe3e63d1"],["/static/editor.md/css/editormd.logo.css","b37ff05af81ad2dabd61736ef27af87e"],["/static/editor.md/css/editormd.logo.min.css","6f89213810ed17dfc838245515bdb8cd"],["/static/editor.md/css/editormd.min.css","b93895ab029a7ed7dae7555500c5f55e"],["/static/editor.md/css/editormd.preview.css","852819172543456fccd33e9ce8ed2fb6"],["/static/editor.md/css/editormd.preview.min.css","a99050da064bddc9605919f26dc5388d"],["/static/editor.md/editormd.amd.js","f321e4f3442a8035b69dddd8cf6bc942"],["/static/editor.md/editormd.amd.min.js","e2a378b08a5424f61f4e395dfb3ac237"],["/static/editor.md/editormd.js","c8a4571414b6217516414e967a5c16f1"],["/static/editor.md/editormd.min.js","5e03eea918b37986af0e2414e0596a8f"],["/static/editor.md/fonts/FontAwesome.otf","0b462f5cc07779cab3bef252c0271f2b"],["/static/editor.md/fonts/editormd-logo.eot","ce4bcd0fb98aea6ce2b921752ac2c6ac"],["/static/editor.md/fonts/editormd-logo.svg","53ea80e2163822c872dd3d63d283eee6"],["/static/editor.md/fonts/editormd-logo.ttf","3ce5baf8e6d4064ff5fcd4f159ee224a"],["/static/editor.md/fonts/editormd-logo.woff","1599e9e1435acb162840d3d4459b6d68"],["/static/editor.md/fonts/fontawesome-webfont.eot","f7c2b4b747b1a225eb8dee034134a1b0"],["/static/editor.md/fonts/fontawesome-webfont.svg","2980083682e94d33a66eef2e7d612519"],["/static/editor.md/fonts/fontawesome-webfont.ttf","706450d7bba6374ca02fe167d86685cb"],["/static/editor.md/fonts/fontawesome-webfont.woff","d9ee23d59d0e0e727b51368b458a0bff"],["/static/editor.md/fonts/fontawesome-webfont.woff2","97493d3f11c0a3bd5cbd959f5d19b699"],["/static/editor.md/images/loading.gif","c929501e134da2f0d16f34a8ebbde90b"],["/static/editor.md/images/loading@2x.gif","695405a980720cd34ccf87e2f69ebc28"],["/static/editor.md/images/loading@3x.gif","65eacf611a66b2de59a032b05daf962c"],["/static/editor.md/images/logos/editormd-favicon-16x16.ico","9072808279c82cce3dfd699fd0c852bc"],["/static/editor.md/images/logos/editormd-favicon-24x24.ico","5dfd363c98a38ffd0a4743f3547e968c"],["/static/editor.md/images/logos/editormd-favicon-32x32.ico","4cff7ff80197619fd2ba3a5d610cf796"],["/static/editor.md/images/logos/editormd-favicon-48x48.ico","12b6bbc96832088110ef726ef6255217"],["/static/editor.md/images/logos/editormd-favicon-64x64.ico","b6b5255418f559d55949738dc53a432f"],["/static/editor.md/images/logos/editormd-logo-114x114.png","724fb35a85b464bcbaf8c1014b3100d7"],["/static/editor.md/images/logos/editormd-logo-120x120.png","974d44d3f40b662571cd1fb27cdbf267"],["/static/editor.md/images/logos/editormd-logo-144x144.png","8adbcfe98ab918726bca45bead697749"],["/static/editor.md/images/logos/editormd-logo-16x16.png","9b45be84df5c687eb1d05f8d643dceac"],["/static/editor.md/images/logos/editormd-logo-180x180.png","efc9adde9c1c483b22e05d21d68ee0e3"],["/static/editor.md/images/logos/editormd-logo-240x240.png","2238c6784f04682e1059ecbb525cefe4"],["/static/editor.md/images/logos/editormd-logo-24x24.png","28150dbe51b332d633eb04ca46806c79"],["/static/editor.md/images/logos/editormd-logo-320x320.png","80b7e43f57377a6333d45265b50f7e32"],["/static/editor.md/images/logos/editormd-logo-32x32.png","6ee3972adf39e337735033b87337300c"],["/static/editor.md/images/logos/editormd-logo-48x48.png","563f0dcbaee6fe0da02c005988b4b301"],["/static/editor.md/images/logos/editormd-logo-57x57.png","21b064d135f106b29c1dc3c5378d95fa"],["/static/editor.md/images/logos/editormd-logo-64x64.png","8d1362e1d0b485c43134ba46bdb73c65"],["/static/editor.md/images/logos/editormd-logo-72x72.png","9b69c3428eb6e07b78ab8a99c04dad0a"],["/static/editor.md/images/logos/editormd-logo-96x96.png","1fa617884ce731b5f5fdb7e42a7964ec"],["/static/editor.md/images/logos/vi.png","e0054c48238b49166de0945496cc78f5"],["/static/editor.md/languages/en.js","992df13244c234129eef2830567bfce3"],["/static/editor.md/languages/zh-tw.js","c4b1d7a2419be9d7ae7dd7a52f74d9ff"],["/static/editor.md/lib/codemirror/addon/comment/comment.js","e1233ff2b2428c5078ecfafbea23b7a0"],["/static/editor.md/lib/codemirror/addon/comment/continuecomment.js","2bad52d5a0b57d8f43e0e5b90bb25725"],["/static/editor.md/lib/codemirror/addon/dialog/dialog.css","910c1893a275073be1f80f32b77cd5a4"],["/static/editor.md/lib/codemirror/addon/dialog/dialog.js","5e20ba47d5cad32bd1fc902f95b16193"],["/static/editor.md/lib/codemirror/addon/display/fullscreen.css","1a278e72b51528270f8ce9ec991929a1"],["/static/editor.md/lib/codemirror/addon/display/fullscreen.js","fb86184c4fb36398188f2199fd28f167"],["/static/editor.md/lib/codemirror/addon/display/panel.js","e2b9405b9f9de54ccc4e6ebb243ee38f"],["/static/editor.md/lib/codemirror/addon/display/placeholder.js","a406cc1590d2683a0114de4784f5421d"],["/static/editor.md/lib/codemirror/addon/display/rulers.js","cd03669d62d1ea32c1d862d947b8b30c"],["/static/editor.md/lib/codemirror/addon/edit/closebrackets.js","1e89a2fc697ce780f1f43516f884c278"],["/static/editor.md/lib/codemirror/addon/edit/closetag.js","34bce5a9d67d751ab0e4a0309f6a8b73"],["/static/editor.md/lib/codemirror/addon/edit/continuelist.js","353e8a411baea91c24edee06128b9698"],["/static/editor.md/lib/codemirror/addon/edit/matchbrackets.js","94c58e98823144e56932aa2611c51dff"],["/static/editor.md/lib/codemirror/addon/edit/matchtags.js","545127ffedea5d77c0f68c809c75c5b6"],["/static/editor.md/lib/codemirror/addon/edit/trailingspace.js","650f095b187881451b0166d16ffd4091"],["/static/editor.md/lib/codemirror/addon/fold/brace-fold.js","13f986f14247d953551bdfe93b27699e"],["/static/editor.md/lib/codemirror/addon/fold/comment-fold.js","5e5bdebcd4acb30c3aed47164e2af6b3"],["/static/editor.md/lib/codemirror/addon/fold/foldcode.js","76c21fd4c3f14d1a61765324ec82266b"],["/static/editor.md/lib/codemirror/addon/fold/foldgutter.css","38bb68770b6f7ebaa7adea770a68e0b1"],["/static/editor.md/lib/codemirror/addon/fold/foldgutter.js","70f89ec8fd4f96285fed2098e1660f0c"],["/static/editor.md/lib/codemirror/addon/fold/indent-fold.js","b17f35bdd388f737113271b9e9070ea3"],["/static/editor.md/lib/codemirror/addon/fold/markdown-fold.js","c8783b56c820030045a57f291660ea20"],["/static/editor.md/lib/codemirror/addon/fold/xml-fold.js","f173dec3ccb5d6df5f37b9a99ecc438a"],["/static/editor.md/lib/codemirror/addon/hint/anyword-hint.js","00b7028e5978a14b543f99e04739fd10"],["/static/editor.md/lib/codemirror/addon/hint/css-hint.js","e62b03d88462a74f5a85580393653e2b"],["/static/editor.md/lib/codemirror/addon/hint/html-hint.js","6b398a6ef3473b9f889092495fcc1545"],["/static/editor.md/lib/codemirror/addon/hint/javascript-hint.js","8febf4d6664e133fac9da1da672564cd"],["/static/editor.md/lib/codemirror/addon/hint/show-hint.css","630e320a614e7732f6ce1bf37147f27f"],["/static/editor.md/lib/codemirror/addon/hint/show-hint.js","b2bd569d811254591c42c8f9d4a210e5"],["/static/editor.md/lib/codemirror/addon/hint/sql-hint.js","a5b089ff87a9d3f9f8758aa832a99f9e"],["/static/editor.md/lib/codemirror/addon/hint/xml-hint.js","21d019d58516804262957d8879576908"],["/static/editor.md/lib/codemirror/addon/lint/coffeescript-lint.js","a867c61ab04b4309206ba371bdde9fb7"],["/static/editor.md/lib/codemirror/addon/lint/css-lint.js","fd09f81d97cf3eb681cc5742d76ec47f"],["/static/editor.md/lib/codemirror/addon/lint/javascript-lint.js","434609db212319c5cdfa6844d88c30f8"],["/static/editor.md/lib/codemirror/addon/lint/json-lint.js","49afe4d1a791c115de21553c28f1a6cf"],["/static/editor.md/lib/codemirror/addon/lint/lint.css","5f5d243947ec3ae1b8f37d85f0fa2a2d"],["/static/editor.md/lib/codemirror/addon/lint/lint.js","fb480be60a940a1c54bc22be4a53df13"],["/static/editor.md/lib/codemirror/addon/lint/yaml-lint.js","117815f724aa2c3d671801ccedaa86ac"],["/static/editor.md/lib/codemirror/addon/merge/merge.css","842786722589d900ffaf32652e89dac9"],["/static/editor.md/lib/codemirror/addon/merge/merge.js","5ceff36e1dbe2497a2aad575c8fd3f7f"],["/static/editor.md/lib/codemirror/addon/mode/loadmode.js","bc3c29fecceff0785b086b6e1c6f6b7c"],["/static/editor.md/lib/codemirror/addon/mode/multiplex.js","b5c73e94185050bef0170420d0f53fd7"],["/static/editor.md/lib/codemirror/addon/mode/multiplex_test.js","6e9c20d5c89c34f9245e1e346edc027b"],["/static/editor.md/lib/codemirror/addon/mode/overlay.js","7abff7c501c40008fc541414e803d954"],["/static/editor.md/lib/codemirror/addon/mode/simple.js","b3f550bd7554a29d6929e20aba3456ac"],["/static/editor.md/lib/codemirror/addon/runmode/colorize.js","b0d93d54ee9bf76b246ea7cae39d6e75"],["/static/editor.md/lib/codemirror/addon/runmode/runmode-standalone.js","54b1bc5448bbdfb53fdb3cbdc6740ef7"],["/static/editor.md/lib/codemirror/addon/runmode/runmode.js","3266201540178df80d191c73bbd88152"],["/static/editor.md/lib/codemirror/addon/runmode/runmode.node.js","dcc7299595da64717ea04e48366a8777"],["/static/editor.md/lib/codemirror/addon/scroll/annotatescrollbar.js","02ecc6ff32d70e2de7a93b936709d508"],["/static/editor.md/lib/codemirror/addon/scroll/scrollpastend.js","68e06dd3d77a87661790bbb7ebe2f080"],["/static/editor.md/lib/codemirror/addon/scroll/simplescrollbars.css","0352ba51fd6a422fe6cc44925e33ad88"],["/static/editor.md/lib/codemirror/addon/scroll/simplescrollbars.js","aea96df34053a015d0cee582c9853dfb"],["/static/editor.md/lib/codemirror/addon/search/match-highlighter.js","b59268b1e4b6872df69110776d7f7934"],["/static/editor.md/lib/codemirror/addon/search/matchesonscrollbar.css","00ea2770c568a848190bcf52e4241276"],["/static/editor.md/lib/codemirror/addon/search/matchesonscrollbar.js","5f8fd58c2d232399a9e2918bd670e9bb"],["/static/editor.md/lib/codemirror/addon/search/search.js","4db460ce020efb966a33c275ca90ccf2"],["/static/editor.md/lib/codemirror/addon/search/searchcursor.js","fc5574a779ef286d12d8d97f33ec48b6"],["/static/editor.md/lib/codemirror/addon/selection/active-line.js","c7c0cb21951ca1ba74837a74bbcd4b47"],["/static/editor.md/lib/codemirror/addon/selection/mark-selection.js","49df440e41a6f54264bce4f7ed7d7d05"],["/static/editor.md/lib/codemirror/addon/selection/selection-pointer.js","394ed7c792ed1954c6473d72e17156f9"],["/static/editor.md/lib/codemirror/addon/tern/tern.css","8f36b875b840601834dfed2b69de0078"],["/static/editor.md/lib/codemirror/addon/tern/tern.js","da321976dccb6d42a8ca9569fce6c18f"],["/static/editor.md/lib/codemirror/addon/tern/worker.js","6f48d3844db9cac6b959584d65e53afd"],["/static/editor.md/lib/codemirror/addon/wrap/hardwrap.js","0c70cedbc3ecc9474b11a24e23fe7b16"],["/static/editor.md/lib/codemirror/addons.min.js","dd1092f4e1dc24f20f2db3830414a415"],["/static/editor.md/lib/codemirror/codemirror.min.css","1654b526ea4864abe4c78a2739664c17"],["/static/editor.md/lib/codemirror/codemirror.min.js","52f2e1b6fd11dc3a0e70fc92197494aa"],["/static/editor.md/lib/codemirror/lib/codemirror.css","b936cfec11de3bf379d42db2ecfd11f1"],["/static/editor.md/lib/codemirror/lib/codemirror.js","db811826339d980ab172e6a01e8b0811"],["/static/editor.md/lib/codemirror/modes.min.js","4da5d294bf129499718f82fff67b01ee"],["/static/editor.md/lib/codemirror/theme/3024-day.css","dd62567889e5e73b566688b4df162499"],["/static/editor.md/lib/codemirror/theme/3024-night.css","bce81635b70bee2cd748e5b591cfa152"],["/static/editor.md/lib/codemirror/theme/ambiance-mobile.css","256f2dd130b80c6afaa40fddf700d12a"],["/static/editor.md/lib/codemirror/theme/ambiance.css","18dc399db6086ba4df6f1733bbea3043"],["/static/editor.md/lib/codemirror/theme/base16-dark.css","d5b39601d42c60adaf4a74668fd163ad"],["/static/editor.md/lib/codemirror/theme/base16-light.css","eff34d7fb06a73518e7342187e169af2"],["/static/editor.md/lib/codemirror/theme/blackboard.css","b413f7847a56cafec20b8ca5ce73ef52"],["/static/editor.md/lib/codemirror/theme/cobalt.css","3dfff29b158f3574d80edffdf46e0cc1"],["/static/editor.md/lib/codemirror/theme/colorforth.css","1c2ac3b8535beb8c8d72daefcf1f2e82"],["/static/editor.md/lib/codemirror/theme/eclipse.css","7c2f7b4b44b33fc9a5f857f542d007ac"],["/static/editor.md/lib/codemirror/theme/elegant.css","c98914a034be0b11803bd3c24fba25dd"],["/static/editor.md/lib/codemirror/theme/erlang-dark.css","b8ece4ed0e1c8b4f3f0d933ae525a85b"],["/static/editor.md/lib/codemirror/theme/lesser-dark.css","24b1bf4ba14a5177acb4e0f9c6c74f12"],["/static/editor.md/lib/codemirror/theme/mbo.css","d9c71a8d09d0cf6c8a47b1b2204e99e0"],["/static/editor.md/lib/codemirror/theme/mdn-like.css","d38455fb05da729a3e01545dd66d707a"],["/static/editor.md/lib/codemirror/theme/midnight.css","aa15eaaff4751c9e6bf8d6880f4dd7b1"],["/static/editor.md/lib/codemirror/theme/monokai.css","a3e90764a860b595edc795738dfea878"],["/static/editor.md/lib/codemirror/theme/neat.css","673552ecebac76569063801293e9c76c"],["/static/editor.md/lib/codemirror/theme/neo.css","f65035d751bacec07f189e3477f50bda"],["/static/editor.md/lib/codemirror/theme/night.css","2f0028424982d3270e1d48b8cfa3a20a"],["/static/editor.md/lib/codemirror/theme/paraiso-dark.css","e8cbc42a649596b0eec457a27355300e"],["/static/editor.md/lib/codemirror/theme/paraiso-light.css","4d551ec8585009c1c5cd63d5f8fea52a"],["/static/editor.md/lib/codemirror/theme/pastel-on-dark.css","98eef01e4c5088d1758f7d190f793ca2"],["/static/editor.md/lib/codemirror/theme/rubyblue.css","3563ae9c5f1f53f51285da9ec38a92ce"],["/static/editor.md/lib/codemirror/theme/solarized.css","fad5e4e920626b7bc9a0c33eace74f11"],["/static/editor.md/lib/codemirror/theme/the-matrix.css","a30b748c8df155d0b81649f1091d1981"],["/static/editor.md/lib/codemirror/theme/tomorrow-night-bright.css","15536604543d76ec2e0d30f593363062"],["/static/editor.md/lib/codemirror/theme/tomorrow-night-eighties.css","020fa4c18605a7219261806c73d2fa8e"],["/static/editor.md/lib/codemirror/theme/twilight.css","36918d6d526b116b16abaf3f92a814c3"],["/static/editor.md/lib/codemirror/theme/vibrant-ink.css","9e787d565394983b0991ae14f8ce54c9"],["/static/editor.md/lib/codemirror/theme/xq-dark.css","e30bef71c2665818f85ff1aeaa53447a"],["/static/editor.md/lib/codemirror/theme/xq-light.css","481023ea9d2e1d4c1707a1867c500326"],["/static/editor.md/lib/codemirror/theme/zenburn.css","8211c2d07e48ca8553f77756a8c35bfd"],["/static/editor.md/lib/flowchart.min.js","db8505be6fd441e36e111d842b266823"],["/static/editor.md/lib/jquery.flowchart.min.js","76018ba1ce3f0c2b4373be29cd43672b"],["/static/editor.md/lib/marked.min.js","a2422d0c0eff7a9e89cad4c33d9f26b6"],["/static/editor.md/lib/prettify.min.js","a6358bcc55c46229d1f7802e3f7aef77"],["/static/editor.md/lib/raphael.min.js","f299b262ff6776219cd90d2cb77401d7"],["/static/editor.md/lib/sequence-diagram.min.js","7105a1a907ac043a9f2ea4317a164bcb"],["/static/editor.md/lib/underscore.min.js","da2e0be761b0fe5ecaf932a405274e5c"],["/static/editor.md/plugins/code-block-dialog/code-block-dialog.js","4d67d4019c2a316739b330b6932e100c"],["/static/editor.md/plugins/emoji-dialog/emoji-dialog.js","8149407af1cfcbf752f97106c826548f"],["/static/editor.md/plugins/emoji-dialog/emoji.json","2103095cfedd8bc378525d57dcd1b4a0"],["/static/editor.md/plugins/goto-line-dialog/goto-line-dialog.js","4741aea8fdcf395564014ac0ad3b399a"],["/static/editor.md/plugins/help-dialog/help-dialog.js","ef37120ff982cdac4fd7dd8559cfa081"],["/static/editor.md/plugins/help-dialog/help.md","96e641d7fb461a69324d5d716bc16dea"],["/static/editor.md/plugins/html-entities-dialog/html-entities-dialog.js","de1b5c4c4cca951319e9e724fd4b3f75"],["/static/editor.md/plugins/html-entities-dialog/html-entities.json","ea628465d95cf5440b9ba05036e9bacb"],["/static/editor.md/plugins/image-dialog/image-dialog.js","e3007cabae8b997e4c8485bc58d1ba43"],["/static/editor.md/plugins/link-dialog/link-dialog.js","cc7ff22aa93cee1b6f84b189b9b9cb5c"],["/static/editor.md/plugins/plugin-template.js","da86c6791646c63c5c9ac07c80fd0629"],["/static/editor.md/plugins/preformatted-text-dialog/preformatted-text-dialog.js","e65ff7445597caa0720492026104ed43"],["/static/editor.md/plugins/reference-link-dialog/reference-link-dialog.js","c0baed9737c6dc75335500d733ffc5e8"],["/static/editor.md/plugins/table-dialog/table-dialog.js","7aef14649676cf04b342df475a46385d"],["/static/editor.md/plugins/test-plugin/test-plugin.js","23e873ed8b07bf17e47dcfcf6a63b9a4"],["/static/editor.md/src/editormd.js","1d30cbbd7b6c2d0b67c7a576bf23da57"],["/static/img/arrow.0680bb3.jpg","0680bb38ded5744e52a08308723501af"],["/static/img/icon.a2b690e.png","a2b690e932d0725bed7679c45c4ad749"],["/static/img/logo.6c2ca3b.png","6c2ca3b318ea4a89e653316dbc3fcc10"],["/static/img/w-icon-1.6d3ab87.png","6d3ab87282246fce0c066e0a89d76e3f"],["/static/img/w-icon-2.32ff2eb.png","32ff2eb1481c4566c09e2be1f91f725f"],["/static/img/w-icon-3.3619c82.png","3619c82eb6bfabf021a090a4e2da152a"],["/static/img/w-icon.570a6a1.png","570a6a19ac0f62e3ee098f66868b4d66"],["/static/js/app.341ee56.js","52e5674b3175b84d7070356fd81faf4b"],["/static/js/login.e84e75f.js","c36b281732cecf83e1011617cfed8a72"],["/static/js/manifest.fdab190.js","21210c4d404952f12465a05a58e4dfd1"],["/static/js/vendor.b67f9fc.js","97cb9b697176163b0f0c52c3af57d50a"]];
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







