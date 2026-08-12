// ==========================================
// WETrendingTeam
// Admin Login
// ==========================================


// ==========================================
// FIREBASE APP
// ==========================================

import {
app
} from "./firebase-config.js";


// ==========================================
// FIREBASE AUTHENTICATION
// ==========================================

import {
getAuth,
signInWithEmailAndPassword,
setPersistence,
browserLocalPersistence,
browserSessionPersistence,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// INITIALIZE AUTH
// ==========================================

const auth = getAuth(app);


// ==========================================
// ADMIN EMAIL
// ==========================================
//
// This is the authorized Admin email.
// Do NOT change this unless the Firebase
// Admin account itself changes.
//

const ADMIN_EMAIL = "wetrendingteam@gmail.com";


// ==========================================
// HTML ELEMENTS
// ==========================================

const loginForm =
document.getElementById("adminLoginForm");

const emailInput =
document.getElementById("adminEmail");

const passwordInput =
document.getElementById("adminPassword");

const rememberInput =
document.getElementById("rememberMe");

const loginButton =
document.getElementById("adminLoginButton");

const statusBox =
document.getElementById("adminLoginStatus");

const resetButton =
document.getElementById("adminResetLink");


// ==========================================
// STATUS MESSAGE
// ==========================================

function status(message, error = false) {

if (!statusBox) {
return;
}

statusBox.textContent = message;

statusBox.style.color = error
? "#b42318"
: "#475467";
}


// ==========================================
// FIREBASE ERROR TRANSLATOR
// ==========================================

function friendlyError(error) {

switch (error.code) {

case "auth/invalid-email":
return "The email address is not valid.";

case "auth/user-not-found":
return "No Firebase account was found with this email.";

case "auth/wrong-password":
return "The password is incorrect.";

case "auth/invalid-credential":
return "The email or password is incorrect.";

case "auth/too-many-requests":
return "Too many login attempts. Please wait and try again.";

case "auth/user-disabled":
return "This Firebase account has been disabled.";

case "auth/network-request-failed":
return "Network error. Check your internet connection.";

case "auth/operation-not-allowed":
return "Email/password login is not enabled in Firebase.";

case "auth/unauthorized-domain":
return "This GitHub Pages domain is not authorized in Firebase.";

case "auth/internal-error":
return "Firebase returned an internal error. Please try again.";

default:
return error.message ||
"Login failed. Please try again.";
}
}


// ==========================================
// CHECK REQUIRED HTML ELEMENTS
// ==========================================

if (!loginForm) {

console.error(
"Admin Login Error: #adminLoginForm was not found."
);

} else {


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
"submit",
async (event) => {

event.preventDefault();


// --------------------------------------
// GET EMAIL
// --------------------------------------

const email =
emailInput
? emailInput.value.trim().toLowerCase()
: "";


// --------------------------------------
// GET PASSWORD
// --------------------------------------

const password =
passwordInput
? passwordInput.value
: "";


// --------------------------------------
// VALIDATION
// --------------------------------------

if (!email || !password) {

status(
"Enter your email and password.",
true
);

return;
}


// --------------------------------------
// ADMIN EMAIL AUTHORIZATION
// --------------------------------------

if (
email !== ADMIN_EMAIL.toLowerCase()
) {

status(
"This email is not authorized for the Admin Panel.",
true
);

return;
}


// --------------------------------------
// DISABLE LOGIN BUTTON
// --------------------------------------

if (loginButton) {

loginButton.disabled = true;

loginButton.textContent =
"Signing in...";
}


status(
"Connecting to Firebase..."
);


try {

// ------------------------------------
// LOGIN PERSISTENCE
// ------------------------------------

await setPersistence(
auth,
rememberInput && rememberInput.checked
? browserLocalPersistence
: browserSessionPersistence
);


// ------------------------------------
// FIREBASE LOGIN
// ------------------------------------

const result =
await signInWithEmailAndPassword(
auth,
email,
password
);


// ------------------------------------
// LOGGED-IN USER
// ------------------------------------

const user =
result.user;


// ------------------------------------
// FINAL EMAIL SECURITY CHECK
// ------------------------------------

const loggedInEmail =
(user.email || "")
.trim()
.toLowerCase();


if (
loggedInEmail !== ADMIN_EMAIL.toLowerCase()
) {

await auth.signOut();

status(
"This Firebase account is not authorized for the Admin Panel.",
true
);

return;
}


// ------------------------------------
// SAVE LOGIN STATE
// ------------------------------------

localStorage.setItem(
"adminEmail",
loggedInEmail
);

localStorage.setItem(
"adminLoggedIn",
"true"
);


// ------------------------------------
// SUCCESS
// ------------------------------------

status(
"Login successful. Opening Admin Panel..."
);


// ------------------------------------
// OPEN ADMIN DASHBOARD
// ------------------------------------

window.location.href =
"./admin-dashboard.html";

} catch (error) {

console.error(
"Admin login error:",
error
);


status(
friendlyError(error),
true
);


} finally {

if (loginButton) {

loginButton.disabled = false;

loginButton.textContent =
"Login";
}

}

}
);

}


// ==========================================
// PASSWORD RESET
// ==========================================

if (resetButton) {

resetButton.addEventListener(
"click",
async () => {

// ------------------------------------
// GET EMAIL
// ------------------------------------

const email =
emailInput
? emailInput.value.trim().toLowerCase()
: "";


// ------------------------------------
// VALIDATE EMAIL
// ------------------------------------

if (!email) {

status(
"Enter your admin email first.",
true
);

if (emailInput) {
emailInput.focus();
}

return;
}


// ------------------------------------
// ADMIN EMAIL CHECK
// ------------------------------------

if (
email !== ADMIN_EMAIL.toLowerCase()
) {

status(
"Use the Admin email address.",
true
);

return;
}


try {

// ----------------------------------
// SEND RESET EMAIL
// ----------------------------------

await sendPasswordResetEmail(
auth,
email
);


status(
"Password reset email sent. Check your inbox."
);


} catch (error) {

console.error(
"Password reset error:",
error
);


status(
friendlyError(error),
true
);

}

}
);

}