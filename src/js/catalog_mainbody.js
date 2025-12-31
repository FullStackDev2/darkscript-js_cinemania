export function initCatalogHome() {
  const GENRES = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    27: "Horror",
    9648: "Mystery",
    878: "Sci-Fi",
    53: "Thriller",
    10749: "Romance"
  };

  const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const IMAGE_HERO = "https://image.tmdb.org/t/p/original";

  // 🔒 DOM GUARD (bu sayfa değilse çalışmaz)
  if (!document.getElementById("weeklyTrends") &&
      !document.getElementById("heroBackdrop")) {
    console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");
    return;
  }

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

    if (i < fullStars) {
      fillType = "full";
    } else if (i === fullStars && hasHalfStar) {
      fillType = "half";
    }

    const gradientId = `star-${Math.random().toString(36).slice(2)}`;

    el.innerHTML += `
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>

          <!-- DOLU -->
          <linearGradient id="${gradientId}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <!-- YARIM (ayni renk, ortadan bölünmüş) -->
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

  // ======================
  // WEEKLY TRENDS
  // ======================
  function fetchWeeklyTrends() {
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => renderWeeklyTrends(d.results || []));
  }

  function renderWeeklyTrends(movies) {
    const container = document.getElementById("weeklyTrends");
    if (!container) return;

    container.innerHTML = "";

    movies.slice(0, 1).forEach(movie => {
      const genres = movie.genre_ids
        .map(id => GENRES[id])
        .filter(Boolean)
        .slice(0, 2)
        .join(", ");

      const poster = movie.poster_path
        ? IMAGE_BASE + movie.poster_path
        : "./images/no-poster.jpg";

      const year = movie.release_date?.split("-")[0] || "N/A";

      const card = document.createElement("a");
      card.className = "movie-card large";
      card.href = `catalog_mainbody.html?id=${movie.id}`;

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

      renderStarsToRating(
        card.querySelector(".movie-rating-stars"),
        movie.vote_average
      );

      container.appendChild(card);
    });
  }

  // ======================
  // MOVIE OF THE MONTH
  // ======================
  function fetchMovieOfTheMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}` +
      `&primary_release_date.gte=${year}-${month}-01` +
      `&primary_release_date.lte=${year}-${month}-31` +
      `&sort_by=popularity.desc`
    )
      .then(r => r.json())
      .then(d => {
        const movie = d.results?.find(m => m.backdrop_path);
        if (movie) {
          renderMovieDetails(movie);
          initLibraryButton(movie);
        }
      });
  }

  function renderMovieDetails(movie) {
  const backdrop = document.getElementById("heroBackdrop");
  if (!backdrop) return;

  backdrop.src = IMAGE_HERO + movie.backdrop_path;

  // TITLE
  document.getElementById("movieTitle").textContent = movie.title;

  // ABOUT
  document.getElementById("movieOverview").textContent =
    movie.overview || "No overview available.";

  // RELEASE DATE
  document.getElementById("movieDate").textContent =
    movie.release_date || "N/A";

  // VOTE
  document.getElementById("movieVoteAvg").textContent =
    movie.vote_average?.toFixed(1) || "0";

  document.getElementById("movieVoteCount").textContent =
    movie.vote_count || "0";

  // POPULARITY
  document.getElementById("moviePopularity").textContent =
    movie.popularity?.toFixed(0) || "0";

  // GENRE
  const genres = movie.genre_ids
    ?.map(id => GENRES[id])
    .filter(Boolean)
    .join(", ");

  document.getElementById("movieGenre").textContent =
    genres || "N/A";
}

  // ======================
  // LIBRARY BUTTON
  // ======================
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  function isFavorite(id) {
    return getFavorites().some(m => m.id === id);
  }

  function initLibraryButton(movie) {
    const btn = document.getElementById("libraryToggleBtn");
    if (!btn) return;

    const update = () => {
      btn.textContent = isFavorite(movie.id)
        ? "Remove from my library"
        : "Add to my library";
      btn.classList.toggle("active", isFavorite(movie.id));
    };

    update();

    btn.onclick = () => {
      let favs = getFavorites();
      if (isFavorite(movie.id)) {
        favs = favs.filter(m => m.id !== movie.id);
      } else {
        favs.push(movie);
      }
      localStorage.setItem("favorites", JSON.stringify(favs));
      update();
    };
  }

  // 🚀 START
  fetchWeeklyTrends();
  fetchMovieOfTheMonth();
}
