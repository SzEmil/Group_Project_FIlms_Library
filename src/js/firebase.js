'use strict';
//Aby działało musicie wpisać npm install firebase jeśli chcecie sie pobawić z kodem
//Potem dajcie jeszcze npm install notifix

import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, push, child, update } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const homeLink = document.querySelector('#home-link');
// const myLibraryLink = document.querySelector('#my-library-link');
// myLibraryLink.style.display = 'none';
// const signOutItem = document.querySelector('#sign-out-item');
// signOutItem.style.display = 'none';

const signOutButton = document.querySelector('#sign-out-btn');

const windowHeight = window.innerHeight;
const firebaseBlock = document.querySelector('.firebase_block');
firebaseBlock.style.top = windowHeight / 2 + 'px';
firebaseBlock.style.transform = 'translateY(-50%)';

const modalDiv = document.querySelector('.firebase_modal');
modalDiv.classList.add('fade-in');
// modalDiv.style.display = 'block';

// Po zakończeniu animacji ukryj okno modalne z animacją zanikania
const hideModal = () => {
  modalDiv.classList.add('fade-out');
  modalDiv.addEventListener('animationend', () => {
    modalDiv.style.display = 'none';
  });
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAf3rTg56vrMk1Dnhiwfnq9jZgD80Ti4wA',

  authDomain: 'filmoteka-c9440.firebaseapp.com',

  projectId: 'filmoteka-c9440',

  storageBucket: 'filmoteka-c9440.appspot.com',

  messagingSenderId: '297920988628',

  appId: '1:297920988628:web:8deb2ba1a1bce68bf1c241',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// const database = firebase.database();

const saveuser = event => {
  const formFirebase = document.querySelector('.form-firebase');
  event.preventDefault();
  const {
    elements: { username, email, password },
  } = formFirebase;
  const usernameData = username.value;
  const emailData = email.value;
  const passwordData = password.value;

  if (passwordData.length < 6) {
    Notiflix.Notify.failure('Too short password. Use at least 6 characters');
  } else {
    createUserWithEmailAndPassword(auth, emailData, passwordData)
      .then(userCredential => {
        const user = userCredential.user;

        set(ref(database, 'users/' + user.uid), {
          username: usernameData,
          email: emailData,
          password: passwordData,
          // profile_picture : imageUrl
        })
          .then(() => {
            Notiflix.Notify.success('User saved!');
            hideModal();
            firebaseBlock.classList.remove('backdrop');
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(error);
      });
  }
};

const loginUser = event => {
  const formFirebaseLogin = document.querySelector('.form-firebase-login');
  event.preventDefault();
  const {
    elements: { email, password },
  } = formFirebaseLogin;
  const emailData = email.value;
  const passwordData = password.value;

  signInWithEmailAndPassword(auth, emailData, passwordData)
    .then(userCredential => {
      const user = userCredential.user;
      const lgDate = Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
        // profile_picture : imageUrl
      })
        .then(() => {
          Notiflix.Notify.success('User logged in succesfully!');
          hideModal();
          firebaseBlock.classList.remove('backdrop');
        })
        .catch(error => {
          Notiflix.Notify.failure('User not found, check email or password');
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.failure('User not found, check email or password');
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      Notiflix.Notify.success('User logged out succesfully!');
      signOutButton.removeEventListener('click', signOutUser);
      signOutButton.style.display = 'none';
    })
    .catch(error => {
      console.error(error);
    });
};

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in
    const signOutItem = document.querySelector('#sign-out-item');
    const uid = user.uid;

    signOutItem.style.display = 'inline';

    homeLink.classList.add('active');
    loginBtn.classList.remove('active');
    loginBtn.style.display = 'none';
    modalDiv.innerHTML = '';
    window.removeEventListener('click', closeModal);
    signOutButton.style.display = 'inline';
    signOutButton.addEventListener('click', signOutUser);

    // ...
  } else {
    // User is signed out
    const signOutItem = document.querySelector('#sign-out-item');

    signOutItem.style.display = 'none';
    loginBtn.style.display = 'inline';
  }
});

function closeModalOnClick() {
  homeLink.classList.add('active');
  loginBtn.classList.remove('active');

  const closeModalBtn = document.querySelector('.form-firebase__closeBtn');
  closeModalBtn.removeEventListener('click', closeModalOnClick);

  modalDiv.innerHTML = '';
  firebaseBlock.classList.toggle('backdrop');

  modalDiv.classList.remove('fade-in');
  modalDiv.classList.remove('fade-out');
  // modalDiv.style.display = 'none';
  // formFirebase.removeEventListener('submit', saveuser);
  // formFirebaseLogin.removeEventListener('submit', loginUser);

  window.removeEventListener('click', closeModal);
  let body = document.querySelector('body');
  body.style.overflow = 'auto';
}

function closeModal(event) {
  if (event.target.classList.contains('backdrop') === false) {
    return;
  } else {
    homeLink.classList.add('active');
    loginBtn.classList.remove('active');

    const closeModalBtn = document.querySelector('.form-firebase__closeBtn');
    closeModalBtn.removeEventListener('click', closeModalOnClick);

    modalDiv.innerHTML = '';
    firebaseBlock.classList.toggle('backdrop');

    modalDiv.classList.remove('fade-in');
    modalDiv.classList.remove('fade-out');
    // modalDiv.style.display = 'none';
    // formFirebase.removeEventListener('submit', saveuser);
    // formFirebaseLogin.removeEventListener('submit', loginUser);

    window.removeEventListener('click', closeModal);

    let body = document.querySelector('body');
    body.style.overflow = 'auto';
  }
}

const generateRegisterForm = () => {
  modalDiv.style.display = 'block';
  let body = document.querySelector('body');
  body.style.overflow = 'hidden';

  homeLink.classList.remove('active');
  loginBtn.classList.add('active');
  firebaseBlock.classList.toggle('backdrop');
  modalDiv.classList.add('fade-in');
  // modalDiv.style.display = 'block';
  modalDiv.innerHTML = `
  <form class="form-firebase">
  <button type="button" class="form-firebase__closeBtn">X</button>
    <h2 class="form-firebase__title">Registration</h2>
    <div class="form-firebase__field">
      <label for="register-username" class="form-firebase__label"
        >Username</label
      >
      <input
        type="text"
        name="username"
        id="register-username"
        class="form-firebase__input"
        placeholder="Wprowadź swój username"
        required
      />
    </div>
    <div class="form-firebase__field">
      <label for="register-email" class="form-firebase__label">Email</label>
      <input
        type="email"
        name="email"
        id="register-email"
        class="form-firebase__input"
        placeholder="Wprowadź swój adres email"
        required
      />
    </div>
    <div class="form-firebase__field">
      <label for="register-password" class="form-firebase__label"
        >Password</label
      >
      <input
        type="password"
        name="password"
        id="register-password"
        class="form-firebase__input"
        placeholder="Wprowadź swoje hasło"
        required
      />
    </div>
    <button
      type="submit"
      id="firebase-submit"
      class="form-firebase__button"
    >
      Register
    </button>
    <p class="form-firebase__paragraph">Already have an account?<button type="button" id="changeToLoginModal">Login in</button></p>
  </form>
</div>
`;

  const formFirebase = document.querySelector('.form-firebase');
  formFirebase.addEventListener('submit', saveuser);

  window.addEventListener('click', closeModal);

  const changeToLoginModalBtn = document.querySelector('#changeToLoginModal');
  changeToLoginModalBtn.addEventListener('click', changeToLoginModal);

  const closeModalBtn = document.querySelector('.form-firebase__closeBtn');
  closeModalBtn.addEventListener('click', closeModalOnClick);
};

function changeToLoginModal() {
  modalDiv.innerHTML = '';
  modalDiv.innerHTML = `      <form class="form-firebase-login">
  <button type="button" class="form-firebase__closeBtn">X</button>
  <h2 class="form-firebase__title">Login in</h2>

  <div class="form-firebase__field">
    <label for="register-email" class="form-firebase__label">Email</label>
    <input
      type="email"
      name="email"
      id="register-email"
      class="form-firebase__input"
      placeholder="Wprowadź swój adres email"
      required
    />
  </div>
  <div class="form-firebase__field">
    <label for="register-password" class="form-firebase__label"
      >Password</label
    >
    <input
      type="password"
      name="password"
      id="register-password"
      class="form-firebase__input"
      placeholder="Wprowadź swoje hasło"
      required
    />
  </div>
  <button
    type="submit"
    id="firebase-submit"
    class="form-firebase__button"
  >
    Log in
  </button>
  <p class="form-firebase__paragraph"> No account? Dont worry <button type ="button" id="changeToRegisterModal">Register</button> now</p>
</form>`;

  const formFirebaseLogin = document.querySelector('.form-firebase-login');
  formFirebaseLogin.addEventListener('submit', loginUser);

  const closeModalBtn = document.querySelector('.form-firebase__closeBtn');
  closeModalBtn.addEventListener('click', closeModalOnClick);

  const changeToRegisterModal = document.querySelector(
    '#changeToRegisterModal'
  );
  changeToRegisterModal.addEventListener(
    'click',
    function changeToRegisterModal() {
      const formFirebaseLogin = document.querySelector('.form-firebase-login');
      formFirebaseLogin.removeEventListener('submit', loginUser);

      modalDiv.innerHTML = '';
      modalDiv.innerHTML = `
    <form class="form-firebase">
    <button type="button" class="form-firebase__closeBtn">X</button>
      <h2 class="form-firebase__title">Registration</h2>
      <div class="form-firebase__field">
        <label for="register-username" class="form-firebase__label"
          >Username</label
        >
        <input
          type="text"
          name="username"
          id="register-username"
          class="form-firebase__input"
          placeholder="Wprowadź swój username"
          required
        />
      </div>
      <div class="form-firebase__field">
        <label for="register-email" class="form-firebase__label">Email</label>
        <input
          type="email"
          name="email"
          id="register-email"
          class="form-firebase__input"
          placeholder="Wprowadź swój adres email"
          required
        />
      </div>
      <div class="form-firebase__field">
        <label for="register-password" class="form-firebase__label"
          >Password</label
        >
        <input
          type="password"
          name="password"
          id="register-password"
          class="form-firebase__input"
          placeholder="Wprowadź swoje hasło"
          required
        />
      </div>
      <button
        type="submit"
        id="firebase-submit"
        class="form-firebase__button"
      >
        Register
      </button>
      <p class="form-firebase__paragraph">Already have an account?<button type="button" id="changeToLoginModal">Sign in</button></p>
    </form>
  </div>
  `;

      const formFirebase = document.querySelector('.form-firebase');
      formFirebase.addEventListener('submit', saveuser);

      window.addEventListener('click', closeModal);

      const changeToLoginModalBtn = document.querySelector(
        '#changeToLoginModal'
      );
      changeToLoginModalBtn.addEventListener('click', changeToLoginModal);

      const closeModalBtn = document.querySelector('.form-firebase__closeBtn');
      closeModalBtn.addEventListener('click', closeModalOnClick);
    }
  );
}

loginBtn.addEventListener('click', generateRegisterForm);
