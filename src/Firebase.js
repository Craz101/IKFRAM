import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyAztlxQHUVTvGzhijK9H980e-cKh-gHbeI",
    authDomain: "ikfram-6bb34.firebaseapp.com",
    databaseURL: "https://ikfram-6bb34-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ikfram-6bb34",
    storageBucket: "ikfram-6bb34.appspot.com",
    messagingSenderId: "419864058443",
    appId: "1:419864058443:web:ce8f822e930d9342240bce"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };