import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoZPN21v6saGBcizv02o6tAgcqpyun0Qg",
  authDomain: "iamgenescusmetichi.firebaseapp.com",
  projectId: "iamgenescusmetichi",
  storageBucket: "iamgenescusmetichi.appspot.com",
  messagingSenderId: "1092809504956",
  appId: "1:1092809504956:web:b036e54dd71643a85078b9",
  measurementId: "G-12XMB6H0MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app as firebase, analytics, storage, database };
export default firebaseConfig;
