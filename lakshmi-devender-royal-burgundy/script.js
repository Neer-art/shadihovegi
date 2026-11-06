const intro = document.getElementById('intro');
const invitation = document.getElementById('invitation');
document.getElementById('viewInvitation').addEventListener('click', () => {
  intro.classList.add('hide');
  invitation.classList.add('show');
  invitation.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('intro-active');
  window.setTimeout(() => { intro.style.display = 'none'; }, 1050);
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
