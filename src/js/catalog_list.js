const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
let genreMap = {};


fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(data => {
    data.genres.forEach(g => {
      genreMap[g.id] = g.name;
    });
  });


function getStars(vote) {
  if (!vote) return "☆☆☆☆☆";
  const count = Math.round(vote / 2);
  return "★".repeat(count) + "☆".repeat(5 - count);
}


document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("moviesContainer");
  const emptyMessage = document.getElementById("emptyMessage");

  const yearBtn = document.getElementById("yearBtn");
  const yearDropdown = document.getElementById("yearDropdown");
  const selectedYear = document.getElementById("selectedYear");

  const filmInput = document.querySelector(".search-input1");
  const searchBtn = document.querySelector(".search-btn");

  let selectedYearValue = "";
  let currentQuery = "";


  fetchTrending();

  function fetchTrending() {
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        renderMovies(data.results || []);
      })
      .catch(err => console.error(err));
  }


  function renderMovies(movies) {
  moviesContainer.innerHTML = "";

  if (!movies.length) {
    emptyMessage.hidden = false;
    return;
  }
  emptyMessage.hidden = true;

  movies.forEach(movie => {
    const poster = movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : "./placeholder.jpg";

    const year = movie.release_date
      ? movie.release_date.slice(0, 4)
      : "N/A";

    const genres = movie.genre_ids && Object.keys(genreMap).length
      ? movie.genre_ids
      .map(id => genreMap[id])
      .filter(Boolean)
      .slice(0, 2)
      .join(", ")
      : "Unknown";

    const stars = getStars(movie.vote_average);

    const card = document.createElement("a");
    card.className = "movie-card";
    card.href = "#";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-meta">${genres} | ${year}</p>
        </div>
        <div class="movie-card-rating">${stars}</div>
      </div>
    `;

    moviesContainer.appendChild(card);
  });
}



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
      if (selectedYearValue) {
        url += `&year=${selectedYearValue}`;
      }
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${selectedYearValue}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        renderMovies(data.results || []);
      })
      .catch(err => console.error(err));
  }
});
