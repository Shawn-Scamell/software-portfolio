// ── Theme ──────────────────────────────────────────────────────────────

const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const toggleIcon = toggleBtn.querySelector('.theme-toggle-icon');
const toggleLabel = toggleBtn.querySelector('.theme-toggle-label');

function applyTheme(theme) {
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
        toggleIcon.textContent = '☀️';
        toggleLabel.textContent = 'Light';
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
        html.removeAttribute('data-theme');
        toggleIcon.textContent = '🌙';
        toggleLabel.textContent = 'Dark';
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
}

// Initialise: saved preference → system preference → dark default
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved ?? (prefersDark ? 'dark' : 'light'));

toggleBtn.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
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
