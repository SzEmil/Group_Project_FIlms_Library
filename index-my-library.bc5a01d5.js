!function(){function t(t,e,r,n){Object.defineProperty(t,e,{get:r,set:n,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=r.parcelRequired7c6;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in o){var e=o[t];delete o[t];var r={id:t,exports:{}};return n[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){o[t]=e},r.parcelRequired7c6=i),i.register("8nrFW",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){return r.default(t)||n.default(t)||a.default(t)||o.default()};var r=c(i("kMC0W")),n=c(i("7AJDX")),o=c(i("8CtQK")),a=c(i("auk6i"));function c(t){return t&&t.__esModule?t:{default:t}}})),i.register("kMC0W",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if(Array.isArray(t))return n.default(t)};var r,n=(r=i("8NIkP"))&&r.__esModule?r:{default:r}})),i.register("8NIkP",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}})),i.register("7AJDX",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}})),i.register("8CtQK",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),i.register("auk6i",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){if(!t)return;if("string"==typeof t)return n.default(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n.default(t,e)};var r,n=(r=i("8NIkP"))&&r.__esModule?r:{default:r}})),i.register("g4hZ6",(function(e,r){t(e.exports,"populateSection",(function(){return v}));var n=i("8qMKg"),o=i("je9aX"),a="active",c="hidden",s="filmoteka-watched",l="filmoteka-queue",u="filmoteka-watched",f="filmoteka-queue",d=document.querySelectorAll(".my-library-space__btn"),p=document.getElementById(s),h=document.querySelector(".grid_my_library__elements");function m(t){d.forEach((function(t){return t.classList.remove(a)})),t.classList.add(a)}function v(t){h.classList.add(c);var e=setTimeout((function(){var r;h.innerHTML=null;var i,a=null!==(r=null==t?void 0:t.getAttribute("id"))&&void 0!==r?r:s,d=JSON.parse(function(t){var e;switch(t){case s:e=y(u);break;case l:e=y(f);break;default:throw new Error("Not implemented sectionName: "+t)}return e}(a));(null==d?void 0:d.length)>0?d.forEach((function(t){return function(t){var e=t.title,r=t.categories,i=t.year,a=t.score,c=t.imageSrc,s=t.id,l=document.createElement("div"),u=r?"<span class='grid_my_library__element-category'>".concat(r,"</span>"):"",f=r?"<span class='grid_my_library__element-year'>".concat(i,"</span>"):"",d=r?"<span class='grid_my_library__element-score'>".concat(a,"</span>"):"",p='<div class="grid_my_library__label">\n  <p class="grid_my_library__label-text">Click for more detalis</p>\n</div>\n        <img src=\''.concat(c,"'\n             class='grid_my_library__element-img'\n             alt='").concat(e,"' />\n        <div class=\"grid_my_library__signature\">\n        <span class='grid_my_library__element-title'>").concat(e,"</span><br/>\n        ").concat(u,"\n        ").concat(f,"\n        ").concat(d,"</div>\n  ");l.setAttribute("title",e),l.classList.add("grid_my_library__element"),l.innerHTML=p,l.addEventListener("click",(function(t){return function(t){(0,o.fetchDetails)(t).then((function(t){(0,n.renderModal)(t)})).catch((function(t){console.error(t)}))}(s)})),h.appendChild(l)}(t)})):(i="\n  <div class='grid_my_library__element-empty'>\n      <p class='grid_my_library__element-empty-txt'>\n        The Movie Dog<br/>\n        <strong>is waiting for you</strong><br/>\n        to add some movies<br/>\n        to the list\n      </p>\n        <div class='grid_my_library__element-empty-img'></div>\n    </div>\n  ",h.innerHTML=i),h.classList.remove(c),clearTimeout(e)}),300)}function y(t){return localStorage.getItem(t)}d.length>0&&(m(p),null==d||d.forEach((function(t){return t.addEventListener("click",(function(t){t.target.classList.contains("active")||(m(t.target),v(t.target))}))})),v())})),i.register("8qMKg",(function(r,n){t(r.exports,"renderModal",(function(){return u}));var o=i("8nrFW"),a=i("g4hZ6"),c=document.querySelector(".more-info-modal"),s=document.querySelector("[data-modal-video]"),l=document.querySelector("body"),u=function(t){s.classList.remove("is-hidden");var r,n,i=t.genres.map((function(t){return t.name})).join(", "),u='<button class="more-info-modal__close-btn">\n    X\n  </button>\n  <div class="container-modal">\n    <img class="more-info-modal__poster" src="https://image.tmdb.org/t/p/w300'.concat(t.poster_path,'"  />\n    <div class="more-info-modal__description">\n      <h1 class="more-info-modal__title">').concat(t.title,"</h1>\n      <div class=\"more-info-modal__details\">\n      <ul>\n      <li class='more-info-modal__details--header'>Vote/Votes</li>\n      <li class='more-info-modal__details--header'>Popularity</li>\n      <li class='more-info-modal__details--header'>Original Title</li>\n      <li class='more-info-modal__details--header'>Genre</li>\n      </ul>\n\n      <ul>\n      <li class='more-info-modal__details--text'>\n      <span class='more-info-modal__details--average'>").concat(t.vote_average,"</span>\n      /\n      <span class='more-info-modal__details--count'>").concat(t.vote_count,'</span>\n      </li>\n\n      <li class="more-info-modal__details--text">').concat(t.popularity,'</li>\n      <li class="more-info-modal__details--text">').concat(t.original_title,'</li>\n      <li class="more-info-modal__details--text">').concat(i,"</li>\n      </ul>\n      </div>\n\n      <h3 class='more-info-modal__subtitle'>ABOUT</h3>\n      <p class='more-info-modal__text'>\n        ").concat(t.overview,'\n      </p>\n      <div class="more-info-modal__btn-box">\n      <button id=\'').concat(f,"' class='more-info-modal__btn'>\n      </button>\n      <button id='").concat(d,"' class='more-info-modal__btn'>\n      </button>\n    </div>\n\n    </div>\n  </div>");c.innerHTML=u,l.classList.add("no-scroll"),h(t.id),r=t,null==(n=document.querySelectorAll(".more-info-modal__btn"))||n.forEach((function(t){return t.addEventListener("click",(function(n){var i,c,s,l,u=n.target.getAttribute("id");m(u,r.id)?(i=u,c=r.id,s=localStorage.getItem(i),l=JSON.parse(s).slice().filter((function(t){return t.id!==c})),localStorage.setItem(i,JSON.stringify(e(o)(l))),h(c)):function(t,r){var n,i="https://image.tmdb.org/t/p/w300",a={title:r.title,categories:(null===(n=r.genres)||void 0===n?void 0:n.length)>0?r.genres.map((function(t){return t.name})).join(", "):null,year:r.release_date?r.release_date.slice(0,4):null,score:r.vote_average?r.vote_average.toFixed(1):null,imageSrc:r.poster_path?"".concat(i).concat(r.poster_path):null,id:r.id},c=localStorage.getItem(t);c||localStorage.setItem(t,JSON.stringify([a]));var s=JSON.parse(c);localStorage.setItem(t,JSON.stringify(e(o)(s).concat([a]))),h(r.id)}(u,r);var f=document.querySelectorAll(".my-library-space__btn");if(f.length>0){var d="active";u===Array.from(f).find((function(t){return t.classList.contains(d)})).getAttribute("id")&&(0,a.populateSection)(t)}}))})),s.classList.remove("is-hidden")};s.addEventListener("click",(function(t){t.target.closest(".more-info-modal__btn-box")||(s.classList.add("is-hidden"),l.classList.remove("no-scroll"))})),document.addEventListener("keydown",(function(t){"Escape"===t.key&&(s.classList.add("is-hidden"),s.classList.remove("backdrop"))}));var f="filmoteka-watched",d="filmoteka-queue",p="in-storage";function h(t){document.querySelectorAll(".more-info-modal__btn").forEach((function(e){var r=e.getAttribute("id"),n=m(r,t);n?e.classList.add(p):e.classList.remove(p),e.innerHTML=function(t,e){return t?e===f?"REMOVE FROM WATCHED":"REMOVE FROM QUEUE":e===f?"ADD TO WATCHED":"ADD TO QUEUE"}(n,r)}))}function m(t,e){return!!localStorage.getItem(t)&&JSON.parse(localStorage.getItem(t)).some((function(t){return t.id===e}))}})),i.register("je9aX",(function(r,n){t(r.exports,"fetchVideo",(function(){return s})),t(r.exports,"fetchVideoPopular",(function(){return l})),t(r.exports,"fetchDetails",(function(){return u})),t(r.exports,"fetchGenres",(function(){return f}));var o,a=i("bpxeT"),c=i("2TvXO"),s=(o=e(a)(e(c).mark((function t(r,n){var o,i;return e(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=".concat(r,"&page=").concat(n,"&include_adult=true"));case 2:return o=t.sent,t.next=5,o.json();case 5:return i=t.sent,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t)}))),function(t,e){return o.apply(this,arguments)}),l=function(){var t=e(a)(e(c).mark((function t(){var r,n;return e(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=5349b69c770fce41df09c49c43dbcd6b");case 2:return r=t.sent,t.next=5,r.json();case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),u=function(){var t=e(a)(e(c).mark((function t(r){var n,o;return e(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/movie/".concat(r,"?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US"));case 2:return n=t.sent,t.next=5,n.json();case 5:return o=t.sent,t.abrupt("return",o);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=e(a)(e(c).mark((function t(){var r,n;return e(c).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US");case 2:return r=t.sent,t.next=5,r.json();case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()})),i.register("bpxeT",(function(t,e){"use strict";function r(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function c(t){r(a,o,i,c,s,"next",t)}function s(t){r(a,o,i,c,s,"throw",t)}c(void 0)}))}}})),i.register("2TvXO",(function(t,e){var r=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new j(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=O(a,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var s=u(t,e,r);if("normal"===s.type){if(n=r.done?h:d,s.arg===m)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=h,r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var f="suspendedStart",d="suspendedYield",p="executing",h="completed",m={};function v(){}function y(){}function g(){}var _={};s(_,i,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(M([])));x&&x!==r&&n.call(x,i)&&(_=x);var w=g.prototype=v.prototype=Object.create(_);function L(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function O(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=u(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function M(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:T}}function T(){return{value:e,done:!0}}return y.prototype=g,s(w,"constructor",g),s(g,"constructor",y),y.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},L(E.prototype),s(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(w),s(w,c,"Generator"),s(w,i,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=M,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(s&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:M(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=r}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}}))}();
//# sourceMappingURL=index-my-library.bc5a01d5.js.map
