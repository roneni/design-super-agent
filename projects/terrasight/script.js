/* ============================================================
   TERRASIGHT — Climate Data Narrative
   script.js
   ============================================================ */

/* ============================================================
   1. HERO TEMPERATURE COUNTER ANIMATION
   Animate from +1.40 to +1.48 over 5 seconds with ease-out
   ============================================================ */

(function initTempCounter() {
  const el = document.getElementById('hero-temp-value');
  if (!el) return;

  const startVal = 1.40;
  const endVal   = 1.48;
  const duration = 5000; // ms
  let startTime  = null;

  // Ease-out cubic: decelerates toward the end
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOut(progress);
    const current  = startVal + (endVal - startVal) * eased;

    el.textContent = '+' + current.toFixed(2);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = '+' + endVal.toFixed(2);
    }
  }

  requestAnimationFrame(tick);
})();


/* ============================================================
   2. CO2 BAR ANIMATION ON SCROLL
   IntersectionObserver — threshold 0.3
   ============================================================ */

(function initCO2Bar() {
  const bar = document.querySelector('.co2-bar-current');
  if (!bar) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Small delay so the bar enter is visible
          setTimeout(function() {
            bar.classList.add('animated');
          }, 150);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(bar.closest('.co2-bar-wrap'));
})();


/* ============================================================
   3. SEA LEVEL STAT BOXES STAGGER FADE-IN
   IntersectionObserver with 100ms stagger between boxes
   ============================================================ */

(function initStatBoxes() {
  const boxes = document.querySelectorAll('.stat-box');
  if (!boxes.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const box   = entry.target;
          const index = parseInt(box.dataset.index, 10) || 0;

          setTimeout(function() {
            box.classList.add('visible');
          }, index * 100);

          observer.unobserve(box);
        }
      });
    },
    { threshold: 0.2 }
  );

  boxes.forEach(function(box, i) {
    box.dataset.index = i;
    observer.observe(box);
  });
})();


/* ============================================================
   4. NAVIGATION BACKGROUND ON SCROLL
   requestAnimationFrame-throttled scroll listener
   ============================================================ */

(function initNav() {
  const nav      = document.querySelector('.nav');
  if (!nav) return;

  let ticking    = false;
  let lastScroll = 0;

  function updateNav() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    lastScroll = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load in case page is already scrolled
  updateNav();
})();
