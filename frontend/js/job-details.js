const jobs = [

    {
        id: 1,

        title: "Backend Developer",
        company: "ABC Technology",

        location: "Yangon",

        workType: "WFH",
        employmentType: "Full-time",

        salary: "800K – 1.2M MMK",

        category: "IT & Software",

        description:
            "We are looking for a motivated Backend Developer to join our development team and build reliable, scalable web applications.",

        requirements: [
            "Experience with PHP and Laravel",
            "Understanding of REST APIs",
            "Knowledge of MySQL or relational databases",
            "Basic understanding of Git and version control",
            "Good problem-solving skills"
        ],

        responsibilities: [
            "Develop and maintain backend applications",
            "Build and integrate REST APIs",
            "Work with databases and optimize queries",
            "Collaborate with frontend developers",
            "Fix bugs and improve application performance"
        ],

        applicationEmail:
            "careers@abctechnology.com",

        postedDate:
            "2026-08-20",

        deadlineDate:
            "2026-09-15"
    }

];

/* =========================================
   GET JOB FROM URL
========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const jobId =
    Number(urlParams.get("id"));

const job =
    jobs.find(item => item.id === jobId);


/* =========================================
   INVALID JOB
========================================= */

if (!job) {

    window.location.href =
        "jobs.html";

}

/* =========================================
   APPLY BUTTONS
========================================= */

const applyButton =
    document.getElementById("applyButton");

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

document.documentElement.lang =
    currentLanguage;

changeLanguage(
    currentLanguage
);

renderJob();