/* ============================================================
   STARLOOM — main.js
   Cursor, star field, particles, scroll reveal
   ============================================================ */

// ── GLOBALS ──
const starField = document.getElementById('starField');

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

// ── SCROLL PARALLAX ──
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (starField) {
        const layers = starField.querySelectorAll('.star-layer');
        if (layers.length === 3) {
          // Positive translateY counteracts the scrolling up, making layers move slower
          layers[0].style.transform = `translateY(${lastScrollY * 0.6}px)`; // background (slowest)
          layers[1].style.transform = `translateY(${lastScrollY * 0.4}px)`; // middle (medium)
          layers[2].style.transform = `translateY(${lastScrollY * 0.15}px)`;// foreground (fastest)
        }
      }
      ticking = false;
    });
    ticking = true;
  }
});

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
if (starField) {
  // Create 3 layers for parallax
  const bgLayer = document.createElement('div');
  const midLayer = document.createElement('div');
  const fgLayer = document.createElement('div');
  
  bgLayer.className = 'star-layer';
  midLayer.className = 'star-layer';
  fgLayer.className = 'star-layer';
  
  starField.appendChild(bgLayer);
  starField.appendChild(midLayer);
  starField.appendChild(fgLayer);

  for (let i = 0; i < 150; i++) {
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
    
    // Distribute stars among layers
    if (i < 70) bgLayer.appendChild(s);
    else if (i < 120) midLayer.appendChild(s);
    else fgLayer.appendChild(s);
  }

  // Add shooting stars
  for (let j = 0; j < 8; j++) {
    const ss = document.createElement('div');
    ss.className = 'shooting-star';
    ss.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * -20}%`,
      `--sd:${(Math.random() * 10 + 5).toFixed(1)}s`,
      `animation-delay:${(Math.random() * 15).toFixed(1)}s`
    ].join(';');
    midLayer.appendChild(ss);
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

// ── WORLD REBOOT — DATA FRAGMENTS ──
const fragmentContainer = document.getElementById('dataFragments');
if (fragmentContainer) {
  const fragments = ['01001','11010','ERR_','0xFF','NULL','???','1/0','VOID','0b1101','NaN','404','LOST','>_','EDEN','ARC','//','REBOOT'];
  fragments.forEach(text => {
    const el = document.createElement('div');
    el.className = 'data-fragment';
    el.textContent = text;
    el.style.cssText = [
      `left:${Math.random()*90+5}%`,
      `top:${Math.random()*80+10}%`,
      `--fd:${(Math.random()*6+4).toFixed(1)}s`,
      `--fo:${(Math.random()*0.3+0.1).toFixed(2)}`,
      `--fx:${(Math.random()*40-20).toFixed(0)}px`,
      `--fy:${(Math.random()*40-20).toFixed(0)}px`,
      `animation-delay:${(Math.random()*5).toFixed(1)}s`
    ].join(';');
    fragmentContainer.appendChild(el);
  });
}
 
// ── WORLD REBOOT — STAGE ACCORDION ──
function toggleStage(btn) {
  const block = btn.closest('.stage-block');
  const isActive = block.classList.contains('active');
  document.querySelectorAll('.stage-block').forEach(b => b.classList.remove('active'));
  if (!isActive) block.classList.add('active');
}

// ── MARTIAL ASCENSION ──
    // ── Falling Embers ──
    const emberContainer = document.getElementById('embers');
    for (let i = 0; i < 22; i++) {
      const e = document.createElement('div');
      e.className = 'ember';
      e.style.cssText = [
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 40}%`,
        `--ed:${(Math.random() * 6 + 4).toFixed(1)}s`,
        `--ex:${(Math.random() * 80 - 40).toFixed(0)}px`,
        `animation-delay:${(Math.random() * 8).toFixed(1)}s`
      ].join(';');
      emberContainer.appendChild(e);
    }

    // ── Character Tabs ──
    document.querySelectorAll('.char-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const char = tab.dataset.char;
        document.querySelectorAll('.char-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.char-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + char).classList.add('active');
      });
    });

    // ── Move Accordions ──
    document.querySelectorAll('.move-group-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.parentElement;
        const isOpen = group.classList.contains('open');
        btn.closest('.moves-accordion').querySelectorAll('.move-group').forEach(g => g.classList.remove('open'));
        if (!isOpen) group.classList.add('open');
      });
    });