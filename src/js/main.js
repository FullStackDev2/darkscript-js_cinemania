// main.js

// 1. Sadece bir kez import et
import { initTheme } from './utils/theme-toggle.js';
import { initLibrary } from "./library_mainbody.js";
import { initCatalog } from "./catalog_list.js";
import { initCatalogHome } from "./catalog_mainbody.js";
import { initScrollUp } from './components/scrollup.js';
import { initFooter } from './components/footer.js';
import { openTrailerErrorPopup } from './components/trailer_popup.js';
import { hideLoader, resetLoader } from './utils/loader.js';

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





if (document.body.dataset.page === "catalog-main") {
  initCatalogMainbody();
}

document.addEventListener("DOMContentLoaded", () => {
  // Ensure loader is hidden on initial paint (defensive against stale state)
  resetLoader();
  hideLoader();

  initScrollUp();

  // Home / Catalog ana sayfa
  if (document.getElementById("weeklyTrends")) {
    initCatalogHome();
  }

  // Catalog liste / arama sayfası
  if (document.getElementById("moviesContainer")) {
    initCatalog();
  }

  // Library sayfası
  if (document.getElementById("movieList")) {
    initLibrary();
  }

  const libraryHeroCta = document.getElementById('hero-btn');
  if (libraryHeroCta) {
    libraryHeroCta.addEventListener('click', () => {
      window.location.href = './catalog.html';
    });
  }
});