// ==========================================
// WETrendingTeam
// Firebase Configuration
// ==========================================


// Firebase App
import {
 initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


// ==========================================
// FIREBASE CONFIGURATION
// ==========================================
//
// IMPORTANT:
// Keep the values from your EXISTING Firebase
// project.
//
// Do NOT create a new Firebase project.
//
// Do NOT use Firebase Compat here.
//

const firebaseConfig = {

 apiKey:
 "BAw-ZA0fgoyK9bcUVcbZOeI_0oRNJZBtSkxRcPDJGba3nXRdo27FV4L0qHTZd_K7z_RE3qCToyK34gwMivNNBdE",

 authDomain:
 "wetrendingteam-1f8ce.firebaseapp.com",

 projectId:
 "wetrendingteam-1f8ce",

 storageBucket:
 "wetrendingteam-1f8ce.firebasestorage.app",

 messagingSenderId:
 "wetrendingteam-1f8ce",

 appId:
 "1:123456789:web:xxxxxxxx",

 measurementId:
 "G-21NRQ5TYPB"
};
 

// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app =
 initializeApp(firebaseConfig);


// ==========================================
// EXPORT
// ==========================================

export {
 app,
 firebaseConfig
};