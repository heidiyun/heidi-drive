import firebase from "firebase";
import config from "./firebaseConfig";

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth as Auth, db as Database };
