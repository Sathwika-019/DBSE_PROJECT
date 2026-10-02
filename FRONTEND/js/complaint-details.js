const urlParams =
    new URLSearchParams(window.location.search);

const complaintId =
    urlParams.get("id");


// ==========================================
// LOAD COMPLAINT DETAILS
// ==========================================

async function loadComplaintDetails() {

    if (!complaintId) {

        alert("Complaint ID is missing.");

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/complaints/" +
            complaintId
        );


        if (!response.ok) {

            throw new Error(
                "Complaint not found"
            );
        }


        const complaint =
            await response.json();


        console.log(
            "Complaint:",
            complaint
        );


        // Complaint ID
        const formattedId =
            "CMP" +
            String(complaint.id)
                .padStart(3, "0");


        document.getElementById(
            "complaintId"
        ).textContent =
            formattedId;


        document.getElementById(
            "complaintIdInfo"
        ).textContent =
            formattedId;


        // Title
        document.getElementById(
            "complaintTitle"
        ).textContent =
            complaint.title || "-";


        // Category
        document.getElementById(
            "complaintCategory"
        ).textContent =
            complaint.category || "-";


        // Location
        document.getElementById(
            "complaintLocation"
        ).textContent =
            complaint.location || "-";


        document.getElementById(
            "locationName"
        ).textContent =
            complaint.location || "-";


        // Description
        document.getElementById(
            "complaintDescription"
        ).textContent =
            complaint.description || "-";


        // Status
        const status =
            complaint.status || "Pending";


        document.getElementById(
            "complaintStatus"
        ).textContent =
            status;


        document.getElementById(
            "status"
        ).value =
            status;


        document.getElementById(
            "timelineStatus"
        ).textContent =
            "Current Status: " +
            status;


        // Priority
        document.getElementById(
            "complaintPriority"
        ).textContent =
            complaint.priority || "-";


        // Date
        document.getElementById(
            "complaintDate"
        ).textContent =
            "-";

    }
    catch (error) {

        console.error(
            "Error loading complaint:",
            error
        );


        alert(
            "Could not load complaint details."
        );
    }
}


// ==========================================
// UPDATE COMPLAINT
// ==========================================

async function updateComplaint() {

    const newStatus =
        document.getElementById(
            "status"
        ).value;


    try {

        // Get the existing complaint first
        const getResponse =
            await fetch(
                "http://localhost:8080/api/complaints/" +
                complaintId
            );


        if (!getResponse.ok) {

            throw new Error(
                "Could not get complaint"
            );
        }


        const existingComplaint =
            await getResponse.json();


        // Change only status
        existingComplaint.status =
            newStatus;


        // Send complete complaint
        const response =
            await fetch(
                "http://localhost:8080/api/complaints/" +
                complaintId,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        existingComplaint
                    )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Update failed"
            );
        }


        const updatedComplaint =
            await response.json();


        console.log(
            "Updated complaint:",
            updatedComplaint
        );


        // Update displayed status
        document.getElementById(
            "complaintStatus"
        ).textContent =
            updatedComplaint.status;


        document.getElementById(
            "timelineStatus"
        ).textContent =
            "Current Status: " +
            updatedComplaint.status;


        // Show success message
        document.getElementById(
            "successMessage"
        ).textContent =
            "Complaint updated successfully!";


        setTimeout(function () {

            document.getElementById(
                "successMessage"
            ).textContent = "";

        }, 3000);

    }
    catch (error) {

        console.error(
            "Update error:",
            error
        );


        alert(
            "Could not update complaint. " +
            "Make sure Spring Boot is running."
        );
    }
}


// ==========================================
// START
// ==========================================

loadComplaintDetails();