// main.js

// 1. Sadece bir kez import et
import { initTheme } from './utils/theme-toggle.js';
import { initLibrary } from "./library_mainbody.js";
import { initCatalog } from "./catalog_list.js";
import { initCatalogHome } from "./catalog_mainbody.js";
// 2. Hemen çalıştır
initTheme(); 

// 3. Diğer bileşenler
import './components/header.js';
import './components/hero.js';
import './components/footer.js';
import './components/modal.js';

// 4. Sayfa özelindeki JS'ler
import './catalog_list.js';
import "./library_mainbody.js";
import "./catalog_mainbody.js";




document.addEventListener("DOMContentLoaded", () => {
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
});