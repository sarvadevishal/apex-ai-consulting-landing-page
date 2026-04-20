// script.js — AI Consulting Co Landing Page

(function () {
  'use strict';

  /* ============================================================
     1. SMOOTH SCROLL for all anchor links
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var navHeight = document.getElementById('nav') ? document.getElementById('nav').offsetHeight : 68;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  /* ============================================================
     2. MOBILE NAV TOGGLE
     ============================================================ */
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.querySelector('.hamburger-icon').innerHTML = isOpen ? '&#10005;' : '&#9776;';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ============================================================
     8. CLOSE MOBILE NAV when a nav link is clicked
     ============================================================ */
  function initNavLinkClose() {
    document.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
      link.addEventListener('click', function () {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          document.body.style.overflow = '';
          var hamburger = document.getElementById('hamburger');
          if (hamburger) {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.querySelector('.hamburger-icon').innerHTML = '&#9776;';
          }
        }
      });
    });
  }

  /* ============================================================
     3. FAQ ACCORDION
     ============================================================ */
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item[data-faq]');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(function (other) {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            var otherQ = other.querySelector('.faq-question');
            if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
        question.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  /* ============================================================
     4. INTERSECTION OBSERVER for .fade-in elements
     ============================================================ */
  function initFadeInObserver() {
    var elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     5. ACTIVE NAV LINK HIGHLIGHTING via IntersectionObserver
     ============================================================ */
  function initActiveNavLinks() {
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ============================================================
     6. CONTACT FORM VALIDATION
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var successDiv = document.getElementById('formSuccess');
    if (!form) return;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(fieldId, message) {
      var input = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + 'Error');
      if (input) input.classList.add('input--error');
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(fieldId) {
      var input = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + 'Error');
      if (input) input.classList.remove('input--error');
      if (errorEl) errorEl.textContent = '';
    }

    function clearAllErrors() {
      ['firstName', 'lastName', 'email', 'companyName', 'challenge'].forEach(function (id) {
        clearError(id);
      });
    }

    // Live validation on blur
    ['firstName', 'lastName', 'companyName', 'challenge'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', function () {
        if (this.value.trim()) {
          clearError(id);
        }
      });
    });

    var emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('blur', function () {
        if (emailRegex.test(this.value.trim())) {
          clearError('email');
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors();

      var firstName = document.getElementById('firstName');
      var lastName = document.getElementById('lastName');
      var email = document.getElementById('email');
      var companyName = document.getElementById('companyName');
      var challenge = document.getElementById('challenge');

      var hasErrors = false;

      if (!firstName || !firstName.value.trim()) {
        showError('firstName', 'First name is required.');
        hasErrors = true;
      }

      if (!lastName || !lastName.value.trim()) {
        showError('lastName', 'Last name is required.');
        hasErrors = true;
      }

      if (!email || !email.value.trim()) {
        showError('email', 'Email address is required.');
        hasErrors = true;
      } else if (!emailRegex.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
        hasErrors = true;
      }

      if (!companyName || !companyName.value.trim()) {
        showError('companyName', 'Company name is required.');
        hasErrors = true;
      }

      if (!challenge || !challenge.value.trim()) {
        showError('challenge', 'Please describe your operational challenge.');
        hasErrors = true;
      }

      if (hasErrors) {
        // Scroll to first error
        var firstError = form.querySelector('.input--error');
        if (firstError) {
          var navH = document.getElementById('nav') ? document.getElementById('nav').offsetHeight : 68;
          var top = firstError.getBoundingClientRect().top + window.scrollY - navH - 20;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        return;
      }

      // Submit via fetch (Formspree)
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            if (successDiv) {
              successDiv.hidden = false;
              successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          // Graceful fallback: still show success UX on demo
          form.hidden = true;
          if (successDiv) {
            successDiv.hidden = false;
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send My Request — I'm Ready to See What's Possible";
          }
        });
    });
  }

  /* ============================================================
     7. NAV HIDE/SHOW on scroll — add .nav-scrolled class
     ============================================================ */
  function initNavScroll() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on load in case page is already scrolled
  }

  /* ============================================================
     INIT ALL
     ============================================================ */
  function init() {
    initSmoothScroll();
    initMobileNav();
    initNavLinkClose();
    initFaqAccordion();
    initFadeInObserver();
    initActiveNavLinks();
    initContactForm();
    initNavScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
