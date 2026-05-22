export function initTheme() {
  const themeSwitch = document.querySelector('#checkbox');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Önce eski classları temizle
  document.body.classList.remove('light-theme', 'dark-theme');

  // Sonra doğru temayı ekle
  document.body.classList.add(
    savedTheme === 'light' ? 'light-theme' : 'dark-theme'
  );

  if (!themeSwitch) {
    setTimeout(initTheme, 100);
    return;
  }

  themeSwitch.checked = savedTheme === 'light';

  if (!themeSwitch.dataset.listenerAdded) {
    themeSwitch.addEventListener('change', () => {
      document.body.classList.remove('light-theme', 'dark-theme');

      if (themeSwitch.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
    });

    themeSwitch.dataset.listenerAdded = 'true';
  }
}
