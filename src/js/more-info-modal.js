'use strict';

const moreInfoModal = document.querySelector('.more-info-modal');
const modalSection = document.querySelector('[data-modal]');
//const body = document.querySelector('body')


export const renderModal = example => {
  modalSection.classList.remove('is-hidden');
  modalSection.classList.add("backdrop");
  const parsedGenres = example.genres.map(genre => genre.name).join(', ');
  const markup = `<button class="more-info-modal__close-btn">
    X
  </button>
  <div class="container-modal">
    <img class="more-info-modal__poster" src="https://image.tmdb.org/t/p/w300${example.poster_path}"  />
    <div class="more-info-modal__description">
      <h1 class="more-info-modal__title">${example.title}</h1>
      <div class="more-info-modal__details">
      <ul>
      <li class="more-info-modal__details--header">Vote/Votes</li>
      <li class="more-info-modal__details--header">Popularity</li>
      <li class="more-info-modal__details--header">Original Title</li>
      <li class="more-info-modal__details--header">Genre</li>
      </ul>

      <ul>
      <li class="more-info-modal__details--text">
      <span class="more-info-modal__details--average">${example.vote_average}</span>
      /
      <span class="more-info-modal__details--count">${example.vote_count}</span>
      </li>
      <li class="more-info-modal__details--text">${example.popularity}</li>
      <li class="more-info-modal__details--text">${example.original_title}</li>
      <li class="more-info-modal__details--text">${parsedGenres}</li>
      </ul>
      </div>
      
      <h3 class="more-info-modal__subtitle">ABOUT</h3>
      <p class="more-info-modal__text">
        ${example.overview}
      </p>
      <div class="more-info-modal__btn-box">
        <button class="more-info-modal__btn active more-info-modal__btn--watched">
          ADD TO WATCHED
        </button>
        <button class="more-info-modal__btn more-info-modal__btn--queue">
          ADD TO QUEUE
        </button>
      </div>
    </div>
  </div>`;

  moreInfoModal.innerHTML = markup;
  //body.style.overflow = "hidden"
};


modalSection.addEventListener("click", (event) => {
  if (event.target.closest(".more-info-modal__btn-box")) {
    return;
  }

  modalSection.classList.add("is-hidden")
  modalSection.classList.remove("backdrop")
  //body.style.overflow = "auto"
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalSection.classList.add("is-hidden")
    modalSection.classList.remove("backdrop")
  }
})