// components/trailer_popup.js

// Popup elementlerini seçelim
const popupBackdrop = document.getElementById('trailer-error-popup');
const closeBtn = document.querySelector('[data-popup-close]');

// Popup'ı açma fonksiyonu
export function openTrailerErrorPopup() {
  if (popupBackdrop) {
    popupBackdrop.classList.remove('is-hidden');
    // Popup açılınca body scroll'u kilitlemek istersen:
    document.body.style.overflow = 'hidden'; 
  }
}

// Popup'ı kapatma fonksiyonu
function closeTrailerErrorPopup() {
  if (popupBackdrop) {
    popupBackdrop.classList.add('is-hidden');
    document.body.style.overflow = ''; // Scroll'u geri aç
  }
}

// Event Listeners (Kapatma işlemleri için)
if (closeBtn) {
  closeBtn.addEventListener('click', closeTrailerErrorPopup);
}

if (popupBackdrop) {
  // Arkaplana (boşluğa) tıklayınca kapanması için
  popupBackdrop.addEventListener('click', (e) => {
    if (e.target === popupBackdrop) {
      closeTrailerErrorPopup();
    }
  });

  // ESC tuşu ile kapatmak için
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popupBackdrop.classList.contains('is-hidden')) {
      closeTrailerErrorPopup();
    }
  });
}