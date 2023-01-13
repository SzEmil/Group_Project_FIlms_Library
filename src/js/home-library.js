'use strict';
import { Loading } from 'notiflix';
import { fetchVideo } from './fetch-video';
import { fetchVideoPopular } from './fetch-video';
import { fetchDetails } from './fetch-video';
import { fetchGenres } from './fetch-video';
import { renderModal } from './more-info-modal';
import { englishWords } from './words-table';
// const form = document.querySelector('#search-form');
const form = document.querySelector('#header-search-form');
const gallery = document.querySelector('.home-gallery');
const paginationBtns = document.querySelectorAll('.pag-btns__btn');
const nextBtn = document.querySelector('.pag-btns__arrow--next');
const prevBtn = document.querySelector('.pag-btns__arrow--prev');
const btnBox = document.querySelector('.btn-box');
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
        let foundSrc = ``;
        if (video.poster_path === null) {
          foundSrc = `https://scontent.xx.fbcdn.net/v/t1.15752-9/324876433_515011753945907_5094880799937398186_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=CPCI4Yam_e0AX9eRJN5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQ0lgdF3j2QdVnr26sq4kCrZ-wu3LsaYxKDz79-gqJ0-w&oe=63E68EEB`;
        } else {
          foundSrc = `https://image.tmdb.org/t/p/w300${video.poster_path}`;
        }
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
        card.classList.add('home-gallery__card');
        card.setAttribute('movieid', video.id);
        card.innerHTML = `<div class="home-gallery__label">
        <p class="home-gallery__label-text">Click for more details</p>
      </div><img class="home-gallery__img" src="${foundSrc}" alt ="video poster"><div class="home-gallery__signature"><h3 class= "home-gallery__title">${video.title}</h3><p class = "home-gallery__details">${genres} | ${movieYear[0]}</p></div>`;

        gallery.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
    });
};

// funkcja sprawdzająca ilość wyszukanych elementów oraz stron i obsługująca widoczność przycisków do przewijania stron
const checkResult = totalResults => {
  btnBox.innerHTML = '';
  const totalPages = Math.ceil(totalResults / 20);

  const windowWidth = window.innerWidth;

  nextBtn.classList.remove('pag-btns__arrow--is-hidden');
  prevBtn.classList.remove('pag-btns__arrow--is-hidden');

  //HTML tworzenie pierwszego i ostatniego buttona
  const firstBtn = document.createElement('button');
  firstBtn.classList.add('pag-btns__btn');
  firstBtn.setAttribute('type', 'button');
  firstBtn.textContent = 1;
  const lastBtn = document.createElement('button');
  lastBtn.classList.add('pag-btns__btn');
  lastBtn.setAttribute('type', 'button');
  lastBtn.textContent = totalPages;

  //HTML tworzenie kropeczek pomiędzy pierwszym i ostatnim, a pozostałymi buttonami
  const dots = document.createElement('span');
  dots.classList.add('pag-btns__dots');
  dots.textContent = '...';
  const dotsSec = document.createElement('span');
  dotsSec.classList.add('pag-btns__dots');
  dotsSec.textContent = '...';

  //HTML tworzenie buttonów
  let buttonArr = [];
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.classList.add('pag-btns__btn');
    button.setAttribute('type', 'button');
    button.setAttribute('number', `${i}`);
    button.textContent = i;

    if (Number(button.textContent) === pageNumber) {
      button.classList.add('pag-btns__btn--is-active');
      button.disabled = true;
    }

    buttonArr.push(button);
  }

  if (totalPages > 7 && pageNumber < 5) {
    if (windowWidth < 450 && pageNumber <= 3) {
      for (let i = 0; i <= 4; i++) {
        btnBox.append(buttonArr[i]);
      }
    } else if (windowWidth < 450 && pageNumber === 4) {
      for (let i = 1; i <= 5; i++) {
        btnBox.append(buttonArr[i]);
      }
    } else {
      for (let i = 0; i <= 5; i++) {
        btnBox.append(buttonArr[i]);
      }
      btnBox.append(dots, lastBtn);
    }
  } else if (totalPages > 7 && pageNumber > 4 && pageNumber < totalPages - 3) {
    if (windowWidth < 450) {
      for (let i = pageNumber - 3; i <= pageNumber + 1; i++) {
        btnBox.append(buttonArr[i]);
      }
    } else {
      btnBox.prepend(firstBtn, dots);
      for (let i = pageNumber - 3; i <= pageNumber + 1; i++) {
        btnBox.append(buttonArr[i]);
      }
      btnBox.append(dotsSec, lastBtn);
    }
  } else if (totalPages > 7 && pageNumber >= totalPages - 3) {
    if (windowWidth < 450 && pageNumber === totalPages - 3) {
      for (let i = totalPages - 6; i <= totalPages - 2; i++) {
        btnBox.append(buttonArr[i]);
      }
    } else if (windowWidth < 450 && pageNumber > totalPages - 3) {
      for (let i = totalPages - 5; i <= totalPages - 1; i++) {
        btnBox.append(buttonArr[i]);
      }
    } else {
      btnBox.append(firstBtn, dots);
      for (let i = totalPages - 6; i <= totalPages - 1; i++) {
        btnBox.append(buttonArr[i]);
      }
    }
  } else if (totalPages < 8) {
    if (windowWidth < 450 && totalPages > 5) {
      for (let i = pageNumber - 5; i <= 5; i++) {
        btnBox.append(buttonArr[i]);
      }
    } else {
      for (let i = 0; i < totalPages; i++) {
        btnBox.append(buttonArr[i]);
      }
    }
  }

  // blokowanie strzałek do przewijania na pierwszej i ostatniej stronie
  if (pageNumber === 1) {
    prevBtn.disabled = true;
    prevBtn.classList.add('pag-btns__arrow--disabled');
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove('pag-btns__arrow--disabled');
  }

  if (pageNumber === totalPages) {
    nextBtn.disabled = true;
    nextBtn.classList.add('pag-btns__arrow--disabled');
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove('pag-btns__arrow--disabled');
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

function maybeRandom() {
  const inputForm = document.querySelector('.header-search-form__input');
  const randomLink = document.querySelector('#randomlink');
  if (inputForm.value === '') {
    setTimeout(() => {
      randomLink.style.visibility = 'visible';
    }, 4000);
  } else {
    return;
  }
}
function inputValue() {
  const inputForm = document.querySelector('.header-search-form__input');
  const randomLink = document.querySelector('#randomlink');
  if (inputForm.value !== '') {
    randomLink.style.visibility = 'hidden';
  } else {
    setTimeout(() => {
      const randomLink = document.querySelector('#randomlink');
      randomLink.style.visibility = 'visible';
      randomBtn.addEventListener('click', searchRandom);
    }, 4000);
  }
}
const inputForm = document.querySelector('.header-search-form__input');
inputForm.addEventListener('focus', maybeRandom);
inputForm.addEventListener('input', inputValue);
inputForm.addEventListener('blur', () => {
  const randomLink = document.querySelector('#randomlink');
  randomLink.style.visibility = 'hidden';
});

function generateSentence(words) {
  var sentence = '';
  for (var i = 0; i < 1; i++) {
    var randomIndex = Math.floor(Math.random() * words.length);
    sentence += words[randomIndex] + ' ';
  }
  return sentence;
}
const searchRandom = async () => {
  const randomLink = document.querySelector('#randomlink');
  randomLink.style.visibility = 'hidden';
  let pageNumber = 1;
  let formSearch = generateSentence(englishWords);
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
    })
    .catch(error => {
      gallery.innerHTML = ``;
      console.error(error);
    });
};
const randomBtn = document.querySelector('#randomBtn');
randomBtn.addEventListener('click', searchRandom);
