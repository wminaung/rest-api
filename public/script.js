document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form from submitting normally

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok) {
      // Extract access token and refresh token
      const accessToken = result.accessToken;
      const refreshToken = result.refreshToken;
      const responseBody = result;

      // Store tokens in localStorage (or sessionStorage)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Log the response body and tokens for debugging
      console.log("Response Body:", responseBody);
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      // Redirect user after successful login
      window.location.href = "/users.html"; // Change this to your desired path
    } else {
      // Handle errors
      console.error("Login failed", result.message);
      alert(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Error during login", error);
    alert("Something went wrong. Please try again.");
  }
});
