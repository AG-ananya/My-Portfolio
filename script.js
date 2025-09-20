const pages = Array.from(document.querySelectorAll('.page'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let current = 0;

// initialize z-index
pages.forEach((p, i) => {
  p.style.zIndex = pages.length - i;
  p.classList.remove('flipped');
});

function updatePages() {
  pages.forEach((p, i) => {
    if (i < current) {
      p.classList.add('flipped');
      p.style.zIndex = i;
    } else {
      p.classList.remove('flipped');
      p.style.zIndex = pages.length - i + 100;
    }
  });
  prevBtn.disabled = (current === 0);
  nextBtn.disabled = (current === pages.length - 1);
}

// navigation buttons
nextBtn.addEventListener('click', () => {
  if (current < pages.length - 1) {
    current++;
    updatePages();
    pages[current].querySelector('.page-inner').scrollTo({ top: 0, behavior: 'smooth' });
  }
});
prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    updatePages();
    pages[current].querySelector('.page-inner').scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') {
    if (current < pages.length - 1) { current++; updatePages(); }
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    if (current > 0) { current--; updatePages(); }
  }
});

// initialize
updatePages();

// ------- Typing effect for all headings -------
function typeEffect(el, texts, speed = 120, pause = 900) {
  let ti = 0, ci = 0, forward = true, displayed = '';
  function tick() {
    const currentText = texts[ti];
    if (forward) {
      displayed = currentText.substring(0, ci);
      el.textContent = displayed;
      ci++;
      if (ci > currentText.length) {
        forward = false;
        setTimeout(tick, pause);
        return;
      }
    } else {
      // backspace
      ci--;
      displayed = currentText.substring(0, ci);
      el.textContent = displayed;
      if (ci < 0) {
        ti = (ti + 1) % texts.length;
        forward = true;
        ci = 0;
      }
    }
    setTimeout(tick, speed);
  }
  tick();
}

// apply typing effect to all spans with class 'typing'
document.querySelectorAll('.typing').forEach(span => {
  try {
    const arr = JSON.parse(span.getAttribute('data-text'));
    if (Array.isArray(arr) && arr.length) typeEffect(span, arr);
  } catch (err) {
    console.error("Typing data-text parse error:", err);
  }
});
