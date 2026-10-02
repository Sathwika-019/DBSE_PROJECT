let allComplaints = [];


// ==========================================
// LOAD COMPLAINTS
// ==========================================

async function loadComplaints() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/complaints"
        );

        if (!response.ok) {
            throw new Error("Failed to load complaints");
        }

        allComplaints = await response.json();

        updateSummary();

        displayComplaints(allComplaints);

    }
    catch (error) {

        console.error(
            "Complaints loading error:",
            error
        );

        alert(
            "Cannot connect to the backend. " +
            "Make sure Spring Boot is running."
        );
    }
}


// ==========================================
// UPDATE SUMMARY
// ==========================================

function updateSummary() {

    const total = allComplaints.length;

    let pending = 0;
    let inProgress = 0;
    let resolved = 0;


    allComplaints.forEach(function (complaint) {

        if (complaint.status === "Pending") {
            pending++;
        }

        else if (complaint.status === "In Progress") {
            inProgress++;
        }

        else if (complaint.status === "Resolved") {
            resolved++;
        }

    });


    document.getElementById(
        "totalComplaints"
    ).textContent = total;


    document.getElementById(
        "pendingComplaints"
    ).textContent = pending;


    document.getElementById(
        "inProgressComplaints"
    ).textContent = inProgress;


    document.getElementById(
        "resolvedComplaints"
    ).textContent = resolved;
}


// ==========================================
// DISPLAY COMPLAINTS
// ==========================================

function displayComplaints(complaints) {

    const table =
        document.getElementById("complaintTable");


    if (!table) {
        return;
    }


    table.innerHTML = "";


    if (complaints.length === 0) {

        const row =
            document.createElement("tr");


        const cell =
            document.createElement("td");


        cell.colSpan = 8;

        cell.textContent =
            "No complaints found.";

        cell.style.textAlign =
            "center";


        row.appendChild(cell);

        table.appendChild(row);

        return;
    }


    complaints.forEach(function (complaint) {

        const row =
            document.createElement("tr");


        // ID
        const idCell =
            document.createElement("td");

        idCell.textContent =
            "CMP" +
            String(complaint.id).padStart(3, "0");


        // TITLE
        const titleCell =
            document.createElement("td");

        titleCell.textContent =
            complaint.title || "-";


        // CATEGORY
        const categoryCell =
            document.createElement("td");

        categoryCell.textContent =
            complaint.category || "-";


        // LOCATION
        const locationCell =
            document.createElement("td");

        locationCell.textContent =
            complaint.location || "-";


        // DATE
        const dateCell =
            document.createElement("td");

        dateCell.textContent =
            complaint.date || "-";


        // PRIORITY
        const priorityCell =
            document.createElement("td");

        priorityCell.textContent =
            complaint.priority || "-";


        // STATUS
        const statusCell =
            document.createElement("td");

        const statusSpan =
            document.createElement("span");


        let statusClass = "pending";


        if (complaint.status === "In Progress") {
            statusClass = "progress";
        }

        else if (complaint.status === "Resolved") {
            statusClass = "resolved";
        }


        statusSpan.className =
            "status " + statusClass;


        statusSpan.textContent =
            complaint.status || "Pending";


        statusCell.appendChild(
            statusSpan
        );


        // ACTION
        const actionCell =
            document.createElement("td");


        const viewButton =
            document.createElement("button");


        viewButton.className =
            "view-btn";


        viewButton.textContent =
            "View";


        viewButton.onclick =
            function () {

                window.location.href =
                    "complaint-details.html?id=" +
                    complaint.id;

            };


        actionCell.appendChild(
            viewButton
        );


        // ADD ALL CELLS
        row.appendChild(idCell);

        row.appendChild(titleCell);

        row.appendChild(categoryCell);

        row.appendChild(locationCell);

        row.appendChild(dateCell);

        row.appendChild(priorityCell);

        row.appendChild(statusCell);

        row.appendChild(actionCell);


        table.appendChild(row);

    });
}


// ==========================================
// FILTER COMPLAINTS
// ==========================================

function filterComplaints() {

    const searchInput =
        document.getElementById("searchInput");


    const categoryFilter =
        document.getElementById("categoryFilter");


    const statusFilter =
        document.getElementById("statusFilter");


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categoryFilter.value;


    const selectedStatus =
        statusFilter.value;


    const filtered =
        allComplaints.filter(
            function (complaint) {

                const title =
                    (complaint.title || "")
                        .toLowerCase();


                const description =
                    (complaint.description || "")
                        .toLowerCase();


                const category =
                    (complaint.category || "")
                        .toLowerCase();


                const location =
                    (complaint.location || "")
                        .toLowerCase();


                // Search
                const matchesSearch =
                    searchText === "" ||

                    title.includes(searchText) ||

                    description.includes(searchText) ||

                    category.includes(searchText) ||

                    location.includes(searchText);


                // Category
                let matchesCategory = true;


                if (selectedCategory !== "all") {

                    const selected =
                        selectedCategory
                            .toLowerCase();


                    matchesCategory =
                        category === selected ||
                        category.includes(selected) ||
                        selected.includes(category);

                }


                // Status
                const matchesStatus =
                    selectedStatus === "all" ||
                    complaint.status === selectedStatus;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus
                );

            }
        );


    displayComplaints(filtered);
}


// ==========================================
// EVENT LISTENERS
// ==========================================

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterComplaints
    );
}


const categoryFilter =
    document.getElementById("categoryFilter");


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterComplaints
    );
}


const statusFilter =
    document.getElementById("statusFilter");


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterComplaints
    );
}


// ==========================================
// START
// ==========================================

loadComplaints();