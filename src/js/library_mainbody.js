function initLibrary() {
  const movieList = document.getElementById("movieList");
  const emptySection = document.getElementById("emptySection");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // 🔒 DOM GUARD (EN ÖNEMLİ)
  if (!movieList || !emptySection || !loadMoreBtn) {
    console.warn("Library DOM bulunamadı, initLibrary çalışmadı");
    return;
  }

  function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  renderLibrary();

  function renderLibrary() {
    const favorites = getFavoriteMovies();
    movieList.innerHTML = "";


    if (favorites.length === 0) {
      emptySection.classList.remove("hidden");
      loadMoreBtn.classList.add("hidden");
      return;
    }

    emptySection.classList.add("hidden");

    // İlk 9 favori
    renderMovies(favorites.slice(0, 9));

    // Load more kontrol
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
}
