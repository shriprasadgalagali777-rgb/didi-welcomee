const slides = [...document.querySelectorAll('.slide')];
const backButton = document.getElementById('back');
const continueButton = document.getElementById('continue');
const progress = document.getElementById('progress');
let current = 0;
let touchStartX = null;
let touchStartY = null;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Go to picture ${index + 1}`);
  dot.addEventListener('click', () => show(index));
  progress.append(dot);
});

function show(next) {
  if (next < 0 || next >= slides.length || next === current) return;
  const previous = slides[current];
  const incoming = slides[next];
  const movingBack = next < current;
  slides.forEach(slide => slide.classList.remove('enter-from-left', 'exit-to-left', 'exit-to-right'));
  if (movingBack) incoming.classList.add('enter-from-left');
  previous.classList.add(movingBack ? 'exit-to-right' : 'exit-to-left');
  previous.classList.remove('is-active');
  previous.setAttribute('aria-hidden', 'true');
  incoming.scrollTop = 0;
  incoming.classList.add('is-active');
  incoming.setAttribute('aria-hidden', 'false');
  current = next;
  updateControls();
  window.setTimeout(() => previous.classList.remove('exit-to-left', 'exit-to-right'), 500);
}

function updateControls() {
  backButton.disabled = current === 0;
  continueButton.textContent = current === slides.length - 1 ? 'Start again ↻' : 'Continue →';
  continueButton.setAttribute('aria-label', current === slides.length - 1 ? 'Start again' : 'Continue to next picture');
  progress.setAttribute('aria-label', `Picture ${current + 1} of ${slides.length}`);
  [...progress.children].forEach((dot, index) => {
    dot.classList.toggle('is-current', index === current);
    if (index === current) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
}

backButton.addEventListener('click', () => show(current - 1));
continueButton.addEventListener('click', () => show(current === slides.length - 1 ? 0 : current + 1));
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); show(current + 1); }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); show(current - 1); }
});
document.getElementById('stage').addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });
document.getElementById('stage').addEventListener('touchend', event => {
  if (touchStartX === null) return;
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) show(current + (dx < 0 ? 1 : -1));
  touchStartX = touchStartY = null;
}, { passive: true });
updateControls();
