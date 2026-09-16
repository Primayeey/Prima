/**
 * PORTOFOLIO PRIMA AYUNDA PUTRI - INTERAKTIVITAS & LOGIKA JAVASCRIPT
 * Fitur: Sticky Navbar, Scrollspy, Mobile Drawer Menu, Scroll Reveal, Back-To-Top, Toast Notification
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const backToTopBtn = document.getElementById('backToTop');
  const toast = document.getElementById('toastNotification');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');
  const copyButtons = document.querySelectorAll('.channel-copy-btn');
  const contactBtn = document.getElementById('contactBtn');

  // 1. Sticky Header with Scroll Effect
  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. Mobile Menu Toggle
  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    mobileMenu.classList.add('open');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when clicking links
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 3. Back to Top Smooth Scroll
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // 4. Scrollspy Active Link Tracker
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 5. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-left'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('reveal-visible'));
  }

  // 6. Toast Notification Helper
  let toastTimer = null;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 7. Interactive Copy Button for Contact Placeholders
  copyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const textToCopy = targetElement.textContent.trim();
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`Teks telah disalin: ${textToCopy}`);
          })
          .catch(() => {
            showToast(`Salinan siap: ${textToCopy}`);
          });
      }
    });
  });

  // 8. "Contact Me" button click behavior
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      showToast('Membuka aplikasi email...');
    });
  }
});
