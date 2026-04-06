const THEME_STORAGE_KEY = 'site-theme';

function getStoredTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

function updateThemeToggleLabel(button, theme) {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const nextThemeLabel = nextTheme === 'light' ? 'Light' : 'Dark';
  button.textContent = nextThemeLabel;
  button.setAttribute('aria-label', `Switch site theme to ${nextTheme}. Current mode: ${theme}.`);
  button.setAttribute('title', `Switch to ${nextTheme}`);
}

function createThemeToggle() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';

  const initialTheme = getStoredTheme();
  applyTheme(initialTheme);
  updateThemeToggleLabel(button, initialTheme);

  button.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateThemeToggleLabel(button, nextTheme);
  });

  document.body.appendChild(button);
}

function setupNavbarShadow() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    return;
  }

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0, 0, 0, 0.4)'
      : 'none';
  });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(
    '.project-card, .social-card, .about-grid, .hero-text, .projects-page-title, .project, .social, .bio-text, .skills-section, .images, .chart-card, .hero-panel, .stat'
  );

  if (!revealElements.length || !('IntersectionObserver' in window)) {
    return;
  }

  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

function setupActiveSectionLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href^="index.html#"]');

  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) {
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          const isActive = href === `#${id}` || href === `index.html#${id}`;
          link.classList.toggle('nav-active', isActive);
        });
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function setupPageFadeIn() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getStoredTheme());
  createThemeToggle();
  setupNavbarShadow();
  setupRevealAnimations();
  setupActiveSectionLinks();
  setupPageFadeIn();
});
