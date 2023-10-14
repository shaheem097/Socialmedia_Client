import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBX70ihyUMRssrs1n9Y-hJ-z8zEdvYZj6Y",
    authDomain: "cosmobic.firebaseapp.com",
    projectId: "cosmobic",
    storageBucket: "cosmobic.appspot.com",
    messagingSenderId: "697917987684",
    appId: "1:697917987684:web:6a9ae29acbd8d4b3583871",
    measurementId: "G-T1LS3GQ9RG"
  };

  const app = initializeApp(firebaseConfig);


  const auth = getAuth(app); // Exporting the Firebase Auth instance
  
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  
  export { auth, provider }; 