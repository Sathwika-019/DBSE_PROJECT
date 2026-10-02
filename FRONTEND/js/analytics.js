let categoryChart = null;
let statusChart = null;
let monthlyChart = null;
let locationChart = null;


// ==========================================
// LOAD ANALYTICS DATA
// ==========================================

async function loadAnalytics() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/complaints"
        );

        if (!response.ok) {
            throw new Error("Failed to load complaints");
        }

        const complaints = await response.json();

        console.log("Analytics complaints:", complaints);


        // ==========================================
        // STATUS COUNTS
        // ==========================================

        let pending = 0;
        let inProgress = 0;
        let resolved = 0;

        complaints.forEach(function (complaint) {

            const status =
                (complaint.status || "")
                    .toLowerCase()
                    .trim();

            if (status === "pending") {
                pending++;
            }

            else if (status === "in progress") {
                inProgress++;
            }

            else if (status === "resolved") {
                resolved++;
            }

        });


        const total = complaints.length;


        // ==========================================
        // UPDATE STAT CARDS
        // ==========================================

        const statCards =
            document.querySelectorAll(
                ".stat-card h3"
            );

        if (statCards.length >= 4) {

            statCards[0].textContent = total;

            statCards[1].textContent = pending;

            statCards[2].textContent = inProgress;

            statCards[3].textContent = resolved;

        }


        // ==========================================
        // CATEGORY COUNTS
        // ==========================================

        const categoryNames = [
            "Waste Management",
            "Water Pollution",
            "Air Pollution",
            "Noise Pollution",
            "Garbage Disposal"
        ];

        const categoryCounts = [
            0,
            0,
            0,
            0,
            0
        ];

        complaints.forEach(function (complaint) {

            const category =
                (complaint.category || "")
                    .toLowerCase();

            if (
                category.includes("waste")
            ) {
                categoryCounts[0]++;
            }

            else if (
                category.includes("water")
            ) {
                categoryCounts[1]++;
            }

            else if (
                category.includes("air")
            ) {
                categoryCounts[2]++;
            }

            else if (
                category.includes("noise")
            ) {
                categoryCounts[3]++;
            }

            else if (
                category.includes("garbage")
            ) {
                categoryCounts[4]++;
            }

        });


        // ==========================================
        // CATEGORY CHART
        // ==========================================

        const categoryCanvas =
            document.getElementById(
                "categoryChart"
            );

        if (categoryCanvas) {

            if (categoryChart) {
                categoryChart.destroy();
            }

            categoryChart = new Chart(
                categoryCanvas,
                {
                    type: "bar",

                    data: {

                        labels: categoryNames,

                        datasets: [
                            {
                                label:
                                    "Number of Complaints",

                                data:
                                    categoryCounts
                            }
                        ]

                    },

                    options: {

                        responsive: true,

                        plugins: {

                            legend: {
                                display: false
                            }

                        },

                        scales: {

                            y: {
                                beginAtZero: true,
                                ticks: {
                                    precision: 0
                                }
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

            statusChart = new Chart(
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

                        responsive: true,

                        plugins: {

                            legend: {
                                position: "bottom"
                            }

                        }

                    }

                }
            );

        }


        // ==========================================
        // MONTHLY COMPLAINTS
        // ==========================================

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const monthlyCounts =
            new Array(12).fill(0);


        complaints.forEach(function (complaint) {

            /*
             * Your current Complaint entity does not
             * have a date field.
             *
             * Therefore existing complaints cannot
             * be assigned to a month yet.
             *
             * We keep all months at 0 rather than
             * showing fake data.
             */

        });


        const monthlyCanvas =
            document.getElementById(
                "monthlyChart"
            );

        if (monthlyCanvas) {

            if (monthlyChart) {
                monthlyChart.destroy();
            }

            monthlyChart = new Chart(
                monthlyCanvas,
                {
                    type: "line",

                    data: {

                        labels: months,

                        datasets: [
                            {
                                label:
                                    "Complaints",

                                data:
                                    monthlyCounts,

                                tension: 0.3,

                                fill: false
                            }
                        ]

                    },

                    options: {

                        responsive: true,

                        scales: {

                            y: {

                                beginAtZero: true,

                                ticks: {
                                    precision: 0
                                }

                            }

                        }

                    }

                }
            );

        }


        // ==========================================
        // LOCATION COUNTS
        // ==========================================

        const locations = {};

        complaints.forEach(function (complaint) {

            const location =
                complaint.location ||
                "Unknown";

            locations[location] =
                (locations[location] || 0) + 1;

        });


        const locationLabels =
            Object.keys(locations);

        const locationCounts =
            Object.values(locations);


        // ==========================================
        // LOCATION CHART
        // ==========================================

        if (locationCanvasExists()) {

            if (locationChart) {
                locationChart.destroy();
            }

            locationChart = new Chart(
                document.getElementById(
                    "locationChart"
                ),
                {
                    type: "bar",

                    data: {

                        labels: locationLabels,

                        datasets: [
                            {
                                label:
                                    "Complaints",

                                data:
                                    locationCounts
                            }
                        ]

                    },

                    options: {

                        indexAxis: "y",

                        responsive: true,

                        plugins: {

                            legend: {
                                display: false
                            }

                        },

                        scales: {

                            x: {
                                beginAtZero: true,

                                ticks: {
                                    precision: 0
                                }

                            }

                        }

                    }

                }
            );

        }


        // ==========================================
        // RESOLUTION PERFORMANCE
        // ==========================================

        const resolutionPercentage =
            total > 0
                ? Math.round(
                    (resolved / total) * 100
                )
                : 0;


        // Percentage text

        const progressStrong =
            document.querySelector(
                ".progress-label strong"
            );

        if (progressStrong) {

            progressStrong.textContent =
                resolutionPercentage + "%";

        }


        // Progress bar

        const progressFill =
            document.querySelector(
                ".progress-fill"
            );

        if (progressFill) {

            progressFill.style.width =
                resolutionPercentage + "%";

        }


        // Resolved / total text

        const performanceNumber =
            document.querySelector(
                ".performance-text h2"
            );

        if (performanceNumber) {

            performanceNumber.textContent =
                resolved +
                " / " +
                total;

        }


        // Description

        const performanceDescription =
            document.querySelector(
                ".performance-text p"
            );

        if (performanceDescription) {

            performanceDescription.textContent =
                "complaints have been successfully resolved.";

        }


    }

    catch (error) {

        console.error(
            "Analytics error:",
            error
        );

        alert(
            "Could not load analytics data. " +
            "Make sure Spring Boot is running."
        );

    }

}


// ==========================================
// CHECK LOCATION CANVAS
// ==========================================

function locationCanvasExists() {

    return document.getElementById(
        "locationChart"
    ) !== null;

}


// ==========================================
// START
// ==========================================

loadAnalytics();