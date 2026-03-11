/* ============================================================
   STARLOOM — main.js
   Cursor, star field, particles, scroll reveal
   ============================================================ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .game-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '52px';
    ring.style.height   = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});

// ── STAR FIELD ──
// Only runs if #starField exists on the page
const starField = document.getElementById('starField');
if (starField) {
  for (let i = 0; i < 120; i++) {
    const s    = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 0.5;
    const minO = (Math.random() * 0.2 + 0.05).toFixed(2);
    const maxO = (parseFloat(minO) + Math.random() * 0.5 + 0.1).toFixed(2);
    s.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `--min:${minO}`,
      `--max:${maxO}`,
      `--d:${(Math.random() * 4 + 2).toFixed(1)}s`,
      `animation-delay:${(Math.random() * 5).toFixed(1)}s`
    ].join(';');
    starField.appendChild(s);
  }
}

// ── PARTICLES (game cards) ──
function addParticles(id, color) {
  const container = document.getElementById(id);
  if (!container) return;
  for (let i = 0; i < 8; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 3 + 1;
    p.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `background:${color}`,
      `--pd:${(Math.random() * 5 + 4).toFixed(1)}s`,
      `--po:${(Math.random() * 0.4 + 0.1).toFixed(2)}`,
      `--px:${(Math.random() * 30 - 15).toFixed(0)}px`,
      `--py:${(Math.random() * 30 - 15).toFixed(0)}px`,
      `animation-delay:${(Math.random() * 4).toFixed(1)}s`
    ].join(';');
    container.appendChild(p);
  }
}

addParticles('maParticles', 'rgba(220,80,60,0.7)');
addParticles('wrParticles', 'rgba(80,180,220,0.7)');

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));