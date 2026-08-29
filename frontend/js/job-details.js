let jobs = [];
async function loadJobDetailsFromBackend() {

    try {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const jobId =
            params.get("id");

        if (!jobId) {
            throw new Error(
                "Job ID not found."
            );
        }

        const response = await fetch(
            `http://127.0.0.1:8000/api/jobs/${jobId}`,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const result =
            await response.json();

        const item =
            result.data;

        let salary =
            item.salary_text ||
            "Not specified";

        jobs = [
            {
                id: item.id,

                title:
                    item.title,

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

                salary:
                    salary,

                category:
                    item.category?.name ||
                    "Other",

                description:
                    item.description ||
                    "",

                requirements:
                    Array.isArray(item.requirements)
                        ? item.requirements
                        : [],

                responsibilities:
                    Array.isArray(item.responsibilities)
                        ? item.responsibilities
                        : [],

                applicationEmail:
                    item.apply_email ||
                    "",

                postedDate:
                    item.published_at ||
                    "",

                deadlineDate:
                    item.deadline ||
                    ""
            }
        ];

        console.log(
            "Job detail loaded:",
            jobs
        );

    } catch (error) {

        console.error(
            "Cannot load job details:",
            error
        );

    }

}

let job = null;




/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        employer: "Employer",
        findJobs: "Find Jobs",
        categories: "Categories",
        whyAlote: "Why ALote",

        backToJobs: "Back to jobs",

        aboutRole: "About the role",
        responsibilities: "Responsibilities",
        requirements: "Requirements",

        jobOverview: "Job overview",
        location: "Location",
        workStyle: "Work style",
        employmentType: "Employment type",
        salary: "Salary",
        category: "Category",

        posted: "Posted",
        applicationDeadline: "Application deadline",

        applyNow: "Apply for this job",

        company: "Company",

        fullTime: "Full-time",
        remote: "Remote",
        hybrid: "Hybrid",
        onsite: "On-site",

        applicationEmail: "Application email"
    },


    my: {

        employer: "အလုပ်ရှင်",
        findJobs: "အလုပ်အကိုင်များ",
        categories: "အမျိုးအစားများ",
        whyAlote: "ALote ကို ဘာကြောင့်သုံးမလဲ",
        postJob:
            "အလုပ်တင်မည်",

        backToJobs: "အလုပ်အကိုင်များသို့ ပြန်သွားမည်",

        aboutRole: "အလုပ်အကြောင်း",
        responsibilities: "တာဝန်များ",
        requirements: "လိုအပ်ချက်များ",

        jobOverview: "အလုပ်အချက်အလက်များ",
        location: "တည်နေရာ",
        workStyle: "အလုပ်လုပ်ပုံ",
        employmentType: "အလုပ်အမျိုးအစား",
        salary: "လစာ",
        category: "အမျိုးအစား",

        posted: "တင်ထားသည့်ရက်",
        applicationDeadline: "လျှောက်ထားရန် နောက်ဆုံးရက်",

        applyNow: "ဤအလုပ်ကို လျှောက်ထားမည်",

        company: "ကုမ္ပဏီ",

        fullTime: "အချိန်ပြည့်",
        remote: "အဝေးမှ",
        hybrid: "Hybrid",
        onsite: "ရုံးတက်",

        applicationEmail: "လျှောက်လွှာပေးပို့ရန် Email"
    }

};


let currentLanguage =
    localStorage.getItem("alote-language") || "en";


/* =========================================
   LANGUAGE
========================================= */

function changeLanguage(language) {

    const selectedLanguage =
        translations[language];

    if (!selectedLanguage) {
        return;
    }

    currentLanguage = language;

    document.documentElement.lang =
        language;


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (selectedLanguage[key]) {

                element.textContent =
                    selectedLanguage[key];

            }

        });


    document
        .querySelectorAll(".language-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === language
            );

        });


    localStorage.setItem(
        "alote-language",
        language
    );

}


/* =========================================
   DYNAMIC TRANSLATION
========================================= */

function translateWorkStyle(value) {

    if (currentLanguage === "en") {

        if (value === "WFH") {
            return "Remote";
        }

        if (value === "Hybrid") {
            return "Hybrid";
        }

        if (value === "On-site") {
            return "On-site";
        }

    }

    if (value === "WFH") {
        return "အဝေးမှ";
    }

    if (value === "Hybrid") {
        return "Hybrid";
    }

    if (value === "On-site") {
        return "ရုံးတက်";
    }

    return value;
}


function translateEmploymentType(value) {

    if (
        value === "Full-time" &&
        currentLanguage === "my"
    ) {
        return "အချိန်ပြည့်";
    }

    if (
        value === "Part-time" &&
        currentLanguage === "my"
    ) {
        return "အချိန်ပိုင်း";
    }

    if (
        value === "Internship" &&
        currentLanguage === "my"
    ) {
        return "အလုပ်သင်";
    }

    return value;
}


/* =========================================
   DATE FORMAT
========================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);

    if (currentLanguage === "my") {

        return date.toLocaleDateString(
            "my-MM",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    }

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


/* =========================================
   RENDER JOB
========================================= */

function renderJob() {
    const companyInitials =
        job.company
            .split(" ")
            .filter(word => word.length > 0)
            .map(word => word[0])
            .join("")
            .substring(0, 3)
            .toUpperCase();

    document.getElementById(
        "companyAvatar"
    ).textContent =
        companyInitials;
    document.getElementById(
        "jobTitle"
    ).textContent = job.title;


    document.getElementById(
        "companyName"
    ).textContent = job.company;


    document.getElementById(
        "jobLocation"
    ).textContent = job.location;


    document.getElementById(
        "workStyleValue"
    ).textContent =
        translateWorkStyle(
            job.workType
        );


    document.getElementById(
        "employmentTypeValue"
    ).textContent =
        translateEmploymentType(
            job.employmentType
        );


    document.getElementById(
        "salaryValue"
    ).textContent =
        job.salary;


    document.getElementById(
        "categoryValue"
    ).textContent =
        job.category;


    document.getElementById(
        "description"
    ).textContent =
        job.description;


    document.getElementById(
        "postedDate"
    ).textContent =
        formatDate(
            job.postedDate
        );


    document.getElementById(
        "deadlineDate"
    ).textContent =
        formatDate(
            job.deadlineDate
        );


    const requirements =
        document.getElementById(
            "requirementsList"
        );

    requirements.innerHTML =
        job.requirements
            .map(item => `<li>${item}</li>`)
            .join("");


    const responsibilities =
        document.getElementById(
            "responsibilitiesList"
        );

    responsibilities.innerHTML =
        job.responsibilities
            .map(item => `<li>${item}</li>`)
            .join("");

    document.getElementById(
        "sidebarLocation"
    ).textContent = job.location;

    document.getElementById(
        "sidebarWorkStyle"
    ).textContent =
        translateWorkStyle(job.workType);

    document.getElementById(
        "sidebarEmploymentType"
    ).textContent =
        translateEmploymentType(job.employmentType);

    document.getElementById(
        "sidebarSalary"
    ).textContent = job.salary;

}


/* =========================================
   LANGUAGE BUTTONS
========================================= */

document
    .querySelectorAll(".language-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                changeLanguage(
                    button.dataset.lang
                );

                renderJob();

            }
        );

    });


/* =========================================
   INITIALIZE
========================================= */

async function initializeJobDetails() {

    await loadJobDetailsFromBackend();

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const jobId =
        Number(
            urlParams.get("id")
        );

    job =
        jobs.find(
            item => item.id === jobId
        );

    if (!job) {

        window.location.href =
            "jobs.html";

        return;
    }

    const applyButton =
        document.getElementById(
            "applyButton"
        );

    if (applyButton) {

        applyButton.href =
            `apply.html?job=${job.id}`;

    }

    const applyButtonBottom =
        document.getElementById(
            "applyButtonBottom"
        );

    if (applyButtonBottom) {

        applyButtonBottom.href =
            `apply.html?job=${job.id}`;

    }

    document.documentElement.lang =
        currentLanguage;

    changeLanguage(
        currentLanguage
    );

    renderJob();
}

initializeJobDetails();