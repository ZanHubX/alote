/* ==================================================
   ALOTE — GLOBAL CONFIGURATION
================================================== */

window.ALOTE_CONFIG = {

    API_BASE_URL:
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost"

            ? "http://127.0.0.1:8000/api"

            : "https://alote.onrender.com/api",


    STORAGE_BASE_URL:
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "localhost"

            ? "http://127.0.0.1:8000/storage"

            : "https://alote.onrender.com/storage"

};