/* ==================================================
   ALote — EMPLOYER SUCCESS PAGE
================================================== */


/* ==================================================
   TRANSLATIONS
================================================== */

const translations = {

    en: {

        findJobs:
            "Find Jobs",

        categories:
            "Categories",

        whyAlote:
            "Why ALote",

        postJob:
            "Post a Job",


        requestReceived:
            "REQUEST RECEIVED",

        successTitle:
            "Your job posting request has been received.",

        successDescription:
            "Thank you for submitting your job posting. Our team will review the information before contacting you about the next steps.",


        reviewTitle:
            "Waiting for ALote review",

        reviewDescription:
            "Your request has been submitted successfully and is currently waiting for review by the ALote team.",


        nextStepTitle:
            "What happens next?",

        nextStepDescription:
            "Our team will review your job information and contact you through the details you provided regarding payment and the next steps.",


        importantTitle:
            "Your job is not published yet.",

        importantDescription:
            "The job will only appear on ALote after it has been reviewed, approved and the required payment process has been completed.",


        backHome:
            "Back to Home",

        browseJobs:
            "Browse Jobs",

        thankYou:
            "Thank you for choosing ALote.",
        
        paymentTitle:
            "Complete your payment",

        paymentDescription:
            "To continue with your job posting, please contact ALote on Telegram. Our team will provide the payment method and instructions.",

        contactTelegram:
            "Contact us on Telegram →",

    },


    my: {

        paymentTitle:
            "ငွေပေးချေမှုကို ဆက်လက်လုပ်ဆောင်ပါ",

        paymentDescription:
            "အလုပ်အကိုင်တင်ရန် လုပ်ငန်းစဉ်ကို ဆက်လက်လုပ်ဆောင်ရန် ALote Telegram သို့ ဆက်သွယ်ပါ။ ကျွန်ုပ်တို့၏အဖွဲ့မှ ငွေပေးချေရမည့်နည်းလမ်းနှင့် လမ်းညွှန်ချက်များကို ပေးပို့ပေးပါမည်။",

        contactTelegram:
            "Telegram သို့ ဆက်သွယ်မည် →",

        findJobs:
            "အလုပ်အကိုင်များ",

        categories:
            "အမျိုးအစားများ",

        whyAlote:
            "ALote ကို ဘာကြောင့်သုံးမလဲ",

        postJob:
            "အလုပ်တင်မည်",


        requestReceived:
            "တောင်းဆိုချက် လက်ခံရရှိပါပြီ",

        successTitle:
            "သင့်အလုပ်တင်ရန် တောင်းဆိုချက်ကို လက်ခံရရှိပါပြီ။",

        successDescription:
            "အလုပ်တင်ရန် တောင်းဆိုချက် ပေးပို့ပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။ နောက်တစ်ဆင့်များအတွက် ဆက်သွယ်မပေးမီ ALote အဖွဲ့မှ အချက်အလက်များကို စစ်ဆေးပေးပါမည်။",


        reviewTitle:
            "ALote မှ စစ်ဆေးရန် စောင့်ဆိုင်းနေသည်",

        reviewDescription:
            "သင့်တောင်းဆိုချက်ကို အောင်မြင်စွာ လက်ခံရရှိပြီး ALote အဖွဲ့မှ စစ်ဆေးရန် စောင့်ဆိုင်းနေပါသည်။",


        nextStepTitle:
            "နောက်တစ်ဆင့်တွင် ဘာဖြစ်မလဲ။",

        nextStepDescription:
            "ALote အဖွဲ့မှ သင့်အလုပ်အချက်အလက်များကို စစ်ဆေးပြီး ငွေပေးချေမှုနှင့် နောက်တစ်ဆင့်များအတွက် သင်ပေးထားသော အချက်အလက်များမှတစ်ဆင့် ဆက်သွယ်ပေးပါမည်။",


        importantTitle:
            "သင့်အလုပ်ကို လက်ရှိတွင် မထုတ်ပြန်ရသေးပါ။",

        importantDescription:
            "အလုပ်ကို စစ်ဆေးပြီး အတည်ပြုကာ လိုအပ်သော ငွေပေးချေမှုလုပ်ငန်းစဉ် ပြီးဆုံးပြီးမှသာ ALote ပေါ်တွင် ထုတ်ပြန်ပေးပါမည်။",


        backHome:
            "ပင်မစာမျက်နှာသို့ ပြန်သွားမည်",

        browseJobs:
            "အလုပ်အကိုင်များကို ကြည့်မည်",

        thankYou:
            "ALote ကို ရွေးချယ်အသုံးပြုပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။"

    }

};



/* ==================================================
   CURRENT LANGUAGE
================================================== */

let currentLanguage =
    localStorage.getItem(
        "alote-language"
    ) || "en";



/* ==================================================
   LANGUAGE
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



    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;


            if (
                selectedLanguage[key] !== undefined
            ) {

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



/* ==================================================
   GET LATEST POSTING
================================================== */

function getLatestPosting() {

    const saved =
        sessionStorage.getItem(
            "aloteLatestJobPosting"
        );


    if (!saved) {

        return null;

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Unable to read posting request:",
            error
        );

        return null;

    }

}



/* ==================================================
   COMPANY INITIALS
================================================== */

function getCompanyInitials(companyName) {

    if (!companyName) {

        return "AL";

    }


    const words =
        companyName
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .substring(0, 3)
            .toUpperCase();

    }


    return words
        .slice(0, 2)
        .map(word =>
            word.charAt(0)
        )
        .join("")
        .toUpperCase();

}



/* ==================================================
   RENDER JOB
================================================== */

function renderSubmittedJob() {

    const posting =
        getLatestPosting();


    if (!posting || !posting.job) {

        return;

    }


    const company =
        posting.company || {};


    const job =
        posting.job;



    /* ----------------------------------------------
       COMPANY
    ---------------------------------------------- */

    const companyName =
        company.name ||
        "Company";


    const companyInitials =
        getCompanyInitials(
            companyName
        );



    /* ----------------------------------------------
       JOB
    ---------------------------------------------- */

    const title =
        job.title ||
        "Job posting";


    const location =
        job.location ||
        "Location";


    const workStyleMap = {

        Remote: {
            en: "Remote",
            my: "အဝေးမှ"
        },

        WFH: {
            en: "Remote",
            my: "အဝေးမှ"
        },

        Hybrid: {
            en: "Hybrid",
            my: "Hybrid"
        },

        "On-site": {
            en: "On-site",
            my: "ရုံးတက်"
        }

    };


    const employmentMap = {

        "Full-time": {
            en: "Full-time",
            my: "အချိန်ပြည့်"
        },

        "Part-time": {
            en: "Part-time",
            my: "အချိန်ပိုင်း"
        },

        Internship: {
            en: "Internship",
            my: "အလုပ်သင်"
        }

    };


    const workStyle =
        workStyleMap[
            job.workStyle
        ];


    const employmentType =
        employmentMap[
            job.employmentType
        ];



    const workStyleText =
        workStyle
            ? workStyle[currentLanguage]
            : job.workStyle || "";



    const employmentText =
        employmentType
            ? employmentType[currentLanguage]
            : job.employmentType || "";



    const metaParts = [

        location,

        workStyleText,

        employmentText

    ].filter(Boolean);



    /* ----------------------------------------------
       UPDATE HTML
    ---------------------------------------------- */

    const titleElement =
        document.getElementById(
            "jobTitle"
        );


    const companyElement =
        document.getElementById(
            "companyName"
        );


    const initialsElement =
        document.getElementById(
            "companyInitials"
        );


    const metaElement =
        document.getElementById(
            "jobMeta"
        );


    if (titleElement) {

        titleElement.textContent =
            title;

    }


    if (companyElement) {

        companyElement.textContent =
            companyName;

    }


    if (initialsElement) {

        initialsElement.textContent =
            companyInitials;

    }


    if (metaElement) {

        metaElement.textContent =
            metaParts.join(" · ");

    }

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


                renderSubmittedJob();

            }
        );

    });



/* ==================================================
   INITIALIZE
================================================== */

document.documentElement.lang =
    currentLanguage;


changeLanguage(
    currentLanguage
);


renderSubmittedJob();