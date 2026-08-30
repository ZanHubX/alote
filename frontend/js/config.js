/* ==================================================
   ALOTE — GLOBAL CONFIGURATION
================================================== */

window.ALOTE_CONFIG = {

    /*
     * Local development:
     * Frontend = 127.0.0.1:5500
     * Backend  = 127.0.0.1:8000
     *
     * Production:
     * Frontend + Backend = alotemm.com
     */

    API_BASE_URL:
        window.location.hostname === "127.0.0.1" ||
            window.location.hostname === "localhost"

            ? "http://127.0.0.1:8000/api"

            : "/api",


    STORAGE_BASE_URL:
        window.location.hostname === "127.0.0.1" ||
            window.location.hostname === "localhost"

            ? "http://127.0.0.1:8000/storage"

            : "/storage"

};