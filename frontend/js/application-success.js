/* ==================================================
   ALote Application Success
================================================== */


/* ==================================================
   TEMPORARY JOB DATA
   --------------------------------------------------
   Later this will come from the application / job API.
================================================== */

const storedJob =
    sessionStorage.getItem(
        "aloteAppliedJob"
    );


let job = null;


if (storedJob) {

    job =
        JSON.parse(
            storedJob
        );

}



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


        /* Success */

        applicationReceived:
            "APPLICATION RECEIVED",

        successTitle:
            "Your application has been submitted.",

        successDescription:
            "We've received your application. Our team will review it before forwarding it to the company.",


        /* Application Progress */

        applicationProgress:
            "APPLICATION PROGRESS",

        currentStatus:
            "Currently under review",


        submittedTitle:
            "Application submitted",

        submittedDescription:
            "Your application has been successfully received.",


        reviewTitle:
            "ALote review",

        reviewDescription:
            "Our team is reviewing your application.",


        companyTitle:
            "Company",

        companyDescription:
            "If approved, your application will be sent to the company.",


        /* What happens next */

        nextStepTitle:
            "What happens next?",

        nextStepDescription:
            "ALote will review your application. If it meets the requirements, we will forward it to the company for consideration.",


        /* Email */

        emailTitle:
            "Watch your email",

        emailDescription:
            "We'll use the email address you provided to send important updates about your application.",


        paymentTitle:
            "Complete your payment",

        paymentDescription:
            "To continue with your job posting, please contact ALote on Telegram. Our team will provide the payment method and instructions.",

        contactTelegram:
            "Contact us on Telegram →",


        /* Footer */

        thankYou:
            "Thank you for using ALote.",

        footerTagline:
            "Find work that fits you.",

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


        /* Success */

        applicationReceived:
            "လျှောက်လွှာ လက်ခံရရှိပါပြီ",

        successTitle:
            "သင့်လျှောက်လွှာကို တင်ပြီးပါပြီ။",

        successDescription:
            "သင့်လျှောက်လွှာကို လက်ခံရရှိပါပြီ။ ကုမ္ပဏီထံ မပေးပို့မီ ALote အဖွဲ့မှ စစ်ဆေးပေးပါမည်။",


        /* Application Progress */

        applicationProgress:
            "လျှောက်လွှာ အခြေအနေ",

        currentStatus:
            "လက်ရှိ စစ်ဆေးနေပါသည်",


        submittedTitle:
            "လျှောက်လွှာ တင်ပြီးပါပြီ",

        submittedDescription:
            "သင့်လျှောက်လွှာကို အောင်မြင်စွာ လက်ခံရရှိပါပြီ။",


        reviewTitle:
            "ALote မှ စစ်ဆေးနေပါသည်",

        reviewDescription:
            "ALote အဖွဲ့မှ သင့်လျှောက်လွှာကို စစ်ဆေးနေပါသည်။",


        companyTitle:
            "ကုမ္ပဏီ",

        companyDescription:
            "အတည်ပြုပြီးပါက သင့်လျှောက်လွှာကို ကုမ္ပဏီထံ ပေးပို့ပါမည်။",


        /* What happens next */

        nextStepTitle:
            "နောက်တစ်ဆင့်မှာ ဘာဖြစ်မလဲ။",

        nextStepDescription:
            "ALote မှ သင့်လျှောက်လွှာကို စစ်ဆေးပေးပါမည်။ လိုအပ်ချက်များနှင့် ကိုက်ညီပါက စဉ်းစားပေးရန်အတွက် ကုမ္ပဏီထံ ပေးပို့ပါမည်။",


        /* Email */

        emailTitle:
            "သင့် Email ကို စောင့်ကြည့်ပါ",

        emailDescription:
            "သင့်လျှောက်လွှာနှင့်ပတ်သက်သော အရေးကြီးသည့် အကြောင်းကြားချက်များကို သင်ပေးထားသော Email သို့ ပေးပို့ပါမည်။",


        paymentTitle:
            "ငွေပေးချေမှုကို ဆက်လက်လုပ်ဆောင်ပါ",

        paymentDescription:
            "အလုပ်အကိုင်တင်ရန် လုပ်ငန်းစဉ်ကို ဆက်လက်လုပ်ဆောင်ရန် ALote Telegram သို့ ဆက်သွယ်ပါ။ ကျွန်ုပ်တို့၏အဖွဲ့မှ ငွေပေးချေရမည့်နည်းလမ်းနှင့် လမ်းညွှန်ချက်များကို ပေးပို့ပေးပါမည်။",

        contactTelegram:
            "Telegram သို့ ဆက်သွယ်မည် →",


        /* Footer */

        thankYou:
            "ALote ကို အသုံးပြုပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။",

        footerTagline:
            "သင့်အတွက် သင့်တော်တဲ့အလုပ်ကို ရှာဖွေပါ။",

        footerDescription:
            "အလုပ်ရှာဖွေသူများနှင့် အလုပ်ရှင်များကို တစ်နေရာတည်းတွင် စနစ်တကျ ချိတ်ဆက်ပေးပါသည်။",

        footerJobs:
            "အလုပ်အကိုင်များ",

        footerWfh:
            "WFH အလုပ်များ",

        footerOnsite:
            "ရုံးတက်အလုပ်များ",

        footerHybrid:
            "Hybrid အလုပ်များ",

        footerInternship:
            "အလုပ်သင်များ",

        footerPartTime:
            "အချိန်ပိုင်းအလုပ်များ",

        footerLinks:
            "အသုံးဝင်သော လင့်ခ်များ",

        footerContact:
            "ဆက်သွယ်ရန်",

        copyright:
            "© ၂၀၂၆ ALote။ မူပိုင်ခွင့်အားလုံး ရယူထားပါသည်။"

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


    /* ----------------------------------------------
       Translate all elements
    ---------------------------------------------- */

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


    /* ----------------------------------------------
       Active language button
    ---------------------------------------------- */

    document
        .querySelectorAll(".language-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === language
            );

        });


    /* ----------------------------------------------
       Save language
    ---------------------------------------------- */

    localStorage.setItem(
        "alote-language",
        language
    );

}



/* ==================================================
   RENDER JOB
================================================== */

function renderJob() {

    const jobTitle =
        document.getElementById(
            "jobTitle"
        );


    const companyName =
        document.getElementById(
            "companyName"
        );


    const jobMeta =
        document.getElementById(
            "jobMeta"
        );


    const companyAvatar =
        document.querySelector(
            ".company-avatar"
        );


    /* ----------------------------------------------
       Job title
    ---------------------------------------------- */

    if (jobTitle) {

        jobTitle.textContent =
            job.title;

    }


    /* ----------------------------------------------
       Company
    ---------------------------------------------- */

    if (companyName) {

        companyName.textContent =
            job.company;

    }


    /* ----------------------------------------------
       Company initials
    ---------------------------------------------- */

    if (companyAvatar) {

        companyAvatar.textContent =
            job.company
                .split(" ")
                .filter(word => word.length > 0)
                .map(word => word[0])
                .join("")
                .substring(0, 3)
                .toUpperCase();

    }


    /* ----------------------------------------------
       Work style
    ---------------------------------------------- */

    let workStyle;


    if (
        job.workType === "Remote"
    ) {

        workStyle =
            currentLanguage === "my"
                ? "အဝေးမှ"
                : "Remote";

    }

    else if (
        job.workType === "Hybrid"
    ) {

        workStyle =
            currentLanguage === "my"
                ? "Hybrid"
                : "Hybrid";

    }

    else if (
        job.workType === "On-site"
    ) {

        workStyle =
            currentLanguage === "my"
                ? "ရုံးတက်"
                : "On-site";

    }

    else {

        workStyle =
            job.workType;

    }


    /* ----------------------------------------------
       Employment type
    ---------------------------------------------- */

    let employmentType;


    if (
        job.employmentType === "Full-time"
    ) {

        employmentType =
            currentLanguage === "my"
                ? "အချိန်ပြည့်"
                : "Full-time";

    }

    else if (
        job.employmentType === "Part-time"
    ) {

        employmentType =
            currentLanguage === "my"
                ? "အချိန်ပိုင်း"
                : "Part-time";

    }

    else if (
        job.employmentType === "Internship"
    ) {

        employmentType =
            currentLanguage === "my"
                ? "အလုပ်သင်"
                : "Internship";

    }

    else {

        employmentType =
            job.employmentType;

    }


    /* ----------------------------------------------
       Job metadata
    ---------------------------------------------- */

    if (jobMeta) {

        jobMeta.textContent =
            `${job.location} · ${workStyle} · ${employmentType}`;

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


                renderJob();

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


if (job) {

    renderJob();

}