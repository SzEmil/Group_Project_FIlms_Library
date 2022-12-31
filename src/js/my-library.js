import { renderModal } from './more-info-modal';
import { fetchDetails } from './fetch-video';

const ACTIVE_SECTION_CLASS = 'active';
const WATCHED_SECTION_ID = 'my-library-watched';
const QUEUE_SECTION_ID = 'my-library-queue';
const LOCAL_STORAGE_WATCHED_KEY = 'filmoteka-watched';
const LOCAL_STORAGE_QUEUE_KEY = 'filmoteka-queue';
const sectionButtons = document.querySelectorAll('.my-library-space__btn');
const initialButton = document.getElementById(WATCHED_SECTION_ID);
const sectionContainer = document.querySelector('.grid_my_library__elements');

function markActiveButton(button) {
  sectionButtons.forEach(button => button.classList.remove(ACTIVE_SECTION_CLASS));
  button.classList.add(ACTIVE_SECTION_CLASS);
}

function initListeners() {
  sectionButtons?.forEach(button => button.addEventListener('click', (e) => {
    const isActiveButton = e.target.classList.contains('active');
    if (!isActiveButton) {
      markActiveButton(e.target);
      populateSection(e);
    }
  }));
}

function populateSection(event) {
  sectionContainer.innerHTML = null;
  const selectedSectionId = event?.target.getAttribute('id') ?? WATCHED_SECTION_ID;
  const elements = JSON.parse(readSectionFromLocalStorage(selectedSectionId));
  if (elements?.length > 0) {
    elements.forEach((movieData) => renderMovieElement(movieData));
  } else {
    // tutaj renderujemy page z brakiem filmów
  }
}

function readSectionFromLocalStorage(sectionName) {
  let elements;
  switch (sectionName) {
    case WATCHED_SECTION_ID:
      elements = readElementsFromLocalStorage(LOCAL_STORAGE_WATCHED_KEY);
      break;
    case QUEUE_SECTION_ID:
      elements = readElementsFromLocalStorage(LOCAL_STORAGE_QUEUE_KEY);
      break;
    default:
      throw new Error('Not implemented sectionName: ' + sectionName);
  }
  return elements;
}

function readElementsFromLocalStorage(key) {
  return localStorage.getItem(key);

}

function getDetails (id) {

  fetchDetails(id)
    .then(data => {
      console.log(data);
      renderModal(data);
    })
    .catch(error => {
      console.error(error);
    });
}

function renderMovieElement(movieData) {

  const {
    title,
    categories,
    year,
    score,
    imageSrc,
    id,
  } = movieData;
  const categoriesText = categories.join(', ');
  const listElement = document.createElement('li');
  const buttonElement = document.createElement('button');
  const buttonMarkup = `
        <img src='${imageSrc}'
             class='grid_my_library__element-img'
             alt='${title}' />
        <span class='grid_my_library__element-title'>${title}</span><br/>
        <span class='grid_my_library__element-category'>${categoriesText}</span>
        <span class='grid_my_library__element-year'>${year}</span>
        <span class='grid_my_library__element-score'>${score}</span>
  `;
  buttonElement.setAttribute('role', 'button');
  buttonElement.setAttribute('title', title);
  buttonElement.classList.add('grid_my_library__element');
  buttonElement.innerHTML = buttonMarkup;
  buttonElement.addEventListener('click', (_) => getDetails(id));
  listElement.appendChild(buttonElement);
  sectionContainer.appendChild(listElement);
}

function initScripts() {
  markActiveButton(initialButton);
  initListeners();
  populateSection();
}

initScripts();
