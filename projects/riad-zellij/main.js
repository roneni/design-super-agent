/* ─────────────────────────────────────────────
   Riad Zellij — Scroll Reveal & Interactions
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  // Respect prefers-reduced-motion — skip JS animations entirely
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Ensure all reveal elements are visible without animation
    document.querySelectorAll('.js-reveal, .js-reveal-block').forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  // ─── IntersectionObserver for scroll-triggered reveals ───
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  // Observe all card elements (staggered via CSS nth-child delay)
  document.querySelectorAll('.js-reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // Observe arrival section block
  document.querySelectorAll('.js-reveal-block').forEach(function (el) {
    revealObserver.observe(el);
  });

})();
