const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modalWindow = document.querySelector('[data-modal]');
const bodyWindow = document.querySelector('body');

openModalBtn.addEventListener('click', () => {
  modalWindow.classList.toggle('hidden');
  bodyWindow.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
  modalWindow.classList.toggle('hidden');
  bodyWindow.style.overflow = 'auto';
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modalWindow.classList.toggle('hidden');
    bodyWindow.style.overflow = 'auto';
  }
});
