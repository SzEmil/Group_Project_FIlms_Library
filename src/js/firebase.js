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

const formFirebase = document.querySelector('.form-firebase');

const formFirebaseLogin = document.querySelector('.form-firebase-login');

const signoutBtn = document.querySelector('.sign-out-Btn');

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
    // ...
  } else {
    // User is signed out
    console.log('Wylogowano użytkownika brak danych');
  }
});

formFirebase.addEventListener('submit', saveuser);
formFirebaseLogin.addEventListener('submit', loginUser);
signoutBtn.addEventListener('click', signOutUser);
