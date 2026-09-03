/* ==================================================
   ALOTE — JOBS PAGE
================================================== */


/* ==================================================
   TRANSLATIONS
================================================== */

const translations = {

    en: {

        employer: "Employer",
        findJobs: "Find Jobs",
        categories: "Categories",
        whyAlote: "Why ALote",
        postJob: "Post a Job",

        jobDiscovery:
            "JOB DISCOVERY",

        findNextOpportunity:
            "Find your next opportunity.",

        jobsSubtitle:
            "Search opportunities and find work that fits your skills and goals.",

        searchPlaceholder:
            "Search jobs, skills or companies...",

        searchJobs:
            "Search Jobs",

        filters:
            "Filters",

        clearFilters:
            "Clear",

        filterJobs:
            "Filter Jobs",

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
            "Try changing your search or filters.",

        viewJob:
            "View job →",

        exploreJobs:
            "Explore jobs",

        posted:
            "Posted",

        daysAgo:
            "days ago",

        deadline:
            "Deadline",

        categoryResults:
            "CATEGORY RESULTS",

        showingJobs:
            "Showing jobs in",

        viewAllJobs:
            "View all jobs",

        clearCategory:
            "Clear category",

        searchHint:
            "Search by job title, company, category or location.",

        noResultsEyebrow:
            "NO RESULTS",

        activeFilters:
            "Active filters",
        
        dataAnalytics:
            "Data & Analytics",

        cybersecurity:
            "Cybersecurity",

        mediaCommunications:
            "Media & Communications",

        businessDevelopment:
            "Business Development",

        customerService:
            "Customer Service",

        humanResources:
            "Human Resources",

        healthcare:
            "Healthcare",

        legal:
            "Legal",

        hospitalityTourism:
            "Hospitality & Tourism",

        construction:
            "Construction",

        manufacturing:
            "Manufacturing",

        logisticsSupplyChain:
            "Logistics & Supply Chain",

        architecture:
            "Architecture",

        research:
            "Research",

        other:
            "Other",

    },


    my: {

        employer:
            "အလုပ်ရှင်",

        findJobs:
            "အလုပ်အကိုင်များ",

        categories:
            "အမျိုးအစားများ",

        whyAlote:
            "ALote ကို ဘာကြောင့်သုံးမလဲ",

        postJob:
            "အလုပ်တင်မည်",

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

        filterJobs:
            "အလုပ်များ စစ်ထုတ်ရန်",

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
            "သင့်ရှာဖွေမှု သို့မဟုတ် စစ်ထုတ်မှုများကို ပြောင်းလဲကြည့်ပါ။",

        viewJob:
            "အလုပ်ကို ကြည့်မည် →",

        exploreJobs:
            "အလုပ်အကိုင်များကို ကြည့်မည်",

        posted:
            "တင်ထားသည်",

        daysAgo:
            "ရက်အကြာ",

        deadline:
            "နောက်ဆုံးရက်",

        categoryResults:
            "အမျိုးအစားအလိုက် ရှာဖွေမှု",

        showingJobs:
            "အောက်ပါအမျိုးအစားရှိ အလုပ်များကို ပြသနေသည်",

        viewAllJobs:
            "အလုပ်အကိုင်အားလုံးကို ကြည့်မည်",

        clearCategory:
            "အမျိုးအစား ဖယ်ရှားမည်",

        searchHint:
            "အလုပ်အမည်၊ ကုမ္ပဏီ၊ အမျိုးအစား သို့မဟုတ် တည်နေရာဖြင့် ရှာဖွေပါ။",

        noResultsEyebrow:
            "ရလဒ်မတွေ့ပါ",

        activeFilters:
            "လက်ရှိစစ်ထုတ်မှုများ",

        dataAnalytics:
            "Data နှင့် Analytics",

        cybersecurity:
            "Cybersecurity",

        mediaCommunications:
            "Media နှင့် ဆက်သွယ်ရေး",

        businessDevelopment:
            "Business Development",

        customerService:
            "Customer Service",

        humanResources:
            "လူ့စွမ်းအားအရင်းအမြစ်",

        healthcare:
            "ကျန်းမာရေးစောင့်ရှောက်မှု",

        legal:
            "ဥပဒေရေးရာ",

        hospitalityTourism:
            "ဧည့်ဝန်ဆောင်မှုနှင့် ခရီးသွားလုပ်ငန်း",

        construction:
            "ဆောက်လုပ်ရေး",

        manufacturing:
            "ထုတ်လုပ်ရေး",

        logisticsSupplyChain:
            "Logistics နှင့် Supply Chain",

        architecture:
            "ဗိသုကာ",

        research:
            "သုတေသန",

        other:
            "အခြား",

    }

};


/* ==================================================
   SAMPLE JOB DATA
   -----------------------------------------------
   Later this will come from Laravel API.
================================================== */
let jobs = [];

async function loadJobsFromBackend() {
    try {
        const response = await fetch(
            `${window.ALOTE_CONFIG.API_BASE_URL}/jobs`,
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

        const result = await response.json();

        jobs = result.data.map(item => {

            const company =
                item.employer?.company_name ||
                "Not available";

            const initials = company
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 3)
                .toUpperCase();

            let salary =
                item.salary_text ||
                "Not specified";

            const publishedDate =
                item.published_at
                    ? new Date(
                        item.published_at.replace(
                            " ",
                            "T"
                        )
                    )
                    : new Date();

            const today = new Date();

            const postedDays =
                Math.max(
                    0,
                    Math.floor(
                        (today - publishedDate) /
                        (1000 * 60 * 60 * 24)
                    )
                );

            return {
    id: item.public_id,
    title: item.title,
                company: company,
                initials: initials,
                workStyle:
                    item.work_mode ||
                    "Not specified",
                workType:
                    item.job_type ||
                    "Not specified",
                category:
                    item.category?.name ||
                    "Other",
                location:
                    item.location ||
                    "Not specified",
                salary: salary,
                postedDays: postedDays,
                deadline:
                    item.deadline || ""
            };

        });

        console.log(
            "Jobs loaded from backend:",
            jobs
        );

    } catch (error) {

        console.error(
            "Cannot load jobs:",
            error
        );

    }

}

/* ==================================================
   DYNAMIC LOCATION FILTER
================================================== */

function populateLocationFilter() {

    const locationFilter =
        document.getElementById(
            "locationFilter"
        );


    if (!locationFilter) {

        return;

    }


    const currentValue =
        locationFilter.value;


    const locations =
        [
            ...new Set(
                jobs
                    .map(job =>
                        job.location
                            ?.trim()
                    )
                    .filter(location =>
                        location &&
                        location !==
                        "Not specified"
                    )
            )
        ]
            .sort(
                (a, b) =>
                    a.localeCompare(b)
            );


    locationFilter.innerHTML = "";


    const allOption =
        document.createElement(
            "option"
        );


    allOption.value =
        "";


    allOption.textContent =
        getTranslation(
            "allLocations"
        );


    locationFilter.appendChild(
        allOption
    );


    locations.forEach(
        location => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                location;


            option.textContent =
                location;


            locationFilter.appendChild(
                option
            );

        }
    );


    if (
        locations.includes(
            currentValue
        )
    ) {

        locationFilter.value =
            currentValue;

    }

}


/* ==================================================
   STATE
================================================== */

let currentLanguage =
    localStorage.getItem("alote-language") || "en";


/* ==================================================
   HELPERS
================================================== */

function getTranslation(key) {

    return (
        translations[currentLanguage]?.[key] ||
        translations.en[key] ||
        key
    );

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==================================================
   LANGUAGE
================================================== */

function changeLanguage(language) {

    if (!translations[language]) {
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

            const value =
                translations[language][key];

            if (value) {

                element.textContent =
                    value;

            }

        });


    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            const value =
                translations[language][key];

            if (value) {

                element.placeholder =
                    value;

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


    renderCategoryContext();

    renderJobs();

    renderActiveFilters();

}


/* ==================================================
   GET FILTER STATE
================================================== */

function getFilters() {

    const searchInput =
        document.getElementById("jobSearch");


    const search =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const workTypes = [

        ...document.querySelectorAll(
            'input[name="workType"]:checked'
        )

    ].map(input => input.value);


    const workStyleInput =
        document.querySelector(
            'input[name="workStyle"]:checked'
        );


    const workStyle =
        workStyleInput
            ? workStyleInput.value
            : "All";


    const categories = [

        ...document.querySelectorAll(
            'input[name="category"]:checked'
        )

    ].map(input => input.value);


    const locationInput =
        document.getElementById(
            "locationFilter"
        );


    const location =
        locationInput
            ? locationInput.value
            : "";


    return {

        search,

        workTypes,

        workStyle,

        categories,

        location

    };

}


/* ==================================================
   FILTER JOBS
================================================== */

function filterJobs() {

    const filters = getFilters();

    const normalize = value => {

        const normalized =
            String(value ?? "")
                .trim()
                .toLowerCase();

        if (normalized === "wfh") {
            return "remote";
        }

        return normalized;

    };

    return jobs.filter(job => {

        const searchableText = [
            job.title,
            job.company,
            job.category,
            job.location,
            job.salary,
            job.workStyle,
            job.workType
        ]
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !filters.search ||
            searchableText.includes(
                normalize(filters.search)
            );

        const matchesWorkType =
            filters.workTypes.length === 0 ||
            filters.workTypes
                .map(normalize)
                .includes(
                    normalize(job.workType)
                );

        const matchesWorkStyle =
            normalize(filters.workStyle) === "all" ||
            normalize(job.workStyle) ===
            normalize(filters.workStyle);

        const matchesCategory =
            filters.categories.length === 0 ||
            filters.categories
                .map(normalize)
                .includes(
                    normalize(job.category)
                );

        const matchesLocation =
            !filters.location ||
            normalize(job.location) ===
            normalize(filters.location);

        return (
            matchesSearch &&
            matchesWorkType &&
            matchesWorkStyle &&
            matchesCategory &&
            matchesLocation
        );

    });

}


/* ==================================================
   CATEGORY MAP
================================================== */

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


/* ==================================================
   CATEGORY CONTEXT
================================================== */

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

        context.classList.add(
            "hidden"
        );

        return;

    }


    const category =
        categoryMap[
            categoryId.toLowerCase()
        ];


    if (!category) {

        context.classList.add(
            "hidden"
        );

        return;

    }


    const categoryName =
        category[currentLanguage] ||
        category.en;


    title.textContent =
        currentLanguage === "my"

            ? `${categoryName} အလုပ်အကိုင်များ`

            : `${categoryName} Jobs`;


    description.textContent =
        currentLanguage === "my"

            ? `${categoryName} အမျိုးအစားရှိ အလုပ်အကိုင်များကိုသာ ပြသနေပါသည်။`

            : `${getTranslation("showingJobs")} ${categoryName}.`;


    context.classList.remove(
        "hidden"
    );

}


/* ==================================================
   RENDER JOBS
================================================== */

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


    if (!jobsList) {
        return;
    }


    let filteredJobs =
        filterJobs();


    const sortElement =
        document.getElementById(
            "sortJobs"
        );


    const sort =
        sortElement
            ? sortElement.value
            : "latest";


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


    if (jobCount) {

        jobCount.textContent =
            filteredJobs.length;

    }


    if (filteredJobs.length === 0) {

        jobsList.innerHTML = "";


        if (emptyState) {

            emptyState.classList.remove(
                "hidden"
            );

        }


        renderActiveFilters();

        updateFilterCount();

        return;

    }


    if (emptyState) {

        emptyState.classList.add(
            "hidden"
        );

    }


    jobsList.innerHTML =

        filteredJobs
            .map(job =>
                createJobCard(job)
            )
            .join("");


    renderActiveFilters();

    updateFilterCount();

}


/* ==================================================
   CREATE JOB CARD
================================================== */

function createJobCard(job) {

    const workStyleClass =

        job.workStyle === "Remote"

            ? "Remote"

            : job.workStyle === "Hybrid"

                ? "hybrid"

                : "";


    const postedText =

        currentLanguage === "my"

            ? `${job.postedDays} ${getTranslation("daysAgo")} ${getTranslation("posted")}`

            : `${getTranslation("posted")} ${job.postedDays} ${getTranslation("daysAgo")}`;


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

        <article
            class="job-card"
            data-job-id="${escapeHTML(job.id)}"
        >

            <div class="job-card-top">

                <div class="company-avatar">
                    ${escapeHTML(job.initials)}
                </div>

                <span class="work-badge ${escapeHTML(workStyleClass)}"">
                    ${escapeHTML(workStyleText)}
                </span>

            </div>


            <h3>
                ${escapeHTML(job.title)}
            </h3>


            <p class="job-company">
                ${escapeHTML(job.company)}
            </p>


            <p class="job-location">
                ${escapeHTML(job.location)}
            </p>


            <div class="job-meta">

                <span>
                    ${escapeHTML(workTypeText)}
                </span>

                <span>
                    ${escapeHTML(job.salary)}
                </span>

            </div>


            <div class="job-card-bottom">

                <span class="posted-date">
                    ${escapeHTML(postedText)}
                </span>


                <a
                    href="job-details.html?id=${encodeURIComponent(job.id)}"
                    class="view-job"
                >
                   ${escapeHTML(
                       getTranslation("viewJob")
                   )}
                </a>

            </div>

        </article>

    `;

}


/* ==================================================
   DYNAMIC TRANSLATION
================================================== */

function translateDynamicValue(value) {

    const map = {

        "Full-time":
            "အချိန်ပြည့်",

        "Part-time":
            "အချိန်ပိုင်း",

        "Internship":
            "အလုပ်သင်",

        "Remote":
            "အဝေးမှ",

        "Hybrid":
            "Hybrid",

        "On-site":
            "ရုံးတက်"

    };


    return map[value] || value;

}


/* ==================================================
   ACTIVE FILTERS
================================================== */

function renderActiveFilters() {

    const container =
        document.getElementById(
            "activeFilters"
        );


    if (!container) {
        return;
    }


    const filters =
        getFilters();


    const chips = [];


    if (filters.search) {

        chips.push({

            label:
                `"${filters.search}"`,

            type:
                "search"

        });

    }


    filters.workTypes.forEach(
        value => {

            chips.push({

                label:
                    translateFilterLabel(
                        value
                    ),

                type:
                    "workType",

                value

            });

        }
    );


    if (
        filters.workStyle &&
        filters.workStyle !== "All"
    ) {

        chips.push({

            label:
                translateFilterLabel(
                    filters.workStyle
                ),

            type:
                "workStyle",

            value:
                filters.workStyle

        });

    }


    filters.categories.forEach(
        value => {

            chips.push({

                label:
                    translateFilterLabel(
                        value
                    ),

                type:
                    "category",

                value

            });

        }
    );


    if (filters.location) {

        chips.push({

            label:
                filters.location,

            type:
                "location",

            value:
                filters.location

        });

    }


    container.innerHTML = chips
        .map(chip => `

            <span class="active-filter">

                ${escapeHTML(chip.label)}

                <button
                    type="button"
                    aria-label="Remove filter"
                    data-filter-type="${escapeHTML(chip.type)}"
                    data-filter-value="${escapeHTML(chip.value || "")}"
                >
                    ×
                </button>

            </span>

        `)
        .join("");

}


/* ==================================================
   FILTER LABEL TRANSLATION
================================================== */

function translateFilterLabel(value) {

    const map = {

        "Full-time":
            "fullTime",

        "Part-time":
            "partTime",

        "Internship":
            "internship",

        "Remote":
            "remote",

        "Hybrid":
            "hybrid",

        "On-site":
            "onsite",

        "IT & Software":
            "itSoftware",

        "Marketing":
            "marketing",

        "Design":
            "design",

        "Finance & Accounting":
            "financeAccounting",

        "Education":
            "education",

        "Engineering":
            "engineering",

        "Sales":
            "sales",

        "Administration":
            "administration"

    };


    const key =
        map[value];


    return key
        ? getTranslation(key)
        : value;

}


/* ==================================================
   REMOVE ACTIVE FILTER
================================================== */

function removeActiveFilter(
    type,
    value
) {

    if (type === "search") {

        const input =
            document.getElementById(
                "jobSearch"
            );

        if (input) {
            input.value = "";
        }

    }


    if (
        type === "workType" ||
        type === "category"
    ) {

        document
            .querySelectorAll(
                `input[name="${type}"]`
            )
            .forEach(input => {

                if (
                    input.value === value
                ) {

                    input.checked =
                        false;

                }

            });

    }


    if (type === "workStyle") {

        const radio =
            document.querySelector(
                'input[name="workStyle"][value="All"]'
            );

        if (radio) {
            radio.checked = true;
        }

    }


    if (type === "location") {

        const select =
            document.getElementById(
                "locationFilter"
            );

        if (select) {
            select.value = "";
        }

    }


    renderJobs();

}


/* ==================================================
   FILTER COUNT
================================================== */

function updateFilterCount() {

    const countElement =
        document.getElementById(
            "filterCount"
        );


    if (!countElement) {
        return;
    }


    const filters =
        getFilters();


    let count = 0;


    count +=
        filters.search
            ? 1
            : 0;


    count +=
        filters.workTypes.length;


    count +=
        filters.workStyle !== "All"
            ? 1
            : 0;


    count +=
        filters.categories.length;


    count +=
        filters.location
            ? 1
            : 0;


    countElement.textContent =
        count;

}


/* ==================================================
   CLEAR FILTERS
================================================== */

function clearFilters() {

    const search =
        document.getElementById(
            "jobSearch"
        );


    if (search) {
        search.value = "";
    }


    document
        .querySelectorAll(
            'input[name="workType"]'
        )
        .forEach(input => {

            input.checked =
                false;

        });


    const allWorkStyle =
        document.querySelector(
            'input[name="workStyle"][value="All"]'
        );


    if (allWorkStyle) {

        allWorkStyle.checked =
            true;

    }


    document
        .querySelectorAll(
            'input[name="category"]'
        )
        .forEach(input => {

            input.checked =
                false;

        });


    const location =
        document.getElementById(
            "locationFilter"
        );


    if (location) {
        location.value = "";
    }


    renderJobs();

}


/* ==================================================
   SEARCH CLEAR BUTTON
================================================== */

function updateSearchClear() {

    const input =
        document.getElementById(
            "jobSearch"
        );


    const clearButton =
        document.getElementById(
            "searchClear"
        );


    if (
        !input ||
        !clearButton
    ) {
        return;
    }


    clearButton.style.display =
        input.value.trim()
            ? "flex"
            : "none";

}


function clearSearch() {

    const input =
        document.getElementById(
            "jobSearch"
        );


    if (!input) {
        return;
    }


    input.value = "";

    updateSearchClear();

    renderJobs();

    input.focus();

}


/* ==================================================
   MOBILE FILTER DRAWER
================================================== */

function toggleMobileFilters() {

    const panel =
        document.querySelector(
            ".filters-panel"
        );


    const button =
        document.getElementById(
            "mobileFilterButton"
        );


    if (
        !panel ||
        !button
    ) {
        return;
    }


    const isOpen =
        panel.classList.toggle(
            "mobile-open"
        );


    button.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    document.body.classList.toggle(
        "filters-open",
        isOpen
    );

}


/* ==================================================
   CLOSE MOBILE FILTERS
================================================== */

function closeMobileFilters() {

    const panel =
        document.querySelector(
            ".filters-panel"
        );


    const button =
        document.getElementById(
            "mobileFilterButton"
        );


    if (panel) {

        panel.classList.remove(
            "mobile-open"
        );

    }


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    document.body.classList.remove(
        "filters-open"
    );

}


/* ==================================================
   URL FILTER
================================================== */

function applyUrlFilter() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    /* ------------------------------------------
       SEARCH
    ------------------------------------------ */

    const search =
        params.get("search");


    if (search) {

        const input =
            document.getElementById(
                "jobSearch"
            );


        if (input) {

            input.value =
                search;

        }

    }


    /* ------------------------------------------
       CATEGORY
    ------------------------------------------ */

    const category =
        params.get("category");


    if (category) {

        const categoryValue =
            categoryMap[
                category.toLowerCase()
            ]?.en;


        if (categoryValue) {

            const checkbox =
                document.querySelector(
                    `input[name="category"][value="${CSS.escape(categoryValue)}"]`
                );


            if (checkbox) {

                checkbox.checked =
                    true;

            }

        }

    }


    /* ------------------------------------------
       MODE
    ------------------------------------------ */

    const mode =
        params.get("workStyle") ||
        params.get("mode");


    if (!mode) {
        return;
    }


    const normalizedMode =
        mode.toLowerCase();


    const workStyleMap = {
        remote: "Remote",
        hybrid: "Hybrid",
        onsite: "On-site",
        "on-site": "On-site"
    };


    if (
        workStyleMap[
            normalizedMode
        ]
    ) {

        const radio =
            document.querySelector(
                `input[name="workStyle"][value="${workStyleMap[normalizedMode]}"]`
            );


        if (radio) {

            radio.checked =
                true;

        }


        return;

    }


    const workTypeMap = {

        internship:
            "Internship",

        "part-time":
            "Part-time",

        "full-time":
            "Full-time"

    };


    if (
        workTypeMap[
            normalizedMode
        ]
    ) {

        const checkbox =
            document.querySelector(
                `input[name="workType"][value="${workTypeMap[normalizedMode]}"]`
            );


        if (checkbox) {

            checkbox.checked =
                true;

        }

    }

}


/* ==================================================
   CLEAR CATEGORY URL
================================================== */

function clearCategoryFilter() {

    const url =
        new URL(
            window.location.href
        );


    url.searchParams.delete(
        "category"
    );


    window.history.replaceState(
        {},
        "",
        url
    );


    document
        .querySelectorAll(
            'input[name="category"]'
        )
        .forEach(input => {

            input.checked =
                false;

        });


    renderCategoryContext();

    renderJobs();

}


/* ==================================================
   LANGUAGE BUTTONS
================================================== */

function initializeLanguageButtons() {

    document
        .querySelectorAll(
            ".language-button"
        )
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

}

/* ==================================================
   SEARCH EVENTS
================================================== */

function initializeSearch() {

    const searchForm =
        document.getElementById(
            "jobSearchForm"
        );


    const searchInput =
        document.getElementById(
            "jobSearch"
        );


    const searchClear =
        document.getElementById(
            "clearSearch"
        );


    /* ------------------------------------------
       FORM SUBMIT
    ------------------------------------------ */

    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            event => {

                // Prevent page refresh
                event.preventDefault();

                // Run frontend search
                renderJobs();

            }
        );

    }


    /* ------------------------------------------
       LIVE SEARCH
    ------------------------------------------ */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                updateSearchClear();

                renderJobs();

            }
        );

    }


    /* ------------------------------------------
       CLEAR SEARCH
    ------------------------------------------ */

    if (searchClear) {

        searchClear.addEventListener(
            "click",
            clearSearch
        );

    }

}


/* ==================================================
   FILTER EVENTS
================================================== */

function initializeFilters() {

    document
        .querySelectorAll(
            'input[name="workType"], input[name="workStyle"], input[name="category"]'
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    renderJobs();

                }
            );

        });


    const location =
        document.getElementById(
            "locationFilter"
        );


    if (location) {

        location.addEventListener(
            "change",
            renderJobs
        );

    }


    const sort =
        document.getElementById(
            "sortJobs"
        );


    if (sort) {

        sort.addEventListener(
            "change",
            renderJobs
        );

    }


    const clear =
        document.getElementById(
            "clearFilters"
        );


    if (clear) {

        clear.addEventListener(
            "click",
            clearFilters
        );

    }


    const emptyClear =
        document.getElementById(
            "emptyClearFilters"
        );


    if (emptyClear) {

        emptyClear.addEventListener(
            "click",
            clearFilters
        );

    }

}


/* ==================================================
   MOBILE FILTER EVENTS
================================================== */

function initializeMobileFilters() {

    const button =
        document.getElementById(
            "mobileFilterButton"
        );


    if (button) {

        button.addEventListener(
            "click",
            toggleMobileFilters
        );

    }


    document.addEventListener(
        "click",
        event => {

            const removeButton =
                event.target.closest(
                    ".active-filter button"
                );


            if (removeButton) {

                removeActiveFilter(

                    removeButton.dataset
                        .filterType,

                    removeButton.dataset
                        .filterValue

                );

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileFilters();

            }

        }
    );

}


/* ==================================================
   CATEGORY CLEAR BUTTON
================================================== */

function initializeCategoryContext() {

    const clearButton =
        document.querySelector(
            ".category-context-clear"
        );


    if (!clearButton) {
        return;
    }


    clearButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            clearCategoryFilter();

        }
    );

}


/* ==================================================
   RESPONSIVE FILTER CLEANUP
================================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            closeMobileFilters();

        }

    }
);


/* ==================================================
   INITIALIZE
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.documentElement.lang =
            currentLanguage;


        applyUrlFilter();

        initializeLanguageButtons();

        initializeSearch();

        initializeFilters();

        initializeMobileFilters();

        initializeCategoryContext();

        changeLanguage(
            currentLanguage
        );

        updateSearchClear();

        renderCategoryContext();

        async function initializeJobsPage() {

            await loadJobsFromBackend();

            populateLocationFilter();

            renderJobs();

        }

        initializeJobsPage();

    }
);