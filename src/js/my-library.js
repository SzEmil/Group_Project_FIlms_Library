// WYKONANIE KODU ZWIĄZANEGO ZE ZMIANĄ WIDOKU SEKCJI (watched/queue)
const ACTIVE_SECTION_CLASS = 'active';
const sectionButtons = document.querySelectorAll('.my-library-space__btn');
let activeSection = null;

sectionButtons?.forEach(button => button.addEventListener('click', (e) => {
  sectionButtons.forEach(button => button.classList.remove(ACTIVE_SECTION_CLASS));
  const targetButton = e.target;
  targetButton.classList.add(ACTIVE_SECTION_CLASS);

}))

// WYKONANIE KODU ZWIĄZANEGO ZE ZMIANĄ WIDOKU SEKCJI (menu my-library)

const ACTIVE_SECTION_CLASS_NAV_LIBRARY= 'active';
const sectionButtonsNavLibrary = document.querySelectorAll('.nav__side-nav-link');
let activeSectionNavLibrary = null;

sectionButtonsNavLibrary?.forEach(button => button.addEventListener('click', (e) => {
  sectionButtonsNavLibrary.forEach(button => button.classList.remove(ACTIVE_SECTION_CLASS_NAV_LIBRARY));
  const targetButtonNavLibrary = e.target;
  targetButtonNavLibrary.classList.add(ACTIVE_SECTION_CLASS_NAV_LIBRARY);

}))