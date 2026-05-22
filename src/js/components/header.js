document.addEventListener('DOMContentLoaded', () => {
  let overlayEl = null;

  function createOverlay(closeFn) {
    if (overlayEl) return;
    overlayEl = document.createElement('div');
    overlayEl.className = 'mobile-menu-overlay';
    // Overlay stili için CSS'de .mobile-menu-overlay tanımlı olmalı
    overlayEl.addEventListener('click', closeFn);
    document.body.appendChild(overlayEl);
  }

  function removeOverlay() {
    if (!overlayEl) return;
    overlayEl.remove();
    overlayEl = null;
  }

  function openMenu(menuBtn, mobileMenu) {
    mobileMenu.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    createOverlay(() => closeMenu(menuBtn, mobileMenu));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(menuBtn, mobileMenu) {
    mobileMenu.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    removeOverlay();
    document.body.style.overflow = '';
  }

  // Tek bir delegasyon üzerinden tüm tıklamaları yönetelim
  document.addEventListener('click', (e) => {
    // 1. Menü Butonu Kontrolü
    const btn = e.target.closest('.menu-open-btn');
    if (btn) {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!mobileMenu) return;
      
      if (mobileMenu.classList.contains('open')) {
        closeMenu(btn, mobileMenu);
      } else {
        openMenu(btn, mobileMenu);
      }
      return; // İşlem tamam, aşağıya bakma
    }

    // 2. Nav Link Kontrolü (Menü içindeki linke tıklanırsa kapat)
    const link = e.target.closest('.mobile-menu .nav-link');
    if (link) {
      const mobileMenu = document.querySelector('.mobile-menu');
      const btn = document.querySelector('.menu-open-btn');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        setTimeout(() => closeMenu(btn, mobileMenu), 100);
      }
    }
  });

  // ESC Tuşu Kontrolü
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const mobileMenu = document.querySelector('.mobile-menu');
      const btn = document.querySelector('.menu-open-btn');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu(btn, mobileMenu);
      }
    }
  });

  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.classList.remove('active');
      // Eğer linkin href'i mevcut URL ile eşleşiyorsa active ekle
      if (currentPath.includes(link.getAttribute('href').replace('./', ''))) {
        link.classList.add('active');
      }
    });

    // Eğer ana dizindeysek varsayılan Home
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
      document.querySelector('.nav-link[href="./index.html"]')?.classList.add('active');
    }
  }
  setActiveNavLink();
});