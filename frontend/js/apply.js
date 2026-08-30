/* ==================================================
   ALote Application
================================================== */


/* ==================================================
   TEMPORARY JOB DATA
   --------------------------------------------------
   Later this will come from Laravel / API.
================================================== */

let job = null;


async function loadJobFromBackend() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const jobId =
        params.get("job");


    if (!jobId) {

        window.location.href =
            "jobs.html";

        return false;
    }


    try {

        const response =
            await fetch(
                `${window.ALOTE_CONFIG.API_BASE_URL}/jobs/${jobId}`,
                {
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {

            window.location.href =
                "jobs.html";

            return false;
        }


        const result =
            await response.json();


        const item =
            result.data;


        job = {

    id:
        item.public_id,

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
                "Not specified"

        };


        return true;

    } catch (error) {

        console.error(error);

        return false;
    }

}



/* ==================================================
   TRANSLATIONS
================================================== */

const translations = {

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


        /* Application */

        backToJob:
            "Back to job",

        application:
            "APPLICATION",

        applyForJob:
            "Apply for this job",

        applicationIntro:
            "Take the next step in your career. Your application will first be reviewed by ALote before being forwarded to the company.",


        /* Information */

        yourInformation:
            "Your information",

        yourInformationDescription:
            "Provide the information needed for your application.",


        fullName:
            "Full name",

        fullNamePlaceholder:
            "Your full name",


        email:
            "Email address",

        emailPlaceholder:
            "you@example.com",

        emailNote:
            "We'll use this email to send updates about your application.",


        phone:
            "Phone number",

        phonePlaceholder:
            "09xxxxxxxxx",


        resume:
            "CV / Resume",

        uploadResume:
            "Upload your CV",

        resumeFormats:
            "PDF, DOC or DOCX",


        coverMessage:
            "Cover message",

        optional:
            "Optional",

        coverPlaceholder:
            "Tell us why you are a good fit...",


        /* Review */

        reviewNoticeTitle:
            "Reviewed before reaching the company",

        reviewNoticeDescription:
            "Every application is reviewed by ALote first. If your application meets the requirements, it will be forwarded to the hiring company.",


        /* Privacy */

        privacyNote:
            "Your information will be used only for this application and handled according to ALote's application process.",


        /* Submit */

        submitApplication:
            "Submit application",

        submitNote:
            "By submitting this application, you confirm that the information you provided is accurate.",


        /* Footer */

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
       BURMESE
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


        /* Application */

        backToJob:
            "အလုပ်သို့ ပြန်သွားမည်",

        application:
            "လျှောက်ထားခြင်း",

        applyForJob:
            "ဤအလုပ်ကို လျှောက်ထားမည်",

        applicationIntro:
            "သင့်ရဲ့ အလုပ်အကိုင်လမ်းကြောင်းအတွက် နောက်တစ်ဆင့်ကို စတင်လိုက်ပါ။ သင့်လျှောက်လွှာကို ကုမ္ပဏီထံ မပေးပို့မီ ALote အဖွဲ့မှ စစ်ဆေးပေးပါမည်။",


        /* Information */

        yourInformation:
            "သင့်အချက်အလက်များ",

        yourInformationDescription:
            "လျှောက်လွှာအတွက် လိုအပ်သော အချက်အလက်များကို ဖြည့်သွင်းပါ။",


        fullName:
            "အမည်အပြည့်အစုံ",

        fullNamePlaceholder:
            "သင့်အမည်အပြည့်အစုံ",


        email:
            "Email လိပ်စာ",

        emailPlaceholder:
            "you@example.com",

        emailNote:
            "သင့်လျှောက်လွှာနှင့်ပတ်သက်သော အကြောင်းကြားချက်များကို ဤ Email သို့ ပေးပို့ပါမည်။",


        phone:
            "ဖုန်းနံပါတ်",

        phonePlaceholder:
            "09xxxxxxxxx",


        resume:
            "CV / Resume",

        uploadResume:
            "သင့် CV ကို တင်ပါ",

        resumeFormats:
            "PDF, DOC သို့မဟုတ် DOCX",


        coverMessage:
            "မိတ်ဆက်စာ",

        optional:
            "မဖြည့်လည်းရသည်",

        coverPlaceholder:
            "သင်ဟာ ဒီအလုပ်နဲ့ ဘာကြောင့် သင့်တော်တယ်ဆိုတာ ရေးပါ...",


        /* Review */

        reviewNoticeTitle:
            "ကုမ္ပဏီထံ မပေးပို့မီ စစ်ဆေးပေးပါသည်",

        reviewNoticeDescription:
            "လျှောက်လွှာတိုင်းကို ALote အဖွဲ့မှ ပထမဦးစွာ စစ်ဆေးပေးပါသည်။ လိုအပ်ချက်များနှင့် ကိုက်ညီပါက သက်ဆိုင်ရာ ကုမ္ပဏီထံသို့ ပေးပို့ပေးပါမည်။",


        /* Privacy */

        privacyNote:
            "သင့်အချက်အလက်များကို ဤအလုပ်လျှောက်လွှာအတွက်သာ အသုံးပြုပြီး ALote ၏ လျှောက်လွှာစစ်ဆေးသည့် လုပ်ငန်းစဉ်အတိုင်း ကိုင်တွယ်ပေးပါမည်။",


        /* Submit */

        submitApplication:
            "လျှောက်လွှာတင်မည်",

        submitNote:
            "လျှောက်လွှာတင်ခြင်းဖြင့် သင်ပေးထားသော အချက်အလက်များ မှန်ကန်ကြောင်း အတည်ပြုပါသည်။",


        /* Footer */

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
    localStorage.getItem("alote-language") || "en";



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
       TEXT TRANSLATION
    ---------------------------------------------- */

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



    /* ----------------------------------------------
       PLACEHOLDER TRANSLATION
    ---------------------------------------------- */

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



    /* ----------------------------------------------
       LANGUAGE BUTTON
    ---------------------------------------------- */

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
   RENDER JOB
================================================== */

function renderJob() {

    const title =
        document.getElementById(
            "jobTitle"
        );


    const company =
        document.getElementById(
            "companyName"
        );


    const meta =
        document.getElementById(
            "jobMeta"
        );


    if (title) {

        title.textContent =
            job.title;

    }


    if (company) {

        company.textContent =
            job.company;

    }


    if (meta) {

        const workStyle =
            currentLanguage === "my"
                ? "အဝေးမှ"
                : job.workType;


        const employmentType =
            currentLanguage === "my"
                ? "အချိန်ပြည့်"
                : job.employmentType;


        meta.textContent =
            `${job.location} · ${workStyle} · ${employmentType}`;

    }

}



/* ==================================================
   FILE INPUT
================================================== */

const resumeInput =
    document.getElementById(
        "resume"
    );


const fileLabel =
    document.querySelector(
        ".file-label"
    );


if (
    resumeInput &&
    fileLabel
) {

    resumeInput.addEventListener(
        "change",
        () => {

            if (
                !resumeInput.files.length
            ) {

                return;

            }


            const file =
                resumeInput.files[0];


            const strong =
                fileLabel.querySelector(
                    "strong"
                );


            const small =
                fileLabel.querySelector(
                    "small"
                );


            if (strong) {

                strong.textContent =
                    file.name;

            }


            if (small) {

                small.textContent =
                    `${(
                        file.size /
                        1024 /
                        1024
                    ).toFixed(2)} MB`;

            }

        }
    );

}



/* ==================================================
   APPLICATION SUBMISSION
================================================== */

const applicationForm =
    document.getElementById(
        "applicationForm"
    );


if (applicationForm) {

    applicationForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();



            /* ------------------------------------------
               FORM VALIDATION
            ------------------------------------------ */

            if (
                !applicationForm.checkValidity()
            ) {

                applicationForm.reportValidity();

                return;

            }



            /* ------------------------------------------
               FILE VALIDATION
            ------------------------------------------ */

            if (
                !resumeInput ||
                !resumeInput.files.length
            ) {

                alert(
                    currentLanguage === "my"
                        ? "ကျေးဇူးပြု၍ CV ကို တင်ပါ။"
                        : "Please upload your CV."
                );

                return;

            }



            /* ------------------------------------------
               COLLECT FORM DATA
            ------------------------------------------ */

            const formData =
                new FormData(
                    applicationForm
                );


            const resume =
                resumeInput.files[0];



            /* ------------------------------------------
               PREVENT DOUBLE SUBMISSION
            ------------------------------------------ */

            const submitButton =
                document.getElementById(
                    "submitApplicationButton"
                );

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    currentLanguage === "my"
                        ? "တင်သွင်းနေပါသည်..."
                        : "Submitting...";
            }


            /* ------------------------------------------
               PREPARE BACKEND DATA
            ------------------------------------------ */

            formData.append(
    "job_public_id",
    job.id
);

            formData.append(
                "full_name",
                formData.get("fullName")
            );

            formData.append(
                "cover_letter",
                formData.get("coverMessage") || ""
            );


            /* ------------------------------------------
               SUBMIT TO LARAVEL
            ------------------------------------------ */

            try {

                const response =
                    await fetch(
                        `${window.ALOTE_CONFIG.API_BASE_URL}/applications`,
                        {
                            method: "POST",
                            headers: {
                                "Accept": "application/json"
                            },
                            body: formData
                        }
                    );

                const result =
                    await response.json();

                if (!response.ok) {

                    console.error(result);

                    throw new Error(
                        result.message ||
                        "Unable to submit application."
                    );
                }

                sessionStorage.setItem(
                    "aloteAppliedJob",
                    JSON.stringify(job)
                );

                window.location.href =
                    "application-success.html";

            } catch (error) {

                console.error(error);

                alert(
                    currentLanguage === "my"
                        ? "လျှောက်လွှာတင်ရာတွင် အမှားရှိနေပါသည်။"
                        : error.message
                );

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        currentLanguage === "my"
                            ? "လျှောက်လွှာတင်မည်"
                            : "Submit application";
                }

            }
        }
    );

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

async function initializeApplicationPage() {

    const loaded =
        await loadJobFromBackend();


    if (!loaded) {

        return;
    }


    document.documentElement.lang =
        currentLanguage;


    changeLanguage(
        currentLanguage
    );


    renderJob();

}


initializeApplicationPage();