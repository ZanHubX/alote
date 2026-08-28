/* ==================================================
   ALote Admin Dashboard
================================================== */


/* ==================================================
   ADMIN AUTHENTICATION
   ------------------------------------------
   Temporary frontend authentication.
   Later this will be replaced by real backend
   authentication.
================================================== */

const adminSession =
    sessionStorage.getItem("alote-admin-session");


if (!adminSession) {

    window.location.href = "login.html";

}


/* ==================================================
   TEMPORARY DASHBOARD DATA
   ------------------------------------------
   This is intentionally temporary.
   Your partner can replace this section with
   API/database data later.
================================================== */

const dashboardData = {

    statistics: {

        totalJobs: 24,

        pendingJobs: 5,

        totalApplications: 87,

        newApplications: 12

    },


    pendingSubmissions: [

        {
            id: "SUB-001",

            title: "Backend Developer",

            company: "ABC Technology",

            location: "Yangon",

            workType: "Remote",

            employmentType: "Full-time",

            submitted: "Today",

            status: "Pending"
        },


        {
            id: "SUB-002",

            title: "UI/UX Designer",

            company: "Creative Studio",

            location: "Yangon",

            workType: "Hybrid",

            employmentType: "Full-time",

            submitted: "Yesterday",

            status: "Pending"
        },


        {
            id: "SUB-003",

            title: "Digital Marketing Specialist",

            company: "NextGen Myanmar",

            location: "Mandalay",

            workType: "On-site",

            employmentType: "Full-time",

            submitted: "2 days ago",

            status: "Pending"
        }

    ],


    recentApplications: [

        {
            name: "Mg Mg",

            job: "Backend Developer",

            company: "ABC Technology",

            status: "Pending",

            time: "10 min ago"
        },


        {
            name: "Su Su",

            job: "UI/UX Designer",

            company: "Creative Studio",

            status: "Reviewed",

            time: "1 hour ago"
        },


        {
            name: "Aung Aung",

            job: "Marketing Executive",

            company: "NextGen Myanmar",

            status: "Pending",

            time: "3 hours ago"
        }

    ]

};



/* ==================================================
   DOM HELPERS
================================================== */

function getElement(id) {

    return document.getElementById(id);

}



/* ==================================================
   STATISTICS
================================================== */

function renderStatistics() {

    const totalJobs =
        getElement("totalJobs");

    const pendingJobs =
        getElement("pendingJobs");

    const totalApplications =
        getElement("totalApplications");

    const newApplications =
        getElement("newApplications");


    if (totalJobs) {

        totalJobs.textContent =
            dashboardData.statistics.totalJobs;

    }


    if (pendingJobs) {

        pendingJobs.textContent =
            dashboardData.statistics.pendingJobs;

    }


    if (totalApplications) {

        totalApplications.textContent =
            dashboardData.statistics.totalApplications;

    }


    if (newApplications) {

        newApplications.textContent =
            dashboardData.statistics.newApplications;

    }


    /* Sidebar badges */

    const pendingBadge =
        getElement("pendingJobsBadge");

    const applicationsBadge =
        getElement("newApplicationsBadge");


    if (pendingBadge) {

        pendingBadge.textContent =
            dashboardData.statistics.pendingJobs;

    }


    if (applicationsBadge) {

        applicationsBadge.textContent =
            dashboardData.statistics.newApplications;

    }

}



/* ==================================================
   PENDING SUBMISSIONS
================================================== */

function renderPendingSubmissions() {

    const container =
        getElement("pendingSubmissions");


    if (!container) {
        return;
    }


    const submissions =
        dashboardData.pendingSubmissions;


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
            .slice(0, 3)
            .map(submission => `

                <article
                    class="submission-item"
                    data-id="${submission.id}"
                >


                    <div class="submission-company-avatar">

                        ${getInitials(
                            submission.company
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

            `)
            .join("");

}



/* ==================================================
   RECENT APPLICATIONS
================================================== */

function renderRecentApplications() {

    const container =
        getElement("recentApplications");


    if (!container) {
        return;
    }


    const applications =
        dashboardData.recentApplications;


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
            .slice(0, 4)
            .map(application => `

                <article
                    class="application-item"
                >


                    <div class="application-avatar">

                        ${getInitials(
                            application.name
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
                            class="status-pill ${getStatusClass(
                                application.status
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

            `)
            .join("");

}



/* ==================================================
   STATUS CLASS
================================================== */

function getStatusClass(status) {

    const normalized =
        String(status)
            .toLowerCase()
            .replace(/\s+/g, "-");


    return normalized;

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
        .slice(0, 2)
        .map(word =>
            word.charAt(0).toUpperCase()
        )
        .join("");

}



/* ==================================================
   SECURITY
   ------------------------------------------
   Prevent temporary data from being inserted
   as executable HTML.
================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}



/* ==================================================
   CURRENT DATE
================================================== */

function renderCurrentDate() {

    const dateElement =
        getElement("currentDate");


    if (!dateElement) {
        return;
    }


    const now =
        new Date();


    dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );

}



/* ==================================================
   MOBILE SIDEBAR
================================================== */

function initializeMobileSidebar() {

    const menuButton =
        getElement("mobileMenuButton");

    const sidebar =
        getElement("adminSidebar");

    const overlay =
        getElement("sidebarOverlay");


    if (
        !menuButton ||
        !sidebar ||
        !overlay
    ) {

        return;

    }


    function openSidebar() {

        sidebar.classList.add("open");

        overlay.classList.add("visible");

        document.body.classList.add(
            "sidebar-open"
        );

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        overlay.classList.remove("visible");

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


    /* Close sidebar after navigation */

    sidebar
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeSidebar
            );

        });

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
        .querySelectorAll(".admin-nav-link")
        .forEach(link => {

            const href =
                link.getAttribute("href");


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
                linkPage === currentPage
            );

        });

}



/* ==================================================
   LOGOUT
================================================== */

function initializeLogout() {

    const logoutButton =
        getElement("logoutButton");


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {


            const confirmed =
                window.confirm(
                    "Are you sure you want to sign out?"
                );


            if (!confirmed) {
                return;
            }


            sessionStorage.removeItem(
                "alote-admin-session"
            );


            window.location.href =
                "login.html";

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

function initializeDashboard() {

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