/* ==================================================
   ALote — MOBILE NAVIGATION
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


/* ==================================================
   MOBILE MENU
================================================== */

if (
    mobileMenuButton &&
    mobileMenu
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("open");


            mobileMenuButton.classList.toggle(
                "active",
                isOpen
            );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );


            mobileMenuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );


    /* ==============================================
       CLOSE AFTER CLICKING LINK
    ============================================== */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });


    /* ==============================================
       CLOSE WHEN CLICKING OUTSIDE
    ============================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileMenu.contains(event.target) &&
                !mobileMenuButton.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* ==================================================
   CLOSE MOBILE MENU
================================================== */

function closeMobileMenu() {

    if (!mobileMenu || !mobileMenuButton) {
        return;
    }


    mobileMenu.classList.remove("open");

    mobileMenuButton.classList.remove(
        "active"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        "Open menu"
    );

}


/* ==================================================
   CURRENT PAGE DETECTION
================================================== */

function setActiveMobileNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    /*
        If the URL is just a folder/root,
        treat it as index.html.
    */

    const page =
        currentPage === ""
            ? "index.html"
            : currentPage;


    /* ==============================================
       MOBILE NAVIGATION LINKS
    ============================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-nav-links a"
        );


    mobileLinks.forEach(link => {

        const linkPage =
            link
                .getAttribute("href")
                .split("?")[0]
                .split("#")[0]
                .split("/")
                .pop()
                .toLowerCase();


        /*
            Remove active first
        */

        link.classList.remove("active");


        /*
            Add active if current page matches
        */

        if (
            linkPage === page
        ) {

            link.classList.add("active");

        }

    });


    /* ==============================================
       POST A JOB / EMPLOYER
    ============================================== */

    const employerLink =
        document.querySelector(
            ".mobile-employer-link"
        );


    if (employerLink) {

        const employerPage =
            employerLink
                .getAttribute("href")
                .split("?")[0]
                .split("#")[0]
                .split("/")
                .pop()
                .toLowerCase();


        employerLink.classList.remove(
            "active"
        );


        if (
            employerPage === page
        ) {

            employerLink.classList.add(
                "active"
            );

        }

    }

}


/* ==================================================
   INITIALIZE ACTIVE PAGE
================================================== */

setActiveMobileNavigation();