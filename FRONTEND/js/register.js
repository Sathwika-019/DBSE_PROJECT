window.registerUser = async function() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Check empty fields
    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill all the fields.");
        return;
    }

    // Check password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check terms
    if (!terms) {
        alert("Please accept the terms and conditions.");
        return;
    }

    // Send registration data to Spring Boot backend
    try {
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: "USER"
            })
        });

        if (response.ok) {
            const user = await response.json();

            console.log("Registered user:", user);

            alert("Account created successfully! Please login.");

            window.location.href = "index.html";
        } else {
            const error = await response.text();

            console.error("Registration failed:", error);

            alert("Registration failed. Please try again.");
        }

    } catch (error) {
        console.error("Backend connection error:", error);

        alert("Cannot connect to the backend. Make sure Spring Boot is running.");
    }
};