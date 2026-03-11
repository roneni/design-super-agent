import './style.css';

/* ═══════════════════════════════════════════════════
   SUFI COSMOS — Main JavaScript
   Language toggle, scroll behavior, animations
   ═══════════════════════════════════════════════════ */

/* ─── Language Toggle ─────────────────────────────── */

function setLanguage(lang) {
  const html = document.documentElement;

  if (lang === 'ar') {
    html.dir = 'rtl';
    html.lang = 'ar';
  } else {
    html.dir = 'ltr';
    html.lang = 'en';
  }

  // Show/hide bilingual content
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = el.dataset.lang === lang ? '' : 'none';
  });

  // Update toggle button label (shows the OTHER language as the option)
  const langEn = document.querySelector('.lang-en');
  const langAr = document.querySelector('.lang-ar');
  if (langEn && langAr) {
    langEn.style.display = lang === 'en' ? '' : 'none';
    langAr.style.display = lang === 'ar' ? '' : 'none';
  }

  // Update page title
  document.title = lang === 'ar'
    ? 'الكون الصوفي — خلوة روحية في الصحراء'
    : 'Sufi Cosmos — 7-Day Sahara Desert Retreat';

  // Persist choice
  try {
    localStorage.setItem('sufi-cosmos-lang', lang);
  } catch (e) {
    // localStorage not available (private browsing, etc.)
  }
}

// Initialize language from localStorage or default to English
let currentLang = 'en';
try {
  currentLang = localStorage.getItem('sufi-cosmos-lang') || 'en';
} catch (e) {
  // ignore
}
setLanguage(currentLang);

// Wire up language toggle button
const langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const newLang = html.lang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  });
}

/* ─── Navigation: Scroll State ───────────────────── */

const nav = document.getElementById('main-nav');

function updateNavScroll() {
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavScroll, { passive: true });
updateNavScroll(); // run on load

/* ─── Mobile Hamburger Menu ──────────────────────── */

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
}

/* ─── Scroll Reveal (IntersectionObserver) ────────── */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing to save resources
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -48px 0px',
  }
);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ─── Smooth scroll for nav links ───────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }
  });
});

/* ─── Respect prefers-reduced-motion ─────────────── */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyReducedMotion(reduced) {
  document.documentElement.classList.toggle('reduced-motion', reduced);
}

applyReducedMotion(prefersReducedMotion.matches);
prefersReducedMotion.addEventListener('change', (e) => {
  applyReducedMotion(e.matches);
});
