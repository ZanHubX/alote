/* ==================================================
   ALOTE ADMIN — PUBLISHED JOBS
================================================== */


/* ==================================================
   API + ADMIN AUTH
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
   JOB DATA
================================================== */

let publishedJobs = [];


/* ==================================================
   LOAD PUBLISHED JOBS
================================================== */

async function loadPublishedJobs() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/admin/jobs`,
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
                "Failed to load published jobs."
            );

        }


        const data =
            Array.isArray(
                result.data
            )
                ? result.data
                : [];


        publishedJobs =
            data.map(
                item => ({

                    id:
                        `JOB-${item.id}`,

                    title:
                        item.title,

                    company:
                        item.employer
                            ?.company_name ||
                        "Not available",

                    contact:
                        item.employer
                            ?.contact_name ||
                        "Not available",

                    category:
                        item.category
                            ?.name ||
                        "Not available",

                    categoryId:
                        item.category
                            ?.slug ||
                        "other",

                    location:
                        item.location ||
                        "Not specified",

                    workType:
                        item.work_mode ||
                        "Not specified",

                    employmentType:
                        item.job_type ||
                        "Not specified",

                    salary:
                        item.salary_min ||
                            item.salary_max

                            ? `${item.salary_min ?? ""} - ${item.salary_max ?? ""} ${item.currency ?? "MMK"}`

                            : "Not specified",

                    applications:
                        item.applications_count ?? 0,

                    status:
                        item.is_active
                            ? "published"
                            : "closed",

                    publishedAt:
                        item.published_at
                            ? item.published_at.split(
                                "T"
                            )[0]
                            : "",

                    expiresAt:
                        item.deadline ||
                        "",

                    description:
                        item.description ||
                        "No description",

                    requirements:
                        "Not available"

                })
            );


        filteredJobs =
            [...publishedJobs];


        sortFilteredJobs();


        currentPageNumber =
            1;


        updateStatistics();


        renderAll();


    } catch (error) {

        console.error(
            "Published jobs loading error:",
            error
        );


        alert(
            "Cannot load published jobs from ALote backend."
        );

    }

}


/* ==================================================
   STATE
================================================== */

let filteredJobs =
    [...publishedJobs];


let currentPageNumber =
    1;


const jobsPerPage =
    6;


/* ==================================================
   DOM ELEMENTS
================================================== */

const jobSearch =
    document.getElementById(
        "jobSearch"
    );


const clearJobSearch =
    document.getElementById(
        "clearJobSearch"
    );


const statusFilter =
    document.getElementById(
        "statusFilter"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const sortJobs =
    document.getElementById(
        "sortJobs"
    );


const resetFilters =
    document.getElementById(
        "resetFilters"
    );


const emptyReset =
    document.getElementById(
        "emptyReset"
    );


const refreshJobs =
    document.getElementById(
        "refreshJobs"
    );


const tableBody =
    document.getElementById(
        "publishedJobsTableBody"
    );


const mobileList =
    document.getElementById(
        "publishedJobsMobileList"
    );


const publishedEmpty =
    document.getElementById(
        "publishedEmpty"
    );


const resultsCount =
    document.getElementById(
        "resultsCount"
    );


const paginationInfo =
    document.getElementById(
        "paginationInfo"
    );


const currentPage =
    document.getElementById(
        "currentPage"
    );


const previousPage =
    document.getElementById(
        "previousPage"
    );


const nextPage =
    document.getElementById(
        "nextPage"
    );


/* ==================================================
   DATE HELPERS
================================================== */

function formatDate(dateString) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(
            dateString
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


function getRelativeDate(
    dateString
) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(
            dateString
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    date.setHours(
        0,
        0,
        0,
        0
    );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const difference =
        Math.round(
            (today - date) /
            (1000 * 60 * 60 * 24)
        );


    if (
        difference === 0
    ) {

        return "Today";

    }


    if (
        difference === 1
    ) {

        return "Yesterday";

    }


    if (
        difference > 1 &&
        difference < 30
    ) {

        return `${difference} days ago`;

    }


    return formatDate(
        dateString
    );

}


/* ==================================================
   INITIALS
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


/* ==================================================
   STATUS LABEL
================================================== */

function getStatusLabel(status) {

    const labels = {

        published:
            "Published",

        closed:
            "Closed",

        expired:
            "Expired"

    };


    return labels[status] ||
        status;

}


/* ==================================================
   DESKTOP TABLE
================================================== */

function renderTable() {

    if (!tableBody) {

        return;

    }


    const start =
        (currentPageNumber - 1) *
        jobsPerPage;


    const end =
        start +
        jobsPerPage;


    const pageJobs =
        filteredJobs.slice(
            start,
            end
        );


    tableBody.innerHTML =
        pageJobs
            .map(
                job => `

            <tr>

                <td>

                    <div class="table-job-cell">

                        <div class="table-job-avatar">

                            ${getInitials(
                    job.title
                )}

                        </div>

                        <div class="table-job-info">

                            <strong>

                                ${escapeHtml(
                    job.title
                )}

                            </strong>

                            <span>
                                ${job.id}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="table-company">

                        <strong>

                            ${escapeHtml(
                    job.company
                )}

                        </strong>

                        <span>

                            ${escapeHtml(
                    job.contact
                )}

                        </span>

                    </div>

                </td>


                <td>

                    <span class="category-pill">

                        ${escapeHtml(
                    job.category
                )}

                    </span>

                </td>


                <td>

                    <span class="table-location">

                        ${escapeHtml(
                    job.location
                )}

                    </span>

                </td>


                <td>

                    <span class="application-count">

                        ${job.applications}

                    </span>

                </td>


                <td>

                    <div class="table-date">

                        <strong>

                            ${formatDate(
                    job.publishedAt
                )}

                        </strong>

                        <span>

                            ${getRelativeDate(
                    job.publishedAt
                )}

                        </span>

                    </div>

                </td>


                <td>

                    <span
                        class="job-status ${job.status}"
                    >

                        ${getStatusLabel(
                    job.status
                )}

                    </span>

                </td>


                <td>

    <div class="table-actions">

        <button
            type="button"
            class="table-action"
            data-view-job="${job.id}"
        >
            View
        </button>

        <button
            type="button"
            class="table-action delete-action"
            data-delete-job="${job.id}"
        >
            Delete
        </button>

    </div>

</td>

            </tr>

        `
            )
            .join("");

}


/* ==================================================
   MOBILE CARDS
================================================== */

function renderMobileCards() {

    if (!mobileList) {

        return;

    }


    const start =
        (currentPageNumber - 1) *
        jobsPerPage;


    const end =
        start +
        jobsPerPage;


    const pageJobs =
        filteredJobs.slice(
            start,
            end
        );


    mobileList.innerHTML =
        pageJobs
            .map(
                job => `

            <article class="mobile-job-card">


                <div class="mobile-job-header">

                    <div class="mobile-job-identity">

                        <div class="table-job-avatar">

                            ${getInitials(
                    job.title
                )}

                        </div>

                        <div>

                            <strong>

                                ${escapeHtml(
                    job.title
                )}

                            </strong>

                            <span>

                                ${escapeHtml(
                    job.company
                )}

                            </span>

                        </div>

                    </div>


                    <span
                        class="job-status ${job.status}"
                    >

                        ${getStatusLabel(
                    job.status
                )}

                    </span>

                </div>



                <div class="mobile-job-meta">

                    <span>

                        ${escapeHtml(
                    job.category
                )}

                    </span>

                    <span>

                        ${escapeHtml(
                    job.location
                )}

                    </span>

                    <span>

                        ${escapeHtml(
                    job.workType
                )}

                    </span>

                </div>



                <div class="mobile-job-bottom">

                    <div>

                        <span>
                            Applications
                        </span>

                        <strong>
                            ${job.applications}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Published
                        </span>

                        <strong>

                            ${formatDate(
                    job.publishedAt
                )}

                        </strong>

                    </div>


                    <button
                        type="button"
                        class="table-action"
                        data-view-job="${job.id}"
                    >
                        View
                    </button>

                </div>

            </article>

        `
            )
            .join("");

}


/* ==================================================
   SEARCH + FILTER
================================================== */

function applyFilters() {

    const searchTerm =
        jobSearch

            ? jobSearch.value
                .trim()
                .toLowerCase()

            : "";


    const selectedStatus =
        statusFilter

            ? statusFilter.value

            : "all";


    const selectedCategory =
        categoryFilter

            ? categoryFilter.value

            : "all";


    filteredJobs =
        publishedJobs.filter(
            job => {


                const matchesSearch =
                    !searchTerm ||

                    job.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        ) ||

                    job.company
                        .toLowerCase()
                        .includes(
                            searchTerm
                        ) ||

                    job.category
                        .toLowerCase()
                        .includes(
                            searchTerm
                        ) ||

                    job.location
                        .toLowerCase()
                        .includes(
                            searchTerm
                        );


                const matchesStatus =
                    selectedStatus ===
                    "all" ||

                    job.status ===
                    selectedStatus;


                const matchesCategory =
                    selectedCategory ===
                    "all" ||

                    job.categoryId ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesCategory
                );

            }
        );


    sortFilteredJobs();


    currentPageNumber =
        1;


    renderAll();

}


/* ==================================================
   SORT
================================================== */

function sortFilteredJobs() {

    const sortValue =
        sortJobs

            ? sortJobs.value

            : "newest";


    filteredJobs.sort(
        (a, b) => {

            if (
                sortValue ===
                "newest"
            ) {

                return (
                    new Date(
                        b.publishedAt
                    ) -
                    new Date(
                        a.publishedAt
                    )
                );

            }


            if (
                sortValue ===
                "oldest"
            ) {

                return (
                    new Date(
                        a.publishedAt
                    ) -
                    new Date(
                        b.publishedAt
                    )
                );

            }


            if (
                sortValue ===
                "company"
            ) {

                return a.company
                    .localeCompare(
                        b.company
                    );

            }


            if (
                sortValue ===
                "expiry"
            ) {

                return (
                    new Date(
                        a.expiresAt
                    ) -
                    new Date(
                        b.expiresAt
                    )
                );

            }


            return 0;

        }
    );

}


/* ==================================================
   STATISTICS
================================================== */

function updateStatistics() {

    const total =
        publishedJobs.length;


    const active =
        publishedJobs.filter(
            job =>
                job.status ===
                "published"
        ).length;


    const closed =
        publishedJobs.filter(
            job =>
                job.status ===
                "closed"
        ).length;


    const expired =
        publishedJobs.filter(
            job =>
                job.status ===
                "expired"
        ).length;


    const totalPublished =
        document.getElementById(
            "totalPublished"
        );


    const activeJobs =
        document.getElementById(
            "activeJobs"
        );


    const closedJobs =
        document.getElementById(
            "closedJobs"
        );


    const expiringJobs =
        document.getElementById(
            "expiringJobs"
        );


    if (totalPublished) {

        totalPublished.textContent =
            total;

    }


    if (activeJobs) {

        activeJobs.textContent =
            active;

    }


    if (closedJobs) {

        closedJobs.textContent =
            closed;

    }


    if (expiringJobs) {

        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        const sevenDays =
            new Date(
                today
            );


        sevenDays.setDate(
            today.getDate() + 7
        );


        const expiring =
            publishedJobs.filter(
                job => {

                    if (
                        job.status !==
                        "published"
                    ) {

                        return false;

                    }


                    const expiry =
                        new Date(
                            job.expiresAt +
                            "T00:00:00"
                        );


                    return (
                        expiry >= today &&
                        expiry <= sevenDays
                    );

                }
            ).length;


        expiringJobs.textContent =
            expiring;

    }

}


/* ==================================================
   RESULTS
================================================== */

function updateResults() {

    const total =
        filteredJobs.length;


    if (resultsCount) {

        resultsCount.textContent =
            `${total} ${total === 1 ? "job" : "jobs"}`;

    }


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                jobsPerPage
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
        total === 0

            ? 0

            : (currentPageNumber - 1) *
            jobsPerPage + 1;


    const end =
        Math.min(
            currentPageNumber *
            jobsPerPage,
            total
        );


    if (paginationInfo) {

        paginationInfo.textContent =
            total === 0

                ? "No jobs found"

                : `Showing ${start}–${end} of ${total} jobs`;

    }


    if (currentPage) {

        currentPage.textContent =
            total === 0

                ? "0"

                : currentPageNumber;

    }


    if (previousPage) {

        previousPage.disabled =
            currentPageNumber <= 1;

    }


    if (nextPage) {

        nextPage.disabled =
            currentPageNumber >=
            totalPages;

    }

}


/* ==================================================
   EMPTY STATE
================================================== */

function updateEmptyState() {

    const hasResults =
        filteredJobs.length > 0;


    if (publishedEmpty) {

        publishedEmpty.classList.toggle(
            "hidden",
            hasResults
        );

    }


    if (tableBody) {

        tableBody.parentElement
            .classList.toggle(
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

}


/* ==================================================
   RENDER ALL
================================================== */

function renderAll() {

    renderTable();

    renderMobileCards();

    updateResults();

    updateEmptyState();

}


/* ==================================================
   RESET FILTERS
================================================== */

function resetAllFilters() {

    if (jobSearch) {

        jobSearch.value =
            "";

    }


    if (statusFilter) {

        statusFilter.value =
            "all";

    }


    if (categoryFilter) {

        categoryFilter.value =
            "all";

    }


    if (sortJobs) {

        sortJobs.value =
            "newest";

    }


    if (clearJobSearch) {

        clearJobSearch.classList.remove(
            "visible"
        );

    }


    filteredJobs =
        [...publishedJobs];


    sortFilteredJobs();


    currentPageNumber =
        1;


    renderAll();

}


/* ==================================================
   SEARCH CLEAR BUTTON
================================================== */

if (jobSearch) {

    jobSearch.addEventListener(
        "input",
        () => {

            if (clearJobSearch) {

                clearJobSearch.classList.toggle(
                    "visible",
                    jobSearch.value.length > 0
                );

            }


            applyFilters();

        }
    );

}


/* ==================================================
   FILTER EVENTS
================================================== */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (sortJobs) {

    sortJobs.addEventListener(
        "change",
        applyFilters
    );

}


/* ==================================================
   CLEAR SEARCH
================================================== */

if (clearJobSearch) {

    clearJobSearch.addEventListener(
        "click",
        () => {

            if (jobSearch) {

                jobSearch.value =
                    "";

            }


            clearJobSearch.classList.remove(
                "visible"
            );


            applyFilters();

        }
    );

}


/* ==================================================
   RESET BUTTONS
================================================== */

if (resetFilters) {

    resetFilters.addEventListener(
        "click",
        resetAllFilters
    );

}


if (emptyReset) {

    emptyReset.addEventListener(
        "click",
        resetAllFilters
    );

}


/* ==================================================
   REFRESH
================================================== */

if (refreshJobs) {

    refreshJobs.addEventListener(
        "click",
        async () => {

            refreshJobs.disabled =
                true;


            const originalHTML =
                refreshJobs.innerHTML;


            refreshJobs.innerHTML =
                "<span>↻</span> Refreshing...";


            await loadPublishedJobs();


            refreshJobs.disabled =
                false;


            refreshJobs.innerHTML =
                originalHTML;

        }
    );

}


/* ==================================================
   PAGINATION
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


                renderAll();

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
                    filteredJobs.length /
                    jobsPerPage
                );


            if (
                currentPageNumber <
                totalPages
            ) {

                currentPageNumber++;


                renderAll();

            }

        }
    );

}


/* ==================================================
   JOB DETAILS MODAL
================================================== */

const jobDetailsModal =
    document.getElementById(
        "jobDetailsModal"
    );


const closeJobModal =
    document.getElementById(
        "closeJobModal"
    );


const viewPublicJob =
    document.getElementById(
        "viewPublicJob"
    );


const closeJobButton =
    document.getElementById(
        "closeJobButton"
    );


const editJobButton =
    document.getElementById(
        "editJobButton"
    );


function openJobDetails(
    jobId
) {

    const job =
        publishedJobs.find(
            item =>
                item.id ===
                jobId
        );


    if (
        !job ||
        !jobDetailsModal
    ) {

        return;

    }


    document.getElementById(
        "modalJobTitle"
    ).textContent =
        job.title;


    document.getElementById(
        "modalJobId"
    ).textContent =
        job.id;


    document.getElementById(
        "modalCompany"
    ).textContent =
        job.company;


    document.getElementById(
        "modalCompanyContact"
    ).textContent =
        job.contact;


    document.getElementById(
        "modalCompanyAvatar"
    ).textContent =
        getInitials(
            job.company
        );


    document.getElementById(
        "modalCategory"
    ).textContent =
        job.category;


    document.getElementById(
        "modalLocation"
    ).textContent =
        job.location;


    document.getElementById(
        "modalWorkType"
    ).textContent =
        job.workType;


    document.getElementById(
        "modalEmployment"
    ).textContent =
        job.employmentType;


    document.getElementById(
        "modalSalary"
    ).textContent =
        job.salary;


    document.getElementById(
        "modalApplications"
    ).textContent =
        job.applications;


    document.getElementById(
        "modalDescription"
    ).textContent =
        job.description;


    document.getElementById(
        "modalRequirements"
    ).textContent =
        job.requirements;


    document.getElementById(
        "modalPublishedDate"
    ).textContent =
        formatDate(
            job.publishedAt
        );


    document.getElementById(
        "modalExpiryDate"
    ).textContent =
        formatDate(
            job.expiresAt
        );


    if (viewPublicJob) {

        viewPublicJob.href =
            `../jobs.html?job=${encodeURIComponent(job.id)}`;

    }


    if (closeJobButton) {

        closeJobButton.style.display =
            job.status ===
                "published"

                ? "inline-flex"

                : "none";

    }


    jobDetailsModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


function closeJobDetails() {

    if (!jobDetailsModal) {

        return;

    }


    jobDetailsModal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


/* ==================================================
   TABLE / MOBILE ACTION EVENTS
================================================== */

document.addEventListener(
    "click",
    event => {

        const viewButton =
            event.target.closest(
                "[data-view-job]"
            );


        if (!viewButton) {

            return;

        }


        const jobId =
            viewButton.dataset
                .viewJob;


        openJobDetails(
            jobId
        );

    }
);


if (closeJobModal) {

    closeJobModal.addEventListener(
        "click",
        closeJobDetails
    );

}


if (jobDetailsModal) {

    jobDetailsModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                jobDetailsModal
            ) {

                closeJobDetails();

            }

        }
    );

}

/* ==================================================
   DELETE JOB
================================================== */

document.addEventListener(
    "click",
    async event => {

        const deleteButton =
            event.target.closest(
                "[data-delete-job]"
            );

        if (!deleteButton) {
            return;
        }

        const jobId =
            deleteButton.dataset.deleteJob;

        const job =
            publishedJobs.find(
                item =>
                    item.id === jobId
            );

        if (!job) {
            return;
        }

        const confirmed =
            window.confirm(
                `Delete "${job.title}"?\n\nThis will permanently delete this job.`
            );

        if (!confirmed) {
            return;
        }

        try {

            deleteButton.disabled = true;
            deleteButton.textContent = "Deleting...";

            const databaseId =
                job.id.replace(
                    "JOB-",
                    ""
                );

            const response =
                await fetch(
                    `${API_BASE_URL}/admin/jobs/${databaseId}`,
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
                    "Unable to delete job."
                );
            }

            await loadPublishedJobs();

            alert(
                "Job deleted successfully."
            );

        } catch (error) {

            console.error(
                "Delete job error:",
                error
            );

            alert(
                error.message ||
                "Unable to delete job."
            );

        } finally {

            deleteButton.disabled = false;
            deleteButton.textContent = "Delete";

        }

    }
);

/* ==================================================
   CLOSE JOB
================================================== */

if (closeJobButton) {

    closeJobButton.addEventListener(
        "click",
        async () => {

            const title =
                document.getElementById(
                    "modalJobTitle"
                ).textContent;


            const job =
                publishedJobs.find(
                    item =>
                        item.title ===
                        title
                );


            if (!job) {

                return;

            }


            const confirmed =
                window.confirm(
                    `Close "${job.title}"?\n\nThis job will no longer accept new applications.`
                );


            if (!confirmed) {

                return;

            }


            try {

                closeJobButton.disabled =
                    true;


                closeJobButton.textContent =
                    "Closing...";


                const jobId =
                    job.id.replace(
                        "JOB-",
                        ""
                    );


                const response =
                    await fetch(
                        `${API_BASE_URL}/admin/jobs/${jobId}/close`,
                        {

                            method:
                                "POST",

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

                    console.error(
                        result
                    );


                    throw new Error(
                        result.message ||
                        "Unable to close job."
                    );

                }


                closeJobDetails();


                await loadPublishedJobs();


                alert(
                    "Job closed successfully."
                );


            } catch (error) {

                console.error(
                    "Close job error:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to close job."
                );


            } finally {

                closeJobButton.disabled =
                    false;


                closeJobButton.textContent =
                    "Close Job";

            }

        }
    );

}


/* ==================================================
   EDIT JOB
================================================== */

if (editJobButton) {

    editJobButton.addEventListener(
        "click",
        () => {

            alert(
                "Job editing will be connected to the backend later."
            );

        }
    );

}


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape" &&

            jobDetailsModal &&

            !jobDetailsModal.classList
                .contains(
                    "hidden"
                )
        ) {

            closeJobDetails();

        }

    }
);


/* ==================================================
   HTML ESCAPE
================================================== */

function escapeHtml(value) {

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

function updateCurrentDate() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );


    if (!dateElement) {

        return;

    }


    const today =
        new Date();


    dateElement.textContent =
        today.toLocaleDateString(
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


/* ==================================================
   INITIALIZE
================================================== */

updateCurrentDate();

loadPublishedJobs();