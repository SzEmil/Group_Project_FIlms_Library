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
const myLibraryLink = document.querySelector('#my-library-link');
myLibraryLink.style.display = 'none';
const signOutButton = document.querySelector('#sign-out-btn');

const windowHeight = window.innerHeight;
const firebaseBlock = document.querySelector('.firebase_block');
firebaseBlock.style.top = windowHeight / 2 + 'px';
firebaseBlock.style.transform = 'translateY(-50%)';

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
  event.preventDefault();
  const {
    elements: { username, email, password },
  } = formFirebase;
  const usernameData = username.value;
  const emailData = email.value;
  const passwordData = password.value;

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
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      Notiflix.Notify.success('User logged out succesfully!');
      signOutButton.removeEventListener('click', signOutUser);
      signOutButton.style.display = 'none';
    })
    .catch(error => {
      Notiflix.Notify.failure('User not found, check email or password');
    });
};

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    console.log(user.email);
    console.log(user.uid);
    myLibraryLink.style.display = 'inline';

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
    myLibraryLink.style.display = 'none';
    loginBtn.style.display = 'inline';
    console.log('Wylogowano użytkownika brak danych');
  }
});

function closeModal(event) {
  if (event.target.classList.contains('backdrop') === false) {
    console.log('kliknieto w modal');
    return;
  } else {
    homeLink.classList.add('active');
    loginBtn.classList.remove('active');
    modalDiv.innerHTML = '';
    firebaseBlock.classList.toggle('backdrop');
    window.removeEventListener('click', closeModal);
    formFirebase.removeEventListener('submit', saveuser);
    formFirebaseLogin.removeEventListener('submit', loginUser);
  }
}

const modalDiv = document.querySelector('.firebase_modal');
const generateRegisterForm = () => {
  homeLink.classList.remove('active');
  loginBtn.classList.add('active');
  firebaseBlock.classList.toggle('backdrop');
  modalDiv.innerHTML = `
  <form class="form-firebase">
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
    <p>Already have an account?<button type="button" id="changeToLoginModal">Sign in</button></p>
  </form>
</div>
`;

  const formFirebase = document.querySelector('.form-firebase');
  formFirebase.addEventListener('submit', saveuser);

  window.addEventListener('click', closeModal);

  const changeToLoginModalBtn = document.querySelector('#changeToLoginModal');
  changeToLoginModalBtn.addEventListener('click', changeToLoginModal);
};

function changeToLoginModal() {
  modalDiv.innerHTML = '';
  modalDiv.innerHTML = `      <form class="form-firebase-login">
  <h2 class="form-firebase__title">Log in</h2>

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
</form>`;

  const formFirebaseLogin = document.querySelector('.form-firebase-login');
  formFirebaseLogin.addEventListener('submit', loginUser);
}

loginBtn.addEventListener('click', generateRegisterForm);
