/* ============================================
   SAVING Industry - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ----- Mobile Menu Toggle -----
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ----- Smooth Scroll for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ----- Lazy Image Loading (fallback for older browsers) -----
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback: IntersectionObserver
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImgs.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            io.unobserve(img);
          }
        });
      });
      lazyImgs.forEach(img => io.observe(img));
    }
  }

  // ----- Scroll Animations -----
  const animElements = document.querySelectorAll('.fade-up');
  if (animElements.length && 'IntersectionObserver' in window) {
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    animElements.forEach(el => animObserver.observe(el));
  } else {
    animElements.forEach(el => el.classList.add('visible'));
  }

  // ----- Product Filter (Products Page) -----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-cat]');
  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        productCards.forEach(card => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = '';
            setTimeout(() => card.classList.add('visible'), 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ----- Contact Form Submission -----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple honeypot anti-spam
      const honeypot = contactForm.querySelector('[name="website"]');
      if (honeypot && honeypot.value) return;

      // Basic validation
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#d32f2f';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate sending (replace with real endpoint later)
      setTimeout(() => {
        const formMsg = document.getElementById('formMessage');
        if (formMsg) {
          formMsg.innerHTML = '<div class="alert alert-success" style="background:#e8f5e9;color:#2d8659;padding:14px;border-radius:6px;margin-top:14px;font-weight:500;">✓ Thank you! Your inquiry has been sent. We will reply within 24 hours.</div>';
        }
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1200);
    });
  }

  // ----- Header background on scroll -----
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      if (scrollY > 50) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ----- Set active nav link based on current page -----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ----- Dynamic year in footer -----
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Quote button (open contact) -----
  document.querySelectorAll('[data-action="quote"]').forEach(btn => {
    btn.addEventListener('click', e => {
      const target = btn.dataset.target || 'contact.html';
      const product = btn.dataset.product || '';
      if (target.endsWith('contact.html')) {
        sessionStorage.setItem('quoteProduct', product);
      }
    });
  });

  // Pre-fill product on contact page if quoted
  const productField = document.getElementById('productInterest');
  if (productField) {
    const quoted = sessionStorage.getItem('quoteProduct');
    if (quoted) productField.value = quoted;
  }

  // ----- Newsletter / Inquiry (console log for now) -----
  console.log('%cSAVING Industry - Storage Solutions', 'color:#c89b5b;font-size:14px;font-weight:bold;');
  console.log('Looking for OEM/ODM? Email: steven@jhsaving.com');
})();
