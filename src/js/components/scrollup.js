export function initScrollUp() {
  const scrollUpBtn = document.getElementById('scrollUpBtn');

  // DOM Guard
  if (!scrollUpBtn) {
    console.warn('Scroll button bulunamadı!');
    return;
  }

  let ticking = false;

  function handleScroll() {
    if (window.scrollY > 300) {
      scrollUpBtn.classList.add('show');
    } else {
      scrollUpBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });

      ticking = true;
    }
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
