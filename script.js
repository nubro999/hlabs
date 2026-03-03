/* ============================================
   HELIOS LABS — UI Scripts
   Navigation, Scroll Reveals, Smooth Scroll
   ============================================ */

(function () {
  'use strict';

  // ── Navigation ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkElements = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section tracking
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinkElements.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu on link click
  navLinkElements.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll('[data-reveal]');
          let siblingIndex = 0;
          siblings.forEach((el, i) => {
            if (el === entry.target) siblingIndex = i;
          });

          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, siblingIndex * 100);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
})();

// ── Showcase Carousel ──
function slideCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const track = carousel.querySelector('.showcase-track');
  const slides = track.querySelectorAll('.showcase-slide');
  const total = slides.length;

  let currentIdx = parseInt(carousel.dataset.index || '0', 10);
  currentIdx += direction;

  if (currentIdx < 0) currentIdx = total - 1;
  if (currentIdx >= total) currentIdx = 0;

  carousel.dataset.index = currentIdx;
  track.style.transform = `translateX(-${currentIdx * 100}%)`;

  slides.forEach((s, i) => {
    s.classList.toggle('active', i === currentIdx);
  });
}
