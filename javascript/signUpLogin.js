// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3fZRbD0VoHqatvQShyZJO-nDgRlgQKGI",
  authDomain: "meetsync-adadf.firebaseapp.com",
  projectId: "meetsync-adadf",
  storageBucket: "meetsync-adadf.appspot.com",
  messagingSenderId: "723448905050",
  appId: "1:723448905050:web:d8a3934b356f8680358763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let SignupForm = document.getElementById("SignupForm");
SignupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.style.display = "flex"; //!Spinner
  let password = document.getElementById("password").value;
  let cnf_pass = document.getElementById("cnfpass").value;

  if (password !== cnf_pass) {
    swal("Check Password!", "Passwords don't match", "warning");
    spinner.style.display = "none"; //!Spinner
    return;
  }

  let userdetails = {
    name: SignupForm.name.value,
    email: SignupForm.email.value,
    password: password,
  };

  try {
    // Firebase Sign-Up
    let userCredential = await createUserWithEmailAndPassword(auth, userdetails.email, userdetails.password);
    let user = userCredential.user;

    // Optionally update the user's profile with the name
    await updateProfile(user, {
      displayName: userdetails.name,
    });

    spinner.style.display = "none"; //!Spinner
    swal("Signup Successful", "Please Login", "success");
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    swal("Error", error.message, "error");
    console.error("Error in Firebase Sign-Up:", error);
  }
});

let LoginForm = document.getElementById("LoginForm");
LoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.style.display = "flex"; //!Spinner

  let loginDetails = {
    email: LoginForm.login_email.value,
    password: LoginForm.login_pass.value,
  };

  try {
    // Firebase Login
    let userCredential = await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password);
    let user = userCredential.user;

    // Storing user details in local storage
    localStorage.setItem("accessToken", await user.getIdToken());
    localStorage.setItem("username", user.displayName || "Anonymous");
    localStorage.setItem("useremail", user.email);

    spinner.style.display = "none"; //!Spinner
    swal("Login Successful", "Redirecting to Dashboard...", "success");
    setTimeout(() => {
      spinner.style.display = "none"; //!Spinner
      window.location.href = "Dashboard.html";
    }, 1000);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    swal("Login Failed", error.message, "error");
    console.error("Error in Firebase Login:", error);
  }
});
