// ==========================================
// SUBMIT COMPLAINT - FINAL VERSION
// ==========================================

document
    .getElementById("complaintForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        // Get form values
        const title =
            document.getElementById("title").value.trim();

        const category =
            document.getElementById("category").value;

        const location =
            document.getElementById("location").value.trim();

        const description =
            document.getElementById("description").value.trim();

        const priority =
            document.getElementById("priority").value;


        // Check required fields
        if (
            title === "" ||
            category === "" ||
            location === "" ||
            description === "" ||
            priority === ""
        ) {

            alert(
                "Please fill all the required fields."
            );

            return;
        }


        try {

            // Send complaint to backend
            const response = await fetch(
                "http://localhost:8080/api/complaints",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        title: title,

                        description: description,

                        category: category,

                        location: location,

                        status: "Pending",

                        email: "test@example.com",

                        priority: priority

                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Complaint submission failed"
                );
            }


            // Get saved complaint
            const complaint =
                await response.json();


            console.log(
                "Complaint saved:",
                complaint
            );


            // Create complaint ID
            const complaintId =
                "CMP" +
                String(complaint.id)
                    .padStart(3, "0");


            // Success message
            const successMessage =
                document.getElementById(
                    "successMessage"
                );


            successMessage.textContent =
                "Complaint submitted successfully! " +
                "Complaint ID: " +
                complaintId;


            // Show confirmation
            alert(
                "Complaint submitted successfully!\n\n" +
                "Complaint ID: " +
                complaintId
            );


            // Open details page
            window.location.href =
                "complaint-details.html?id=" +
                complaint.id;

        }
        catch (error) {

            console.error(
                "Complaint submission error:",
                error
            );


            alert(
                "Could not submit complaint.\n\n" +
                "Make sure Spring Boot is running."
            );
        }

    });


// ==========================================
// CLEAR FORM
// ==========================================

function clearForm() {

    document
        .getElementById("complaintForm")
        .reset();


    document
        .getElementById("imagePreview")
        .innerHTML = "";


    document
        .getElementById("successMessage")
        .textContent = "";
}


// ==========================================
// IMAGE PREVIEW
// ==========================================

document
    .getElementById("image")
    .addEventListener("change", function () {

        const file = this.files[0];

        const preview =
            document.getElementById(
                "imagePreview"
            );


        preview.innerHTML = "";


        if (!file) {
            return;
        }


        const image =
            document.createElement("img");


        image.src =
            URL.createObjectURL(file);


        image.style.maxWidth = "250px";

        image.style.marginTop = "10px";

        image.style.borderRadius = "8px";


        preview.appendChild(image);

    });