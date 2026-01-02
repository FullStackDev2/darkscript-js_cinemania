// src/js/components/footer.js

export function initFooter() {
  // Butona doğrudan değil, document body'ye dinleyici ekliyoruz
  document.body.addEventListener('click', (e) => {
    
    // 1. Tıklanan şey (veya kapsayıcısı) AÇMA butonu mu?
    const openBtn = e.target.closest('#openTeamModal');
    
    // 2. Tıklanan şey (veya kapsayıcısı) KAPATMA butonu mu?
    const closeBtn = e.target.closest('#closeTeamModal');
    
    // 3. Modalın kendisi mi?
    const modal = document.getElementById('teamModal');

    // Eğer sayfada modal yoksa hiç uğraşma, çık
    if (!modal) return;

    // --- AÇMA İŞLEMİ ---
    if (openBtn) {
      e.preventDefault(); // Link ise gitmesini engelle
      console.log("Footer: Modal açılıyor...");
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // Kaydırmayı kilitle
      return; // İşlem bitti
    }

    // --- KAPATMA İŞLEMİ (X butonu) ---
    if (closeBtn) {
      console.log("Footer: Modal kapanıyor (Buton ile)...");
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      return;
    }

    // --- KAPATMA İŞLEMİ (Siyah Boşluk / Backdrop) ---
    // closest kullanmıyoruz, çünkü direkt siyah alana tıklanmalı
    if (e.target === modal) {
      console.log("Footer: Modal kapanıyor (Backdrop ile)...");
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  // ESC Tuşu Kontrolü (Global)
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('teamModal');
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      console.log("Footer: Modal kapanıyor (ESC ile)...");
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}