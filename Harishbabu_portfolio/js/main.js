/* ============================================
   HARISHBABU PORTFOLIO — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------- Loading Screen --------
  const loader = document.querySelector('.loader');
  const loaderText = document.querySelector('.loader-text');

  if (loaderText) {
    const text = loaderText.textContent;
    loaderText.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${i * 0.06}s`;
      loaderText.appendChild(span);
    });
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 1800);
  });

  // Fallback: hide loader after 3 seconds max
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
  }, 3000);


  // -------- Custom Cursor --------
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX - 4 + 'px';
      cursorDot.style.top = mouseY - 4 + 'px';
    });

    // Smooth follow for ring
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .filter-btn, .social-link, .hamburger');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }


  // -------- Navbar Scroll --------
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // -------- Mobile Navigation --------
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // -------- Smooth Scroll for Nav Links --------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // -------- Scroll Reveal Animations --------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // -------- Portfolio Filter --------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });


  // -------- Lightbox --------
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxInfo = document.querySelector('.lightbox-info');

  if (lightbox && lightboxContent) {
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        const title = item.querySelector('.portfolio-item-title')?.textContent || '';
        const desc = item.querySelector('.portfolio-item-desc')?.textContent || '';

        // Clear previous content
        lightboxContent.innerHTML = '';

        if (video) {
          const newVideo = document.createElement('video');
          newVideo.src = video.src;
          newVideo.controls = true;
          newVideo.autoplay = true;
          newVideo.style.maxWidth = '90vw';
          newVideo.style.maxHeight = '80vh';
          lightboxContent.appendChild(newVideo);
        } else if (img) {
          const newImg = document.createElement('img');
          newImg.src = img.src;
          newImg.alt = img.alt;
          lightboxContent.appendChild(newImg);
        }

        // Add info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'lightbox-info';
        infoDiv.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        lightboxContent.appendChild(infoDiv);

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      // Stop any playing videos
      const video = lightboxContent.querySelector('video');
      if (video) video.pause();
    }
  }


  // -------- Back to Top --------
  const backToTop = document.querySelector('.footer-back-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // -------- Active Nav Link on Scroll --------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = '#ffffff';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);


  // -------- Contact Form Handler --------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<span>SENDING...</span>';
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        _subject: "New Portfolio Enquiry from " + document.getElementById('name').value
      };

      fetch("https://formsubmit.co/ajax/ghbabu2003@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        btn.innerHTML = '<span>SENT ✓</span>';
        btn.style.background = '#1a1a1a';
        btn.style.color = '#fff';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
          contactForm.reset();
        }, 3000);
      })
      .catch(error => {
        console.log(error);
        btn.innerHTML = '<span>ERROR!</span>';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 3000);
      });
    });
  }


  // -------- Counter Animation for Stats --------
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.dataset.count;
        const suffix = target.dataset.suffix || '';
        let current = 0;
        const increment = Math.ceil(finalValue / 60);
        const duration = 1500;
        const stepTime = duration / (finalValue / increment);

        const counter = setInterval(() => {
          current += increment;
          if (current >= finalValue) {
            target.textContent = finalValue + suffix;
            clearInterval(counter);
          } else {
            target.textContent = current + suffix;
          }
        }, stepTime);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));


  // -------- Tilt Effect on Portfolio Items --------
  if (window.innerWidth > 768) {
    portfolioItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / centerY * 3;
        const tiltY = (centerX - x) / centerX * 3;

        item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  // -------- Video Play on Hover --------
  const videoItems = document.querySelectorAll('.portfolio-item.video-item video');
  
  videoItems.forEach(video => {
    const parent = video.closest('.portfolio-item');
    if (parent) {
      parent.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log('Auto-play prevented:', e));
      });
      parent.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });

});
