import { Pagination } from './components/pagination.js';

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
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

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
  const paginationContainer = document.getElementById('pagination');
  if (!moviesContainer || !emptyMessage) return;
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
        console.log('Sayfa Değişiyor -> Yeni Sayfa:', newPage);
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

  function renderStarsToRating(el, rating) {
    if (!el) return;

    el.innerHTML = '';

    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < 5; i++) {
      let fillType = 'empty';

      if (i < fullStars) {
        fillType = 'full';
      } else if (i === fullStars && hasHalfStar) {
        fillType = 'half';
      }

      const gradientId = `star-${Math.random().toString(36).slice(2)}`;

      el.innerHTML += `
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${gradientId}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <linearGradient id="${gradientId}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${
            fillType === 'full'
              ? `url(#${gradientId}-full)`
              : fillType === 'half'
              ? `url(#${gradientId}-half)`
              : '#bfbfbf'
          }"
        />
      </svg>
    `;
    }
  }

  // ======================
  // COUNTRY DROPDOWN
  // ======================
  if (countrySelect && countryInput && countryList) {
    countryInput.readOnly = true;

    countrySelect.addEventListener('click', e => {
      e.stopPropagation();
      countrySelect.classList.toggle('open');
    });

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
    yearBtn.addEventListener('click', e => {
      e.stopPropagation();
      yearDropdown.classList.toggle('open');
    });

    yearDropdown.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        selectedYearValue = e.target.dataset.year || '';
        selectedYear.textContent = e.target.textContent;
        yearDropdown.classList.remove('open');
      }
    });
  }

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
  clearBtn?.addEventListener('click', () => {
    filmInput.value = '';
    countryInput && (countryInput.value = '');
    selectedYear.textContent = 'Year';

    currentQuery = '';
    selectedYearValue = '';
    selectedCountryCode = '';
    hasSearched = false;

    countrySelect?.classList.remove('has-value');
    fetchTrending();
  });

  // ======================
  // SEARCH LOGIC
  // ======================
  function searchMovies(page = 1) {
    let url = currentQuery
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          currentQuery
        )}`
      : `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

    if (selectedYearValue) url += `&year=${selectedYearValue}`;
    if (selectedCountryCode)
      url += `&with_origin_country=${selectedCountryCode}`;
      url += `&page=${page}`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        renderMovies(d.results || []);
      setupPagination(d.total_results, page); });
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

    movies.slice(0, 10).forEach(movie => {
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
            <p>${genres} | ${year}</p>
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
