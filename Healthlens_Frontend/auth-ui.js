document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const loginBtn = document.getElementById("nav-login");
  const signupBtn = document.getElementById("nav-signup");
  const profileBtn = document.getElementById("nav-profile");
  const logoutBtn = document.getElementById("nav-logout");

  if (token) {
    // Logged IN
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "flex";
    if (logoutBtn) logoutBtn.style.display = "flex";
  } else {
    // Logged OUT
    if (profileBtn) profileBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
