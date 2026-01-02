import {
  IMAGE_BASE,
  renderStarsToRating,
  getFavorites
} from "./components/mainbody.js";


export function initLibrary() {

  const movieList = document.getElementById("movieList");
  const emptySection = document.getElementById("emptySection");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const genreWrapper = document.querySelector(".genre-wrapper");
  const genreDropdown = document.getElementById("genreDropdown");
  const genreBtn = document.getElementById("genreBtn");
  const genreIcon = document.getElementById("genreIcon");
  const searchMovieBtn = document.querySelector(".search-button");


  let visibleCount = 5;
  let selectedGenreId = null;
  // 🔒 DOM GUARD
  if (!movieList || !emptySection || !loadMoreBtn) {
    console.warn("Library DOM bulunamadı, initLibrary çalışmadı");
    return;
  }

  // ⬇️ Dışarı tıklayınca dropdown kapansın
  document.addEventListener("click", function () {
  if (!genreDropdown) return;
  if (!genreDropdown.classList.contains("active")) return;

  genreDropdown.classList.remove("active");
  genreBtn.classList.remove("open");
    
  if (genreIcon) {
    genreIcon.classList.remove("rotate");
  }
});

  if (genreBtn && genreDropdown) {
  genreBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    genreDropdown.classList.toggle("active");
    genreBtn.classList.toggle("open");

    if (genreIcon) {
      genreIcon.classList.toggle("rotate");
    }
  });
}

  if (searchMovieBtn) {
    searchMovieBtn.addEventListener("click", () => {
      window.location.href = "/catalog.html";
    });
  }

  if (genreDropdown) {
  genreDropdown.addEventListener("click", function (e) {
    e.stopPropagation();

    const li = e.target.closest("li");
    if (!li) return;

    selectedGenreId = li.dataset.genreId
      ? Number(li.dataset.genreId)
      : null;

    genreDropdown.classList.remove("active");
    genreBtn.classList.remove("open");
    
    if (genreIcon) {
      genreIcon.classList.remove("rotate");
    }
    window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    visibleCount = 6;
  } else {
    visibleCount = Infinity;
  }
  renderLibrary();
  });

    visibleCount = 5;
    renderLibrary();
  });
}
  
  if (searchMovieBtn) {
    searchMovieBtn.addEventListener("click", () => {
      // 🔥 Catalog’a scroll yapılacağını söyle
      sessionStorage.setItem("scrollCatalog", "true");

      window.location.href = "./catalog.html";
    });
  }

  
  renderLibrary();

  function renderLibrary() {
  const favorites = getFavorites();

  let filteredFavorites = favorites;

if (selectedGenreId !== null) {
  const byGenre = favorites.filter(movie =>
    Array.isArray(movie.genres) &&
    movie.genres.some(g => g.id === selectedGenreId)
  );

  if (byGenre.length > 0) {
    filteredFavorites = byGenre;
  }
}


    movieList.innerHTML = "";
    
  if (selectedGenreId !== null) {
  filteredFavorites = favorites.filter(movie =>
    Array.isArray(movie.genres) &&
    movie.genres.some(g => g.id === selectedGenreId)
  );
}

  if (favorites.length === 0) {
    emptySection.classList.remove("hidden");
    loadMoreBtn.classList.add("hidden");

    if (genreWrapper) {
      genreWrapper.classList.add("genre-hidden");
    }
    return;
  }

  if (genreWrapper) {
    genreWrapper.classList.remove("genre-hidden");
  }

  emptySection.classList.add("hidden");

  renderMovies(filteredFavorites.slice(0, visibleCount));

  loadMoreBtn.classList.toggle(
    "hidden",
   visibleCount === Infinity || visibleCount >= filteredFavorites.length
  );
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 3;
  renderLibrary();
});



  function renderMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const poster = `${IMAGE_BASE}${movie.poster_path}`;
    const year = movie.release_date?.slice(0, 4) || "N/A";

    const genres = Array.isArray(movie.genres)
      ? movie.genres.map(g => g.name).slice(0, 2).join(", ")
      : "Unknown";

    const card = document.createElement("a");
    card.className = "movie-card";
    card.setAttribute("data-id", movie.id);
    card.href = `catalog_mainbody.html?id=${movie.id}`;

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${movie.title}</h3>
          <p>${genres} | ${year}</p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `;

    movieList.appendChild(card);

    renderStarsToRating(
      card.querySelector(".movie-rating-stars"),
      movie.vote_average || 0
    );
  });
}
}
