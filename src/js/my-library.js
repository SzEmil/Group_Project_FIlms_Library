import { renderModal } from './more-info-modal';
import { fetchDetails } from './fetch-video';

const ACTIVE_SECTION_CLASS = 'active';
const HIDDEN_SECTION_CLASS = 'hidden';
const WATCHED_SECTION_ID = 'filmoteka-watched';
const QUEUE_SECTION_ID = 'filmoteka-queue';
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
      populateSection(e.target);
    }
  }));
}

export function populateSection(target) {
  sectionContainer.classList.add(HIDDEN_SECTION_CLASS);
  const timeout = setTimeout(() => {
    sectionContainer.innerHTML = null;
    const selectedSectionId = target?.getAttribute('id') ?? WATCHED_SECTION_ID;
    const elements = JSON.parse(readSectionFromLocalStorage(selectedSectionId));
    if (elements?.length > 0) {
      elements.forEach((movieData) => renderMovieElement(movieData));
    } else {
      renderEmptyState();
    }
    sectionContainer.classList.remove(HIDDEN_SECTION_CLASS);
    clearTimeout(timeout);
  }, 300);
}

function renderEmptyState() {
  const markup = `
  <li class='grid_my_library__element-empty'>
      <p class='grid_my_library__element-empty-txt'>
        The Movie Dog<br/>
        <strong>is waiting for you</strong><br/>
        to add some movies<br/>
        to the list
      </p>
        <div class='grid_my_library__element-empty-img'></div>
    </li>
  `;
  sectionContainer.innerHTML = markup;
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

function getDetails(id) {

  fetchDetails(id)
    .then(data => {
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
  const listElement = document.createElement('li');
  const buttonElement = document.createElement('button');
  const categoriesMarkup = categories ? `<span class='grid_my_library__element-category'>${categories}</span>` : '';
  const yearMarkup = categories ? `<span class='grid_my_library__element-year'>${year}</span>` : '';
  const scoreMarkup = categories ? `<span class='grid_my_library__element-score'>${score}</span>` : '';
  const buttonMarkup = `
        <img src='${imageSrc}'
             class='grid_my_library__element-img'
             alt='${title}' />
        <span class='grid_my_library__element-title'>${title}</span><br/>
        ${categoriesMarkup}
        ${yearMarkup}
        ${scoreMarkup}
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

if (sectionButtons.length > 0) {
  initScripts();
}