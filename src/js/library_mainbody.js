const movieList = document.getElementById("movieList");
const emptySection = document.getElementById("emptySection");
const loadMoreBtn = document.getElementById("loadMoreBtn");


function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

document.addEventListener("DOMContentLoaded", () => {
  renderLibrary();
});

function renderLibrary() {
  const favorites = getFavoriteMovies();
  movieList.innerHTML = "";

  // ❌ Favori yok → OOPS
  if (favorites.length === 0) {
    emptySection.classList.remove("hidden");
    loadMoreBtn.classList.add("hidden"); // 🔒 kesin gizli
    return;
  }

  // ✅ Favori varsa
  emptySection.classList.add("hidden");

  // İlk 9 favori
  renderMovies(favorites.slice(0, 9));

  // Load more SADECE 9'dan fazlaysa
  if (favorites.length > 9) {
    loadMoreBtn.classList.remove("hidden");
  } else {
    loadMoreBtn.classList.add("hidden");
  }
}

function renderMovies(movies) {
  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const year = movie.release_date?.slice(0, 4) || "N/A";

    const card = document.createElement("article");
    card.className = "movie-card";
    card.dataset.id = movie.id;

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <h3>${movie.title}</h3>
        <p>${year}</p>
      </div>
    `;

    movieList.appendChild(card);
  });
}
