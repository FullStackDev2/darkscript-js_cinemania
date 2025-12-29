// footer.js
const openBtn = document.getElementById('openTeamModal');
const closeBtn = document.getElementById('closeTeamModal');
const modal = document.getElementById('teamModal');

// Sadece buton sayfada varsa dinleyici ekle (Hata koruması)
if (openBtn && modal) {
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('is-open'); // Stil için class kullanmak daha iyidir
    document.body.style.overflow = 'hidden'; // Arka plan kaymasını engelle
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = 'auto';
  });
}

// Modal dışına tıklandığında kapatma
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = 'auto';
    }
  });
}

// ESC tuşu ile kapatma (Ekstra konfor)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
    modal.classList.remove('is-open');
    document.body.style.overflow = 'auto';
  }
});