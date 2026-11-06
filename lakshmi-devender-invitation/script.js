const intro = document.getElementById('introScreen');
const content = document.getElementById('siteContent');
const openButton = document.getElementById('openInvite');
const music = document.getElementById('weddingMusic');
const soundToggle = document.getElementById('soundToggle');

function openInvitation() {
  intro.classList.add('closed');
  content.classList.add('visible');
  content.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('locked');
  // Music is optional; browsers may block playback until a user gesture.
  music.play().then(() => { soundToggle.innerHTML = '♫ <span>Music on</span>'; }).catch(() => {});
  setTimeout(() => intro.remove(), 1100);
}
openButton.addEventListener('click', openInvitation);
soundToggle.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); soundToggle.innerHTML = '♫ <span>Music on</span>'; }
    catch { soundToggle.innerHTML = '♫ <span>Add music.mp3</span>'; }
  } else {
    music.pause(); soundToggle.innerHTML = '♫ <span>Music off</span>';
  }
});

// Countdown begins with the first celebration on 12 December 2026, 7:00 PM IST.
const targetDate = new Date('2026-12-12T19:00:00+05:30').getTime();
function updateCountdown() {
  const distance = targetDate - Date.now();
  if (distance <= 0) {
    document.getElementById('countdown').innerHTML = '<p class="countdown-date">The celebrations have begun! ❤️</p>';
    return;
  }
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => document.getElementById(id).textContent = String(value).padStart(2, '0'));
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
