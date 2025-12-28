const token = localStorage.getItem("token");

// If not logged in
if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// API base (localhost + render both supported)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://healthlens-backend-clru.onrender.com";

fetch(`${API_BASE_URL}/api/auth/profile`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => {
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  })
  .then(user => {
    document.getElementById("profileData").innerHTML = `
      <p><b>Name:</b> ${user.name || user.username}</p>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Role:</b> ${user.role || "user"}</p>
    `;
  })
  .catch(() => {
    alert("Session expired. Please login again.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
