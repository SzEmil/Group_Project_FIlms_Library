'use strict';
import { fetchVideo } from './fetch-video';
import { fetchVideoPopular } from './fetch-video';
import { fetchDetails } from './fetch-video';
import { fetchGenres } from './fetch-video';
import { renderModal } from './more-info-modal';

// const form = document.querySelector('#search-form');
const form = document.querySelector('#header-search-form');
const gallery = document.querySelector('.home-gallery');
const paginationBtns = document.querySelectorAll('.pag-btns__btn');
const nextBtn = document.querySelector('.pag-btns__arrow--next');
const prevBtn = document.querySelector('.pag-btns__arrow--prev');
const dots = document.querySelectorAll('.pag-btns__dots');
let pageNumber = 1;

console.log(paginationBtns);
console.log(typeof paginationBtns);

// funkcja do wyświetlania wyszukanych filmów
const renderVideoCard = videoArray => {
  fetchGenres()
    .then(genresList => {
      videoArray.map(video => {
        const releaseDate = video.release_date;
        const movieYear = releaseDate.split('-');

        const arrGenreId = video.genre_ids;
        const arrVideoGenres = [];
        arrGenreId.map(id => {
          const genreObj = genresList.genres.find(genre => genre.id === id);
          arrVideoGenres.push(genreObj);
        });
        const arrGenres = [];
        arrVideoGenres.map(genre => {
          arrGenres.push(genre.name);
        });
        const genres = arrGenres.join(', ');

        const card = document.createElement('div');
        card.innerHTML = `<div class = "home-gallery__card" movieid="${video.id}"><img class="home-gallery__img" src="https://image.tmdb.org/t/p/w300${video.poster_path}" alt ="video poster"><h3 class= "home-gallery-title">${video.title}</h3><p class = "home-gallery-link">${genres} | ${movieYear[0]}</p></div>`;

        gallery.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
    });
};

// funkcja sprawdzająca ilość wyszukanych elementów oraz stron i obsługująca widoczność przycisków do przewijania stron
const checkResult = totalResults => {
  const totalPages = Math.ceil(totalResults / 20);

  for (let i = 0; i <= 6; i++) {
    paginationBtns[i].classList.add('pag-btns__btn--is-hidden');
  }
  nextBtn.classList.add('pag-btns__arrow--is-hidden');
  prevBtn.classList.add('pag-btns__arrow--is-hidden');
  dots[0].classList.add('pag-btns__dots--is-hidden');
  dots[1].classList.add('pag-btns__dots--is-hidden');

  nextBtn.disabled = false;
  prevBtn.disabled = false;

  if (totalResults === 0) {
    // tutaj usuwam klase is-hidden w komentarzu wrzuconym do hedera przez Olgę, że nie znaleziono filmów
    return;
  }

  paginationBtns.forEach(btn => {
    if (Number(btn.textContent) !== pageNumber) {
      // btn.classList.remove('.pag-btns__btn--active');
      btn.style.backgroundColor = 'transparent';
      console.log('remove');
    }
    if (Number(btn.textContent) === pageNumber) {
      // btn.classList.add('.pag-btns__btn--active');
      btn.style.backgroundColor = 'orange';
      console.log('add');
    }
  });

  if (totalPages === 1) {
    paginationBtns[0].classList.remove('pag-btns__btn--is-hidden');
    paginationBtns[0].disabled = true;
    // tutaj można jeszcze usunąć cursor pointer
  } else if (totalPages === 2) {
    paginationBtns[0].classList.remove('pag-btns__btn--is-hidden');
    paginationBtns[1].classList.remove('pag-btns__btn--is-hidden');
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
  } else if (totalPages === 3) {
    for (let i = 0; i <= 2; i++) {
      paginationBtns[i].classList.add('pag-btns__btn--is-hidden');
    }
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
  } else if (totalPages === 4) {
    for (let i = 0; i <= 3; i++) {
      paginationBtns[i].classList.add('pag-btns__btn--is-hidden');
    }
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
  } else if (totalPages === 5) {
    for (let i = 0; i <= 4; i++) {
      paginationBtns[i].classList.add('pag-btns__btn--is-hidden');
    }
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
  } else if (totalPages === 6) {
    for (let i = 0; i <= 5; i++) {
      paginationBtns[i].classList.add('pag-btns__btn--is-hidden');
    }
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
  } else if (totalPages === 7) {
    for (let i = 0; i <= 6; i++) {
      paginationBtns[i].classList.add('pag-btns__btn--is-hidden');
    }
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
  } else if (totalPages > 7) {
    dots[0].classList.remove('pag-btns__dots--is-hidden');
    dots[1].classList.remove('pag-btns__dots--is-hidden');
    nextBtn.classList.remove('pag-btns__arrow--is-hidden');
    prevBtn.classList.remove('pag-btns__arrow--is-hidden');
    for (let i = 0; i <= 6; i++) {
      paginationBtns[i].classList.remove('pag-btns__btn--is-hidden');
    }
    paginationBtns[6].textContent = totalPages;
  }

  //  funkcjonalność do zmiany numerów strony

  if (pageNumber === 1 && totalPages !== 1) {
    prevBtn.disabled = true;
  } else if (pageNumber === totalPages && totalPages !== 1) {
    nextBtn.disabled = true;
  }
};

// obsługa zapytania o najpopularniejsze filmy
const loadPopularMovies = event => {
  gallery.innerHTML = ``;

  fetchVideoPopular()
    .then(data => {
      console.log(data);
      const dataArray = data.results;
      // console.log(dataArray);
      renderVideoCard(dataArray);
    })
    .catch(error => {
      console.error(error);
    });
};

// obsługa zapytania o film dopasowany do wartości wpisanej do input
const searchVideo = async event => {
  event.preventDefault();

  pageNumber = 1;

  const {
    elements: { searchQuery },
  } = form;
  const formSearch = searchQuery.value;
  // console.log(formSearch);

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      console.log(data);
      gallery.innerHTML = ``;
      const dataArray = data.results;
      console.log(dataArray);
      renderVideoCard(dataArray);

      const totalResults = data.total_results;
      checkResult(totalResults);
    })
    .catch(error => {
      gallery.innerHTML = ``;
      console.error(error);
    });
};

// obsługa paginacji
const nextPage = async () => {
  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  console.log(formSearch);

  pageNumber++;

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      gallery.innerHTML = ``;
      const dataArray = data.results;
      console.log(dataArray);
      renderVideoCard(dataArray);
      const totalResults = data.total_results;
      checkResult(totalResults);

      console.log(`Wczytana strona: ${pageNumber}`);
    })
    .catch(error => {
      gallery.innerHTML = ``;
      console.error(error);
    });
};

const prevPage = async () => {
  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  console.log(formSearch);

  pageNumber--;

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      gallery.innerHTML = ``;
      const dataArray = data.results;
      console.log(dataArray);
      renderVideoCard(dataArray);
      const totalResults = data.total_results;
      checkResult(totalResults);
      console.log(`Wczytana strona: ${pageNumber}`);
    })
    .catch(error => {
      gallery.innerHTML = ``;
      console.error(error);
    });
};

const pageByNumber = async event => {
  const target = event.target.closest('.pag-btns__btn');
  if (!event.target.closest('.pag-btns__btn')) {
    return;
  }

  pageNumber = Number(target.textContent);
  console.log(typeof pageNumber);

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
      const totalResults = data.total_results;
      checkResult(totalResults);
      console.log(`Wczytana strona: ${pageNumber}`);
    })
    .catch(error => {
      gallery.innerHTML = ``;
      console.error(error);
    });
};

// tworzenie siatki popularnych filmów przy załadowaniu strony
window.onload = loadPopularMovies;

// tworzenie siatki filmów odpowiadających wartości input
form.addEventListener('submit', searchVideo);

// otwieranie modala ze szczegółami o filmie
const getDetails = event => {
  const target = event.target.closest('.home-gallery__card');
  if (!event.target.closest('.home-gallery__card')) {
    return;
  }

  const movieId = target.getAttribute('movieid');

  fetchDetails(movieId)
    .then(data => {
      console.log(data);
      renderModal(data);
    })
    .catch(error => {
      console.error(error);
    });
};

// obsługa funkcjonalności na stronie
document.addEventListener('click', getDetails);
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);
document.addEventListener('click', pageByNumber);
