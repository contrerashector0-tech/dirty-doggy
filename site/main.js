const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const header = document.querySelector('.site-header');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.background = window.scrollY > 36
    ? 'rgba(12, 11, 9, .94)'
    : 'rgba(12, 11, 9, .78)';
}, { passive: true });

const tabBtns = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.menu-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const tab = btn.dataset.tab;
    cards.forEach(card => {
      const show = tab === 'all' || card.dataset.category === tab;
      card.classList.toggle('hidden', !show);
    });
  });
});

const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

if (form && success) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      const firstInvalid = form.querySelector('input:invalid, textarea:invalid');
      firstInvalid?.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
    }, 700);
  });
}

const revealTargets = document.querySelectorAll('.menu-card, .event-card, .accent-panel, .info-panel, .contact-copy, .contact-form');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = `opacity .55s ease ${index * 0.05}s, transform .55s ease ${index * 0.05}s`;
    observer.observe(el);
  });
}
