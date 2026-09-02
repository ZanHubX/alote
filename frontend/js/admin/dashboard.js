/* ==================================================
   ALote Admin Dashboard
================================================== */


/* ==================================================
   API + ADMIN AUTHENTICATION
================================================== */

const API_BASE_URL =
    window.ALOTE_CONFIG.API_BASE_URL;


const adminToken =
    sessionStorage.getItem(
        "alote-admin-token"
    );


if (!adminToken) {

    window.location.href =
        "login.html";

}


/* ==================================================
   AUTH HEADERS
================================================== */

function getAuthHeaders() {

    return {

        "Accept":
            "application/json",

        "Authorization":
            `Bearer ${adminToken}`

    };

}


/* ==================================================
   CLEAR ADMIN SESSION
================================================== */

function clearAdminSession() {

    sessionStorage.removeItem(
        "alote-admin-token"
    );

    sessionStorage.removeItem(
        "alote-admin-session"
    );

    sessionStorage.removeItem(
        "alote-admin-email"
    );

    sessionStorage.removeItem(
        "alote-admin-name"
    );

}


/* ==================================================
   DASHBOARD DATA
================================================== */

let dashboardData = {

    statistics: {

        totalJobs: 0,

        pendingJobs: 0,

        totalApplications: 0,

        newApplications: 0,

        todayVisitors: 0,

        totalVisitors: 0,

        totalPageViews: 0

    },

    pendingSubmissions: [],

    recentApplications: []

};


/* ==================================================
   LOAD DASHBOARD
================================================== */

async function loadDashboardFromBackend() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/admin/dashboard`,
                {

                    method:
                        "GET",

                    headers:
                        getAuthHeaders()

                }
            );


        /* ------------------------------------------
           UNAUTHORIZED
        ------------------------------------------ */

        if (
            response.status === 401
        ) {

            clearAdminSession();

            window.location.href =
                "login.html";

            return false;

        }


        if (!response.ok) {

            throw new Error(
                `Unable to load dashboard. Status: ${response.status}`
            );

        }


        const result =
            await response.json();


        const data =
            result.data;


        if (!data) {

            throw new Error(
                "Dashboard data was not received."
            );

        }


        /* ------------------------------------------
           STATISTICS
        ------------------------------------------ */

        dashboardData.statistics = {

            totalJobs:
                data.total_jobs ?? 0,

            pendingJobs:
                data.pending_submissions ?? 0,

            totalApplications:
                data.total_applications ?? 0,

            newApplications:
                data.new_applications ?? 0,

            todayVisitors:
                data.today_visitors ?? 0,

            totalVisitors:
                data.total_visitors ?? 0,

            totalPageViews:
                data.total_page_views ?? 0

        };


        /* ------------------------------------------
           PENDING SUBMISSIONS
        ------------------------------------------ */

        const pendingSubmissions =
            Array.isArray(
                data.recent_pending_submissions
            )
                ? data.recent_pending_submissions
                : [];


        dashboardData.pendingSubmissions =
            pendingSubmissions.map(
                item => ({

                    id:
                        `SUB-${item.id}`,

                    title:
                        item.title ||
                        "Not available",

                    company:
                        item.employer?.company_name ||
                        "Not available",

                    location:
                        item.location ||
                        "Not specified",

                    workType:
                        item.work_mode ||
                        "Not specified",

                    employmentType:
                        item.job_type ||
                        "Not specified",

                    submitted:
                        item.created_at
                            ? new Date(
                                item.created_at
                            ).toLocaleDateString(
                                "en-US",
                                {
                                    month:
                                        "short",

                                    day:
                                        "numeric"
                                }
                            )
                            : "",

                    status:
                        "Pending"

                })
            );


        /* ------------------------------------------
           RECENT APPLICATIONS
        ------------------------------------------ */

        const recentApplications =
            Array.isArray(
                data.recent_applications
            )
                ? data.recent_applications
                : [];


        dashboardData.recentApplications =
            recentApplications.map(
                item => {

                    const rawStatus =
                        item.status ||
                        "pending";


                    let status =
                        rawStatus;


                    if (
                        rawStatus === "pending"
                    ) {

                        status =
                            "New";

                    } else if (
                        rawStatus === "review"
                    ) {

                        status =
                            "Under Review";

                    } else {

                        status =
                            rawStatus
                                .charAt(0)
                                .toUpperCase() +
                            rawStatus.slice(1);

                    }


                    return {

                        name:
                            item.job_seeker
                                ?.full_name ||
                            "Not available",

                        job:
                            item.job_post
                                ?.title ||
                            "Not available",

                        company:
                            item.job_post
                                ?.employer
                                ?.company_name ||
                            "Not available",

                        status:
                            status,

                        time:
                            item.applied_at
                                ? new Date(
                                    item.applied_at
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        month:
                                            "short",

                                        day:
                                            "numeric"
                                    }
                                )
                                : ""

                    };

                }
            );


        return true;


    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );


        return false;

    }

}


/* ==================================================
   DOM HELPERS
================================================== */

function getElement(id) {

    return document.getElementById(
        id
    );

}


/* ==================================================
   STATISTICS
================================================== */

function renderStatistics() {

    const todayVisitors =
        getElement(
            "todayVisitors"
        );


    const totalVisitors =
        getElement(
            "totalVisitors"
        );


    const totalPageViews =
        getElement(
            "totalPageViews"
        );


    const totalJobs =
        getElement(
            "totalJobs"
        );


    const pendingJobs =
        getElement(
            "pendingJobs"
        );


    const totalApplications =
        getElement(
            "totalApplications"
        );


    const newApplications =
        getElement(
            "newApplications"
        );


    if (todayVisitors) {

        todayVisitors.textContent =
            dashboardData
                .statistics
                .todayVisitors;

    }


    if (totalVisitors) {

        totalVisitors.textContent =
            dashboardData
                .statistics
                .totalVisitors;

    }


    if (totalPageViews) {

        totalPageViews.textContent =
            dashboardData
                .statistics
                .totalPageViews;

    }


    if (totalJobs) {

        totalJobs.textContent =
            dashboardData
                .statistics
                .totalJobs;

    }


    if (pendingJobs) {

        pendingJobs.textContent =
            dashboardData
                .statistics
                .pendingJobs;

    }


    if (totalApplications) {

        totalApplications.textContent =
            dashboardData
                .statistics
                .totalApplications;

    }


    if (newApplications) {

        newApplications.textContent =
            dashboardData
                .statistics
                .newApplications;

    }


    /* ------------------------------------------
       SIDEBAR BADGES
    ------------------------------------------ */

    const pendingBadge =
        getElement(
            "pendingJobsBadge"
        );


    const applicationsBadge =
        getElement(
            "newApplicationsBadge"
        );


    if (pendingBadge) {

        pendingBadge.textContent =
            dashboardData
                .statistics
                .pendingJobs;

    }


    if (applicationsBadge) {

        applicationsBadge.textContent =
            dashboardData
                .statistics
                .newApplications;

    }

}


/* ==================================================
   PENDING SUBMISSIONS
================================================== */

function renderPendingSubmissions() {

    const container =
        getElement(
            "pendingSubmissions"
        );


    if (!container) {

        return;

    }


    const submissions =
        dashboardData
            .pendingSubmissions;


    if (!submissions.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ◫
                </div>

                <strong>
                    No pending submissions
                </strong>

                <p>
                    New employer submissions will appear here.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML =
        submissions
            .slice(
                0,
                3
            )
            .map(
                submission => `

                    <article
                        class="submission-item"
                        data-id="${escapeHTML(
                    submission.id
                )}"
                    >

                        <div class="submission-company-avatar">

                            ${escapeHTML(
                    getInitials(
                        submission.company
                    )
                )}

                        </div>


                        <div class="submission-info">

                            <strong>

                                ${escapeHTML(
                    submission.title
                )}

                            </strong>


                            <span class="submission-company">

                                ${escapeHTML(
                    submission.company
                )}

                            </span>


                            <span class="submission-meta">

                                ${escapeHTML(
                    submission.location
                )}

                                ·

                                ${escapeHTML(
                    submission.workType
                )}

                                ·

                                ${escapeHTML(
                    submission.employmentType
                )}

                            </span>

                        </div>


                        <div class="submission-right">

                            <span class="status-pill pending">

                                ${escapeHTML(
                    submission.status
                )}

                            </span>


                            <span class="submission-time">

                                ${escapeHTML(
                    submission.submitted
                )}

                            </span>

                        </div>

                    </article>

                `
            )
            .join("");

}


/* ==================================================
   RECENT APPLICATIONS
================================================== */

function renderRecentApplications() {

    const container =
        getElement(
            "recentApplications"
        );


    if (!container) {

        return;

    }


    const applications =
        dashboardData
            .recentApplications;


    if (!applications.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ◎
                </div>

                <strong>
                    No applications yet
                </strong>

                <p>
                    New applications will appear here.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML =
        applications
            .slice(
                0,
                4
            )
            .map(
                application => `

                    <article
                        class="application-item"
                    >

                        <div class="application-avatar">

                           ${escapeHTML(
                               getInitials(
                                   application.name
                               )
                           )}

                        </div>


                        <div class="application-info">

                            <strong>

                                ${escapeHTML(
                    application.name
                )}

                            </strong>


                            <span>

                                Applied for

                                <b>

                                    ${escapeHTML(
                    application.job
                )}

                                </b>

                            </span>


                            <small>

                                ${escapeHTML(
                    application.company
                )}

                            </small>

                        </div>


                        <div class="application-right">

                            <span
                                class="status-pill ${escapeHTML(
                                    getStatusClass(
                                        application.status
                                    )
                                )}"
                            >

                                ${escapeHTML(
                    application.status
                )}

                            </span>


                            <time>

                                ${escapeHTML(
                    application.time
                )}

                            </time>

                        </div>

                    </article>

                `
            )
            .join("");

}


/* ==================================================
   STATUS CLASS
================================================== */

function getStatusClass(status) {

    return String(
        status
    )
        .toLowerCase()
        .replace(
            /\s+/g,
            "-"
        );

}


/* ==================================================
   INITIALS
================================================== */

function getInitials(value) {

    if (!value) {

        return "A";

    }


    return value
        .trim()
        .split(/\s+/)
        .slice(
            0,
            2
        )
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");

}


/* ==================================================
   SECURITY
================================================== */

function escapeHTML(value) {

    return String(
        value
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* ==================================================
   CURRENT DATE
================================================== */

function renderCurrentDate() {

    const dateElement =
        getElement(
            "currentDate"
        );


    if (!dateElement) {

        return;

    }


    const now =
        new Date();


    dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday:
                    "short",

                month:
                    "short",

                day:
                    "numeric",

                year:
                    "numeric"
            }
        );

}


/* ==================================================
   MOBILE SIDEBAR
================================================== */

function initializeMobileSidebar() {

    const menuButton =
        getElement(
            "mobileMenuButton"
        );


    const sidebar =
        getElement(
            "adminSidebar"
        );


    const overlay =
        getElement(
            "sidebarOverlay"
        );


    if (
        !menuButton ||
        !sidebar ||
        !overlay
    ) {

        return;

    }


    function openSidebar() {

        sidebar.classList.add(
            "open"
        );


        overlay.classList.add(
            "visible"
        );


        document.body.classList.add(
            "sidebar-open"
        );

    }


    function closeSidebar() {

        sidebar.classList.remove(
            "open"
        );


        overlay.classList.remove(
            "visible"
        );


        document.body.classList.remove(
            "sidebar-open"
        );

    }


    menuButton.addEventListener(
        "click",
        () => {

            if (
                sidebar.classList.contains(
                    "open"
                )
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    sidebar
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeSidebar
                );

            }
        );

}


/* ==================================================
   ACTIVE ADMIN PAGE
================================================== */

function setActivePage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(
            ".admin-nav-link"
        )
        .forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


                const linkPage =
                    href
                        .split("/")
                        .pop()
                        .toLowerCase();


                link.classList.toggle(
                    "active",
                    linkPage ===
                    currentPage
                );

            }
        );

}


/* ==================================================
   LOGOUT
================================================== */

function initializeLogout() {

    const logoutButton =
        getElement(
            "logoutButton"
        );


    if (!logoutButton) {

        return;

    }


    logoutButton.addEventListener(
        "click",
        async () => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to sign out?"
                );


            if (!confirmed) {

                return;

            }


            try {

                await fetch(
                    `${API_BASE_URL}/admin/logout`,
                    {

                        method:
                            "POST",

                        headers:
                            getAuthHeaders()

                    }
                );


            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            } finally {

                clearAdminSession();


                window.location.href =
                    "login.html";

            }

        }
    );

}


/* ==================================================
   PREVENT BACK BUTTON AFTER LOGOUT
================================================== */

function protectAdminHistory() {

    window.history.replaceState(
        null,
        "",
        window.location.href
    );

}


/* ==================================================
   INITIALIZE DASHBOARD
================================================== */

async function initializeDashboard() {

    const loaded =
        await loadDashboardFromBackend();


    if (!loaded) {

        return;

    }


    renderStatistics();

    renderPendingSubmissions();

    renderRecentApplications();

    renderCurrentDate();

    initializeMobileSidebar();

    setActivePage();

    initializeLogout();

    protectAdminHistory();

}


/* ==================================================
   START
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);