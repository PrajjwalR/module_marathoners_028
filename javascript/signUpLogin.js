// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
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
    const provider = new GoogleAuthProvider();

    const spinner = document.getElementById("spinner"); // Define spinner globally

    // Google Sign-In
    const googleSignIn = document.getElementById('googlebom');
    googleSignIn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            // alert("Google login initiated");
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            spinner.style.display = "none";
            swal("Login Successful", "Redirecting to Dashboard...", "success");
            setTimeout(() => {
                window.location.href = "Dashboard.html";
            }, 1000);
        } catch (error) {
            const errorMessage = error.message;
            console.error("Error during Google sign-in:", errorMessage);
            swal("Google Sign-In Failed", errorMessage, "error");
        }
    });

    // Sign-Up Form
    const SignupForm = document.getElementById("SignupForm");
    SignupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        spinner.style.display = "flex"; // Show spinner

        let password = document.getElementById("password").value;
        let cnf_pass = document.getElementById("cnfpass").value;

        if (password !== cnf_pass) {
            swal("Check Password!", "Passwords don't match", "warning");
            spinner.style.display = "none"; // Hide spinner
            return;
        }

        let userdetails = {
            name: SignupForm.name.value,
            email: SignupForm.email.value,
            password: password,
        };

        try {
            let userCredential = await createUserWithEmailAndPassword(auth, userdetails.email, userdetails.password);
            let user = userCredential.user;

            // Optionally update the user's profile with the name
            await updateProfile(user, {
                displayName: userdetails.name,
            });

            spinner.style.display = "none"; // Hide spinner
            swal("Signup Successful", "Please Login", "success");
        } catch (error) {
            spinner.style.display = "none"; // Hide spinner
            swal("Error", error.message, "error");
            console.error("Error in Firebase Sign-Up:", error);
        }
    });

    // Login Form
    const LoginForm = document.getElementById("LoginForm");
    LoginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        spinner.style.display = "flex"; // Show spinner

        let loginDetails = {
            email: LoginForm.login_email.value,
            password: LoginForm.login_pass.value,
        };

        try {
            let userCredential = await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password);
            let user = userCredential.user;

            // Storing user details in local storage
            localStorage.setItem("accessToken", await user.getIdToken());
            localStorage.setItem("username", user.displayName || "Anonymous");
            localStorage.setItem("useremail", user.email);

            spinner.style.display = "none"; // Hide spinner
            swal("Login Successful", "Redirecting to Dashboard...", "success");
            setTimeout(() => {
                window.location.href = "Dashboard.html";
            }, 1000);
        } catch (error) {
            spinner.style.display = "none"; // Hide spinner
            swal("Login Failed", error.message, "error");
            console.error("Error in Firebase Login:", error);
        }
    });
});
