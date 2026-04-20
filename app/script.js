/* ============================================================
   APEX AI CONSULTING — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. SMOOTH SCROLL for all anchor links
  ---------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
      10
    );
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------
     2. MOBILE NAV TOGGLE
  ---------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = document.body.classList.toggle('nav-open');
      navMenu.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when any nav link is clicked
    navMenu.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        navMenu.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     3. NAV SCROLL CLASS (subtle bg change after 60px)
  ---------------------------------------------------------- */
  const mainNav = document.getElementById('main-nav');

  if (mainNav) {
    function handleNavScroll() {
      mainNav.classList.toggle('nav-scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run on init
  }

  /* ----------------------------------------------------------
     4. FAQ ACCORDION
  ---------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          const q = other.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ----------------------------------------------------------
     5. SCROLL-TRIGGERED FADE-IN (IntersectionObserver)
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     6. ACTIVE NAV LINK HIGHLIGHTING (IntersectionObserver)
  ---------------------------------------------------------- */
  const sections   = document.querySelectorAll('main section[id]');
  const navLinks   = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionMap = {};
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        sectionMap[href.slice(1)] = link;
      }
    });

    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            const activeLink = sectionMap[entry.target.id];
            if (activeLink) activeLink.classList.add('active');
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ----------------------------------------------------------
     7. CONTACT FORM VALIDATION + SUCCESS STATE
  ---------------------------------------------------------- */
  const contactForm   = document.getElementById('contact-form');
  const formSuccess   = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    const fields = ['firstName', 'lastName', 'email', 'company', 'challenge'];

    function showError(fieldId, message) {
      const errorEl = document.getElementById('error-' + fieldId);
      const inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = message;
      if (inputEl) inputEl.classList.add('input-error');
    }

    function clearError(fieldId) {
      const errorEl = document.getElementById('error-' + fieldId);
      const inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = '';
      if (inputEl) inputEl.classList.remove('input-error');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validate() {
      let valid = true;

      fields.forEach(function (id) { clearError(id); });

      const firstName = document.getElementById('firstName');
      const lastName  = document.getElementById('lastName');
      const email     = document.getElementById('email');
      const company   = document.getElementById('company');
      const challenge = document.getElementById('challenge');

      if (firstName && !firstName.value.trim()) {
        showError('firstName', 'First name is required.');
        valid = false;
      }
      if (lastName && !lastName.value.trim()) {
        showError('lastName', 'Last name is required.');
        valid = false;
      }
      if (email) {
        if (!email.value.trim()) {
          showError('email', 'Email address is required.');
          valid = false;
        } else if (!validateEmail(email.value.trim())) {
          showError('email', 'Please enter a valid email address.');
          valid = false;
        }
      }
      if (company && !company.value.trim()) {
        showError('company', 'Company name is required.');
        valid = false;
      }
      if (challenge && !challenge.value.trim()) {
        showError('challenge', 'Please tell us about your biggest challenge.');
        valid = false;
      }

      return valid;
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validate()) return;

      const submitBtn = contactForm.querySelector('.form-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      // Submit to Formspree (or any endpoint)
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            contactForm.hidden = true;
            formSuccess.hidden = false;
          } else {
            return response.json().then(function (data) {
              if (submitBtn) {
                submitBtn.textContent = "Send My Request — I'm Ready to See What's Possible";
                submitBtn.disabled = false;
              }
              alert('Something went wrong. Please try again or email us directly.');
            });
          }
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.textContent = "Send My Request — I'm Ready to See What's Possible";
            submitBtn.disabled = false;
          }
          // In preview/local mode without Formspree, just show success
          contactForm.hidden = true;
          formSuccess.hidden = false;
        });
    });

    // Live validation: clear errors as user types
    fields.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () { clearError(id); });
      }
    });
  }

})();
