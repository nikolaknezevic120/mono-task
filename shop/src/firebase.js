import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8NH5fdJ0BZ_A5TsFjwceqBCcFBm1pGZw",
  authDomain: "monoshop-c656a.firebaseapp.com",
  databaseURL: "https://monoshop-c656a-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "monoshop-c656a",
  storageBucket: "monoshop-c656a.appspot.com",
  messagingSenderId: "882837646791",
  appId: "1:882837646791:web:e19adf0ad3c793c2d2bde2",
  measurementId: "G-B55Y8KXH57"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
