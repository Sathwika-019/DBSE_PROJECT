let dashboardChart;
let statusChart;


// ==========================================
// LOAD DASHBOARD DATA
// ==========================================

async function loadDashboardData() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/complaints"
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load complaints"
            );
        }


        const complaints =
            await response.json();


        console.log(
            "Dashboard complaints:",
            complaints
        );


        // ==========================================
        // SUMMARY COUNTS
        // ==========================================

        const total =
            complaints.length;


        let pending = 0;

        let inProgress = 0;

        let resolved = 0;


        complaints.forEach(
            function (complaint) {

                if (
                    complaint.status ===
                    "Pending"
                ) {

                    pending++;

                }

                else if (
                    complaint.status ===
                    "In Progress"
                ) {

                    inProgress++;

                }

                else if (
                    complaint.status ===
                    "Resolved"
                ) {

                    resolved++;

                }

            }
        );


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


        // ==========================================
        // CATEGORY COUNTS
        // ==========================================

        let waste = 0;

        let water = 0;

        let air = 0;

        let noise = 0;

        let other = 0;


        complaints.forEach(
            function (complaint) {

                const category =
                    (
                        complaint.category ||
                        ""
                    ).toLowerCase();


                if (
                    category.includes("waste") ||
                    category.includes("garbage")
                ) {

                    waste++;

                }

                else if (
                    category.includes("water")
                ) {

                    water++;

                }

                else if (
                    category.includes("air")
                ) {

                    air++;

                }

                else if (
                    category.includes("noise")
                ) {

                    noise++;

                }

                else {

                    other++;

                }

            }
        );


        // ==========================================
        // CATEGORY CHART
        // ==========================================

        const categoryCanvas =
            document.getElementById(
                "categoryChart"
            );


        if (categoryCanvas) {

            if (dashboardChart) {

                dashboardChart.destroy();

            }


            dashboardChart =
                new Chart(
                    categoryCanvas,
                    {
                        type: "bar",

                        data: {

                            labels: [
                                "Waste",
                                "Water",
                                "Air",
                                "Noise",
                                "Other"
                            ],

                            datasets: [

                                {
                                    label:
                                        "Complaints",

                                    data: [
                                        waste,
                                        water,
                                        air,
                                        noise,
                                        other
                                    ]
                                }

                            ]
                        },

                        options: {

                            responsive: true,

                            scales: {

                                y: {

                                    beginAtZero:
                                        true

                                }

                            }

                        }

                    }
                );
        }


        // ==========================================
        // STATUS CHART
        // ==========================================

        const statusCanvas =
            document.getElementById(
                "statusChart"
            );


        if (statusCanvas) {

            if (statusChart) {

                statusChart.destroy();

            }


            statusChart =
                new Chart(
                    statusCanvas,
                    {
                        type: "doughnut",

                        data: {

                            labels: [
                                "Pending",
                                "In Progress",
                                "Resolved"
                            ],

                            datasets: [

                                {
                                    data: [
                                        pending,
                                        inProgress,
                                        resolved
                                    ]
                                }

                            ]
                        },

                        options: {

                            responsive: true

                        }

                    }
                );
        }


        // ==========================================
        // RECENT COMPLAINTS
        // ==========================================

        const recentTable =
            document.getElementById(
                "recentComplaintsTable"
            );


        if (!recentTable) {
            return;
        }


        recentTable.innerHTML = "";


        // Get latest 4 complaints
        const recentComplaints =
            complaints
                .slice()
                .reverse()
                .slice(0, 4);


        recentComplaints.forEach(
            function (complaint) {

                const row =
                    document.createElement("tr");


                // ID
                const idCell =
                    document.createElement("td");


                idCell.textContent =
                    "CMP" +
                    String(
                        complaint.id
                    ).padStart(3, "0");


                // CATEGORY
                const categoryCell =
                    document.createElement("td");


                categoryCell.textContent =
                    complaint.category ||
                    "-";


                // LOCATION
                const locationCell =
                    document.createElement("td");


                locationCell.textContent =
                    complaint.location ||
                    "-";


                // DATE
                const dateCell =
                    document.createElement("td");


                dateCell.textContent =
                    complaint.date ||
                    "-";


                // STATUS
                const statusCell =
                    document.createElement("td");


                const statusSpan =
                    document.createElement("span");


                let statusClass =
                    "pending";


                if (
                    complaint.status ===
                    "In Progress"
                ) {

                    statusClass =
                        "progress";

                }

                else if (
                    complaint.status ===
                    "Resolved"
                ) {

                    statusClass =
                        "resolved";

                }


                statusSpan.className =
                    "status " +
                    statusClass;


                statusSpan.textContent =
                    complaint.status ||
                    "Pending";


                statusCell.appendChild(
                    statusSpan
                );


                // Add cells
                row.appendChild(idCell);

                row.appendChild(categoryCell);

                row.appendChild(locationCell);

                row.appendChild(dateCell);

                row.appendChild(statusCell);


                recentTable.appendChild(
                    row
                );

            }
        );

    }


    catch (error) {

        console.error(
            "Dashboard data error:",
            error
        );


        alert(
            "Cannot connect to the backend. " +
            "Make sure Spring Boot is running."
        );

    }
}


// ==========================================
// START DASHBOARD
// ==========================================

loadDashboardData();