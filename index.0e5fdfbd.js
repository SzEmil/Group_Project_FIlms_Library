!function(){function t(t){return t&&t.__esModule?t.default:t}var e={};function r(t,e,r,n,o,i,a){try{var c=t[i](a),l=c.value}catch(t){return void r(t)}c.done?e(l):Promise.resolve(l).then(n,o)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function c(t){r(a,o,i,c,l,"next",t)}function l(t){r(a,o,i,c,l,"throw",t)}c(void 0)}))}};var n={},o=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new T(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=k(a,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var l=u(t,e,r);if("normal"===l.type){if(n=r.done?p:h,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=p,r.method="throw",r.arg=l.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",m={};function v(){}function y(){}function g(){}var _={};l(_,i,(function(){return this}));var w=Object.getPrototypeOf,b=w&&w(w(S([])));b&&b!==r&&n.call(b,i)&&(_=b);var x=g.prototype=v.prototype=Object.create(_);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,c){var l=u(t[o],t,i);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(l.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=u(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:P}}function P(){return{value:e,done:!0}}return y.prototype=g,l(x,"constructor",g),l(g,"constructor",y),y.displayName=l(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},L(E.prototype),l(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(x),l(x,c,"Generator"),l(x,i,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(l&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(n);try{regeneratorRuntime=o}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=o:Function("r","regeneratorRuntime = r")(o)}var i,a=(i=t(e)(t(n).mark((function e(r,o){var i,a;return t(n).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=".concat(r,"&page=").concat(o,"&include_adult=true"));case 2:return i=t.sent,t.next=5,i.json();case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}}),e)}))),function(t,e){return i.apply(this,arguments)}),c=function(){var r=t(e)(t(n).mark((function e(){var r,o;return t(n).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=5349b69c770fce41df09c49c43dbcd6b");case 2:return r=t.sent,t.next=5,r.json();case 5:return o=t.sent,t.abrupt("return",o);case 7:case"end":return t.stop()}}),e)})));return function(){return r.apply(this,arguments)}}(),l=function(){var r=t(e)(t(n).mark((function e(r){var o,i;return t(n).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/movie/".concat(r,"?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US"));case 2:return o=t.sent,t.next=5,o.json();case 5:return i=t.sent,t.abrupt("return",i);case 7:case"end":return t.stop()}}),e)})));return function(t){return r.apply(this,arguments)}}(),s=document.querySelector(".more-info-modal"),u=document.querySelector(".backdrop");console.log(u);var f=function(t){u.classList.remove("is-hidden");var e='<button class="more-info-modal__close-btn">\n    X\n  </button>\n  <div class="container-modal">\n    <img class="more-info-modal__poster" src="https://image.tmdb.org/t/p/w300'.concat(t.poster_path,'" />\n    <div>\n      <h1 class="more-info-modal__title">').concat(t.title,'</h1>\n      <div class="more-info-modal__details">\n      <ul>\n      <li class="more-info-modal__details--header">Vote/Votes</li>\n      <li class="more-info-modal__details--header">Popularity</li>\n      <li class="more-info-modal__details--header">Original Title</li>\n      <li class="more-info-modal__details--header">Genre</li>\n      </ul>\n\n      <ul>\n      <li class="more-info-modal__details--text">\n      <span class="more-info-modal__details--average">').concat(t.vote_average,'</span>\n      /\n      <span class="more-info-modal__details--count">').concat(t.vote_count,'</span>\n      </li>\n      <li class="more-info-modal__details--text">').concat(t.popularity,'</li>\n      <li class="more-info-modal__details--text">').concat(t.original_title,'</li>\n      <li class="more-info-modal__details--text">').concat(t.genre_ids,'</li>\n      </ul>\n      </div>\n      \n      <h3 class="more-info-modal__subtitle">ABOUT</h3>\n      <p class="more-info-modal__text">\n        ').concat(t.overview,'\n      </p>\n      <div class="more-info-modal__btn-box">\n        <button class="more-info-modal__btn more-info-modal__btn--watched">\n          ADD TO WATCHED\n        </button>\n        <button class="more-info-modal__btn more-info-modal__btn--queue">\n          ADD TO QUEUE\n        </button>\n      </div>\n    </div>\n  </div>');s.innerHTML=e},h=document.querySelector("#search-form"),d=document.querySelector(".home-gallery"),p=0,m=function(t){t.map((function(t){p=t.id;var e=t.release_date.split("-"),r=t.genre_ids.join(", "),n=document.createElement("div");n.innerHTML='<div class = "home-gallery__card" movieid = "'.concat(p,'"><img class="home-gallery__img" src="https://image.tmdb.org/t/p/w300').concat(t.poster_path,'" alt ="video poster"><h3 class= "home-gallery-title">').concat(t.title,'</h3><p class = "home-gallery-link">').concat(r," | ").concat(e[0],"</p></div>"),d.appendChild(n)}))},v=function(){var r=t(e)(t(n).mark((function e(r){var o,i;return t(n).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.preventDefault(),o=h.elements.searchQuery,i=o.value,console.log(i),t.next=6,a(i,1).then((function(t){d.innerHTML="";var e=t.results;console.log(e),m(e)})).catch((function(t){console.error(t)}));case 6:case"end":return t.stop()}}),e)})));return function(t){return r.apply(this,arguments)}}();window.onload=function(t){d.innerHTML="",c().then((function(t){console.log(t);var e=t.results;console.log(e),m(e)})).catch((function(t){console.error(t)}))},h.addEventListener("submit",v);document.addEventListener("click",(function(t){var e=t.target.closest(".home-gallery__card");if(t.target.closest(".home-gallery__card")){var r=e.getAttribute("movieid");console.log(r),l(r).then((function(t){console.log(t),f(t)})).catch((function(t){console.error(t)}))}}))}();
//# sourceMappingURL=index.0e5fdfbd.js.map
