(function () {
  'use strict';

  let hasBoundScroll = false;
  let hasBoundParallax = false;

  function initSite() {
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const heroImg = document.querySelector('.hero__img');
    const heroBannerCopy = document.getElementById('heroBannerCopy');

    /* ---- Sticky header ---- */
    function onScroll() {
      if (header) {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
      }

      if (heroImg) {
        const offset = window.scrollY * 0.25;
        heroImg.style.transform = `scale(1.05) translateY(${offset}px)`;
      }
    }

    if (!hasBoundScroll) {
      window.addEventListener('scroll', onScroll, { passive: true });
      hasBoundScroll = true;
    }
    onScroll();

    /* ---- Hero image rotation ---- */
    if (heroImg && !heroImg.dataset.rotationBound) {
      const heroImages = ['assets/banner1.png', 'assets/Banner2.png'];
      let currentImageIndex = 0;

      function updateHeroBannerState() {
        heroImg.setAttribute('src', heroImages[currentImageIndex]);

        if (heroBannerCopy) {
          const showCopy = currentImageIndex === 1;
          heroBannerCopy.hidden = !showCopy;
        }
      }

      heroImages.forEach(src => {
        const preload = new Image();
        preload.src = src;
      });

      updateHeroBannerState();

      setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        updateHeroBannerState();
      }, 10000);

      heroImg.dataset.rotationBound = 'true';
    }

    /* ---- Mobile menu ---- */
    if (menuBtn && nav && !menuBtn.dataset.bound) {
      menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuBtn.classList.toggle('active', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          menuBtn.classList.remove('active');
          menuBtn.setAttribute('aria-expanded', 'false');
          document.querySelectorAll('.header__dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
            dropdown.querySelector('.header__dropdown-toggle')?.setAttribute('aria-expanded', 'false');
          });
        });
      });

      menuBtn.dataset.bound = 'true';
    }

    /* ---- Product submenu ---- */
    document.querySelectorAll('.header__dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('.header__dropdown-toggle');
      if (!toggle || toggle.dataset.bound) {
        return;
      }

      toggle.addEventListener('click', event => {
        if (window.innerWidth > 768) return;

        event.preventDefault();
        event.stopPropagation();

        const isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));

        document.querySelectorAll('.header__dropdown').forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('open');
            other.querySelector('.header__dropdown-toggle')?.setAttribute('aria-expanded', 'false');
          }
        });
      });

      toggle.dataset.bound = 'true';
    });

    /* ---- Scroll animations ---- */
    const animated = document.querySelectorAll('[data-animate]:not([data-observed])');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animated.forEach(el => {
      el.dataset.observed = 'true';
      observer.observe(el);
    });

    /* ---- Counter animation ---- */
    const counters = document.querySelectorAll('[data-count]:not([data-observed])');
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1800;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => {
      el.dataset.observed = 'true';
      counterObserver.observe(el);
    });

    /* ---- Parallax banner ---- */
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (parallaxEls.length && !hasBoundParallax) {
      window.addEventListener('scroll', () => {
        parallaxEls.forEach(el => {
          const rect = el.parentElement.getBoundingClientRect();
          const speed = parseFloat(el.dataset.parallax) || 0.3;
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const y = (rect.top - window.innerHeight / 2) * speed;
            el.style.transform = `translateY(${y}px)`;
          }
        });
      }, { passive: true });
      hasBoundParallax = true;
    }

    /* ---- Contact form ---- */
    if (contactForm && !contactForm.dataset.bound) {
      contactForm.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';

        const whatsappMsg = encodeURIComponent(
          `Ola! Meu nome e ${name}.\nTelefone: ${phone}\n\n${message}`
        );

        window.open(`https://wa.me/5544999999999?text=${whatsappMsg}`, '_blank');

        if (formSuccess) {
          formSuccess.hidden = false;
        }
        contactForm.reset();

        setTimeout(() => {
          if (formSuccess) {
            formSuccess.hidden = true;
          }
        }, 5000);
      });

      contactForm.dataset.bound = 'true';
    }

    /* ---- Smooth anchor offset for fixed header ---- */
    document.querySelectorAll('a[href^="#"]:not([data-bound-anchor])').forEach(anchor => {
      anchor.addEventListener('click', event => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();
        const headerOffset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      });

      anchor.dataset.boundAnchor = 'true';
    });

    /* ---- Product carousel ---- */
    const carousel = document.querySelector('[data-carousel]');
    if (carousel && !carousel.dataset.bound) {
      const track = carousel.querySelector('[data-carousel-track]');
      const slides = track ? Array.from(track.children) : [];
      const prevBtn = carousel.querySelector('[data-carousel-prev]');
      const nextBtn = carousel.querySelector('[data-carousel-next]');
      const viewport = carousel.querySelector('.product-carousel__viewport');
      let currentSlide = 0;
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      function renderSlide(index) {
        if (!track || slides.length === 0) return;
        track.style.transform = `translateX(-${index * 100}%)`;
      }

      function goNext() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        renderSlide(currentSlide);
      }

      function goPrev() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        renderSlide(currentSlide);
      }

      prevBtn?.addEventListener('click', goPrev);
      nextBtn?.addEventListener('click', goNext);

      // Keyboard support: arrows left/right switch slides.
      document.addEventListener('keydown', event => {
        if (document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
        if (event.key === 'ArrowLeft') {
          goPrev();
        } else if (event.key === 'ArrowRight') {
          goNext();
        }
      });

      // Touch support: horizontal swipe changes slide on smartphones.
      viewport?.addEventListener('touchstart', event => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }, { passive: true });

      viewport?.addEventListener('touchmove', event => {
        const touch = event.changedTouches[0];
        touchEndX = touch.clientX;
        touchEndY = touch.clientY;
      }, { passive: true });

      viewport?.addEventListener('touchend', () => {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            goNext();
          } else {
            goPrev();
          }
        }

        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
      }, { passive: true });

      renderSlide(currentSlide);

      setInterval(goNext, 4500);
      carousel.dataset.bound = 'true';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
  } else {
    initSite();
  }

  document.addEventListener('components:loaded', initSite);
})();
