export function initTheme() {
  const themeSwitch = document.querySelector('#checkbox');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Body'ye temayı hemen uygula (Switch'i bekleme)
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }

  // Eğer switch henüz DOM'da yoksa (Header yüklenmemiş olabilir)
  if (!themeSwitch) {
    // 100ms sonra tekrar kontrol et (Header yüklenmesi için zaman tanı)
    setTimeout(initTheme, 100);
    return;
  }

  themeSwitch.checked = (savedTheme === 'light');

  // Olay dinleyiciyi sadece bir kez ekle
  if (!themeSwitch.dataset.listenerAdded) {
    themeSwitch.addEventListener('change', () => {
      if (themeSwitch.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
    themeSwitch.dataset.listenerAdded = 'true';
  }
}