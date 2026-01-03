import {
  API_KEY,
  BASE_URL,
  IMAGE_BASE,
  renderStarsToRating,
  isFavorite,
  toggleFavorite
} from "./components/mainbody.js";

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

  const IMAGE_HERO = "https://image.tmdb.org/t/p/original";

  // 🔒 DOM GUARD (bu sayfa değilse çalışmaz)
  if (!document.getElementById("weeklyTrends") &&
    !document.getElementById("heroBackdrop")) {
    console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");
    return;
  }

 

  // ======================
  // WEEKLY TRENDS
  // ======================
  let weeklyCache = [];

function fetchWeeklyTrends() {
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(r => r.json())
    .then(d => {
      weeklyCache = d.results || [];
      renderWeeklyTrends(weeklyCache);
    });
}
  let lastWeeklyLimit = getWeeklyLimit();

window.addEventListener("resize", () => {
  const currentLimit = getWeeklyLimit();

  // 🔥 limit değiştiyse yeniden render et
  if (currentLimit !== lastWeeklyLimit) {
    lastWeeklyLimit = currentLimit;
    renderWeeklyTrends(weeklyCache);
  }
});
  
  function getWeeklyLimit() {
  return window.matchMedia("(min-width: 768px)").matches ? 3 : 1;
}
  
  function renderWeeklyTrends(movies) {
  const container = document.getElementById("weeklyTrends");
  if (!container) return;

  container.innerHTML = "";


  const shuffled = [...movies].sort(() => Math.random() - 0.5);

  shuffled
    .slice(0, getWeeklyLimit())
    .forEach(movie => {

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
      card.setAttribute("data-id", movie.id);
      card.href = `catalog_mainbody.html?id=${movie.id}`;

      card.innerHTML = `
        <img src="${poster}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${movie.title}</h3>
            <p class="movie-genres">${genres}</p>
            <p class="movie-year">| ${year}</p>
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

// ayın ilk günü
const fromDate = `${year}-${month}-01`;

// ayın son günü
const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
const toDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;

    const noMsg = document.getElementById("noUpcomingMsg");
    const heroSection = document.querySelector(".hero1");
    const detailsSection = document.querySelector(".movie-details");

   fetch(
  `${BASE_URL}/discover/movie?api_key=${API_KEY}` +
  `&primary_release_date.gte=${fromDate}` +
  `&primary_release_date.lte=${toDate}` +
  `&sort_by=popularity.desc`
)
  .then(r => r.json())
  .then(d => {

  const movies = (d.results || []).filter(m =>
    m.backdrop_path &&     // görsel şart
    m.vote_count > 0       // 🔥 vote / votes 0 ise ELENİR
  );

  if (movies.length === 0) {
    console.warn("NO UPCOMING MOVIE THIS MONTH");
    if (noMsg) noMsg.style.display = "block";
    if (heroSection) heroSection.style.display = "none";
    if (detailsSection) detailsSection.style.display = "none";
    return;
  }

  // 🎲 Rastgele film
  const randomMovie =
    movies[Math.floor(Math.random() * movies.length)];

  if (noMsg) noMsg.style.display = "none";
  if (heroSection) heroSection.style.display = "block";
  if (detailsSection) detailsSection.style.display = "block";

  renderMovieDetails(randomMovie);
});
}
  // ======================
// DATE FORMATTER
// ======================
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
  }
  


 function renderMovieDetails(movie) {
  if (!movie) return;


  // ❗ Bu fonksiyon SADECE detail sayfasında çalışsın
  const voteAvgEl = document.getElementById("movieVoteAvg");
  if (!voteAvgEl) {
    console.warn("⏭️ renderMovieDetails skipped (not detail page)");
    return;
  }

  const backdrop = document.getElementById("heroBackdrop");
  if (backdrop && movie.backdrop_path) {
    backdrop.src = IMAGE_HERO + movie.backdrop_path;
  }

  // 🔒 Güvenli text setter
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  // ======================
  // BASIC INFO
  // ======================
  setText("movieTitle", movie.title || "—");
  setText("movieOverview", movie.overview || "No overview available.");
   setText("movieDate", movie.release_date || "—");
    setText("movieDate", formatDate(movie.release_date));

  setText(
    "movieVoteAvg",
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "—"
  );

  setText(
    "movieVoteCount",
    typeof movie.vote_count === "number"
      ? movie.vote_count
      : "—"
  );

  setText(
    "moviePopularity",
    typeof movie.popularity === "number"
      ? movie.popularity.toFixed(0)
      : "—"
  );

  // ======================
  // GENRES (DETAIL + LIST UYUMLU)
  // ======================
  let genresText = "N/A";

  if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    // DETAIL PAGE DATA
    genresText = movie.genres.map(g => g.name).join(", ");
  } else if (Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
    // TRENDING / DISCOVER DATA
    genresText = movie.genre_ids
      .map(id => GENRES[id])
      .filter(Boolean)
      .join(", ");
  }

  setText("movieGenre", genresText);

  // ======================
  // LIBRARY BUTTON
  // ======================
  const libraryBtn = document.getElementById("libraryToggleBtn");
  if (libraryBtn) {
    const updateBtn = () => {
      const active = isFavorite(movie.id);
      libraryBtn.textContent = active
        ? "Remove from library"
        : "Add to my library";
      libraryBtn.classList.toggle("active", active);
    };

    updateBtn();

    libraryBtn.onclick = e => {
      e.stopPropagation();
      toggleFavorite(movie);
      updateBtn();
    };
  }
}



  
  // 🚀 START
  fetchWeeklyTrends();
  fetchMovieOfTheMonth();
}

export function initCatalogMainbody() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  if (!movieId) {
    console.warn("❌ movieId yok");
    return;
  }

  fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    .then(r => r.json())
    .then(movie => {
      console.log("🎬 MOVIE LOADED:", movie);
      renderMovieDetails(movie); // 🔥 movie SADECE BURADA VAR
    })
    .catch(err => console.error("API error:", err));
}