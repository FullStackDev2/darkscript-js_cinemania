export function initCatalog() {
  // ======================
  // STATE
  // ======================
  let selectedYearValue = "";
  let currentQuery = "";
  let selectedCountryCode = "";
  let hasSearched = false;
  let genreMap = {};

  const COUNTRY_MAP = {
    "United States": "US",
    "Germany": "DE",
    "France": "FR",
    "Italy": "IT",
    "Spain": "ES",
    "United Kingdom": "GB",
    "Japan": "JP",
    "Belgium": "BE",
  };

  // ======================
  // API
  // ======================
  const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  // ======================
  // DOM
  // ======================
  const moviesContainer = document.getElementById("moviesContainer");
  const emptyMessage = document.getElementById("emptyMessage");

  const filmInput = document.querySelector(".search-input");
  const clearBtn = document.getElementById("clearSearch");
  const searchBtn = document.querySelector(".search-btn");

  const yearBtn = document.getElementById("yearBtn");
  const yearDropdown = document.getElementById("yearDropdown");
  const selectedYear = document.getElementById("selectedYear");

  const countrySelect = document.getElementById("countrySelect");
  const countryInput = countrySelect?.querySelector(".search-input1");
  const countryList = countrySelect?.querySelector(".country-list");
  const countryBtn = countrySelect.querySelector(".country-btn");
  const yearSelect = document.querySelector(".year-select");


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


  function renderStarsToRating(el, rating) {
  if (!el) return;

  el.innerHTML = "";

  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  for (let i = 0; i < 5; i++) {
    let fillType = "empty";

    if (i < fullStars) {
      fillType = "full";
    } else if (i === fullStars && hasHalfStar) {
      fillType = "half";
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
            fillType === "full"
              ? `url(#${gradientId}-full)`
              : fillType === "half"
              ? `url(#${gradientId}-half)`
              : "#bfbfbf"
          }"
        />
      </svg>
    `;
  }
  }
  
  clearInputBtn.addEventListener("click", () => {
  filmInput.value = "";
  filmInput.focus();
  clearInputBtn.style.display = "none"; // 🔥 SADECE BURADA
});

  countryBtn.addEventListener("click", () => {
  countrySelect.classList.toggle("open");
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

    fetchMoviesByCountry(); // 🔥 ülkeye göre ara
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

    countrySelect.addEventListener("click", e => {
      e.stopPropagation();
      countrySelect.classList.toggle("open");
    });

    countryList.querySelectorAll("li").forEach(li => {
      li.addEventListener("click", e => {
        e.stopPropagation();
        const name = li.textContent.trim();
        countryInput.value = name;
        selectedCountryCode = COUNTRY_MAP[name] || "";
        countrySelect.classList.add("has-value");
        countrySelect.classList.remove("open");
      });
    });
  }


  // ======================
  // YEAR DROPDOWN
  // ======================
  if (yearBtn && yearDropdown) {
    yearBtn.addEventListener("click", e => {
      e.stopPropagation();
      yearDropdown.classList.toggle("open");
    });

    yearDropdown.addEventListener("click", e => {
      if (e.target.tagName === "LI") {
        selectedYearValue = e.target.dataset.year || "";
        selectedYear.textContent = e.target.textContent;
        yearDropdown.classList.remove("open");
      }
    });
  }

  document.addEventListener("click", (e) => {
  if (!yearDropdown.classList.contains("open")) return;

  // Year butonu veya dropdown DIŞINA tıklandıysa
  if (!yearBtn.contains(e.target) && !yearDropdown.contains(e.target)) {
    yearDropdown.classList.remove("open");
  }
});


  // ======================
  // SEARCH
  // ======================
  searchBtn.addEventListener("click", () => {
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
  clearBtn?.addEventListener("click", () => {
    filmInput.value = "";
    countryInput && (countryInput.value = "");
    selectedYear.textContent = "Year";

    currentQuery = "";
    selectedYearValue = "";
    selectedCountryCode = "";
    hasSearched = false;

    countrySelect?.classList.remove("has-value");
    fetchTrending();
  });

  // ======================
  // SEARCH LOGIC
  // ======================
  function searchMovies() {
    let url = currentQuery
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentQuery)}`
      : `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

    if (selectedYearValue) url += `&year=${selectedYearValue}`;
    if (selectedCountryCode) url += `&with_origin_country=${selectedCountryCode}`;

    fetch(url)
      .then(r => r.json())
      .then(d => renderMovies(d.results || []));
  }

  // ======================
  // TRENDING
  // ======================
  fetchTrending();

  function fetchTrending() {
    emptyMessage.style.display = "none";
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => renderMovies(d.results || []));
  }

  // ======================
  // RENDER
  // ======================
  function renderMovies(movies) {
    moviesContainer.innerHTML = "";

    if (!movies.length) {
      emptyMessage.style.display = hasSearched ? "block" : "none";
      return;
    }

    emptyMessage.style.display = "none";

    movies.slice(0, 10).forEach(movie => {
      const card = document.createElement("a");
      card.className = "movie-card";
      card.href = `catalog_mainbody.html?id=${movie.id}`;

      const poster = movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : "https://via.placeholder.com/300x450";

      const year = movie.release_date?.slice(0, 4) || "N/A";
      const genres =
        movie.genre_ids?.map(id => genreMap[id]).filter(Boolean).slice(0, 2).join(", ") || "Unknown";

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
        card.querySelector(".movie-rating-stars"),
        movie.vote_average
      );
    });
  }
}
