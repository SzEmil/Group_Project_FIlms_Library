const sacas = 'ass';
('use strict');
import { fetchVideo } from './fetch-video';
import { fetchVideoPopular } from './fetch-video';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.home-gallery');
let pageNumber = 1;
let boject = {};
const searchVideo = async event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  console.log(formSearch);
  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      const dataArray = data.results;
      console.log(dataArray);
      gallery.innerHTML = ``;
      renderVideoCard(dataArray);
      boject = data;
    })
    .catch(error => {
      console.error(error);
    });
};

const renderVideoCard = videoArray => {
  videoArray.map(video => {
    const card = document.createElement('div');
    card.innerHTML = `<div class = "home-gallery__card"><img class="home-gallery__img" src="https://image.tmdb.org/t/p/w300${video.poster_path}" alt ="video poster"><h3 class= "home-gallery-title">${video.title}</h3><a class = "home-gallery-link">kategoria|data</a></div>`;

    gallery.appendChild(card);
  });
};

// const generatePopularVideos = async event => {
//   try {
//     // event.preventDefault();
//     console.log('fetchujemy filmy');
//     const videos = await fetchVideoPopular();
//     console.log(videos);
//   } catch (error) {
//     console.error(error);
//   }
// };

form.addEventListener('submit', searchVideo);
