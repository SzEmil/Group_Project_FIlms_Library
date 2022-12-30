('use strict');
import { fetchVideo } from './fetch-video';
import { fetchVideoPopular } from './fetch-video';
import { fetchDetails } from './fetch-video';
import { renderModal } from './more-info-modal';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.home-gallery');
let pageNumber = 1;
let videoId = 0;
// let boject = {};

// funkcja do wyświetlania wyszukanych filmów
const renderVideoCard = videoArray => {
  videoArray.map(video => {
    videoId = video.id;

    const releaseDate = video.release_date;
    const movieYear = releaseDate.split('-');

    const arrGenreId = video.genre_ids;
    const genreId = arrGenreId.join(', ');

    const card = document.createElement('div');
    card.innerHTML = `<div class = "home-gallery__card" movieid = "${videoId}"><img class="home-gallery__img" src="https://image.tmdb.org/t/p/w300${video.poster_path}" alt ="video poster"><h3 class= "home-gallery-title">${video.title}</h3><p class = "home-gallery-link">${genreId} | ${movieYear[0]}</p></div>`;

    gallery.appendChild(card);
  });
};

// obsługa zapytania o najpopularniejsze filmy
const loadPopularMovies = event => {
  gallery.innerHTML = ``;

  fetchVideoPopular()
    .then(data => {
      console.log(data);
      const dataArray = data.results;
      console.log(dataArray);
      renderVideoCard(dataArray);
    })
    .catch(error => {
      console.error(error);
    });
};

// obsługa zapytania o film dopasowany do wartości wpisanej do input
const searchVideo = async event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  console.log(formSearch);

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      gallery.innerHTML = ``;
      const dataArray = data.results;
      console.log(dataArray);
      renderVideoCard(dataArray);
      // boject = data;
    })
    .catch(error => {
      console.error(error);
    });
};

// tworzenie siatki popularnych filmów przy załadowaniu strony
window.onload = loadPopularMovies;

// tworzenie siatki filmów odpowiadających wartości input
form.addEventListener('submit', searchVideo);

// tworzenie modala ze szczegółami o filmie
const getDetails = event => {
  const target = event.target.closest('.home-gallery__card');
  if (!event.target.closest('.home-gallery__card')) {
    return;
  }

  const test = target.getAttribute('movieid');
  console.log(test);

  fetchDetails(test)
    .then(data => {
      console.log(data);
      renderModal(data);
    })
    .catch(error => {
      console.error(error);
    });
};
document.addEventListener('click', getDetails);
