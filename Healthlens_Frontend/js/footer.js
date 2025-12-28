document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("partials/footer.html");
    const footerHTML = await res.text();

    document.getElementById("footer-container").innerHTML = footerHTML;
  } catch (err) {
    console.error("Footer load failed", err);
  }
});
