document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("partials/navbar.html");
    const navbarHTML = await res.text();

    document.getElementById("navbar-container").innerHTML = navbarHTML;
  } catch (err) {
    console.error("Navbar load failed", err);
  }
});
