// main.js

// 1. Sadece bir kez import et
import { initTheme } from './utils/theme-toggle.js';
import { initLibrary } from './library_mainbody.js';
import { initCatalog } from './catalog_list.js';
import { initCatalogHome } from './catalog_mainbody.js';
import { initScrollUp } from './components/scrollup.js';
import { initFooter } from './components/footer.js';
import { openTrailerErrorPopup } from './components/trailer_popup.js';
import { hideLoader, resetLoader } from './utils/loader.js';

const validPaths = [
  '/',
  '/index.html',
  '/catalog.html',
  '/library.html',
  '/darkscript-js_cinemania/',
  '/darkscript-js_cinemania/index.html',
  '/darkscript-js_cinemania/catalog.html',
  '/darkscript-js_cinemania/library.html',
];

if (!validPaths.includes(window.location.pathname)) {
  document.body.innerHTML = `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#111;color:white;text-align:center;">
      <div>
        <h1>404 - Sayfa Bulunamadı</h1>
        <p>Aradığınız sayfa mevcut değil.</p>
        <a href="/darkscript-js_cinemania/index.html" style="color:#ff6b08;">Ana Sayfaya Dön</a>
      </div>
    </main>
  `;
  throw new Error('404 - Invalid route');
}

// 3. Diğer bileşenler
import './components/header.js';
import './components/hero.js';
import './components/footer.js';
import './components/modal.js';

// 4. Sayfa özelindeki JS'ler
import './components/pagination.js';
import './components/scrollup.js';

// 2. Hemen çalıştır
initTheme();
initFooter();

if (document.body.dataset.page === 'catalog-main') {
  initCatalogHome();
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure loader is hidden on initial paint (defensive against stale state)
  resetLoader();
  hideLoader();

  initScrollUp();

  // Home / Catalog ana sayfa
  if (document.getElementById('weeklyTrends')) {
    initCatalogHome();
  }

  // Catalog liste / arama sayfası
  if (document.getElementById('moviesContainer')) {
    initCatalog();
  }

  // Library sayfası
  if (document.getElementById('movieList')) {
    initLibrary();
  }

  const libraryHeroCta = document.getElementById('hero-btn');
  if (libraryHeroCta) {
    libraryHeroCta.addEventListener('click', () => {
      window.location.href = './catalog.html';
    });
  }
});
