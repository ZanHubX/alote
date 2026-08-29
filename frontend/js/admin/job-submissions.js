/* ==================================================
   ALOTE ADMIN — JOB SUBMISSIONS
   Temporary frontend data
   -----------------------------------------------
   Later:
   Replace temporary data with API requests.
================================================== */


/* ==================================================
   TEMPORARY SUBMISSION DATA
================================================== */

let submissions = [];

async function loadSubmissions() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/admin/job-submissions",
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to load submissions."
            );
        }

        submissions = result.data.map(item => ({
            id: `SUB-${item.id}`,

            jobTitle: item.title,

            company:
                item.employer?.company_name || "Not available",

            contact:
                item.employer?.contact_name || "Not available",

            email:
                item.employer?.email ||
                item.apply_email ||
                "Not available",

            phone:
                item.employer?.phone || "Not available",

            category:
                item.category?.name || "Not available",

            location: item.location || "Not specified",

            workType: item.work_mode || "Not specified",

            employmentType: item.job_type || "Not specified",

            salary:
                item.salary_text ||
                "Not specified",

            paymentStatus: "pending",

            paymentAmount: "Not available",

            paymentReference: "Not available",

            submittedDate: item.created_at
                ? item.created_at.split("T")[0]
                : "",

            submittedText: "Recently",

            status: item.status || "pending",

            description:
                item.description || "No description",

            requirements:
                Array.isArray(item.requirements) &&
                    item.requirements.length > 0
                    ? item.requirements.join("\n")
                    : "Not available",
        }));

        updateCounts();
        renderSubmissions();

    } catch (error) {
        console.error(error);

        alert(
            "Cannot load job submissions from ALote backend."
        );
    }
}



/* ==================================================
   STATE
================================================== */

let currentStatus = "all";

let currentSearch = "";

let currentSort = "newest";

let currentPageNumber = 1;

const itemsPerPage = 6;

let selectedSubmission = null;

let pendingAction = null;



/* ==================================================
   DOM ELEMENTS
================================================== */

const tableBody =
    document.getElementById(
        "submissionTableBody"
    );


const mobileList =
    document.getElementById(
        "submissionMobileList"
    );


const searchInput =
    document.getElementById(
        "submissionSearch"
    );


const clearSearchButton =
    document.getElementById(
        "clearSubmissionSearch"
    );


const emptyState =
    document.getElementById(
        "submissionsEmpty"
    );


const pendingCount =
    document.getElementById(
        "pendingCount"
    );


const allCount =
    document.getElementById(
        "allCount"
    );


const pendingFilterCount =
    document.getElementById(
        "pendingFilterCount"
    );


const approvedCount =
    document.getElementById(
        "approvedCount"
    );


const rejectedCount =
    document.getElementById(
        "rejectedCount"
    );


const pendingJobsBadge =
    document.getElementById(
        "pendingJobsBadge"
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


const sortSelect =
    document.getElementById(
        "sortSubmissions"
    );



/* ==================================================
   MODAL ELEMENTS
================================================== */

const submissionModal =
    document.getElementById(
        "submissionModal"
    );


const closeSubmissionModal =
    document.getElementById(
        "closeSubmissionModal"
    );


const modalJobTitle =
    document.getElementById(
        "modalJobTitle"
    );


const modalSubmissionId =
    document.getElementById(
        "modalSubmissionId"
    );


const modalCompany =
    document.getElementById(
        "modalCompany"
    );


const modalContact =
    document.getElementById(
        "modalContact"
    );


const modalEmail =
    document.getElementById(
        "modalEmail"
    );


const modalPhone =
    document.getElementById(
        "modalPhone"
    );


const modalJob =
    document.getElementById(
        "modalJob"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalLocation =
    document.getElementById(
        "modalLocation"
    );


const modalWorkType =
    document.getElementById(
        "modalWorkType"
    );


const modalEmploymentType =
    document.getElementById(
        "modalEmploymentType"
    );


const modalSalary =
    document.getElementById(
        "modalSalary"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalRequirements =
    document.getElementById(
        "modalRequirements"
    );


const modalPaymentStatus =
    document.getElementById(
        "modalPaymentStatus"
    );


const modalPaymentAmount =
    document.getElementById(
        "modalPaymentAmount"
    );


const modalPaymentReference =
    document.getElementById(
        "modalPaymentReference"
    );


const modalApproveButton =
    document.getElementById(
        "modalApproveButton"
    );


const modalRejectButton =
    document.getElementById(
        "modalRejectButton"
    );



/* ==================================================
   CONFIRMATION MODAL
================================================== */

const confirmModal =
    document.getElementById(
        "confirmModal"
    );


const confirmIcon =
    document.getElementById(
        "confirmIcon"
    );


const confirmEyebrow =
    document.getElementById(
        "confirmEyebrow"
    );


const confirmTitle =
    document.getElementById(
        "confirmTitle"
    );


const confirmMessage =
    document.getElementById(
        "confirmMessage"
    );


const confirmCancel =
    document.getElementById(
        "confirmCancel"
    );


const confirmProceed =
    document.getElementById(
        "confirmProceed"
    );



/* ==================================================
   HELPER — INITIALS
================================================== */

function getInitials(name) {

    if (!name) {
        return "AL";
    }


    const words =
        name.trim().split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();

}



/* ==================================================
   HELPER — STATUS
================================================== */

function getStatusLabel(status) {

    const labels = {

        pending: "Pending",

        approved: "Approved",

        rejected: "Rejected"

    };


    return labels[status] || status;

}



/* ==================================================
   HELPER — PAYMENT
================================================== */

function getPaymentLabel(status) {

    const labels = {

        paid: "Paid",

        pending: "Pending",

        failed: "Failed"

    };


    return labels[status] || status;

}



/* ==================================================
   FILTER DATA
================================================== */

function getFilteredSubmissions() {

    let result =
        [...submissions];


    /* STATUS */

    if (currentStatus !== "all") {

        result =
            result.filter(
                submission =>
                    submission.status ===
                    currentStatus
            );

    }


    /* SEARCH */

    if (currentSearch) {

        const query =
            currentSearch.toLowerCase();


        result =
            result.filter(
                submission =>

                    submission.id
                        .toLowerCase()
                        .includes(query)

                    ||

                    submission.jobTitle
                        .toLowerCase()
                        .includes(query)

                    ||

                    submission.company
                        .toLowerCase()
                        .includes(query)

                    ||

                    submission.category
                        .toLowerCase()
                        .includes(query)

            );

    }


    /* SORT */

    result.sort(
        (a, b) => {

            if (currentSort === "newest") {

                return new Date(b.submittedDate)
                    - new Date(a.submittedDate);

            }


            if (currentSort === "oldest") {

                return new Date(a.submittedDate)
                    - new Date(b.submittedDate);

            }


            if (currentSort === "company") {

                return a.company.localeCompare(
                    b.company
                );

            }


            if (currentSort === "status") {

                return a.status.localeCompare(
                    b.status
                );

            }


            return 0;

        }
    );


    return result;

}



/* ==================================================
   UPDATE COUNTS
================================================== */

function updateCounts() {

    const pending =
        submissions.filter(
            item =>
                item.status === "pending"
        ).length;


    const approved =
        submissions.filter(
            item =>
                item.status === "approved"
        ).length;


    const rejected =
        submissions.filter(
            item =>
                item.status === "rejected"
        ).length;


    allCount.textContent =
        submissions.length;


    pendingCount.textContent =
        pending;


    pendingFilterCount.textContent =
        pending;


    approvedCount.textContent =
        approved;


    rejectedCount.textContent =
        rejected;


    pendingJobsBadge.textContent =
        pending;

}



/* ==================================================
   RENDER DESKTOP TABLE
================================================== */

function renderTable(data) {

    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    data.forEach(
        submission => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="table-submission">

                        <div class="table-submission-avatar">
                            ${getInitials(
                                submission.company
                            )}
                        </div>


                        <div class="table-submission-info">

                            <strong>
                                ${submission.jobTitle}
                            </strong>

                            <span>
                                ${submission.id}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="table-employer">

                        <strong>
                            ${submission.company}
                        </strong>

                        <span>
                            ${submission.contact}
                        </span>

                    </div>

                </td>


                <td>

                    <div class="table-job">

                        <strong>
                            ${submission.category}
                        </strong>

                        <span>
                            ${submission.location}
                            ·
                            ${submission.workType}
                            ·
                            ${submission.employmentType}
                        </span>

                    </div>

                </td>


                <td>

                    <span
                        class="payment-pill ${submission.paymentStatus}"
                    >

                        <span class="payment-dot"></span>

                        ${getPaymentLabel(
                            submission.paymentStatus
                        )}

                    </span>

                </td>


                <td>

                    <div class="table-date">

                        <strong>
                            ${submission.submittedText}
                        </strong>

                        <span>
                            ${formatDate(
                                submission.submittedDate
                            )}
                        </span>

                    </div>

                </td>


                <td>

                    <span
                        class="status-badge ${submission.status}"
                    >

                        ${getStatusLabel(
                            submission.status
                        )}

                    </span>

                </td>


                <td>

                    <div class="table-actions">

                        <button
                            type="button"
                            class="view-button"
                            data-id="${submission.id}"
                        >
                            View
                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}



/* ==================================================
   RENDER MOBILE CARDS
================================================== */

function renderMobile(data) {

    if (!mobileList) {
        return;
    }


    mobileList.innerHTML = "";


    data.forEach(
        submission => {

            const card =
                document.createElement("article");


            card.className =
                "mobile-submission-card";


            card.innerHTML = `

                <div class="mobile-submission-top">


                    <div class="mobile-submission-avatar">
                        ${getInitials(
                            submission.company
                        )}
                    </div>


                    <div class="mobile-submission-title">

                        <strong>
                            ${submission.jobTitle}
                        </strong>

                        <span>
                            ${submission.company}
                        </span>

                    </div>


                    <div class="mobile-submission-status">

                        <span
                            class="status-badge ${submission.status}"
                        >

                            ${getStatusLabel(
                                submission.status
                            )}

                        </span>

                    </div>


                </div>



                <div class="mobile-submission-details">


                    <div class="mobile-detail">

                        <span>
                            Category
                        </span>

                        <strong>
                            ${submission.category}
                        </strong>

                    </div>


                    <div class="mobile-detail">

                        <span>
                            Location
                        </span>

                        <strong>
                            ${submission.location}
                        </strong>

                    </div>


                    <div class="mobile-detail">

                        <span>
                            Payment
                        </span>

                        <strong>

                            <span
                                class="payment-pill ${submission.paymentStatus}"
                            >

                                <span class="payment-dot"></span>

                                ${getPaymentLabel(
                                    submission.paymentStatus
                                )}

                            </span>

                        </strong>

                    </div>


                    <div class="mobile-detail">

                        <span>
                            Submitted
                        </span>

                        <strong>
                            ${submission.submittedText}
                        </strong>

                    </div>


                </div>



                <div class="mobile-submission-footer">


                    <small>
                        ${submission.id}
                    </small>


                    <button
                        type="button"
                        class="view-button"
                        data-id="${submission.id}"
                    >
                        View Details →
                    </button>


                </div>

            `;


            mobileList.appendChild(card);

        }
    );

}



/* ==================================================
   FORMAT DATE
================================================== */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}



/* ==================================================
   RENDER PAGINATION
================================================== */

function renderSubmissions() {

    const filtered =
        getFilteredSubmissions();


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filtered.length /
                itemsPerPage
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
        itemsPerPage;


    const end =
        start + itemsPerPage;


    const pageData =
        filtered.slice(
            start,
            end
        );


    renderTable(pageData);

    renderMobile(pageData);


    if (emptyState) {

        emptyState.classList.toggle(
            "hidden",
            filtered.length !== 0
        );

    }


    const showingStart =
        filtered.length === 0
            ? 0
            : start + 1;


    const showingEnd =
        Math.min(
            end,
            filtered.length
        );


    if (paginationInfo) {

        paginationInfo.textContent =

            filtered.length === 0

                ? "Showing 0 submissions"

                : `Showing ${showingStart}–${showingEnd} of ${filtered.length} submissions`;

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
   OPEN REVIEW MODAL
================================================== */

function openSubmissionModal(id) {

    const submission =
        submissions.find(
            item =>
                item.id === id
        );


    if (!submission) {
        return;
    }


    selectedSubmission =
        submission;


    modalJobTitle.textContent =
        submission.jobTitle;


    modalSubmissionId.textContent =
        submission.id;


    modalCompany.textContent =
        submission.company;


    modalContact.textContent =
        submission.contact;


    modalEmail.textContent =
        submission.email;


    modalPhone.textContent =
        submission.phone;


    modalJob.textContent =
        submission.jobTitle;


    modalCategory.textContent =
        submission.category;


    modalLocation.textContent =
        submission.location;


    modalWorkType.textContent =
        submission.workType;


    modalEmploymentType.textContent =
        submission.employmentType;


    modalSalary.textContent =
        submission.salary;


    modalDescription.textContent =
        submission.description;


    modalRequirements.textContent =
        submission.requirements;


    modalPaymentStatus.textContent =
        getPaymentLabel(
            submission.paymentStatus
        );


    modalPaymentStatus.className =
        `payment-status ${submission.paymentStatus}`;


    modalPaymentAmount.textContent =
        submission.paymentAmount;


    modalPaymentReference.textContent =
        submission.paymentReference;


    /* APPROVE BUTTON */

    if (
        submission.status === "approved"
    ) {

        modalApproveButton.disabled = true;

        modalApproveButton.innerHTML =
            "✓ Already Published";

    }

    else {

        modalApproveButton.disabled = false;

        modalApproveButton.innerHTML =
            "<span>✓</span> Approve & Publish";

    }


    /* REJECT BUTTON */

    if (
        submission.status === "rejected"
    ) {

        modalRejectButton.disabled = true;

        modalRejectButton.textContent =
            "Already Rejected";

    }

    else {

        modalRejectButton.disabled = false;

        modalRejectButton.textContent =
            "Reject";

    }


    submissionModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}



/* ==================================================
   CLOSE REVIEW MODAL
================================================== */

function closeModal() {

    submissionModal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";



    selectedSubmission =
        null;

}



/* ==================================================
   OPEN CONFIRMATION
================================================== */

function openConfirmation(action) {

    if (!selectedSubmission) {
        return;
    }


    pendingAction =
        action;


    if (action === "approve") {

        confirmIcon.textContent =
            "✓";


        confirmIcon.style.background =
            "#dcfce7";


        confirmIcon.style.color =
            "#15803d";


        confirmEyebrow.textContent =
            "PUBLISH JOB";


        confirmTitle.textContent =
            "Approve this job?";


        confirmMessage.textContent =

            `"${selectedSubmission.jobTitle}" will be approved and published on ALote.`;


        confirmProceed.textContent =
            "Approve & Publish";

    }


    else if (action === "reject") {

        confirmIcon.textContent =
            "!";


        confirmIcon.style.background =
            "#fee2e2";


        confirmIcon.style.color =
            "#dc2626";


        confirmEyebrow.textContent =
            "REJECT SUBMISSION";


        confirmTitle.textContent =
            "Reject this submission?";


        confirmMessage.textContent =

            `"${selectedSubmission.jobTitle}" will be marked as rejected.`;


        confirmProceed.textContent =
            "Reject";

    }


    confirmModal.classList.remove(
        "hidden"
    );

}



/* ==================================================
   CLOSE CONFIRMATION
================================================== */

function closeConfirmation() {

    confirmModal.classList.add(
        "hidden"
    );


    pendingAction =
        null;

}



/* ==================================================
   EXECUTE ACTION
================================================== */

async function executeAction() {

    if (!selectedSubmission || !pendingAction) {
        return;
    }

    const submission = submissions.find(
        item => item.id === selectedSubmission.id
    );

    if (!submission) {
        return;
    }

    /* ==============================================
       APPROVE
    ============================================== */

    if (pendingAction === "approve") {

        try {

            confirmProceed.disabled = true;
            confirmProceed.textContent = "Publishing...";

            // "SUB-3" → "3"
            const submissionId =
                submission.id.replace("SUB-", "");

            const response = await fetch(
                `http://127.0.0.1:8000/api/admin/job-submissions/${submissionId}/approve`,
                {
                    method: "POST",

                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {

                console.error(result);

                throw new Error(
                    result.message ||
                    "Unable to approve job."
                );
            }

            closeConfirmation();
            closeModal();

            showToast(
                "Job approved and published."
            );

            // Reload actual database data
            await loadSubmissions();

        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "Unable to approve job."
            );

        } finally {

            confirmProceed.disabled = false;
            confirmProceed.textContent =
                "Approve & Publish";
        }

    }


    /* ==============================================
       REJECT
    ============================================== */

    else if (pendingAction === "reject") {

        try {

            confirmProceed.disabled = true;
            confirmProceed.textContent = "Rejecting...";

            const submissionId =
                submission.id.replace("SUB-", "");

            const response = await fetch(
                `http://127.0.0.1:8000/api/admin/job-submissions/${submissionId}/reject`,
                {
                    method: "POST",

                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {

                console.error(result);

                throw new Error(
                    result.message ||
                    "Unable to reject submission."
                );
            }

            closeConfirmation();
            closeModal();

            showToast(
                "Submission rejected."
            );

            await loadSubmissions();

        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "Unable to reject submission."
            );

        } finally {

            confirmProceed.disabled = false;
            confirmProceed.textContent =
                "Reject";
        }

    }
}



/* ==================================================
   TOAST NOTIFICATION
================================================== */

function showToast(message) {

    const existing =
        document.querySelector(
            ".admin-toast"
        );


    if (existing) {

        existing.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "admin-toast";


    toast.innerHTML = `

        <span class="toast-icon">
            ✓
        </span>

        <span>
            ${message}
        </span>

    `;


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.classList.add(
                "show"
            );

        },
        10
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    toast.remove();

                },
                250
            );

        },
        2800
    );

}



/* ==================================================
   SEARCH
================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            currentSearch =
                searchInput.value.trim();


            currentPageNumber =
                1;


            if (clearSearchButton) {

                clearSearchButton.classList.toggle(
                    "visible",
                    currentSearch.length > 0
                );

            }


            renderSubmissions();

        }
    );

}



/* ==================================================
   CLEAR SEARCH
================================================== */

if (clearSearchButton) {

    clearSearchButton.addEventListener(
        "click",
        () => {

            searchInput.value =
                "";


            currentSearch =
                "";


            clearSearchButton.classList.remove(
                "visible"
            );


            currentPageNumber =
                1;


            renderSubmissions();


            searchInput.focus();

        }
    );

}



/* ==================================================
   STATUS FILTERS
================================================== */

document
    .querySelectorAll(
        ".status-filter"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".status-filter"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    currentStatus =
                        button.dataset.status;


                    currentPageNumber =
                        1;


                    renderSubmissions();

                }
            );

        }
    );



/* ==================================================
   SORT
================================================== */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        () => {

            currentSort =
                sortSelect.value;


            currentPageNumber =
                1;


            renderSubmissions();

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

                renderSubmissions();

            }

        }
    );

}


if (nextPage) {

    nextPage.addEventListener(
        "click",
        () => {

            const totalPages =
                Math.max(
                    1,
                    Math.ceil(
                        getFilteredSubmissions()
                            .length /
                        itemsPerPage
                    )
                );


            if (
                currentPageNumber <
                totalPages
            ) {

                currentPageNumber++;

                renderSubmissions();

            }

        }
    );

}



/* ==================================================
   VIEW BUTTONS
   -----------------------------------------------
   Event delegation allows buttons generated
   dynamically by JavaScript to work.
================================================== */

document.addEventListener(
    "click",
    event => {

        const viewButton =
            event.target.closest(
                ".view-button"
            );


        if (!viewButton) {
            return;
        }


        const id =
            viewButton.dataset.id;


        openSubmissionModal(id);

    }
);



/* ==================================================
   MODAL BUTTONS
================================================== */

if (closeSubmissionModal) {

    closeSubmissionModal.addEventListener(
        "click",
        closeModal
    );

}


if (modalApproveButton) {

    modalApproveButton.addEventListener(
        "click",
        () => {

            if (
                !modalApproveButton.disabled
            ) {

                openConfirmation(
                    "approve"
                );

            }

        }
    );

}


if (modalRejectButton) {

    modalRejectButton.addEventListener(
        "click",
        () => {

            if (
                !modalRejectButton.disabled
            ) {

                openConfirmation(
                    "reject"
                );

            }

        }
    );

}



/* ==================================================
   MODAL OVERLAY CLICK
================================================== */

if (submissionModal) {

    submissionModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                submissionModal
            ) {

                closeModal();

            }

        }
    );

}



/* ==================================================
   CONFIRMATION
================================================== */

if (confirmCancel) {

    confirmCancel.addEventListener(
        "click",
        closeConfirmation
    );

}


if (confirmProceed) {

    confirmProceed.addEventListener(
        "click",
        executeAction
    );

}


if (confirmModal) {

    confirmModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                confirmModal
            ) {

                closeConfirmation();

            }

        }
    );

}



/* ==================================================
   RESET FILTERS
================================================== */

const resetFilters =
    document.getElementById(
        "resetFilters"
    );


if (resetFilters) {

    resetFilters.addEventListener(
        "click",
        () => {

            currentStatus =
                "all";


            currentSearch =
                "";


            currentPageNumber =
                1;


            if (searchInput) {

                searchInput.value =
                    "";

            }


            if (clearSearchButton) {

                clearSearchButton.classList.remove(
                    "visible"
                );

            }


            document
                .querySelectorAll(
                    ".status-filter"
                )
                .forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.status ===
                            "all"
                        );

                    }
                );


            renderSubmissions();

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
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            confirmModal &&
            !confirmModal.classList.contains(
                "hidden"
            )
        ) {

            closeConfirmation();

            return;

        }


        if (
            submissionModal &&
            !submissionModal.classList.contains(
                "hidden"
            )
        ) {

            closeModal();

        }

    }
);



/* ==================================================
   CURRENT DATE
================================================== */

function renderCurrentDate() {

    const element =
        document.getElementById(
            "currentDate"
        );


    if (!element) {
        return;
    }


    const today =
        new Date();


    element.textContent =
        today.toLocaleDateString(
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
   LOGOUT
================================================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

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


            /*
             * This should match the authentication
             * system used by admin/login.js.
             */

            localStorage.removeItem(
                "alote-admin-auth"
            );


            window.location.href =
                "login.html";

        }
    );

}



/* ==================================================
   INITIALIZE
================================================== */

updateCounts();

renderSubmissions();

renderCurrentDate();

loadSubmissions();