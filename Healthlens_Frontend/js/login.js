document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const email = form.elements["email"].value.trim();
  const password = form.elements["password"].value.trim();

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://healthlens-backend-clru.onrender.com";

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // 🔥 SAVE JWT TOKEN
    localStorage.setItem("token", data.token);

    alert("Login successful ✅");
    window.location.href = "profile.html";

  } catch (err) {
    console.error("Login error:", err);
    alert("Server error");
  }
});
