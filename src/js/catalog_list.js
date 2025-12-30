function initCatalog() {
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
  // API CONFIG
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

  if (!moviesContainer || !emptyMessage) return;

  // ======================
  // GENRES
  // ======================
  fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(r => r.json())
    .then(d => d.genres.forEach(g => (genreMap[g.id] = g.name)));

  // ======================
  // COUNTRY DROPDOWN
  // ======================
  if (countrySelect && countryInput && countryList) {
    countryInput.readOnly = true;

    countrySelect.addEventListener("click", e => {
      e.stopPropagation();
      countrySelect.classList.toggle("open");
    });

    countrySelect.addEventListener("mousedown", e => e.preventDefault());

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

  // ======================
  // SEARCH BUTTON
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
  // CLEAR (X)
  // ======================
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
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
  }

  // ======================
  // SEARCH LOGIC
  // ======================
  function searchMovies() {
    let url;

    if (currentQuery) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentQuery)}`;
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
    }

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
    });
  }
}
