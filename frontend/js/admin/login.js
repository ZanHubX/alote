/* ==================================================
   ALOTE ADMIN LOGIN
   BACKEND AUTHENTICATION
================================================== */


/* ==================================================
   API
================================================== */

const API_BASE_URL =
    window.ALOTE_CONFIG.API_BASE_URL;


/* ==================================================
   ELEMENTS
================================================== */

const loginForm =
    document.getElementById(
        "adminLoginForm"
    );


const emailInput =
    document.getElementById(
        "adminEmail"
    );


const passwordInput =
    document.getElementById(
        "adminPassword"
    );


const togglePassword =
    document.getElementById(
        "togglePassword"
    );


const loginError =
    document.getElementById(
        "loginError"
    );


const loginButton =
    document.getElementById(
        "loginButton"
    );


/* ==================================================
   EXISTING AUTH CHECK
================================================== */

const existingToken =
    sessionStorage.getItem(
        "alote-admin-token"
    );


if (existingToken) {

    checkExistingSession();

}


/* ==================================================
   CHECK TOKEN
================================================== */

async function checkExistingSession() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/admin/me`,
                {
                    method:
                        "GET",

                    headers: {

                        "Accept":
                            "application/json",

                        "Authorization":
                            `Bearer ${existingToken}`

                    }
                }
            );


        if (response.ok) {

            window.location.href =
                "dashboard.html";

            return;

        }


        clearAdminSession();


    } catch (error) {

        console.error(
            "Admin session check error:",
            error
        );

    }

}


/* ==================================================
   CLEAR SESSION
================================================== */

function clearAdminSession() {

    sessionStorage.removeItem(
        "alote-admin-token"
    );


    sessionStorage.removeItem(
        "alote-admin-email"
    );


    sessionStorage.removeItem(
        "alote-admin-name"
    );


    sessionStorage.removeItem(
        "alote-admin-session"
    );

}


/* ==================================================
   SHOW / HIDE PASSWORD
================================================== */

if (
    togglePassword &&
    passwordInput
) {

    togglePassword.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type ===
                "password";


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
   ERROR
================================================== */

function hideLoginError() {

    if (!loginError) {

        return;

    }


    loginError.classList.add(
        "hidden"
    );

}


function showLoginError(message) {

    if (!loginError) {

        return;

    }


    loginError.textContent =
        message;


    loginError.classList.remove(
        "hidden"
    );

}


/* ==================================================
   INPUT EVENTS
================================================== */

emailInput?.addEventListener(
    "input",
    hideLoginError
);


passwordInput?.addEventListener(
    "input",
    hideLoginError
);


/* ==================================================
   BUTTON LOADING
================================================== */

function setLoginLoading(isLoading) {

    if (!loginButton) {

        return;

    }


    loginButton.disabled =
        isLoading;


    loginButton.classList.toggle(
        "loading",
        isLoading
    );


    const buttonText =
        loginButton.querySelector(
            ".login-button-text"
        );


    if (!buttonText) {

        return;

    }


    buttonText.textContent =
        isLoading
            ? "Signing in..."
            : "Sign in";

}


/* ==================================================
   LOGIN
================================================== */

loginForm?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        hideLoginError();


        const email =
            emailInput?.value
                .trim()
                .toLowerCase();


        const password =
            passwordInput?.value;


        if (
            !email ||
            !password
        ) {

            showLoginError(
                "Please enter your email and password."
            );

            return;

        }


        setLoginLoading(
            true
        );


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/admin/login`,
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"

                        },

                        body:
                            JSON.stringify({
                                email:
                                    email,

                                password:
                                    password
                            })

                    }
                );


            let result = null;


            try {

                result =
                    await response.json();

            } catch (error) {

                result = null;

            }


            if (!response.ok) {

                if (
                    response.status === 401
                ) {

                    showLoginError(
                        "Invalid email or password."
                    );

                } else if (
                    response.status === 422
                ) {

                    showLoginError(
                        "Please enter a valid email and password."
                    );

                } else {

                    showLoginError(
                        result?.message ||
                        "Unable to sign in."
                    );

                }


                if (passwordInput) {

                    passwordInput.value =
                        "";

                    passwordInput.focus();

                }


                return;

            }


            if (!result?.token) {

                showLoginError(
                    "Login token was not received."
                );

                return;

            }


            /* ------------------------------------------
               SAVE AUTH TOKEN
            ------------------------------------------ */

            sessionStorage.setItem(
                "alote-admin-token",
                result.token
            );


            sessionStorage.setItem(
                "alote-admin-session",
                "authenticated"
            );


            if (result.user?.email) {

                sessionStorage.setItem(
                    "alote-admin-email",
                    result.user.email
                );

            }


            if (result.user?.name) {

                sessionStorage.setItem(
                    "alote-admin-name",
                    result.user.name
                );

            }


            /* ------------------------------------------
               REDIRECT
            ------------------------------------------ */

            window.location.href =
                "dashboard.html";


        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );


            showLoginError(
                "Unable to connect to the server."
            );


        } finally {

            setLoginLoading(
                false
            );

        }

    }
);