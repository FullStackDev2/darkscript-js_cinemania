const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("moviesContainer");
const emptyMessage = document.getElementById("emptyMessage");


fetchTrendingMovies();

function fetchTrendingMovies() {
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.results.length === 0) {
        showEmpty();
      } else {
        renderMovies(data.results);
      }
    });
}


function renderMovies(movies) {
  emptyMessage.hidden = true;
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = `
      <a href="catalog_mainbody.html?id=${movie.id}" class="movie-card">
        <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      </a>
    `;
    moviesContainer.insertAdjacentHTML("beforeend", card);
  });
}


function showEmpty() {
  moviesContainer.innerHTML = "";
  emptyMessage.hidden = false;
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  const year = document.getElementById("yearSelect").value;

  fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&year=${year}`
  )
    .then(res => res.json())
    .then(data => {
      data.results.length
        ? renderMovies(data.results)
        : showEmpty();
    });
});
