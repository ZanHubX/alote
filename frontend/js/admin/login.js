/* ==================================================
   ALOTE ADMIN LOGIN
   TEMPORARY FRONTEND AUTHENTICATION
================================================== */


/* ==================================================
   TEMPORARY ADMIN ACCOUNT
   -----------------------------------------------
   IMPORTANT:
   This is only for the frontend prototype.
   Move authentication to the backend later.
================================================== */

const ADMIN_EMAIL =
    "admin@alote.com";


const ADMIN_PASSWORD =
    "ALoteAdmin@2026";


/* ==================================================
   ELEMENTS
================================================== */

const loginForm =
    document.getElementById("adminLoginForm");


const emailInput =
    document.getElementById("adminEmail");


const passwordInput =
    document.getElementById("adminPassword");


const togglePassword =
    document.getElementById("togglePassword");


const loginError =
    document.getElementById("loginError");


const loginButton =
    document.getElementById("loginButton");


/* ==================================================
   CHECK EXISTING SESSION
================================================== */

const adminSession =
    sessionStorage.getItem("alote-admin-session");


if (adminSession === "authenticated") {

    window.location.href =
        "dashboard.html";

}


/* ==================================================
   SHOW / HIDE PASSWORD
================================================== */

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type === "password";


            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            togglePassword.textContent =
                isPassword
                    ? "Hide"
                    : "Show";


            togglePassword.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

        }
    );

}


/* ==================================================
   HIDE ERROR WHEN USER TYPES
================================================== */

function hideLoginError() {

    if (!loginError) {
        return;
    }

    loginError.classList.add("hidden");

}


emailInput?.addEventListener(
    "input",
    hideLoginError
);


passwordInput?.addEventListener(
    "input",
    hideLoginError
);


/* ==================================================
   LOGIN
================================================== */

loginForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        const password =
            passwordInput.value;


        hideLoginError();


        /* ------------------------------------------
           VALIDATE
        ------------------------------------------ */

        if (
            email !== ADMIN_EMAIL.toLowerCase() ||
            password !== ADMIN_PASSWORD
        ) {

            loginError.textContent =
                "Invalid email or password.";

            loginError.classList.remove(
                "hidden"
            );

            passwordInput.value = "";

            passwordInput.focus();

            return;

        }


        /* ------------------------------------------
           LOGIN SUCCESS
        ------------------------------------------ */

        sessionStorage.setItem(
            "alote-admin-session",
            "authenticated"
        );


        sessionStorage.setItem(
            "alote-admin-email",
            ADMIN_EMAIL
        );


        /* ------------------------------------------
           BUTTON STATE
        ------------------------------------------ */

        loginButton.classList.add(
            "loading"
        );


        loginButton.disabled = true;


        const buttonText =
            loginButton.querySelector(
                ".login-button-text"
            );


        if (buttonText) {

            buttonText.textContent =
                "Signing in...";

        }


        /* ------------------------------------------
           REDIRECT
        ------------------------------------------ */

        setTimeout(
            () => {

                window.location.href =
                    "dashboard.html";

            },
            400
        );

    }
);