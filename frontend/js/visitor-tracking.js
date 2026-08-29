function getVisitorId() {

    let visitorId =
        localStorage.getItem(
            "alote_visitor_id"
        );

    if (!visitorId) {

        visitorId =
            "visitor_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 10);

        localStorage.setItem(
            "alote_visitor_id",
            visitorId
        );
    }

    return visitorId;
}


async function trackVisit() {

    try {

        await fetch(
            "http://127.0.0.1:8000/api/website-visits",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                    "Accept":
                        "application/json"
                },

                body: JSON.stringify({
                    visitor_id:
                        getVisitorId(),

                    page:
                        window.location.pathname
                })
            }
        );

    } catch (error) {

        console.error(
            "Visitor tracking error:",
            error
        );
    }
}


trackVisit();