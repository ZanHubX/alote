/* ==================================================
   ALOTE ADMIN — JOB SUBMISSIONS
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
   DATA
================================================== */

let submissions = [];


/* ==================================================
   LOAD SUBMISSIONS
================================================== */

async function loadSubmissions() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/admin/job-submissions`,
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
                "Failed to load submissions."
            );

        }


        const data =
            Array.isArray(
                result.data
            )
                ? result.data
                : [];


        submissions =
            data.map(
                item => ({

                    id:
                        `SUB-${item.id}`,

                    jobTitle:
                        item.title ||
                        "Untitled Job",

                    company:
                        item.employer
                            ?.company_name ||
                        "Not available",

                    contact:
                        item.employer
                            ?.contact_name ||
                        "Not available",

                    email:
                        item.employer
                            ?.email ||
                        item.apply_email ||
                        "Not available",

                    phone:
                        item.employer
                            ?.phone ||
                        "Not available",

                    category:
                        item.category
                            ?.name ||
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

                    salary:
                        item.salary_text ||
                        "Not specified",


                    /* PAYMENT */

                    paymentStatus:
                        item.payment
                            ?.status ||
                        "pending",

                    paymentAmount:
                        item.payment
                            ?.amount
                            ? `${item.payment.amount} ${item.payment.currency || "MMK"}`
                            : "Not available",

                    paymentReference:
                        item.payment
                            ?.transaction_id ||
                        "Not available",


                    submittedDate:
                        item.created_at
                            ? item.created_at.split(
                                "T"
                            )[0]
                            : "",

                    submittedText:
                        "Recently",

                    status:
                        item.status ||
                        "pending",

                    description:
                        item.description ||
                        "No description",

                    requirements:
                        Array.isArray(
                            item.requirements
                        ) &&
                            item.requirements.length > 0

                            ? item.requirements.join(
                                "\n"
                            )

                            : "Not available"

                })
            );


        updateCounts();

        renderSubmissions();


    } catch (error) {

        console.error(
            "Submission loading error:",
            error
        );


        alert(
            "Cannot load job submissions from ALote backend."
        );

    }

}


/* ==================================================
   STATE
================================================== */

let currentStatus =
    "all";

let currentSearch =
    "";

let currentSort =
    "newest";

let currentPageNumber =
    1;

const itemsPerPage =
    6;

let selectedSubmission =
    null;

let pendingAction =
    null;


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


const approvePaymentButton =
    document.getElementById(
        "approvePaymentButton"
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
   INITIALS
================================================== */

function getInitials(name) {

    if (!name) {

        return "AL";

    }


    const words =
        name
            .trim()
            .split(/\s+/);


    if (
        words.length === 1
    ) {

        return words[0]
            .substring(
                0,
                2
            )
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();

}


/* ==================================================
   STATUS LABEL
================================================== */

function getStatusLabel(status) {

    const labels = {

        pending:
            "Pending",

        approved:
            "Approved",

        rejected:
            "Rejected"

    };


    return labels[status] ||
        status;

}


/* ==================================================
   PAYMENT LABEL
================================================== */

function getPaymentLabel(status) {

    const labels = {

        paid:
            "Paid",

        pending:
            "Pending",

        failed:
            "Failed",

        refunded:
            "Refunded"

    };


    return labels[status] ||
        status;

}


/* ==================================================
   FILTER
================================================== */

function getFilteredSubmissions() {

    let result =
        [...submissions];


    if (
        currentStatus !==
        "all"
    ) {

        result =
            result.filter(
                submission =>
                    submission.status ===
                    currentStatus
            );

    }


    if (currentSearch) {

        const query =
            currentSearch
                .toLowerCase();


        result =
            result.filter(
                submission =>

                    submission.id
                        .toLowerCase()
                        .includes(
                            query
                        )

                    ||

                    submission.jobTitle
                        .toLowerCase()
                        .includes(
                            query
                        )

                    ||

                    submission.company
                        .toLowerCase()
                        .includes(
                            query
                        )

                    ||

                    submission.category
                        .toLowerCase()
                        .includes(
                            query
                        )
            );

    }


    result.sort(
        (a, b) => {

            if (
                currentSort ===
                "newest"
            ) {

                return (
                    new Date(
                        b.submittedDate
                    ) -
                    new Date(
                        a.submittedDate
                    )
                );

            }


            if (
                currentSort ===
                "oldest"
            ) {

                return (
                    new Date(
                        a.submittedDate
                    ) -
                    new Date(
                        b.submittedDate
                    )
                );

            }


            if (
                currentSort ===
                "company"
            ) {

                return a.company
                    .localeCompare(
                        b.company
                    );

            }


            if (
                currentSort ===
                "status"
            ) {

                return a.status
                    .localeCompare(
                        b.status
                    );

            }


            return 0;

        }
    );


    return result;

}


/* ==================================================
   COUNTS
================================================== */

function updateCounts() {

    const pending =
        submissions.filter(
            item =>
                item.status ===
                "pending"
        ).length;


    const approved =
        submissions.filter(
            item =>
                item.status ===
                "approved"
        ).length;


    const rejected =
        submissions.filter(
            item =>
                item.status ===
                "rejected"
        ).length;


    if (allCount) {

        allCount.textContent =
            submissions.length;

    }


    if (pendingCount) {

        pendingCount.textContent =
            pending;

    }


    if (pendingFilterCount) {

        pendingFilterCount.textContent =
            pending;

    }


    if (approvedCount) {

        approvedCount.textContent =
            approved;

    }


    if (rejectedCount) {

        rejectedCount.textContent =
            rejected;

    }


    if (pendingJobsBadge) {

        pendingJobsBadge.textContent =
            pending;

    }

}


/* ==================================================
   DESKTOP TABLE
================================================== */

function renderTable(data) {

    if (!tableBody) {

        return;

    }


    tableBody.innerHTML =
        "";


    data.forEach(
        submission => {

            const row =
                document.createElement(
                    "tr"
                );


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


            tableBody.appendChild(
                row
            );

        }
    );

}


/* ==================================================
   MOBILE
================================================== */

function renderMobile(data) {

    if (!mobileList) {

        return;

    }


    mobileList.innerHTML =
        "";


    data.forEach(
        submission => {

            const card =
                document.createElement(
                    "article"
                );


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


            mobileList.appendChild(
                card
            );

        }
    );

}


/* ==================================================
   DATE
================================================== */

function formatDate(
    dateString
) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(
            dateString
        );


    return date
        .toLocaleDateString(
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
   RENDER
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
        start +
        itemsPerPage;


    const pageData =
        filtered.slice(
            start,
            end
        );


    renderTable(
        pageData
    );


    renderMobile(
        pageData
    );


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
            currentPageNumber >=
            totalPages;

    }

}


/* ==================================================
   OPEN MODAL
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


    if (modalJobTitle) {

        modalJobTitle.textContent =
            submission.jobTitle;

    }


    if (modalSubmissionId) {

        modalSubmissionId.textContent =
            submission.id;

    }


    if (modalCompany) {

        modalCompany.textContent =
            submission.company;

    }


    if (modalContact) {

        modalContact.textContent =
            submission.contact;

    }


    if (modalEmail) {

        modalEmail.textContent =
            submission.email;

    }


    if (modalPhone) {

        modalPhone.textContent =
            submission.phone;

    }


    if (modalJob) {

        modalJob.textContent =
            submission.jobTitle;

    }


    if (modalCategory) {

        modalCategory.textContent =
            submission.category;

    }


    if (modalLocation) {

        modalLocation.textContent =
            submission.location;

    }


    if (modalWorkType) {

        modalWorkType.textContent =
            submission.workType;

    }


    if (modalEmploymentType) {

        modalEmploymentType.textContent =
            submission.employmentType;

    }


    if (modalSalary) {

        modalSalary.textContent =
            submission.salary;

    }


    if (modalDescription) {

        modalDescription.textContent =
            submission.description;

    }


    if (modalRequirements) {

        modalRequirements.textContent =
            submission.requirements;

    }


    /* ------------------------------------------
       PAYMENT DATA
    ------------------------------------------ */

    if (modalPaymentStatus) {

        modalPaymentStatus.textContent =
            getPaymentLabel(
                submission.paymentStatus
            );


        modalPaymentStatus.className =
            `payment-status ${submission.paymentStatus}`;

    }


    if (modalPaymentAmount) {

        modalPaymentAmount.textContent =
            submission.paymentAmount;

    }


    if (modalPaymentReference) {

        modalPaymentReference.textContent =
            submission.paymentReference;

    }


    /* ------------------------------------------
       PAYMENT APPROVE BUTTON
    ------------------------------------------ */

    if (approvePaymentButton) {

        if (
            submission.paymentStatus ===
            "paid"
        ) {

            approvePaymentButton.disabled =
                true;


            approvePaymentButton.textContent =
                "✓ Payment Approved";

        } else {

            approvePaymentButton.disabled =
                false;


            approvePaymentButton.textContent =
                "✓ Approve Payment";

        }

    }


    /* ------------------------------------------
       JOB APPROVE BUTTON
    ------------------------------------------ */

    if (modalApproveButton) {

        if (
            submission.status ===
            "approved"
        ) {

            modalApproveButton.disabled =
                true;


            modalApproveButton.innerHTML =
                "✓ Already Published";

        } else {

            modalApproveButton.disabled =
                false;


            modalApproveButton.innerHTML =
                "<span>✓</span> Approve & Publish";

        }

    }


    /* ------------------------------------------
       REJECT BUTTON
    ------------------------------------------ */

    if (modalRejectButton) {

        if (
            submission.status ===
            "rejected"
        ) {

            modalRejectButton.disabled =
                true;


            modalRejectButton.textContent =
                "Already Rejected";

        } else {

            modalRejectButton.disabled =
                false;


            modalRejectButton.textContent =
                "Reject";

        }

    }


    if (submissionModal) {

        submissionModal.classList.remove(
            "hidden"
        );

    }


    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   CLOSE MODAL
================================================== */

function closeModal() {

    if (submissionModal) {

        submissionModal.classList.add(
            "hidden"
        );

    }


    document.body.style.overflow =
        "";


    selectedSubmission =
        null;

}


/* ==================================================
   APPROVE PAYMENT
================================================== */

async function approvePayment() {

    if (!selectedSubmission) {

        return;

    }


    if (
        selectedSubmission
            .paymentStatus ===
        "paid"
    ) {

        return;

    }


    const confirmed =
        window.confirm(
            `Approve payment for "${selectedSubmission.jobTitle}"?`
        );


    if (!confirmed) {

        return;

    }


    const submissionId =
        selectedSubmission.id
            .replace(
                "SUB-",
                ""
            );


    try {

        if (approvePaymentButton) {

            approvePaymentButton.disabled =
                true;


            approvePaymentButton.textContent =
                "Approving...";

        }


        const response =
            await fetch(
                `${API_BASE_URL}/admin/job-submissions/${submissionId}/payment/approve`,
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

            throw new Error(
                result.message ||
                "Unable to approve payment."
            );

        }


        showToast(
            "Payment approved successfully."
        );


        closeModal();


        await loadSubmissions();


    } catch (error) {

        console.error(
            "Payment approval error:",
            error
        );


        alert(
            error.message ||
            "Unable to approve payment."
        );


    } finally {

        if (approvePaymentButton) {

            approvePaymentButton.disabled =
                false;


            approvePaymentButton.textContent =
                "✓ Approve Payment";

        }

    }

}


/* ==================================================
   CONFIRMATION MODAL
================================================== */

function openConfirmation(
    action
) {

    if (!selectedSubmission) {

        return;

    }


    pendingAction =
        action;


    if (
        action ===
        "approve"
    ) {

        if (confirmIcon) {

            confirmIcon.textContent =
                "✓";


            confirmIcon.style.background =
                "#dcfce7";


            confirmIcon.style.color =
                "#15803d";

        }


        if (confirmEyebrow) {

            confirmEyebrow.textContent =
                "PUBLISH JOB";

        }


        if (confirmTitle) {

            confirmTitle.textContent =
                "Approve this job?";

        }


        if (confirmMessage) {

            confirmMessage.textContent =
                `"${selectedSubmission.jobTitle}" will be approved and published on ALote.`;

        }


        if (confirmProceed) {

            confirmProceed.textContent =
                "Approve & Publish";

        }

    }


    else if (
        action ===
        "reject"
    ) {

        if (confirmIcon) {

            confirmIcon.textContent =
                "!";


            confirmIcon.style.background =
                "#fee2e2";


            confirmIcon.style.color =
                "#dc2626";

        }


        if (confirmEyebrow) {

            confirmEyebrow.textContent =
                "REJECT SUBMISSION";

        }


        if (confirmTitle) {

            confirmTitle.textContent =
                "Reject this submission?";

        }


        if (confirmMessage) {

            confirmMessage.textContent =
                `"${selectedSubmission.jobTitle}" will be marked as rejected.`;

        }


        if (confirmProceed) {

            confirmProceed.textContent =
                "Reject";

        }

    }


    if (confirmModal) {

        confirmModal.classList.remove(
            "hidden"
        );

    }

}


/* ==================================================
   CLOSE CONFIRMATION
================================================== */

function closeConfirmation() {

    if (confirmModal) {

        confirmModal.classList.add(
            "hidden"
        );

    }


    pendingAction =
        null;

}


/* ==================================================
   EXECUTE JOB ACTION
================================================== */

async function executeAction() {

    if (
        !selectedSubmission ||
        !pendingAction
    ) {

        return;

    }


    const submission =
        submissions.find(
            item =>
                item.id ===
                selectedSubmission.id
        );


    if (!submission) {

        return;

    }


    /* ==================================================
       APPROVE JOB
    ================================================== */

    if (
        pendingAction ===
        "approve"
    ) {

        try {

            if (confirmProceed) {

                confirmProceed.disabled =
                    true;


                confirmProceed.textContent =
                    "Publishing...";

            }


            const submissionId =
                submission.id
                    .replace(
                        "SUB-",
                        ""
                    );


            const response =
                await fetch(
                    `${API_BASE_URL}/admin/job-submissions/${submissionId}/approve`,
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


            await loadSubmissions();


        } catch (error) {

            console.error(
                "Job approval error:",
                error
            );


            alert(
                error.message ||
                "Unable to approve job."
            );


        } finally {

            if (confirmProceed) {

                confirmProceed.disabled =
                    false;


                confirmProceed.textContent =
                    "Approve & Publish";

            }

        }

    }


    /* ==================================================
       REJECT JOB
    ================================================== */

    else if (
        pendingAction ===
        "reject"
    ) {

        try {

            if (confirmProceed) {

                confirmProceed.disabled =
                    true;


                confirmProceed.textContent =
                    "Rejecting...";

            }


            const submissionId =
                submission.id
                    .replace(
                        "SUB-",
                        ""
                    );


            const response =
                await fetch(
                    `${API_BASE_URL}/admin/job-submissions/${submissionId}/reject`,
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

            console.error(
                "Job rejection error:",
                error
            );


            alert(
                error.message ||
                "Unable to reject submission."
            );


        } finally {

            if (confirmProceed) {

                confirmProceed.disabled =
                    false;


                confirmProceed.textContent =
                    "Reject";

            }

        }

    }

}


/* ==================================================
   TOAST
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
                searchInput.value
                    .trim();


            currentPageNumber =
                1;


            if (clearSearchButton) {

                clearSearchButton
                    .classList
                    .toggle(
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


            clearSearchButton
                .classList
                .remove(
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
                                item
                                    .classList
                                    .remove(
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
   VIEW BUTTON
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


        openSubmissionModal(
            viewButton.dataset.id
        );

    }
);


/* ==================================================
   PAYMENT BUTTON
================================================== */

if (approvePaymentButton) {

    approvePaymentButton.addEventListener(
        "click",
        approvePayment
    );

}


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
   MODAL OVERLAY
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

                clearSearchButton
                    .classList
                    .remove(
                        "visible"
                    );

            }


            document
                .querySelectorAll(
                    ".status-filter"
                )
                .forEach(
                    button => {

                        button
                            .classList
                            .toggle(
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
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            confirmModal &&
            !confirmModal
                .classList
                .contains(
                    "hidden"
                )
        ) {

            closeConfirmation();

            return;

        }


        if (
            submissionModal &&
            !submissionModal
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
   LOGOUT
================================================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

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
   INITIALIZE
================================================== */

updateCounts();

renderSubmissions();

renderCurrentDate();

loadSubmissions();