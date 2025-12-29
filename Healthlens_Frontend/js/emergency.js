// emergency.js

// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
  speed: 400,
  scale: 1.05
});

// Ripple effect
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', e => {
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();

    circle.className = 'ripple';
    circle.style.left = `${e.clientX - rect.left - 50}px`;
    circle.style.top = `${e.clientY - rect.top - 50}px`;

    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
