

let initialMovies = [];

const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";

const emptySection = document.getElementById("emptySection");
const movieList = document.getElementById("movieList");
const container = document.getElementById("moviesContainer");


document.addEventListener("DOMContentLoaded", () => {
  fetchInitialMovies();
  setupDropdown();
});

function fetchInitialMovies() {
  fetch(`${BASE_URL}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      initialMovies = data.results.slice(0, 9);
      renderMovies(initialMovies);
    })
    .catch(console.error);
}

function renderMovies(movies) {
  const movieList = document.getElementById("movieList");
  if (!movieList) return;

  movieList.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const card = document.createElement("article");
    card.className = "equipment-movie-card movie-card";

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info equipment-movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.release_date?.slice(0,4) || ""}</p>
      </div>
    `;

    movieList.appendChild(card);
  });
}


function fetchMoviesByGenre(genreId) {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        showEmptyState();
      } else {
        hideEmptyState();
        renderMovies(data.results);
      }
    })
    .catch(showEmptyState);
}


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

  // 🔥 EVENT DELEGATION (ÇOK ÖNEMLİ)
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
