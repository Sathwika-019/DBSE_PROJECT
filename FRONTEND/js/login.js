window.loginUser = async function() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const user = await response.json();

            console.log("Logged in user:", user);

            // Store logged-in user for the frontend
            localStorage.setItem("currentUser", JSON.stringify(user));

            alert("Login successful!");

            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password.");
        }

    } catch (error) {
        console.error("Login error:", error);

        alert("Cannot connect to the backend. Make sure Spring Boot is running.");
    }
};