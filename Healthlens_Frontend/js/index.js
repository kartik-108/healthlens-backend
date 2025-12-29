// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
  speed: 400,
  scale: 1.05
});

// Counter animation
function animateCounter(id, target) {
  let count = 0;
  const el = document.getElementById(id);
  const interval = setInterval(() => {
    count += Math.ceil(target / 100);
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count;
  }, 20);
}

let countersStarted = false;
window.addEventListener("scroll", () => {
  const about = document.getElementById("about");
  if (!countersStarted && window.scrollY + window.innerHeight > about.offsetTop + 100) {
    countersStarted = true;
    animateCounter("patientsCounter", 1250);
    animateCounter("doctorsCounter", 35);
  }
});

// Ripple effect
document.querySelectorAll(".ripple").forEach(btn => {
  btn.addEventListener("click", e => {
    const circle = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    circle.className = "ripple";
    circle.style.left = `${e.clientX - rect.left - 50}px`;
    circle.style.top = `${e.clientY - rect.top - 50}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
