// ── Theme ──────────────────────────────────────────────────────────────
// Three modes: 'auto' (follow OS), 'light', 'dark'
// 'auto' is stored as a missing localStorage key so the OS listener
// can check for it with a simple !localStorage.getItem('theme')

const html       = document.documentElement;
const toggleBtn  = document.getElementById('themeToggle');
const toggleIcon = toggleBtn.querySelector('.theme-toggle-icon');
const toggleLabel = toggleBtn.querySelector('.theme-toggle-label');
const osQuery    = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(mode) {
    // Work out what to actually render
    const effective = mode === 'auto'
        ? (osQuery.matches ? 'dark' : 'light')
        : mode;

    if (effective === 'light') {
        html.setAttribute('data-theme', 'light');
    } else {
        html.removeAttribute('data-theme');
    }

    // Update button label
    if (mode === 'auto') {
        toggleIcon.textContent  = effective === 'light' ? '☀️' : '🌙';
        toggleLabel.textContent = 'Auto';
        toggleBtn.setAttribute('aria-label', 'Theme: Auto — click for Light');
    } else if (mode === 'light') {
        toggleIcon.textContent  = '☀️';
        toggleLabel.textContent = 'Light';
        toggleBtn.setAttribute('aria-label', 'Theme: Light — click for Dark');
    } else {
        toggleIcon.textContent  = '🌙';
        toggleLabel.textContent = 'Dark';
        toggleBtn.setAttribute('aria-label', 'Theme: Dark — click for Auto');
    }
}

// Initialise: saved preference → auto
const saved = localStorage.getItem('theme');
applyTheme(saved ?? 'auto');

// Cycle: auto → light → dark → auto
const cycle = { auto: 'light', light: 'dark', dark: 'auto' };
toggleBtn.addEventListener('click', () => {
    const current = localStorage.getItem('theme') ?? 'auto';
    const next    = cycle[current];
    if (next === 'auto') {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', next);
    }
    applyTheme(next);
});

// Follow OS changes in real time when in auto mode
osQuery.addEventListener('change', () => {
    if (!localStorage.getItem('theme')) applyTheme('auto');
});

// ── Hamburger menu ────────────────────────────────────────────────────

const navHeader = document.querySelector('.nav-header');
const hamburger = document.getElementById('navHamburger');
const navMenu   = document.getElementById('navLinks');

function closeMenu() {
    navHeader.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    const isOpen = navHeader.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close when a nav link is tapped
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close when tapping outside the nav
document.addEventListener('click', e => {
    if (navHeader.classList.contains('nav-open') && !navHeader.contains(e.target)) {
        closeMenu();
    }
});

// ── Active nav link on scroll ──────────────────────────────────────────

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
