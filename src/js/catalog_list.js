import { Pagination } from './components/pagination.js';
import {
  IMAGE_BASE,
  renderStarsToRating
} from "./components/mainbody.js";


export function initCatalog() {
  // ======================
  // STATE
  // ======================
  let selectedYearValue = '';
  let currentQuery = '';
  let selectedCountryCode = '';
  let hasSearched = false;
  let genreMap = {};

  let currentPage = 1;
  let currentMode = 'trending';

  const COUNTRY_MAP = {
    'United States': 'US',
    Germany: 'DE',
    France: 'FR',
    Italy: 'IT',
    Spain: 'ES',
    'United Kingdom': 'GB',
    Japan: 'JP',
    Belgium: 'BE',
  };

  // ======================
  // API
  // ======================
  const API_KEY = '98ff2d6267ceea8e039422b0f46fb813';
  const BASE_URL = 'https://api.themoviedb.org/3';

  // ======================
  // DOM
  // ======================
  const moviesContainer = document.getElementById('moviesContainer');
  const emptyMessage = document.getElementById('emptyMessage');

  const filmInput = document.querySelector('.search-input');
  const clearBtn = document.getElementById('clearSearch');
  const searchBtn = document.querySelector('.search-btn');

  const yearBtn = document.getElementById('yearBtn');
  const yearDropdown = document.getElementById('yearDropdown');
  const selectedYear = document.getElementById('selectedYear');

  const countrySelect = document.getElementById('countrySelect');
  const countryInput = countrySelect?.querySelector('.search-input1');
  const countryList = countrySelect?.querySelector('.country-list');
  const countryBtn = countrySelect.querySelector(".country-btn");


  if (sessionStorage.getItem("scrollCatalog") === "true") {
  sessionStorage.removeItem("scrollCatalog");

  // DOM + filmler render olduktan sonra scroll
   setTimeout(() => {
    const searchRow = document.querySelector(".search-row");
    if (!searchRow) return;

    const y =
      searchRow.getBoundingClientRect().top +
      window.scrollY -
      20; // küçük boşluk (istersen 0 yap)

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, 300);
}
  const paginationContainer = document.getElementById('pagination');
  if (!moviesContainer || !emptyMessage) return;

  const input = document.querySelector(".search-input");
const parent = input.parentElement;

parent.insertAdjacentHTML(
  "beforeend",
  `
  <button class="search-clear-btn">
    <svg viewBox="0 0 32 32" width="14" height="14">
      <path
        d="M29.333 29.333l-28-28M29.333 1.333l-28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2.6667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  `
  );
  
  const clearInputBtn = parent.querySelector(".search-clear-btn");
  clearInputBtn.style.display = "none";
  
  const chevronSVG = `
  <svg class="icon-chevron" width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
  <path
    d="M7 20.5l9-9 9 9"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`;

yearBtn.insertAdjacentHTML("beforeend", chevronSVG);

  if (searchBtn) {
  searchBtn.innerHTML = `
    <svg viewBox="0 0 32 32" width="18" height="18">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2.08"
        d="M14.667 25.333c5.891 0 10.667-4.776 10.667-10.667
           S20.558 4 14.667 4 4 8.776 4 14.667
           s4.776 10.666 10.667 10.666M28 28l-5.8-5.8"
      />
    </svg>
  `;
  }

  const countryChevronSVG = `
<svg class="country-chevron" width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
  <path
    d="M7 20.5l9-9 9 9"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`;

// span'den hemen sonra ekle
const selectedCountry = document.getElementById("selectedCountry");
selectedCountry.insertAdjacentHTML("afterend", countryChevronSVG);

  
    // ======================
  // 3. PAGINATION KURULUMU
  // ======================
  function setupPagination(totalResults, page) {
   
    const MAX_PAGES = 24; 
    const itemsPerPage = 20;
    const maxItems = MAX_PAGES * itemsPerPage; 

    
    const safeTotal = totalResults > maxItems ? maxItems : totalResults;

    // Eğer sonuç yoksa pagination kutusunu temizle
    if (safeTotal === 0) {
      paginationContainer.innerHTML = '';
      return;
    }

    new Pagination({
      containerId: 'pagination',
      totalItems: safeTotal,
      itemsPerPage: itemsPerPage,
      currentPage: page,

      onPageChange: newPage => {
        currentPage = newPage; // Global state'i güncelle

        // currentMode değişkenine göre ilgili fonksiyonu çağır
        if (currentMode === 'trending') {
          fetchTrending(newPage);
        } else {
          searchMovies(newPage);
        }

        // Sayfa başına kaydır (movie-list veya container classına göre)
        const listSection = document.getElementById('moviesContainer');
        if (listSection) {
          // Headerın altında kalmaması için biraz offset vererek kaydırma yapılabilir
          const y =
            listSection.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      },
    });
  }
  // ======================
  // GENRES
  // ======================
  fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(r => r.json())
    .then(d => d.genres.forEach(g => (genreMap[g.id] = g.name)));

  // ======================
  // STAR RENDER (TEK DOSYA)
  // ======================

  
  parent.addEventListener("click", (e) => {
  const btn = e.target.closest(".search-clear-btn");
  if (!btn) return;

  input.value = "";
  input.focus();
});

  parent.addEventListener("input", (e) => {
  if (e.target !== input) return;

  const btn = parent.querySelector(".search-clear-btn");
  if (btn) {
    btn.style.display = input.value ? "block" : "none";
  }
});


  countryBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  countrySelect.classList.toggle("open");
});

countryList.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", (e) => {
    e.stopPropagation();

    const countryName = li.textContent.trim();
    selectedCountry.textContent = countryName;
    selectedCountryCode = COUNTRY_MAP[countryName] || "";

    countrySelect.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (!countrySelect.contains(e.target)) {
    countrySelect.classList.remove("open");
  }
});

  if (countryList && !countryList.dataset.init) {
  const li = document.createElement("li");
  li.textContent = "Country";
  countryList.prepend(li);
  countryList.dataset.init = "true";
}
  
  clearInputBtn.addEventListener("click", () => {
  filmInput.value = "";
  filmInput.focus();
  clearInputBtn.style.display = "none"; // 🔥 SADECE BURADA
});

 
countrySelect.querySelectorAll(".country-list li").forEach(item => {
  item.addEventListener("click", () => {
    selectedCountry.textContent = item.textContent;
    countrySelect.classList.remove("open");
  });
});

countrySelect.querySelectorAll(".country-list li").forEach(item => {
  item.addEventListener("click", () => {
    const countryName = item.textContent.trim();

    selectedCountry.textContent = countryName;
    selectedCountryCode = COUNTRY_MAP[countryName] || "";

    countrySelect.classList.remove("open");

  });
});
  
  document.addEventListener("click", (e) => {
  const countrySelect = document.getElementById("countrySelect");

  // Tıklanan yer countrySelect'in DIŞINDA ise
  if (!countrySelect.contains(e.target)) {
    countrySelect.classList.remove("open");
  }
  });

  
  
  // ======================
  // COUNTRY DROPDOWN
  // ======================
  if (countrySelect && countryInput && countryList) {
    countryInput.readOnly = true;



    countryList.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', e => {
        e.stopPropagation();
        const name = li.textContent.trim();
        countryInput.value = name;
        selectedCountryCode = COUNTRY_MAP[name] || '';
        countrySelect.classList.add('has-value');
        countrySelect.classList.remove('open');
      });
    });
  }


  // ======================
  // YEAR DROPDOWN
  // ======================

  
  if (yearBtn && yearDropdown) {
  yearBtn.addEventListener("click", e => {
    e.stopPropagation();

    const isOpen = yearDropdown.classList.toggle("open");
    yearBtn.classList.toggle("open", isOpen); // ✅ OK DÖNER
  });

  yearDropdown.addEventListener("click", e => {
    e.stopPropagation();
    if (e.target.tagName === "LI") {
      selectedYearValue = e.target.dataset.year || "";
      selectedYear.textContent = e.target.textContent;

      yearDropdown.classList.remove("open");
      yearBtn.classList.remove("open"); // ✅ OK GERİ DÖNER
    }
  });
}
  
  

// dış tıklama
document.addEventListener("click", e => {
  if (!yearDropdown.classList.contains("open")) return;

  if (!yearDropdown.contains(e.target) && !yearBtn.contains(e.target)) {
    yearDropdown.classList.remove("open");
    yearBtn.classList.remove("open"); // 🔥 OK RESET
  }
});


  // ======================
  // SEARCH
  // ======================
  searchBtn.addEventListener('click', () => {
    currentQuery = filmInput.value.trim();
    hasSearched = true;

    if (!currentQuery && !selectedYearValue && !selectedCountryCode) {
      hasSearched = false;
      fetchTrending();
      return;
    }
    searchMovies();
  });

  // ======================
  // CLEAR
  // ======================
  if (clearBtn) {
  clearBtn.addEventListener("click", function () {
    filmInput.value = "";

    if (countryInput) {
      countryInput.value = "";
    }

    selectedYear.textContent = "Year";

    currentQuery = "";
    selectedYearValue = "";
    selectedCountryCode = "";
    hasSearched = false;

    if (countrySelect) {
      countrySelect.classList.remove("has-value");
    }

    fetchTrending();
  });
}

// SEARCH LOGIC
// ======================
function searchMovies(page = 1) {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;

  if (currentQuery) {
    url += `&with_text_query=${encodeURIComponent(currentQuery)}`;
  }

  if (selectedYearValue) {
    url += `&primary_release_year=${selectedYearValue}`;
  }

  if (selectedCountryCode) {
    url += `&with_origin_country=${selectedCountryCode}`;
  }

  fetch(url)
    .then(r => r.json())
    .then(d => {
      renderMovies(d.results || []);
      setupPagination(d.total_results, page);
    });
}


  // ======================
  // TRENDING
  // ======================
  fetchTrending(1);

  function fetchTrending(page = 1) {
    emptyMessage.style.display = 'none';
    currentMode = 'trending';
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)
      .then(r => r.json())
      .then(d => {
      renderMovies(d.results || []);
      setupPagination(d.total_results, page);
    });
  }

  // ======================
  // RENDER
  // ======================
  function renderMovies(movies) {
    moviesContainer.innerHTML = '';

    if (!movies.length) {
      emptyMessage.style.display = hasSearched ? 'block' : 'none';
      return;
    }

    emptyMessage.style.display = 'none';

    movies.slice(0, 20).forEach(movie => {
      const card = document.createElement('a');
      card.className = 'movie-card';
      card.setAttribute('data-id', movie.id);
      card.href = `catalog_mainbody.html?id=${movie.id}`;

      const poster = movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450';

      const year = movie.release_date?.slice(0, 4) || 'N/A';
      const genres =
        movie.genre_ids
          ?.map(id => genreMap[id])
          .filter(Boolean)
          .slice(0, 2)
          .join(', ') || 'Unknown';

      card.innerHTML = `
        <img src="${poster}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${movie.title}</h3>
            <div class="movie-meta">
        <span class="movie-genre">${genres}</span>
        <span class="movie-year">| ${year}</span>
      </div>
    </div>
          <div class="movie-rating-stars"></div>
        </div>
      `;

      moviesContainer.appendChild(card);

      renderStarsToRating(
        card.querySelector('.movie-rating-stars'),
        movie.vote_average
      );
    });
  }
}
