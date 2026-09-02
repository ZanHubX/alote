/* ==================================================
   ALOTE ADMIN — APPLICATIONS
================================================== */


/* ==================================================
   API + ADMIN AUTH
================================================== */

const API_BASE_URL =
    window.ALOTE_CONFIG.API_BASE_URL;


const STORAGE_BASE_URL =
    window.ALOTE_CONFIG.STORAGE_BASE_URL;


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

        "Content-Type":
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
   HANDLE UNAUTHORIZED
================================================== */

function handleUnauthorized(response) {

    if (
        response.status !== 401
    ) {

        return false;

    }


    clearAdminSession();


    window.location.href =
        "login.html";


    return true;

}


/* ==================================================
   APPLICATION DATA
================================================== */

let applications = [];


/* ==================================================
   LOAD APPLICATIONS
================================================== */

async function loadApplicationsFromBackend() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/admin/applications`,
                {

                    method:
                        "GET",

                    headers:
                        getAuthHeaders()

                }
            );


        if (
            handleUnauthorized(
                response
            )
        ) {

            return;

        }


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load applications."
            );

        }


        const data =
            Array.isArray(
                result.data
            )
                ? result.data
                : [];


        applications =
            data.map(
                item => ({

                    id:
                        `APP-${item.id}`,

                    applicant: {

                        name:
                            item.job_seeker
                                ?.full_name ||
                            "Not available",

                        email:
                            item.job_seeker
                                ?.email ||
                            "Not available"

                    },

                    job: {

                        title:
                            item.job_post
                                ?.title ||
                            "Not available",

                        id:
                            item.job_post
                                ?.id
                                ? `JOB-${item.job_post.id}`
                                : "Not available"

                    },

                    company:
                        item.job_post
                            ?.employer
                            ?.company_name ||
                        "Not available",

                    location:
                        item.job_post
                            ?.location ||
                        "Not specified",

                    workType:
                        item.job_post
                            ?.work_mode ||
                        "Not specified",

                    appliedDate:
                        item.applied_at
                            ? item.applied_at
                                .substring(
                                    0,
                                    10
                                )
                            : "",

                    status:
                        item.status ===
                            "pending"

                            ? "new"

                            : item.status,

                    coverLetter:
                        item.cover_letter ||
                        "No cover letter.",

                    resume:
                        item.resume_path ||
                        ""

                })
            );


        filteredApplications =
            [...applications];


        updateStatistics();


        sortFilteredApplications();


        renderApplications();


    } catch (error) {

        console.error(
            "Applications loading error:",
            error
        );

    }

}


/* ==================================================
   STATE
================================================== */

let filteredApplications =
    [...applications];


let currentPageNumber =
    1;


const applicationsPerPage =
    6;


/* ==================================================
   DOM ELEMENTS
================================================== */

const tableBody =
    document.getElementById(
        "applicationsTableBody"
    );


const mobileList =
    document.getElementById(
        "applicationsMobileList"
    );


const emptyState =
    document.getElementById(
        "applicationsEmpty"
    );


const searchInput =
    document.getElementById(
        "applicationSearch"
    );


const clearSearch =
    document.getElementById(
        "clearApplicationSearch"
    );


const statusFilter =
    document.getElementById(
        "statusFilter"
    );


const jobFilter =
    document.getElementById(
        "jobFilter"
    );


const sortApplications =
    document.getElementById(
        "sortApplications"
    );


const resetFilters =
    document.getElementById(
        "resetFilters"
    );


const emptyReset =
    document.getElementById(
        "emptyReset"
    );


const previousPage =
    document.getElementById(
        "previousPage"
    );


const nextPage =
    document.getElementById(
        "nextPage"
    );


const currentPage =
    document.getElementById(
        "currentPage"
    );


const resultsCount =
    document.getElementById(
        "resultsCount"
    );


const paginationInfo =
    document.getElementById(
        "paginationInfo"
    );


/* ==================================================
   MODAL ELEMENTS
================================================== */

const applicationModal =
    document.getElementById(
        "applicationModal"
    );


const closeApplicationModal =
    document.getElementById(
        "closeApplicationModal"
    );


const closeModalButton =
    document.getElementById(
        "closeModalButton"
    );


const modalApplicantName =
    document.getElementById(
        "modalApplicantName"
    );


const modalApplicationId =
    document.getElementById(
        "modalApplicationId"
    );


const modalApplicantFullName =
    document.getElementById(
        "modalApplicantFullName"
    );


const modalApplicantEmail =
    document.getElementById(
        "modalApplicantEmail"
    );


const modalApplicantAvatar =
    document.getElementById(
        "modalApplicantAvatar"
    );


const modalJobTitle =
    document.getElementById(
        "modalJobTitle"
    );


const modalCompany =
    document.getElementById(
        "modalCompany"
    );


const modalLocation =
    document.getElementById(
        "modalLocation"
    );


const modalWorkType =
    document.getElementById(
        "modalWorkType"
    );


const modalAppliedDate =
    document.getElementById(
        "modalAppliedDate"
    );


const modalApplicationStatus =
    document.getElementById(
        "modalApplicationStatus"
    );


const modalCoverLetter =
    document.getElementById(
        "modalCoverLetter"
    );


const viewResume =
    document.getElementById(
        "viewResume"
    );


const rejectApplication =
    document.getElementById(
        "rejectApplication"
    );


const updateApplication =
    document.getElementById(
        "updateApplication"
    );


/* ==================================================
   HELPERS
================================================== */

function getInitials(name) {

    if (!name) {

        return "A";

    }


    return name
        .split(" ")
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .substring(
            0,
            2
        )
        .toUpperCase();

}


function formatDate(
    dateString
) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    return date.toLocaleDateString(
        "en-US",
        {

            month:
                "short",

            day:
                "numeric",

            year:
                "numeric"

        }
    );

}


function formatStatus(status) {

    const labels = {

        new:
            "New",

        review:
            "Under Review",

        shortlisted:
            "Shortlisted",

        interview:
            "Interview",

        hired:
            "Hired",

        rejected:
            "Rejected"

    };


    return labels[status] ||
        status;

}


/* ==================================================
   UPDATE STATISTICS
================================================== */

function updateStatistics() {

    const total =
        applications.length;


    const newCount =
        applications.filter(
            application =>
                application.status ===
                "new"
        ).length;


    const reviewCount =
        applications.filter(
            application =>
                application.status ===
                "review"
        ).length;


    const hiredCount =
        applications.filter(
            application =>
                application.status ===
                "hired"
        ).length;


    const totalElement =
        document.getElementById(
            "totalApplications"
        );


    const newElement =
        document.getElementById(
            "newApplications"
        );


    const reviewElement =
        document.getElementById(
            "reviewApplications"
        );


    const hiredElement =
        document.getElementById(
            "hiredApplications"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (newElement) {

        newElement.textContent =
            newCount;

    }


    if (reviewElement) {

        reviewElement.textContent =
            reviewCount;

    }


    if (hiredElement) {

        hiredElement.textContent =
            hiredCount;

    }


    const badge =
        document.getElementById(
            "newApplicationsBadge"
        );


    if (badge) {

        badge.textContent =
            newCount;


        badge.classList.toggle(
            "muted",
            newCount === 0
        );

    }

}


/* ==================================================
   FILTER APPLICATIONS
================================================== */

function filterApplications() {

    const search =
        searchInput

            ? searchInput.value
                .trim()
                .toLowerCase()

            : "";


    const selectedStatus =
        statusFilter

            ? statusFilter.value

            : "all";


    const selectedJob =
        jobFilter

            ? jobFilter.value

            : "all";


    filteredApplications =
        applications.filter(
            application => {


                const matchesSearch =
                    !search ||

                    application.applicant
                        .name
                        .toLowerCase()
                        .includes(
                            search
                        ) ||

                    application.applicant
                        .email
                        .toLowerCase()
                        .includes(
                            search
                        ) ||

                    application.job
                        .title
                        .toLowerCase()
                        .includes(
                            search
                        ) ||

                    application.company
                        .toLowerCase()
                        .includes(
                            search
                        );


                const matchesStatus =
                    selectedStatus ===
                    "all" ||

                    application.status ===
                    selectedStatus;


                let matchesJob =
                    true;


                if (
                    selectedJob !==
                    "all"
                ) {

                    const jobMap = {

                        frontend:
                            "Senior Frontend Developer",

                        marketing:
                            "Digital Marketing Specialist",

                        designer:
                            "UI/UX Designer",

                        accountant:
                            "Senior Accountant"

                    };


                    matchesJob =
                        application.job
                            .title ===
                        jobMap[
                        selectedJob
                        ];

                }


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesJob
                );

            }
        );


    sortFilteredApplications();


    currentPageNumber =
        1;


    updateSearchClear();


    renderApplications();

}


/* ==================================================
   SORT
================================================== */

function sortFilteredApplications() {

    const sort =
        sortApplications

            ? sortApplications.value

            : "newest";


    if (
        sort ===
        "newest"
    ) {

        filteredApplications.sort(
            (a, b) =>
                new Date(
                    b.appliedDate
                ) -
                new Date(
                    a.appliedDate
                )
        );

    }


    else if (
        sort ===
        "oldest"
    ) {

        filteredApplications.sort(
            (a, b) =>
                new Date(
                    a.appliedDate
                ) -
                new Date(
                    b.appliedDate
                )
        );

    }


    else if (
        sort ===
        "name"
    ) {

        filteredApplications.sort(
            (a, b) =>
                a.applicant
                    .name
                    .localeCompare(
                        b.applicant
                            .name
                    )
        );

    }


    else if (
        sort ===
        "status"
    ) {

        filteredApplications.sort(
            (a, b) =>
                formatStatus(
                    a.status
                )
                    .localeCompare(
                        formatStatus(
                            b.status
                        )
                    )
        );

    }

}


/* ==================================================
   RENDER APPLICATIONS
================================================== */

function renderApplications() {

    const total =
        filteredApplications.length;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                applicationsPerPage
            )
        );


    if (
        currentPageNumber >
        totalPages
    ) {

        currentPageNumber =
            totalPages;

    }


    const start =
        (currentPageNumber - 1) *
        applicationsPerPage;


    const end =
        start +
        applicationsPerPage;


    const pageApplications =
        filteredApplications.slice(
            start,
            end
        );


    if (tableBody) {

        tableBody.innerHTML =
            pageApplications
                .map(
                    renderTableRow
                )
                .join("");

    }


    if (mobileList) {

        mobileList.innerHTML =
            pageApplications
                .map(
                    renderMobileCard
                )
                .join("");

    }


    const hasResults =
        pageApplications.length >
        0;


    if (emptyState) {

        emptyState.classList.toggle(
            "hidden",
            hasResults
        );

    }


    if (tableBody) {

        tableBody.parentElement
            ?.parentElement
            ?.classList.toggle(
                "hidden",
                !hasResults
            );

    }


    if (mobileList) {

        mobileList.classList.toggle(
            "hidden",
            !hasResults
        );

    }


    updatePagination(
        start,
        end,
        total,
        totalPages
    );


    attachApplicationActions();

}


/* ==================================================
   TABLE ROW
================================================== */

function renderTableRow(
    application
) {

    return `

        <tr>

            <td>

                <div class="applicant-cell">

                    <div class="applicant-avatar">

                        ${escapeHTML(
        getInitials(
            application
                .applicant
                .name
        )
    )}

                    </div>


                    <div class="applicant-info">

                        <strong>
                            ${escapeHTML(
        application
            .applicant
            .name
    )}
                        </strong>

                        <span>
                            ${escapeHTML(
        application
            .applicant
            .email
    )}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <div class="application-job">

                    <strong>
                        ${escapeHTML(
        application
            .job
            .title
    )}
                    </strong>

                    <span>
                        ${escapeHTML(
        application
            .job
            .id
    )}
                    </span>

                </div>

            </td>


            <td>

                <span class="application-company">

                    ${escapeHTML(
        application.company
    )}

                </span>

            </td>


            <td>

                <span class="application-date">

                    ${escapeHTML(
        formatDate(
            application.appliedDate
        )
    )}

                </span>

            </td>


            <td>

                <span
                    class="application-status ${escapeHTML(
        application.status
    )}"
                >

                    ${escapeHTML(
        formatStatus(
            application.status
        )
    )}

                </span>

            </td>


            <td>

                <div class="application-actions">

                    <button
                        type="button"
                        class="application-action"
                        data-application-id="${escapeHTML(
        application.id
    )}"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="application-delete-action"
                        data-delete-application="${escapeHTML(
        application.id
    )}"
                    >
                        Delete
                    </button>

                </div>

            </td>

        </tr>

    `;

}


/* ==================================================
   MOBILE CARD
================================================== */

function renderMobileCard(
    application
) {

    return `

        <article
            class="mobile-application-card"
        >

            <div class="mobile-application-top">


                <div class="mobile-applicant">

                    <div class="applicant-avatar">

                        ${getInitials(
        application
            .applicant
            .name
    )}

                    </div>


                    <div class="mobile-applicant-info">

                        <strong>
                            ${escapeHTML(
        application
            .applicant
            .name
    )}
                        </strong>

                        <span>
                            ${escapeHTML(
        application
            .applicant
            .email
    )}
                        </span>

                    </div>

                </div>


                <span
                    class="application-status ${escapeHTML(
        application.status
    )}"
                >

                    ${escapeHTML(
        formatStatus(
            application.status
        )
    )}

                </span>


            </div>



            <div class="mobile-application-job">

                <strong>
                    ${escapeHTML(
        application
            .job
            .title
    )}
                </strong>

                <span>
                    ${escapeHTML(
        application.company
    )}
                </span>

            </div>



            <div class="mobile-application-meta">

                <span class="mobile-application-date">

                    ${formatDate(
        application.appliedDate
    )}

                </span>


                <button
                    type="button"
                    class="application-action"
                    data-application-id="${escapeHTML(
        application.id
    )}"
                >
                    View Application
                </button>

            </div>


        </article>

    `;

}


/* ==================================================
   PAGINATION
================================================== */

function updatePagination(
    start,
    end,
    total,
    totalPages
) {

    const visibleStart =
        total === 0

            ? 0

            : start + 1;


    const visibleEnd =
        Math.min(
            end,
            total
        );


    if (resultsCount) {

        resultsCount.textContent =
            `${total} ${total === 1
                ? "application"
                : "applications"
            }`;

    }


    if (paginationInfo) {

        paginationInfo.textContent =
            total === 0

                ? "Showing 0 applications"

                : `Showing ${visibleStart}–${visibleEnd} of ${total} applications`;

    }


    if (currentPage) {

        currentPage.textContent =
            currentPageNumber;

    }


    if (previousPage) {

        previousPage.disabled =
            currentPageNumber <=
            1;

    }


    if (nextPage) {

        nextPage.disabled =
            currentPageNumber >=
            totalPages;

    }

}


/* ==================================================
   APPLICATION ACTIONS
================================================== */

function attachApplicationActions() {

    document
        .querySelectorAll(
            ".application-action"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset
                                .applicationId;


                        openApplicationModal(
                            id
                        );

                    }
                );

            }
        );

}


/* ==================================================
   OPEN APPLICATION MODAL
================================================== */

function openApplicationModal(
    id
) {

    const application =
        applications.find(
            item =>
                item.id ===
                id
        );


    if (!application) {

        return;

    }


    if (modalApplicantName) {

        modalApplicantName.textContent =
            application
                .applicant
                .name;

    }


    if (modalApplicationId) {

        modalApplicationId.textContent =
            application.id;

    }


    if (modalApplicantFullName) {

        modalApplicantFullName.textContent =
            application
                .applicant
                .name;

    }


    if (modalApplicantEmail) {

        modalApplicantEmail.textContent =
            application
                .applicant
                .email;

    }


    if (modalApplicantAvatar) {

        modalApplicantAvatar.textContent =
            getInitials(
                application
                    .applicant
                    .name
            );

    }


    if (modalJobTitle) {

        modalJobTitle.textContent =
            application
                .job
                .title;

    }


    if (modalCompany) {

        modalCompany.textContent =
            application.company;

    }


    if (modalLocation) {

        modalLocation.textContent =
            application.location;

    }


    if (modalWorkType) {

        modalWorkType.textContent =
            application.workType;

    }


    if (modalAppliedDate) {

        modalAppliedDate.textContent =
            formatDate(
                application.appliedDate
            );

    }


    if (modalApplicationStatus) {

        modalApplicationStatus.textContent =
            formatStatus(
                application.status
            );

    }


    if (modalCoverLetter) {

        modalCoverLetter.textContent =
            application.coverLetter;

    }


    if (viewResume) {

        viewResume.dataset.applicationId =
            application.id;

    }


    if (rejectApplication) {

        rejectApplication.dataset
            .applicationId =
            application.id;

    }


    if (updateApplication) {

        updateApplication.dataset
            .applicationId =
            application.id;

    }


    if (applicationModal) {

        applicationModal.classList.remove(
            "hidden"
        );

    }


    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   CLOSE APPLICATION MODAL
================================================== */

function closeModal() {

    if (applicationModal) {

        applicationModal.classList.add(
            "hidden"
        );

    }


    document.body.style.overflow =
        "";

}


if (closeApplicationModal) {

    closeApplicationModal.addEventListener(
        "click",
        closeModal
    );

}


if (closeModalButton) {

    closeModalButton.addEventListener(
        "click",
        closeModal
    );

}


if (applicationModal) {

    applicationModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                applicationModal
            ) {

                closeModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape" &&

            applicationModal &&

            !applicationModal
                .classList
                .contains(
                    "hidden"
                )
        ) {

            closeModal();

        }

    }
);


/* ==================================================
   SEARCH CLEAR BUTTON
================================================== */

function updateSearchClear() {

    if (
        !clearSearch ||
        !searchInput
    ) {

        return;

    }


    const hasValue =
        searchInput.value.length >
        0;


    clearSearch.classList.toggle(
        "visible",
        hasValue
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterApplications
    );

}


if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            if (searchInput) {

                searchInput.value =
                    "";

                filterApplications();

                searchInput.focus();

            }

        }
    );

}


/* ==================================================
   FILTER EVENTS
================================================== */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterApplications
    );

}


if (jobFilter) {

    jobFilter.addEventListener(
        "change",
        filterApplications
    );

}


if (sortApplications) {

    sortApplications.addEventListener(
        "change",
        filterApplications
    );

}


/* ==================================================
   RESET FILTERS
================================================== */

function resetApplicationFilters() {

    if (searchInput) {

        searchInput.value =
            "";

    }


    if (statusFilter) {

        statusFilter.value =
            "all";

    }


    if (jobFilter) {

        jobFilter.value =
            "all";

    }


    if (sortApplications) {

        sortApplications.value =
            "newest";

    }


    currentPageNumber =
        1;


    filteredApplications =
        [...applications];


    sortFilteredApplications();


    updateSearchClear();


    renderApplications();

}


if (resetFilters) {

    resetFilters.addEventListener(
        "click",
        resetApplicationFilters
    );

}


if (emptyReset) {

    emptyReset.addEventListener(
        "click",
        resetApplicationFilters
    );

}


/* ==================================================
   PAGINATION EVENTS
================================================== */

if (previousPage) {

    previousPage.addEventListener(
        "click",
        () => {

            if (
                currentPageNumber >
                1
            ) {

                currentPageNumber--;


                renderApplications();

            }

        }
    );

}


if (nextPage) {

    nextPage.addEventListener(
        "click",
        () => {

            const totalPages =
                Math.ceil(
                    filteredApplications
                        .length /
                    applicationsPerPage
                );


            if (
                currentPageNumber <
                totalPages
            ) {

                currentPageNumber++;


                renderApplications();

            }

        }
    );

}


/* ==================================================
   REFRESH
================================================== */

const refreshApplications =
    document.getElementById(
        "refreshApplications"
    );


if (refreshApplications) {

    refreshApplications.addEventListener(
        "click",
        async () => {

            refreshApplications
                .querySelector(
                    "span"
                )
                ?.classList.add(
                    "refreshing"
                );


            await loadApplicationsFromBackend();


            refreshApplications
                .querySelector(
                    "span"
                )
                ?.classList.remove(
                    "refreshing"
                );

        }
    );

}


/* ==================================================
   RESUME BUTTON
================================================== */

/* ==================================================
   RESUME BUTTON
================================================== */

if (viewResume) {

    viewResume.addEventListener(
        "click",
        async () => {

            const applicationId =
                viewResume.dataset
                    .applicationId;


            if (!applicationId) {

                alert(
                    "Resume not available."
                );

                return;
            }


            const backendId =
                applicationId.replace(
                    "APP-",
                    ""
                );


            try {

                viewResume.disabled =
                    true;


                const response =
                    await fetch(
                        `${API_BASE_URL}/admin/applications/${backendId}/resume`,
                        {

                            method:
                                "GET",

                            headers:
                                getAuthHeaders()

                        }
                    );


                if (
                    handleUnauthorized(
                        response
                    )
                ) {

                    return;
                }


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to open resume."
                    );
                }


                if (!result.url) {

                    throw new Error(
                        "Resume URL not available."
                    );
                }


                const resumeUrl =
                    new URL(result.url);


                if (
                    resumeUrl.protocol !== "https:"
                ) {

                    throw new Error(
                        "Invalid resume URL."
                    );

                }


                window.open(
                    resumeUrl.href,
                    "_blank",
                    "noopener,noreferrer"
                );


            } catch (error) {

                console.error(
                    "Resume loading error:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to open resume."
                );


            } finally {

                viewResume.disabled =
                    false;
            }

        }
    );
}

/* ==================================================
   DELETE APPLICATION
================================================== */

document.addEventListener(
    "click",
    async event => {

        const deleteButton =
            event.target.closest(
                "[data-delete-application]"
            );

        if (!deleteButton) {
            return;
        }

        const applicationId =
            deleteButton.dataset
                .deleteApplication;

        const application =
            applications.find(
                item =>
                    item.id ===
                    applicationId
            );

        if (!application) {
            return;
        }

        const confirmed =
            window.confirm(
                `Delete application from ${application.applicant.name}?\n\nThis will permanently delete the application and uploaded resume.`
            );

        if (!confirmed) {
            return;
        }

        const backendId =
            application.id.replace(
                "APP-",
                ""
            );

        try {

            deleteButton.disabled = true;
            deleteButton.textContent = "Deleting...";

            const response =
                await fetch(
                    `${API_BASE_URL}/admin/applications/${backendId}`,
                    {
                        method: "DELETE",
                        headers: getAuthHeaders()
                    }
                );

            if (
                handleUnauthorized(
                    response
                )
            ) {
                return;
            }

            const result =
                await response.json();

            if (!response.ok) {

                console.error(result);

                throw new Error(
                    result.message ||
                    "Unable to delete application."
                );
            }

            await loadApplicationsFromBackend();

            alert(
                "Application deleted successfully."
            );

        } catch (error) {

            console.error(
                "Delete application error:",
                error
            );

            alert(
                error.message ||
                "Unable to delete application."
            );

        } finally {

            deleteButton.disabled = false;
            deleteButton.textContent = "Delete";

        }

    }
);

/* ==================================================
   REJECT APPLICATION
================================================== */

if (rejectApplication) {

    rejectApplication.addEventListener(
        "click",
        async () => {

            const id =
                rejectApplication.dataset
                    .applicationId;


            const application =
                applications.find(
                    item =>
                        item.id ===
                        id
                );


            if (!application) {

                return;

            }


            const confirmed =
                confirm(
                    `Reject the application from ${application.applicant.name}?`
                );


            if (!confirmed) {

                return;

            }


            const backendId =
                application.id.replace(
                    "APP-",
                    ""
                );


            try {

                rejectApplication.disabled =
                    true;


                const response =
                    await fetch(
                        `${API_BASE_URL}/admin/applications/${backendId}/status`,
                        {

                            method:
                                "PATCH",

                            headers:
                                getAuthHeaders(),

                            body:
                                JSON.stringify({
                                    status:
                                        "rejected"
                                })

                        }
                    );


                if (
                    handleUnauthorized(
                        response
                    )
                ) {

                    return;

                }


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to reject application."
                    );

                }


                application.status =
                    "rejected";


                updateStatistics();


                filterApplications();


                closeModal();


            } catch (error) {

                console.error(
                    "Reject application error:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to reject application."
                );


            } finally {

                rejectApplication.disabled =
                    false;

            }

        }
    );

}


/* ==================================================
   UPDATE STATUS
================================================== */

if (updateApplication) {

    updateApplication.addEventListener(
        "click",
        async () => {

            const id =
                updateApplication.dataset
                    .applicationId;


            const application =
                applications.find(
                    item =>
                        item.id ===
                        id
                );


            if (!application) {

                return;

            }


            const nextStatuses = {

                new:
                    "review",

                review:
                    "shortlisted",

                shortlisted:
                    "interview",

                interview:
                    "hired",

                hired:
                    "hired",

                rejected:
                    "review"

            };


            const nextStatus =
                nextStatuses[
                application.status
                ];


            if (!nextStatus) {

                return;

            }


            const backendId =
                application.id.replace(
                    "APP-",
                    ""
                );


            try {

                updateApplication.disabled =
                    true;


                const response =
                    await fetch(
                        `${API_BASE_URL}/admin/applications/${backendId}/status`,
                        {

                            method:
                                "PATCH",

                            headers:
                                getAuthHeaders(),

                            body:
                                JSON.stringify({
                                    status:
                                        nextStatus
                                })

                        }
                    );


                if (
                    handleUnauthorized(
                        response
                    )
                ) {

                    return;

                }


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to update application."
                    );

                }


                application.status =
                    nextStatus;


                updateStatistics();


                filterApplications();


                openApplicationModal(
                    application.id
                );


            } catch (error) {

                console.error(
                    "Update application error:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to update application."
                );


            } finally {

                updateApplication.disabled =
                    false;

            }

        }
    );

}


/* ==================================================
   HTML ESCAPE
================================================== */

function escapeHTML(value) {

    return String(
        value ?? ""
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
   INITIALIZE
================================================== */

async function initializeApplications() {

    await loadApplicationsFromBackend();

}


initializeApplications();