'use strict';
import { Loading } from 'notiflix';
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
const searchErr = document.querySelector('.search-error');

let pageNumber = 1;

const loadingSpinner = document.createElement('div');
loadingSpinner.classList.add('loading');
loadingSpinner.innerHTML = '<div class="loading__spinner"></div>';

// funkcja pokazująca loading spinner
const onLoading = () => {
  loadingSpinner.classList.remove('is-hidden');
  gallery.appendChild(loadingSpinner);
};

// funkcja ukrywająca loading spinner
const loadingDone = () => {
  loadingSpinner.classList.add('is-hidden');
};

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
  prevBtn.style.stroke = 'black';
  nextBtn.style.stroke = 'black';

  paginationBtns.forEach(btn => {
    if (Number(btn.textContent) !== pageNumber) {
      btn.style.backgroundColor = 'transparent';
      btn.style.color = 'black';
    }
    if (Number(btn.textContent) === pageNumber) {
      btn.style.backgroundColor = '#ff6b08';
      btn.style.color = 'white';
      btn.style.borderRadius = '5px';
      btn.style.width = '40px';
      btn.style.height = '40px';
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
    prevBtn.style.stroke = '#8c8c8c';
  } else if (pageNumber === totalPages && totalPages !== 1) {
    nextBtn.disabled = true;
    nextBtn.style.stroke = '#8c8c8c';
  }
};

// obsługa zapytania o najpopularniejsze filmy
const loadPopularMovies = event => {
  gallery.innerHTML = ``;

  onLoading();

  fetchVideoPopular()
    .then(data => {
      // console.log(data);
      const dataArray = data.results;
      // console.log(dataArray);
      renderVideoCard(dataArray);
      loadingDone();
    })
    .catch(error => {
      console.error(error);
    });
};

// obsługa zapytania o film dopasowany do wartości wpisanej do input
const searchVideo = async event => {
  event.preventDefault();
  onLoading();
  pageNumber = 1;

  const {
    elements: { searchQuery },
  } = form;
  const formSearch = searchQuery.value;

  if (formSearch === '') {
    searchErr.textContent = 'Enter the movie name.';
    searchErr.classList.remove('is-hidden');
    loadingDone();
    return;
  } else {
    searchErr.classList.add('is-hidden');
  }

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      const totalResults = data.total_results;
      if (totalResults === 0) {
        searchErr.textContent =
          'Search result not successful. Enter the correct movie name.';
        searchErr.classList.remove('is-hidden');
        loadingDone();
        return;
      }
      // console.log(data);
      gallery.innerHTML = ``;
      const dataArray = data.results;
      // console.log(dataArray);
      renderVideoCard(dataArray);
      checkResult(totalResults);

      console.log(`Wczytana strona: ${pageNumber}`);
    })
    .catch(error => {
      gallery.innerHTML = ``;
      console.error(error);
    });
};

// obsługa paginacji
const nextPage = async () => {
  onLoading();

  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  // console.log(formSearch);

  pageNumber++;

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      gallery.innerHTML = ``;
      const dataArray = data.results;
      // console.log(dataArray);
      renderVideoCard(dataArray);

      // const { height: cardHeight } = document
      //   .querySelector('.container')
      //   .firstElementChild.getBoundingClientRect();

      // window.scrollBy({
      //   top: cardHeight * 2,
      //   behavior: 'smooth',
      // });

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
  onLoading();

  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  // console.log(formSearch);

  pageNumber--;

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      gallery.innerHTML = ``;
      const dataArray = data.results;
      // console.log(dataArray);
      renderVideoCard(dataArray);

      // const { height: cardHeight } = document
      //   .querySelector('.home-gallery')
      //   .firstElementChild.getBoundingClientRect();

      // window.scrollBy({
      //   top: cardHeight * 2,
      //   behavior: 'smooth',
      // });

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
  onLoading();

  pageNumber = Number(target.textContent);
  // console.log(typeof pageNumber);

  const {
    elements: { searchQuery },
  } = form;

  const formSearch = searchQuery.value;
  // console.log(formSearch);

  await fetchVideo(formSearch, pageNumber)
    .then(data => {
      gallery.innerHTML = ``;
      const dataArray = data.results;
      // console.log(dataArray);
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
      // console.log(data);
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
