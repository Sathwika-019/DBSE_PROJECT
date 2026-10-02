function resetPassword(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const message =
        document.getElementById("message");


    if (email === "") {

        message.style.color = "#dc2626";

        message.innerText =
            "Please enter your email address.";

        return;
    }


    message.style.color = "#15803d";

    message.innerText =
        "Password reset link sent to " + email;
}