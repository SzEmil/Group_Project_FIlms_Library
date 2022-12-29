'use strict';
import { fetchVideo } from "./fetch-video";

const moreInfoModal = document.querySelector(".more-info-modal")





fetchVideo("Pretty Woman", 1)
    .then(data => {
        console.log(data)
        const dataArray = data.results;
        const example = dataArray[0];

        renderModal(example);
    })
    .catch(error => {
        console.error(error)
    })



const renderModal = example => {
    const markup = `<button class="more-info-modal__close-btn">
    <img class="more-info-modal__close-btn--icon" src="./src/images/close.svg" />
  </button>
  <div class="container-modal">
    <img class="more-info-modal__poster" src="https://image.tmdb.org/t/p/w300${example.poster_path}" />
    <div>
      <h1 class="more-info-modal__title">${example.title}</h1>
      <div class="more-info-modal__details">
      <ul>
      <li class="more-info-modal__details--header">Vote/Votes</li>
      <li class="more-info-modal__details--header">Popularity</li>
      <li class="more-info-modal__details--header">Original Title</li>
      <li class="more-info-modal__details--header">Genre</li>
      </ul>

      <ul>
      <li class="more-info-modal__details--text"><span class="more-info__details--average">${example.vote_average}</span> / <span class="more-info__details--count">${example.vote_count}</span></li>
      <li class="more-info-modal__details--text">${example.popularity}</li>
      <li class="more-info-modal__details--text">${example.original_title}</li>
      <li class="more-info-modal__details--text">${example.genre_ids}</li>
      </ul>
      </div>
      
      
      <h3 class="more-info-modal__subtitle">ABOUT</h3>
      <p class="more-info-modal__text">
        ${example.overview}
      </p>
      <div class="more-info-modal__btn-box">
        <button class="more-info-modal__btn more-info-modal__btn--watched">
          ADD TO WATCHED
        </button>
        <button class="more-info-modal__btn more-info-modal__btn--queue">
          ADD TO QUEUE
        </button>
      </div>
    </div>
  </div>`

    moreInfoModal.innerHTML = markup;
};