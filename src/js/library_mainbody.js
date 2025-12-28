const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";


const emptySection = document.getElementById("emptySection");
const movieList = document.getElementById("movieList");
const container = document.getElementById("moviesContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const emptyState = document.getElementById("emptyState");

let currentPage = 1;
let currentGenreId = null;
let genreMap = {};
let initialMovies = [];

fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=98ff2d6267ceea8e039422b0f46fb813&language=en-US")
  .then(res => res.json())
  .then(data => {
    data.genres.forEach(g => {
      genreMap[g.id] = g.name;
    });
  });


document.addEventListener("DOMContentLoaded", () => {
  fetchInitialMovies();
  setupDropdown();
});



function fetchInitialMovies() {
  fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP error: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data.results)) return;

      movieList.innerHTML = "";
      renderMovies(data.results.slice(0, 9));
    })
    .catch(err => console.error("Initial fetch error:", err));
}



function getStars(vote) {
  const count = Math.round(vote / 2);
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function renderMovies(movies) {
  const movieList = document.getElementById("movieList");

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const year = movie.release_date?.slice(0, 4) || "N/A";

    const genres = movie.genre_ids && genreMap
      ? movie.genre_ids
          .map(id => genreMap[id])
          .filter(Boolean)
          .slice(0, 2)
          .join(", ")
      : "Unknown";

    const stars = getStars(movie.vote_average);

    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${movie.title}</h3>
          <p>${genres} | ${year}</p>
        </div>
        <div class="movie-card-rating">${stars}</div>
      </div>
    `;

    movieList.appendChild(card);
  });
}


genreDropdown.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  currentGenreId = e.target.dataset.genreId;
  currentPage = 1;

  movieList.innerHTML = "";
  emptyState.classList.add("hidden");

  fetchMoviesByGenre();
});


function fetchMoviesByGenre() {
  if (!currentGenreId) return;

  fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${currentGenreId}&page=${currentPage}`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP error: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data.results)) return;

      // 🔥 SADECE 9 FİLM
      const limitedMovies = data.results.slice(0, 9);

      if (!limitedMovies.length && currentPage === 1) {
        emptyState.classList.remove("hidden");
        return;
      }

      renderMovies(limitedMovies);
    })
    .catch(err => console.error("Genre fetch error:", err));
}


loadMoreBtn.addEventListener("click", () => {
  if (!currentGenreId) return;

  currentPage += 1;
  fetchMoviesByGenre();
});



function showEmptyState() {
  const emptySection = document.getElementById("emptySection");
  const movieList = document.getElementById("movieList");

  if (!emptySection || !movieList) return;

  emptySection.classList.remove("hidden");
  movieList.innerHTML = "";
}

function hideEmptyState() {
  const emptySection = document.getElementById("emptySection");
  if (!emptySection) return;

  emptySection.classList.add("hidden");
}



function setupDropdown() {
  const genreBtn = document.getElementById('genreBtn');
  const genreDropdown = document.getElementById("genreDropdown");
  const genreIcon = document.getElementById('genreIcon');

  genreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    genreDropdown.classList.toggle('active');
    genreIcon.classList.toggle('rotate');
  });


  genreDropdown.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const genreId = e.target.dataset.genreId;
      fetchMoviesByGenre(genreId);

      genreDropdown.classList.remove('active');
      genreIcon.classList.remove('rotate');
    }
  });

  document.addEventListener('click', () => {
    genreDropdown.classList.remove('active');
    genreIcon.classList.remove('rotate');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      genreDropdown.classList.remove('active');
      genreIcon.classList.remove('rotate');
    }
  });
}


genreDropdown.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  currentGenreId = e.target.dataset.genreId;
  currentPage = 1;

  movieList.innerHTML = "";
  emptyState.classList.add("hidden");

  fetchMoviesByGenre();
});

