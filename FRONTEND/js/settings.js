/* =========================
   Save Profile
========================= */

function saveProfile() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("profileMessage");


    if (
        name === "" ||
        email === "" ||
        phone === ""
    ) {

        message.style.color = "#dc2626";

        message.innerText =
            "Please fill all profile fields.";

        return;
    }


    message.style.color = "#15803d";

    message.innerText =
        "Profile updated successfully!";

}


/* =========================
   Change Password
========================= */

function changePassword() {

    const currentPassword =
        document.getElementById(
            "currentPassword"
        ).value;

    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;

    const message =
        document.getElementById(
            "passwordMessage"
        );


    if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ) {

        message.style.color = "#dc2626";

        message.innerText =
            "Please fill all password fields.";

        return;
    }


    if (
        newPassword !==
        confirmPassword
    ) {

        message.style.color = "#dc2626";

        message.innerText =
            "New passwords do not match.";

        return;
    }


    if (
        newPassword.length < 6
    ) {

        message.style.color = "#dc2626";

        message.innerText =
            "Password must contain at least 6 characters.";

        return;
    }


    message.style.color = "#15803d";

    message.innerText =
        "Password changed successfully!";

}


/* =========================
   Notification Settings
========================= */

function saveNotifications() {

    const emailNotifications =
        document.getElementById(
            "emailNotification"
        ).checked;

    const complaintNotifications =
        document.getElementById(
            "complaintNotification"
        ).checked;

    const newComplaintNotifications =
        document.getElementById(
            "newComplaintNotification"
        ).checked;


    // Save settings in browser

    localStorage.setItem(
        "emailNotification",
        emailNotifications
    );

    localStorage.setItem(
        "complaintNotification",
        complaintNotifications
    );

    localStorage.setItem(
        "newComplaintNotification",
        newComplaintNotifications
    );


    const message =
        document.getElementById(
            "notificationMessage"
        );

    message.style.color = "#15803d";

    message.innerText =
        "Notification settings saved successfully!";

}


/* =========================
   Load Notification Settings
========================= */

function loadNotificationSettings() {

    const email =
        localStorage.getItem(
            "emailNotification"
        );

    const complaints =
        localStorage.getItem(
            "complaintNotification"
        );

    const newComplaints =
        localStorage.getItem(
            "newComplaintNotification"
        );


    if (email !== null) {

        document.getElementById(
            "emailNotification"
        ).checked =
            email === "true";

    }


    if (complaints !== null) {

        document.getElementById(
            "complaintNotification"
        ).checked =
            complaints === "true";

    }


    if (newComplaints !== null) {

        document.getElementById(
            "newComplaintNotification"
        ).checked =
            newComplaints === "true";

    }

}


/* =========================
   Start Settings
========================= */

loadNotificationSettings();