// Floating icons follow cursor
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.floating-icon').forEach(icon => {
    const speed = 0.05;
    icon.style.transform = `translate(${e.clientX * speed}px, ${e.clientY * speed}px)`;
  });
});

// Button ripple
document.querySelectorAll('.btn-hover').forEach(btn => {
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

// Emoji selection
let selectedEmoji = '';
document.querySelectorAll('.emoji').forEach(emoji => {
  emoji.addEventListener('click', () => {
    selectedEmoji = emoji.dataset.emoji;
    document.querySelectorAll('.emoji').forEach(e => e.classList.remove('scale-125'));
    emoji.classList.add('scale-125');
  });
});

// Form submit
document.getElementById('feedbackForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('successMsg').style.display = 'block';
  launchConfetti();
  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'none';
  }, 4000);
});

// Confetti
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 150 + 50,
      color: `hsl(${Math.random() * 360},100%,50%)`,
      tilt: Math.random() * 10 - 10
    });
  }

  let angle = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x + c.tilt + c.r, c.y + c.tilt + c.r);
      ctx.stroke();
      c.y += Math.cos(angle + c.d) + 1 + c.r / 2;
      c.x += Math.sin(angle);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
    angle += 0.01;
    requestAnimationFrame(draw);
  }
  draw();
}

// Fade-in on scroll
const faders = document.querySelectorAll('.fadeIn');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

faders.forEach(f => observer.observe(f));
