'use strict';

const button = document.getElementById('scroll-to-top-button');

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.classList.add('show'); 
  } else {
    button.classList.remove('show'); 
  }
};

button.onclick = function floatToStart() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
