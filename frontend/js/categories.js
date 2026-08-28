/* ==================================================
   CATEGORY DATA
================================================== */

const categories = [

    {
        id: "it-software",
        icon: "⌘",

        name: "IT & Software",
        my: "IT နှင့် Software",

        description:
            "Software development, IT support and technology roles.",

        descriptionMy:
            "Software development၊ IT support နှင့် နည်းပညာဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "marketing",
        icon: "↗",

        name: "Marketing",
        my: "Marketing",

        description:
            "Marketing, digital marketing and brand-related roles.",

        descriptionMy:
            "Marketing၊ Digital Marketing နှင့် Brand ဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "design",
        icon: "✦",

        name: "Design",
        my: "ဒီဇိုင်း",

        description:
            "Graphic design, UI/UX and creative opportunities.",

        descriptionMy:
            "Graphic Design၊ UI/UX နှင့် ဖန်တီးမှုဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "finance",
        icon: "◫",

        name: "Finance & Accounting",
        my: "ဘဏ္ဍာရေးနှင့် စာရင်းကိုင်",

        description:
            "Accounting, finance and financial management roles.",

        descriptionMy:
            "စာရင်းကိုင်၊ ဘဏ္ဍာရေးနှင့် ငွေကြေးစီမံခန့်ခွဲမှုဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "sales",
        icon: "↗",

        name: "Sales",
        my: "အရောင်း",

        description:
            "Sales, business development and customer-facing roles.",

        descriptionMy:
            "အရောင်း၊ Business Development နှင့် Customer ဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "education",
        icon: "▣",

        name: "Education",
        my: "ပညာရေး",

        description:
            "Teaching, training and education-related opportunities.",

        descriptionMy:
            "သင်ကြားရေး၊ Training နှင့် ပညာရေးဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "engineering",
        icon: "△",

        name: "Engineering",
        my: "အင်ဂျင်နီယာ",

        description:
            "Engineering, technical and infrastructure opportunities.",

        descriptionMy:
            "အင်ဂျင်နီယာ၊ နည်းပညာနှင့် Infrastructure ဆိုင်ရာ အလုပ်အကိုင်များ။"
    },

    {
        id: "administration",
        icon: "▤",

        name: "Administration",
        my: "စီမံခန့်ခွဲရေး",

        description:
            "Administrative, office and operational roles.",

        descriptionMy:
            "ရုံးလုပ်ငန်း၊ စီမံခန့်ခွဲရေးနှင့် Operations ဆိုင်ရာ အလုပ်အကိုင်များ။"
    }

];



/* ==================================================
   TRANSLATIONS
================================================== */

const translations = {

    /* ==================================================
       ENGLISH
    ================================================== */

    en: {

        /* Navigation */

        employer:
            "Employer",

        findJobs:
            "Find Jobs",

        categories:
            "Categories",

        whyAlote:
            "Why ALote",


        /* Hero */

        heroEyebrow:
            "EXPLORE OPPORTUNITIES",

        heroTitle:
            "Find work in your field.",

        heroDescription:
            "Explore jobs by industry and discover opportunities that match your skills.",


        /* Hero Preview */

        previewLabel:
            "YOUR NEXT FIELD",

        previewTitle:
            "Find your field",

        previewDescription:
            "Explore opportunities built around your skills.",


        /* Hero Action */

        exploreAllJobs:
            "Explore all jobs →",

        scrollHint:
            "Explore categories",


        /* Categories */

        browseLabel:
            "BROWSE BY CATEGORY",

        browseTitle:
            "Find your field.",

        categoryCount:
            "8 categories",

        exploreJobs:
            "Explore jobs",


        /* CTA */

        ctaEyebrow:
            "START YOUR SEARCH",

        ctaTitle:
            "Ready to find your next opportunity?",

        ctaDescription:
            "Browse all available jobs and find the right opportunity for you.",

        browseJobs:
            "Browse jobs →",


        /* Footer */

        footerDescription:
            "Connecting job seekers and employers in one organized place.",

        footerJobs:
            "Jobs",

        footerWfh:
            "WFH Jobs",

        footerOnsite:
            "On-site Jobs",

        footerHybrid:
            "Hybrid Jobs",

        footerInternship:
            "Internships",

        footerPartTime:
            "Part-time Jobs",

        footerLinks:
            "Useful Links",

        footerContact:
            "Contact",

        footerTagline:
            "Find work that fits you.",

        copyright:
            "© 2026 ALote. All rights reserved."

    },


    /* ==================================================
       MYANMAR
    ================================================== */

    my: {

        /* Navigation */

        employer:
            "အလုပ်ရှင်",

        findJobs:
            "အလုပ်အကိုင်များ",

        categories:
            "အမျိုးအစားများ",

        whyAlote:
            "ALote ကို ဘာကြောင့်သုံးမလဲ",


        /* Hero */

        heroEyebrow:
            "အလုပ်အကိုင်အခွင့်အလမ်းများကို ရှာဖွေပါ",

        heroTitle:
            "သင့်နယ်ပယ်ထဲက အလုပ်ကို ရှာဖွေပါ။",

        heroDescription:
            "လုပ်ငန်းနယ်ပယ်အလိုက် အလုပ်အကိုင်များကို ရှာဖွေပြီး သင့်ကျွမ်းကျင်မှုနှင့် ကိုက်ညီသော အခွင့်အလမ်းများကို ရှာဖွေပါ။",


        /* Hero Preview */

        previewLabel:
            "သင့်အတွက် သင့်တော်သောနယ်ပယ်",

        previewTitle:
            "သင့်နယ်ပယ်ကို ရှာဖွေပါ",

        previewDescription:
            "သင့်ကျွမ်းကျင်မှုနှင့် ကိုက်ညီသော အလုပ်အကိုင်အခွင့်အလမ်းများကို ရှာဖွေပါ။",


        /* Hero Action */

        exploreAllJobs:
            "အလုပ်အကိုင်များအားလုံးကို ရှာဖွေမည် →",

        scrollHint:
            "အမျိုးအစားများကို ရှာဖွေပါ",


        /* Categories */

        browseLabel:
            "အမျိုးအစားအလိုက် ရှာဖွေပါ",

        browseTitle:
            "သင့်နယ်ပယ်ကို ရွေးချယ်ပါ။",

        categoryCount:
            "အမျိုးအစား ၈ ခု",

        exploreJobs:
            "အလုပ်အကိုင်များကို ကြည့်မည်",


        /* CTA */

        ctaEyebrow:
            "အလုပ်ရှာဖွေမှုကို စတင်ပါ",

        ctaTitle:
            "သင့်အတွက် သင့်တော်တဲ့ အခွင့်အလမ်းကို ရှာဖွေရန် အဆင်သင့်ဖြစ်ပြီလား။",

        ctaDescription:
            "ရရှိနိုင်သော အလုပ်အကိုင်များကို ကြည့်ရှုပြီး သင့်အတွက် သင့်တော်သော အလုပ်ကို ရှာဖွေပါ။",

        browseJobs:
            "အလုပ်အကိုင်များကို ကြည့်မည် →",


        /* Footer */

        footerDescription:
            "အလုပ်ရှာဖွေသူများနှင့် အလုပ်ရှင်များကို တစ်နေရာတည်းတွင် စနစ်တကျ ချိတ်ဆက်ပေးထားပါသည်။",

        footerJobs:
            "အလုပ်အကိုင်များ",

        footerWfh:
            "WFH အလုပ်များ",

        footerOnsite:
            "ရုံးတက်အလုပ်များ",

        footerHybrid:
            "Hybrid အလုပ်များ",

        footerInternship:
            "အလုပ်သင်",

        footerPartTime:
            "အချိန်ပိုင်းအလုပ်များ",

        footerLinks:
            "အသုံးဝင်သော လင့်ခ်များ",

        footerContact:
            "ဆက်သွယ်ရန်",

        footerTagline:
            "သင့်အတွက် သင့်တော်တဲ့အလုပ်ကို ရှာဖွေပါ။",

        copyright:
            "© ၂၀၂၆ ALote။ မူပိုင်ခွင့်အားလုံး ရယူထားပါသည်။"

    }

};



/* ==================================================
   CURRENT LANGUAGE
================================================== */

let currentLanguage =
    localStorage.getItem("alote-language") || "en";



/* ==================================================
   RENDER CATEGORIES
================================================== */

function renderCategories() {

    const grid =
        document.getElementById("categoryGrid");


    if (!grid) {
        return;
    }


    grid.innerHTML = categories
        .map(category => {

            const name =
                currentLanguage === "my"
                    ? category.my
                    : category.name;


            const description =
                currentLanguage === "my"
                    ? category.descriptionMy
                    : category.description;


            return `

                <a
                    href="jobs.html?category=${category.id}"
                    class="category-card"
                >

                    <div class="category-card-top">

                        <div class="category-icon">
                            ${category.icon}
                        </div>

                        <span class="category-arrow">
                            →
                        </span>

                    </div>


                    <div class="category-card-content">

                        <h3>
                            ${name}
                        </h3>

                        <p>
                            ${description}
                        </p>

                    </div>


                    <div class="category-card-footer">

                        <span>
                            ${
                                translations[
                                    currentLanguage
                                ].exploreJobs
                            }
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </a>

            `;

        })
        .join("");

}



/* ==================================================
   CHANGE LANGUAGE
================================================== */

function changeLanguage(language) {

    const selectedLanguage =
        translations[language];


    if (!selectedLanguage) {
        return;
    }


    currentLanguage =
        language;


    document.documentElement.lang =
        language;


    /* ------------------------------------------
       DATA-I18N ELEMENTS
    ------------------------------------------ */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;


            if (
                Object.prototype.hasOwnProperty.call(
                    selectedLanguage,
                    key
                )
            ) {

                element.textContent =
                    selectedLanguage[key];

            }

        });


    /* ------------------------------------------
       LANGUAGE BUTTONS
    ------------------------------------------ */

    document
        .querySelectorAll(".language-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === language
            );

        });


    /* ------------------------------------------
       SAVE LANGUAGE
    ------------------------------------------ */

    localStorage.setItem(
        "alote-language",
        language
    );


    /* ------------------------------------------
       RE-RENDER CATEGORY CARDS
    ------------------------------------------ */

    renderCategories();

}



/* ==================================================
   LANGUAGE BUTTONS
================================================== */

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



/* ==================================================
   INITIALIZE
================================================== */

changeLanguage(
    currentLanguage
);