!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var c,a=r("bpxeT"),i=r("2TvXO"),l=r("je9aX"),s=(r("je9aX"),r("je9aX"),l=r("je9aX"),r("8qMKg")),u=document.querySelector("#header-search-form"),d=document.querySelector(".home-gallery"),f=function(e){(0,l.fetchGenres)().then((function(n){e.map((function(e){var t=e.release_date.split("-"),o=e.genre_ids,r=[];o.map((function(e){var t=n.genres.find((function(n){return n.id===e}));r.push(t)}));var c=[];r.map((function(e){c.push(e.name)}));var a=c.join(", "),i=document.createElement("div");i.innerHTML='<div class = "home-gallery__card" movieid="'.concat(e.id,'"><img class="home-gallery__img" src="https://image.tmdb.org/t/p/w300').concat(e.poster_path,'" alt ="video poster"><h3 class= "home-gallery-title">').concat(e.title,'</h3><p class = "home-gallery-link">').concat(a," | ").concat(t[0],"</p></div>"),d.appendChild(i)}))})).catch((function(e){console.error(e)}))},h=(c=e(a)(e(i).mark((function n(t){var o,r;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),o=u.elements.searchQuery,r=o.value,console.log(r),e.next=6,(0,l.fetchVideo)(r,1).then((function(e){d.innerHTML="";var n=e.results;console.log(n),f(n)})).catch((function(e){console.error(e)}));case 6:case"end":return e.stop()}}),n)}))),function(e){return c.apply(this,arguments)});window.onload=function(e){d.innerHTML="",(0,l.fetchVideoPopular)().then((function(e){var n=e.results;f(n)})).catch((function(e){console.error(e)}))},u.addEventListener("submit",h);document.addEventListener("click",(function(e){var n=e.target.closest(".home-gallery__card");if(e.target.closest(".home-gallery__card")){var t=n.getAttribute("movieid");console.log(t),(0,l.fetchDetails)(t).then((function(e){console.log(e),(0,s.renderModal)(e)})).catch((function(e){console.error(e)}))}}))}();
//# sourceMappingURL=index.ddbb0948.js.map
