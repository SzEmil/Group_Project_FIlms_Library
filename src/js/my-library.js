
const ACTIVE_SECTION_CLASS = 'active';
const sectionButtons = document.querySelectorAll('.my-library-space__btn');
let activeSection = null;

sectionButtons?.forEach(button => button.addEventListener('click', (e) => {
  sectionButtons.forEach(button => button.classList.remove(ACTIVE_SECTION_CLASS));
  const targetButton = e.target;
  targetButton.classList.add(ACTIVE_SECTION_CLASS);

  // WYKONANIE KODU ZWIĄZANEGO ZE ZMIANĄ WIDOKU SEKCJI (watched/queue)

  //---

}))

