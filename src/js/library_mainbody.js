export function initLibrary() {

  const movieList = document.getElementById("movieList");
  const emptySection = document.getElementById("emptySection");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const genreWrapper = document.querySelector(".genre-wrapper");
  const genreDropdown = document.getElementById("genreDropdown");
  const genreBtn = document.getElementById("genreBtn");
  const genreIcon = document.getElementById("genreIcon");
  let selectedGenreId = null;
  // 🔒 DOM GUARD
  if (!movieList || !emptySection || !loadMoreBtn) {
    console.warn("Library DOM bulunamadı, initLibrary çalışmadı");
    return;
  }

  // ⬇️ Dışarı tıklayınca dropdown kapansın
  document.addEventListener("click", () => {
    if (!genreDropdown?.classList.contains("active")) return;
    genreDropdown.classList.remove("active");
    genreIcon?.classList.remove("rotate");
  });

genreDropdown?.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  selectedGenreId = li.dataset.genreId
    ? Number(li.dataset.genreId)
    : null;

  genreDropdown.classList.remove("active");
  genreIcon?.classList.remove("rotate");

  renderLibrary();
});

  function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  
  renderLibrary();

  function renderLibrary() {
    const favorites = getFavoriteMovies();
    const filteredFavorites = selectedGenreId
  ? favorites.filter(movie =>
      movie.genre_ids?.includes(selectedGenreId)
    )
  : favorites;
    movieList.innerHTML = "";

    // ✅ SADECE WRAPPER KONTROL
    if (genreWrapper) {
      genreWrapper.classList.toggle(
        "genre-hidden",
        favorites.length === 0
      );
    }

    if (favorites.length === 0) {
      emptySection.classList.remove("hidden");
      loadMoreBtn.classList.add("hidden");
      return;
    }

    emptySection.classList.add("hidden");

    renderMovies(favorites.slice(0, 9));
    loadMoreBtn.classList.toggle("hidden", favorites.length <= 9);
  }

  // ⬇️ Genre butonuna tıklayınca aç/kapa
  genreBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    genreDropdown.classList.toggle("active");
    genreIcon?.classList.toggle("rotate");
  });

  genreDropdown?.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  selectedGenreId = li.dataset.genreId
    ? Number(li.dataset.genreId)
    : null;

  // dropdown kapat
  genreDropdown.classList.remove("active");
  genreIcon?.classList.remove("rotate");

  renderLibrary();
});


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
