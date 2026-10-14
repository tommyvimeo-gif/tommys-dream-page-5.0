// Tomaž Dolar website – animations + lightbox

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeElements.forEach(el => observer.observe(el));

  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      if (!open) {
        Object.assign(navLinks.style, {
          position: 'absolute', top: '52px', left: '0', right: '0',
          background: 'rgba(0,0,0,0.95)', flexDirection: 'column',
          padding: '20px', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)'
        });
      }
    });
  }

  // LIGHTBOX – klik na sliko = zoom in
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lightbox-close" aria-label="Zapri">&times;</button><img src="" alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbClose = lb.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.gallery img, .card-img, .feature-card img, .zoomable');
    if (img && img.src) {
      e.preventDefault();
      const big = img.src.replace(/([?&])w=\d+/, '$1w=1600').replace(/([?&])q=\d+/, '$1q=90');
      openLightbox(big, img.alt);
    }
  });
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target === lbClose) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.section-bg').forEach(bg => {
      const parent = bg.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bg.style.transform = `translateY(${rect.top * 0.12}px)`;
      }
    });
  }, { passive: true });
});
