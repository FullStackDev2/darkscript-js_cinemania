function initCatalog() {
  // ======================
  // API CONFIG
  // ======================
  const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  // ======================
  // DOM GUARD
  // ======================
  const moviesContainer = document.getElementById("moviesContainer");
  const emptyMessage = document.getElementById("emptyMessage");

  if (!moviesContainer || !emptyMessage) {
    console.warn("Catalog DOM bulunamadı");
    return;
  }

  const yearBtn = document.getElementById("yearBtn");
  const yearDropdown = document.getElementById("yearDropdown");
  const selectedYear = document.getElementById("selectedYear");

  const filmInput = document.querySelector(".search-input1");
  const searchBtn = document.querySelector(".search-btn");

  let selectedYearValue = "";
  let currentQuery = "";
  // ======================
  // GENRE MAP
  // ======================
  let genreMap = {};

  fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(data => {
      data.genres.forEach(g => {
        genreMap[g.id] = g.name;
      });
    });

  // ======================
  // STAR RENDER
  // ======================
  function renderStarsToRating(el, rating) {
    if (!el) return;

    el.innerHTML = "";

    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < 5; i++) {
      let fillType = "empty";
      if (i < fullStars) fillType = "full";
      else if (i === fullStars && hasHalfStar) fillType = "half";

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
            d="M24.622 30L16 24.173 7.378 30l3.135-9.286-8.125-5.572h10.024L16 5.833l3.025 9.313h10.024l-8.128 5.569z"
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

  // ======================
  // FETCH TRENDING
  // ======================
  fetchTrending();

  function fetchTrending() {
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => renderMovies(data.results || []));
  }

  function renderMovies(movies) {
    moviesContainer.innerHTML = "";

    if (!movies.length) {
      emptyMessage.hidden = false;
      return;
    }

    emptyMessage.hidden = true;

    movies.slice(0, 10).forEach(movie => {
      const poster = movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : "https://via.placeholder.com/300x450";

      const year = movie.release_date?.slice(0, 4) || "N/A";

      const genres =
        movie.genre_ids
          ?.map(id => genreMap[id])
          .filter(Boolean)
          .slice(0, 2)
          .join(", ") || "Unknown";

      const card = document.createElement("a");
      card.className = "movie-card";
      card.href = `catalog_mainbody.html?id=${movie.id}`;

      card.innerHTML = `
        <img src="${poster}" alt="${movie.title}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-meta">${genres} | ${year}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `;

      renderStarsToRating(
        card.querySelector(".movie-rating-stars"),
        movie.vote_average
      );

      moviesContainer.appendChild(card);
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

    document.addEventListener("click", () => {
      yearDropdown.classList.remove("open");
    });
  }

  // ======================
  // SEARCH
  // ======================
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      currentQuery = filmInput.value.trim();

      if (!currentQuery && !selectedYearValue) {
        fetchTrending();
        return;
      }

      searchMovies();
    });
  }

  function searchMovies() {
    let url;

    if (currentQuery) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentQuery)}`;
      if (selectedYearValue) url += `&year=${selectedYearValue}`;
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${selectedYearValue}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => renderMovies(data.results || []));
  }
}
