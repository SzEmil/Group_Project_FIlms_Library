var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequired7c6=o),o.register("3ZRvh",(function(e,t){var r,o,n,a;r=e.exports,o="fetchVideo",n=function(){return l},Object.defineProperty(r,o,{get:n,set:a,enumerable:!0,configurable:!0});const l=async(e,t)=>{const r=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5349b69c770fce41df09c49c43dbcd6b&language=en-US&query=${e}&page=${t}&include_adult=true`);return await r.json()}}));var n=o("3ZRvh");n=o("3ZRvh");const a=document.querySelector("#search-form"),l=document.querySelector(".home-gallery");let c={};const i=e=>{e.map((e=>{const t=document.createElement("div");t.innerHTML=`<div class = "home-gallery__card"><img class="home-gallery__img" src="https://image.tmdb.org/t/p/w300${e.poster_path}" alt ="video poster"><h3 class= "home-gallery-title">${e.title}</h3><a class = "home-gallery-link">kategoria|data</a></div>`,l.appendChild(t)}))};a.addEventListener("submit",(async e=>{e.preventDefault();const{elements:{searchQuery:t}}=a,r=t.value;console.log(r),await(0,n.fetchVideo)(r,1).then((e=>{const t=e.results;console.log(t),l.innerHTML="",i(t),c=e})).catch((e=>{console.error(e)}))}));
//# sourceMappingURL=index.58dd928f.js.map
