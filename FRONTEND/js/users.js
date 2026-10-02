/* =========================
   Search and Filter Users
========================= */

function filterUsers() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const role =
        document.getElementById("roleFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const rows =
        document.querySelectorAll("#userTable tr");

    rows.forEach(function(row) {

        const text = row.innerText.toLowerCase();

        const rowRole =
            row.querySelector(".role").innerText;

        const rowStatus =
            row.querySelector(".status").innerText;

        const matchesSearch =
            text.includes(search);

        const matchesRole =
            role === "All" || rowRole === role;

        const matchesStatus =
            status === "All" || rowStatus === status;

        if (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}


/* =========================
   Activate / Deactivate
========================= */

function toggleUser(button) {

    const row = button.closest("tr");

    const status =
        row.querySelector(".status");

    if (status.innerText === "Active") {

        status.innerText = "Inactive";

        status.classList.remove("active");
        status.classList.add("inactive");

        button.innerText = "Activate";

    } else {

        status.innerText = "Active";

        status.classList.remove("inactive");
        status.classList.add("active");

        button.innerText = "Deactivate";
    }
}


/* =========================
   Add User
========================= */

function addUser() {

    alert(
        "Add User form will be connected to the backend later."
    );
}