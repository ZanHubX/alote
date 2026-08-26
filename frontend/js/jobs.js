/* =========================================
   ALote Jobs
========================================= */


const translations = {

    en: {

        employer: "Employer",
        findJobs: "Find Jobs",
        categories: "Categories",
        whyAlote: "Why ALote",

        jobDiscovery: "JOB DISCOVERY",

        findNextOpportunity:
            "Find your next opportunity.",

        jobsSubtitle:
            "Search thousands of opportunities and find work that fits your skills and goals.",

        searchPlaceholder:
            "Search jobs, skills or companies...",

        searchJobs:
            "Search Jobs",

        filters:
            "Filters",

        clearFilters:
            "Clear",

        workType:
            "Work Type",

        fullTime:
            "Full-time",

        partTime:
            "Part-time",

        internship:
            "Internship",

        workStyle:
            "Work Style",

        all:
            "All",

        remote:
            "Remote",

        hybrid:
            "Hybrid",

        onsite:
            "On-site",

        category:
            "Category",

        itSoftware:
            "IT & Software",

        marketing:
            "Marketing",

        design:
            "Design",

        financeAccounting:
            "Finance & Accounting",

        education:
            "Education",

        engineering:
            "Engineering",

        sales: 
            "Sales",

        administration: 
            "Administration",

        location:
            "Location",

        allLocations:
            "All locations",

        latestOpportunities:
            "LATEST OPPORTUNITIES",

        jobsFound:
            "jobs found",

        latest:
            "Latest",

        oldest:
            "Oldest",

        noJobs:
            "No jobs found",

        noJobsDescription:
            "Try changing your search or filters."
    },


    my: {
        categoryResults:
            "အမျိုးအစားအလိုက် ရှာဖွေမှု",

        viewAllJobs:
            "အလုပ်အကိုင်အားလုံးကို ကြည့်မည်",

        employer:
            "အလုပ်ရှင်",

        findJobs:
            "အလုပ်အကိုင်များ",

        categories:
            "အမျိုးအစားများ",

        whyAlote:
            "ALote ကို ဘာကြောင့်သုံးမလဲ",

        jobDiscovery:
            "အလုပ်အကိုင်ရှာဖွေရေး",

        findNextOpportunity:
            "သင့်အတွက် သင့်တော်တဲ့ အလုပ်အကိုင်အခွင့်အလမ်းကို ရှာဖွေပါ။",

        jobsSubtitle:
            "သင့်ရဲ့ ကျွမ်းကျင်မှုနဲ့ ရည်မှန်းချက်တွေနဲ့ ကိုက်ညီတဲ့ အလုပ်အကိုင်အခွင့်အလမ်းတွေကို ရှာဖွေလိုက်ပါ။",

        searchPlaceholder:
            "အလုပ်အကိုင်၊ ကျွမ်းကျင်မှု သို့မဟုတ် ကုမ္ပဏီကို ရှာဖွေပါ...",

        searchJobs:
            "အလုပ်အကိုင်ရှာမည်",

        filters:
            "စစ်ထုတ်ရန်",

        clearFilters:
            "ဖယ်ရှားမည်",

        workType:
            "အလုပ်အမျိုးအစား",

        fullTime:
            "အချိန်ပြည့်",

        partTime:
            "အချိန်ပိုင်း",

        internship:
            "အလုပ်သင်",

        workStyle:
            "အလုပ်လုပ်ပုံ",

        all:
            "အားလုံး",

        remote:
            "အဝေးမှ",

        hybrid:
            "Hybrid",

        onsite:
            "ရုံးတက်",

        category:
            "အမျိုးအစား",

        itSoftware:
            "IT နှင့် Software",

        marketing:
            "Marketing",

        design:
            "Design",

        financeAccounting:
            "Finance နှင့် Accounting",

        education:
            "ပညာရေး",

        engineering:
            "အင်ဂျင်နီယာ",

        sales: 
            "အရောင်း",

        administration: 
            "စီမံခန့်ခွဲရေး",

        location:
            "တည်နေရာ",

        allLocations:
            "တည်နေရာအားလုံး",

        latestOpportunities:
            "နောက်ဆုံးရ အခွင့်အလမ်းများ",

        jobsFound:
            "အလုပ်အကိုင်များ တွေ့ရှိသည်",

        latest:
            "နောက်ဆုံးတင်ထားသော",

        oldest:
            "အရင်ဆုံးတင်ထားသော",

        noJobs:
            "အလုပ်အကိုင် မတွေ့ပါ",

        noJobsDescription:
            "သင့်ရှာဖွေမှု သို့မဟုတ် စစ်ထုတ်မှုများကို ပြောင်းလဲကြည့်ပါ။"
    }

};


/* =========================================
   SAMPLE DATA
   -----------------------------------------
   This will later come from Laravel API.
========================================= */


const jobs = [

    {
        id: 1,
        title: "Backend Developer",
        company: "ABC Technology",
        initials: "ABC",
        workStyle: "WFH",
        workType: "Full-time",
        category: "IT & Software",
        location: "Yangon",
        salary: "800K – 1.2M MMK",
        postedDays: 2,
        deadline: "2026-09-15"
    },

    {
        id: 2,
        title: "UI/UX Designer",
        company: "XYZ Creative",
        initials: "XYZ",
        workStyle: "Hybrid",
        workType: "Full-time",
        category: "Design",
        location: "Yangon",
        salary: "700K – 1M MMK",
        postedDays: 3,
        deadline: "2026-09-18"
    },

    {
        id: 3,
        title: "Marketing Executive",
        company: "Myanmar Tech Co.",
        initials: "MTC",
        workStyle: "On-site",
        workType: "Full-time",
        category: "Marketing",
        location: "Mandalay",
        salary: "600K – 900K MMK",
        postedDays: 4,
        deadline: "2026-09-20"
    },

    {
        id: 4,
        title: "Frontend Developer",
        company: "Digital Myanmar",
        initials: "DM",
        workStyle: "Hybrid",
        workType: "Full-time",
        category: "IT & Software",
        location: "Yangon",
        salary: "900K – 1.4M MMK",
        postedDays: 5,
        deadline: "2026-09-22"
    },

    {
        id: 5,
        title: "Graphic Design Intern",
        company: "Creative Hub",
        initials: "CH",
        workStyle: "On-site",
        workType: "Internship",
        category: "Design",
        location: "Yangon",
        salary: "150K – 250K MMK",
        postedDays: 6,
        deadline: "2026-09-25"
    },

    {
        id: 6,
        title: "Finance Assistant",
        company: "Golden Group",
        initials: "GG",
        workStyle: "On-site",
        workType: "Full-time",
        category: "Finance & Accounting",
        location: "Naypyidaw",
        salary: "500K – 700K MMK",
        postedDays: 7,
        deadline: "2026-09-28"
    }

];


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

    document.documentElement.lang = language;


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
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            if (selectedLanguage[key]) {

                element.placeholder =
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


    renderJobs();

}


/* =========================================
   FILTER STATE
========================================= */


function getFilters() {

    const search =
        document
            .getElementById("jobSearch")
            .value
            .trim()
            .toLowerCase();


    const workTypes = [

        ...document.querySelectorAll(
            'input[name="workType"]:checked'
        )

    ].map(input => input.value);


    const workStyle =
        document.querySelector(
            'input[name="workStyle"]:checked'
        ).value;


    const categories = [

        ...document.querySelectorAll(
            'input[name="category"]:checked'
        )

    ].map(input => input.value);


    const location =
        document.getElementById(
            "locationFilter"
        ).value;


    return {
        search,
        workTypes,
        workStyle,
        categories,
        location
    };

}


/* =========================================
   FILTER JOBS
========================================= */


function filterJobs() {

    const filters =
        getFilters();


    return jobs.filter(job => {


        const matchesSearch =

            !filters.search ||

            job.title
                .toLowerCase()
                .includes(filters.search) ||

            job.company
                .toLowerCase()
                .includes(filters.search) ||

            job.category
                .toLowerCase()
                .includes(filters.search) ||

            job.location
                .toLowerCase()
                .includes(filters.search);


        const matchesWorkType =

            filters.workTypes.length === 0 ||

            filters.workTypes.includes(
                job.workType
            );


        const matchesWorkStyle =

            filters.workStyle === "All" ||

            job.workStyle ===
                filters.workStyle;


        const matchesCategory =

            filters.categories.length === 0 ||

            filters.categories.includes(
                job.category
            );


        const matchesLocation =

            !filters.location ||

            job.location ===
                filters.location;


        return (
            matchesSearch &&
            matchesWorkType &&
            matchesWorkStyle &&
            matchesCategory &&
            matchesLocation
        );

    });

}

/* =========================================
   CATEGORY CONTEXT
========================================= */

function renderCategoryContext() {

    const context =
        document.getElementById(
            "categoryContext"
        );

    const title =
        document.getElementById(
            "categoryContextTitle"
        );

    const description =
        document.getElementById(
            "categoryContextDescription"
        );


    if (
        !context ||
        !title ||
        !description
    ) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const categoryId =
        params.get("category");


    if (!categoryId) {

        context.classList.add("hidden");

        return;

    }


    const categoryMap = {

        "it-software": {
            en: "IT & Software",
            my: "IT နှင့် Software"
        },

        "marketing": {
            en: "Marketing",
            my: "Marketing"
        },

        "design": {
            en: "Design",
            my: "ဒီဇိုင်း"
        },

        "finance": {
            en: "Finance & Accounting",
            my: "ဘဏ္ဍာရေးနှင့် စာရင်းကိုင်"
        },

        "sales": {
            en: "Sales",
            my: "အရောင်း"
        },

        "education": {
            en: "Education",
            my: "ပညာရေး"
        },

        "engineering": {
            en: "Engineering",
            my: "အင်ဂျင်နီယာ"
        },

        "administration": {
            en: "Administration",
            my: "စီမံခန့်ခွဲရေး"
        }

    };


    const category =
        categoryMap[
            categoryId.toLowerCase()
        ];


    if (!category) {

        context.classList.add("hidden");

        return;

    }


    const language =
        currentLanguage;


    const categoryName =
        category[language] ||
        category.en;


    if (language === "my") {

        title.textContent =
            `${categoryName} အလုပ်အကိုင်များ`;

        description.textContent =
            `${categoryName} အမျိုးအစားရှိ အလုပ်အကိုင်များကိုသာ ပြသနေပါသည်။`;

    } else {

        title.textContent =
            `${categoryName} Jobs`;

        description.textContent =
            `Showing jobs in ${categoryName}.`;

    }


    context.classList.remove("hidden");

}


/* =========================================
   RENDER JOBS
========================================= */


function renderJobs() {

    const jobsList =
        document.getElementById(
            "jobsList"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    const jobCount =
        document.getElementById(
            "jobCount"
        );


    let filteredJobs =
        filterJobs();


    const sort =
        document.getElementById(
            "sortJobs"
        ).value;


    if (sort === "oldest") {

        filteredJobs.sort(
            (a, b) =>
                b.postedDays -
                a.postedDays
        );

    } else {

        filteredJobs.sort(
            (a, b) =>
                a.postedDays -
                b.postedDays
        );

    }


    jobCount.textContent =
        filteredJobs.length;


    if (filteredJobs.length === 0) {

        jobsList.innerHTML = "";

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    jobsList.innerHTML =
        filteredJobs
            .map(job => createJobCard(job))
            .join("");

}


/* =========================================
   JOB CARD
========================================= */


function createJobCard(job) {

    const workStyleClass =

        job.workStyle === "WFH"
            ? "wfh"
            : job.workStyle === "Hybrid"
                ? "hybrid"
                : "";


    const postedText =
        currentLanguage === "my"

            ? `${job.postedDays} ရက်အကြာက တင်ထားသည်`

            : `Posted ${job.postedDays} days ago`;


    const workTypeText =

        currentLanguage === "my"

            ? translateDynamicValue(
                job.workType
            )

            : job.workType;


    const workStyleText =

        currentLanguage === "my"

            ? translateDynamicValue(
                job.workStyle
            )

            : job.workStyle;


    return `

        <article class="job-card">

            <div class="job-card-top">

                <div class="company-avatar">
                    ${job.initials}
                </div>

                <span class="work-badge ${workStyleClass}">
                    ${workStyleText}
                </span>

            </div>


            <h3>
                ${job.title}
            </h3>


            <p class="job-company">
                ${job.company}
            </p>


            <p class="job-location">
                ${job.location}
            </p>


            <div class="job-meta">

                <span>
                    ${workTypeText}
                </span>

                <span>
                    ${job.salary}
                </span>

            </div>


            <div class="job-card-bottom">

                <span class="posted-date">
                    ${postedText}
                </span>

                <a
                    href="job-details.html?id=${job.id}"
                    class="view-job">

                    ${currentLanguage === "my"
                        ? "အလုပ်ကို ကြည့်မည် →"
                        : "View job →"
                    }

                </a>

            </div>

        </article>

    `;

}


/* =========================================
   DYNAMIC TRANSLATION
========================================= */


function translateDynamicValue(value) {

    const map = {

        "Full-time":
            "အချိန်ပြည့်",

        "Part-time":
            "အချိန်ပိုင်း",

        "Internship":
            "အလုပ်သင်",

        "WFH":
            "အဝေးမှ",

        "Hybrid":
            "Hybrid",

        "On-site":
            "ရုံးတက်"

    };


    return map[value] || value;

}


/* =========================================
   CLEAR FILTERS
========================================= */


function clearFilters() {

    document.getElementById(
        "jobSearch"
    ).value = "";


    document.querySelectorAll(
        'input[name="workType"]'
    ).forEach(input => {

        input.checked = false;

    });


    document.querySelector(
        'input[name="workStyle"][value="All"]'
    ).checked = true;


    document.querySelectorAll(
        'input[name="category"]'
    ).forEach(input => {

        input.checked = false;

    });


    document.getElementById(
        "locationFilter"
    ).value = "";


    renderJobs();

}


/* =========================================
   URL FILTER
========================================= */

function applyUrlFilter() {

    const params = new URLSearchParams(
        window.location.search
    );


    /* =========================================
       SEARCH FROM URL
    ========================================= */

    const search =
        params.get("search");


    if (search) {

        const searchInput =
            document.getElementById("jobSearch");


        if (searchInput) {

            searchInput.value =
                search;

        }

    }


    /* =========================================
       CATEGORY FILTER
    ========================================= */

    const category =
        params.get("category");


    if (category) {

        const categoryMap = {

            "it-software":
                "IT & Software",

            "marketing":
                "Marketing",

            "design":
                "Design",

            "finance":
                "Finance & Accounting",

            "sales":
                "Sales",

            "education":
                "Education",

            "engineering":
                "Engineering",

            "administration":
                "Administration"

        };


        const categoryValue =
            categoryMap[
                category.toLowerCase()
            ];


        if (categoryValue) {

            const checkbox =
                document.querySelector(
                    `input[name="category"][value="${categoryValue}"]`
                );


            if (checkbox) {

                checkbox.checked = true;

            }

        }

    }


    /* =========================================
       WORK STYLE / WORK TYPE
    ========================================= */

    const mode =
        params.get("mode");


    if (!mode) {
        return;
    }


    const normalizedMode =
        mode.toLowerCase();


    const workStyleMap = {

        wfh: "WFH",

        hybrid: "Hybrid",

        onsite: "On-site"

    };


    if (workStyleMap[normalizedMode]) {

        const radio =
            document.querySelector(
                `input[name="workStyle"][value="${workStyleMap[normalizedMode]}"]`
            );


        if (radio) {

            radio.checked = true;

        }


        return;

    }


    /* =========================================
       WORK TYPE
    ========================================= */

    const workTypeMap = {

        internship: "Internship",

        "part-time": "Part-time"

    };


    if (workTypeMap[normalizedMode]) {

        const checkbox =
            document.querySelector(
                `input[name="workType"][value="${workTypeMap[normalizedMode]}"]`
            );


        if (checkbox) {

            checkbox.checked = true;

        }

    }

}

/* =========================================
   EVENT LISTENERS
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

            }
        );

    });


document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        renderJobs
    );


document
    .getElementById("jobSearch")
    .addEventListener(
        "input",
        renderJobs
    );


document
    .querySelectorAll(
        'input[name="workType"], input[name="workStyle"], input[name="category"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            renderJobs
        );

    });


document
    .getElementById("locationFilter")
    .addEventListener(
        "change",
        renderJobs
    );


document
    .getElementById("sortJobs")
    .addEventListener(
        "change",
        renderJobs
    );


document
    .getElementById("clearFilters")
    .addEventListener(
        "click",
        clearFilters
    );


document
    .getElementById("emptyClearFilters")
    .addEventListener(
        "click",
        clearFilters
    );


/* =========================================
   INITIALIZE
========================================= */


document.documentElement.lang =
    currentLanguage;

applyUrlFilter();

changeLanguage(
    currentLanguage
);