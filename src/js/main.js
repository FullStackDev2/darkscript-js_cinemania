// main.js

// 1. Sadece bir kez import et
import { initTheme } from './utils/theme-toggle.js';

// 2. Hemen çalıştır
initTheme(); 

// 3. Diğer bileşenler
import './components/header.js';
import './components/hero.js';
import './components/footer.js';
import './components/modal.js';

// 4. Sayfa özelindeki JS'ler
import "./catalog_list.js";
import "./library_mainbody.js";
import "./catalog_mainbody.js";






document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "catalog") {
    initCatalog();
  }

  if (page === "library") {
    initLibrary();
  }
});
