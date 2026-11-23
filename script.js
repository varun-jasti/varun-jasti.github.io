const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function preferredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
}

applyTheme(preferredTheme());

themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', nextTheme);
  applyTheme(nextTheme);
});

function setMenu(open) {
  hamburger.classList.toggle('active', open);
  navMenu.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', `${open ? 'Close' : 'Open'} navigation menu`);
  document.body.classList.toggle('menu-open', open);
}

hamburger.addEventListener('click', () => {
  setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('click', (event) => {
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    setMenu(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
    hamburger.focus();
  }
});

const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.appendChild(progressBar);

function updatePageState() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;

  let activeSection = sections[0]?.id;
  sections.forEach((section) => {
    if (scrollTop >= section.offsetTop - 140) activeSection = section.id;
  });

  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${activeSection}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updatePageState();
    ticking = false;
  });
}, { passive: true });

if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.project-card, .timeline-item, .skill-category, .education-item')
    .forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
}

updatePageState();
