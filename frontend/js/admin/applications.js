/* ==================================================
   ALOTE ADMIN — APPLICATIONS
   Temporary Frontend Data
================================================== */


/* ==================================================
   TEMPORARY APPLICATION DATA
================================================== */

let applications = [];

async function loadApplicationsFromBackend() {

    try {

        const response =
            await fetch(
                "http://127.0.0.1:8000/api/admin/applications",
                {
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

        if (!response.ok) {
            throw new Error(
                "Unable to load applications."
            );
        }

        const result =
            await response.json();

        applications =
            result.data.map(item => ({

                id:
                    `APP-${item.id}`,

                applicant: {
                    name:
                        item.job_seeker?.full_name ||
                        "Not available",

                    email:
                        item.job_seeker?.email ||
                        "Not available"
                },

                job: {
                    title:
                        item.job_post?.title ||
                        "Not available",

                    id:
                        item.job_post?.id
                            ? `JOB-${item.job_post.id}`
                            : "Not available"
                },

                company:
                    item.job_post?.employer?.company_name ||
                    "Not available",

                location:
                    item.job_post?.location ||
                    "Not specified",

                workType:
                    item.job_post?.work_mode ||
                    "Not specified",

                appliedDate:
                    item.applied_at
                        ? item.applied_at.substring(0, 10)
                        : "",

                status:
                    item.status === "pending"
                        ? "new"
                        : item.status,

                coverLetter:
                    item.cover_letter ||
                    "No cover letter.",

                resume:
                    item.resume_path || ""
            }));

        filteredApplications =
            [...applications];

        updateStatistics();

        sortFilteredApplications();

        renderApplications();

    } catch (error) {

        console.error(error);

    }

}


/* ==================================================
   STATE
================================================== */

let filteredApplications = [...applications];

let currentPageNumber = 1;

const applicationsPerPage = 6;



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

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


function formatDate(dateString) {

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


function formatStatus(status) {

    const labels = {

        new: "New",

        review: "Under Review",

        shortlisted: "Shortlisted",

        interview: "Interview",

        hired: "Hired",

        rejected: "Rejected"

    };

    return labels[status] || status;

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
                application.status === "new"
        ).length;


    const reviewCount =
        applications.filter(
            application =>
                application.status === "review"
        ).length;


    const hiredCount =
        applications.filter(
            application =>
                application.status === "hired"
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

                    application.applicant.name
                        .toLowerCase()
                        .includes(search) ||

                    application.applicant.email
                        .toLowerCase()
                        .includes(search) ||

                    application.job.title
                        .toLowerCase()
                        .includes(search) ||

                    application.company
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    selectedStatus === "all" ||
                    application.status === selectedStatus;


                let matchesJob = true;


                if (selectedJob !== "all") {

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
                        application.job.title ===
                        jobMap[selectedJob];

                }


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesJob
                );

            }
        );


    sortFilteredApplications();


    currentPageNumber = 1;


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


    if (sort === "newest") {

        filteredApplications.sort(
            (a, b) =>
                new Date(b.appliedDate) -
                new Date(a.appliedDate)
        );

    }


    else if (sort === "oldest") {

        filteredApplications.sort(
            (a, b) =>
                new Date(a.appliedDate) -
                new Date(b.appliedDate)
        );

    }


    else if (sort === "name") {

        filteredApplications.sort(
            (a, b) =>
                a.applicant.name.localeCompare(
                    b.applicant.name
                )
        );

    }


    else if (sort === "status") {

        filteredApplications.sort(
            (a, b) =>
                formatStatus(a.status)
                    .localeCompare(
                        formatStatus(b.status)
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
        pageApplications.length > 0;


    if (emptyState) {

        emptyState.classList.toggle(
            "hidden",
            hasResults
        );

    }


    if (tableBody) {

        tableBody.parentElement
            .parentElement
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

function renderTableRow(application) {

    return `

        <tr>

            <td>

                <div class="applicant-cell">

                    <div class="applicant-avatar">

                        ${getInitials(
                            application.applicant.name
                        )}

                    </div>


                    <div class="applicant-info">

                        <strong>
                            ${application.applicant.name}
                        </strong>

                        <span>
                            ${application.applicant.email}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <div class="application-job">

                    <strong>
                        ${application.job.title}
                    </strong>

                    <span>
                        ${application.job.id}
                    </span>

                </div>

            </td>


            <td>

                <span class="application-company">
                    ${application.company}
                </span>

            </td>


            <td>

                <span class="application-date">

                    ${formatDate(
                        application.appliedDate
                    )}

                </span>

            </td>


            <td>

                <span
                    class="application-status ${application.status}"
                >

                    ${formatStatus(
                        application.status
                    )}

                </span>

            </td>


            <td>

                <button
                    type="button"
                    class="application-action"
                    data-application-id="${application.id}"
                >
                    View
                </button>

            </td>

        </tr>

    `;

}



/* ==================================================
   MOBILE CARD
================================================== */

function renderMobileCard(application) {

    return `

        <article
            class="mobile-application-card"
        >

            <div class="mobile-application-top">


                <div class="mobile-applicant">

                    <div class="applicant-avatar">

                        ${getInitials(
                            application.applicant.name
                        )}

                    </div>


                    <div class="mobile-applicant-info">

                        <strong>
                            ${application.applicant.name}
                        </strong>

                        <span>
                            ${application.applicant.email}
                        </span>

                    </div>

                </div>


                <span
                    class="application-status ${application.status}"
                >

                    ${formatStatus(
                        application.status
                    )}

                </span>


            </div>



            <div class="mobile-application-job">

                <strong>
                    ${application.job.title}
                </strong>

                <span>
                    ${application.company}
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
                    data-application-id="${application.id}"
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
            `${total} ${
                total === 1
                    ? "application"
                    : "applications"
            }`;

    }


    if (paginationInfo) {

        paginationInfo.textContent =
            total === 0

                ? "Showing 0 applications"

                : `Showing ${
                    visibleStart
                }–${
                    visibleEnd
                } of ${
                    total
                } applications`;

    }


    if (currentPage) {

        currentPage.textContent =
            currentPageNumber;

    }


    if (previousPage) {

        previousPage.disabled =
            currentPageNumber <= 1;

    }


    if (nextPage) {

        nextPage.disabled =
            currentPageNumber >= totalPages;

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
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset
                            .applicationId;

                    openApplicationModal(id);

                }
            );

        });

}



/* ==================================================
   OPEN APPLICATION MODAL
================================================== */

function openApplicationModal(id) {

    const application =
        applications.find(
            item =>
                item.id === id
        );


    if (!application) {

        return;

    }


    modalApplicantName.textContent =
        application.applicant.name;


    modalApplicationId.textContent =
        application.id;


    modalApplicantFullName.textContent =
        application.applicant.name;


    modalApplicantEmail.textContent =
        application.applicant.email;


    modalApplicantAvatar.textContent =
        getInitials(
            application.applicant.name
        );


    modalJobTitle.textContent =
        application.job.title;


    modalCompany.textContent =
        application.company;


    modalLocation.textContent =
        application.location;


    modalWorkType.textContent =
        application.workType;


    modalAppliedDate.textContent =
        formatDate(
            application.appliedDate
        );


    modalApplicationStatus.textContent =
        formatStatus(
            application.status
        );


    modalCoverLetter.textContent =
        application.coverLetter;


    if (viewResume) {

        viewResume.dataset.resume =
            application.resume;

    }


    if (rejectApplication) {

        rejectApplication.dataset.applicationId =
            application.id;

    }


    if (updateApplication) {

        updateApplication.dataset.applicationId =
            application.id;

    }


    applicationModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}



/* ==================================================
   CLOSE APPLICATION MODAL
================================================== */

function closeModal() {

    applicationModal.classList.add(
        "hidden"
    );


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
            event.key === "Escape" &&
            applicationModal &&
            !applicationModal.classList.contains(
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

    if (!clearSearch || !searchInput) {

        return;

    }


    const hasValue =
        searchInput.value.length > 0;


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

            searchInput.value = "";

            filterApplications();

            searchInput.focus();

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

        searchInput.value = "";

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


    currentPageNumber = 1;


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
                currentPageNumber > 1
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
                    filteredApplications.length /
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
        () => {

            refreshApplications
                .querySelector("span")
                ?.classList.add(
                    "refreshing"
                );


            setTimeout(
                () => {

                    filteredApplications =
                        [...applications];

                    sortFilteredApplications();

                    currentPageNumber = 1;

                    updateStatistics();

                    renderApplications();

                    refreshApplications
                        .querySelector("span")
                        ?.classList.remove(
                            "refreshing"
                        );

                },
                350
            );

        }
    );

}



/* ==================================================
   RESUME BUTTON
================================================== */

if (viewResume) {

    viewResume.addEventListener(
        "click",
        () => {

            const resume =
                viewResume.dataset.resume;

            if (!resume) {

                alert(
                    "Resume not available."
                );

                return;
            }

            const resumeUrl =
                `http://127.0.0.1:8000/storage/${resume}`;

            window.open(
                resumeUrl,
                "_blank"
            );

        }
    );

}



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
                        item.id === id
                );


            if (!application) {

                return;

            }


            const confirmed =
                confirm(
                    `Reject the application from ${application.applicant.name
                    }?`
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

                const response =
                    await fetch(
                        `http://127.0.0.1:8000/api/admin/applications/${backendId}/status`,
                        {
                            method: "PATCH",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                status: "rejected"
                            })
                        }
                    );


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

                console.error(error);

                alert(
                    error.message
                );

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
                        item.id === id
                );

            if (!application) {
                return;
            }

            const nextStatuses = {

                new: "review",
                review: "shortlisted",
                shortlisted: "interview",
                interview: "hired",
                hired: "hired",
                rejected: "review"

            };

            const nextStatus =
                nextStatuses[
                application.status
                ];

            const backendId =
                application.id.replace(
                    "APP-",
                    ""
                );

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:8000/api/admin/applications/${backendId}/status`,
                        {
                            method: "PATCH",

                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                status: nextStatus
                            })
                        }
                    );

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

                console.error(error);

                alert(
                    error.message
                );

            }

        }
    );

}



/* ==================================================
   INITIALIZE
================================================== */

async function initializeApplications() {

    await loadApplicationsFromBackend();

}

initializeApplications();