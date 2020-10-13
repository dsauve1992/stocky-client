import firebase from "firebase";
import firebaseConfig from "../config/firebase.config.json"

export default function initializeFirebase() {
    firebase.initializeApp(firebaseConfig);
}
