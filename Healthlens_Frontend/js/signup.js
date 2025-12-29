document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const username = form.elements["username"].value.trim();
  const email = form.elements["email"].value.trim();
  const password = form.elements["password"].value.trim();
  const confirmPassword = form.elements["confirm_password"].value.trim();

  console.log("FRONTEND VALUES 👉", { username, email, password });

  if (!username || !email || !password || !confirmPassword) {
    alert("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://healthlens-backend-clru.onrender.com";

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Signup successful ✅");
    window.location.href = "login.html";

  } catch (err) {
    console.error("Signup error:", err);
    alert("Server error");
  }
});
