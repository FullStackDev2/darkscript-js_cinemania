const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("moviesContainer");
const emptyMessage = document.getElementById("emptyMessage");

let selectedYearValue = '';
let currentPage = 1;
let currentQuery = '';


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
  if (emptyMessage) emptyMessage.hidden = true;
  if (!moviesContainer) return;

  moviesContainer.innerHTML = "";

  movies.slice(0, 10).forEach(movie => {
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

const yearBtn = document.getElementById("yearBtn");
const yearDropdown = document.getElementById("yearDropdown");

if (yearBtn && yearDropdown) {
  yearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    yearDropdown.classList.toggle("open");
    yearBtn.classList.toggle("open");
  });
}

yearDropdown.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    selectedYearValue = e.target.dataset.year; // 🔥 YIL
    selectedYear.textContent = e.target.textContent;

    yearDropdown.classList.remove("open");
    yearBtn.classList.remove("open");

    // 👉 Eğer query varsa, yıla göre yeniden ara
    if (currentQuery) {
      searchAndRender(1);
    }
  }
});

document.addEventListener("click", () => {
  yearDropdown.classList.remove("open");
  yearBtn.classList.remove("open");
});

const movieInput = document.querySelector(".search-input");
const filmInput = document.querySelector(".search-input1"); 
const searchBtn = document.querySelector(".search-btn");


searchBtn.addEventListener("click", () => {
  currentQuery = filmInput.value.trim();
  currentPage = 1;

  // Hiçbir şey yoksa → trending
  if (!currentQuery && !selectedYearValue) {
    fetchTrendingMovies();
    return;
  }

  // 🔥 ARAMAYI BURASI BAŞLATIYOR
  searchAndRender(1);
});


function searchAndRender(page = 1) {
  const endpoint = currentQuery
    ? `${BASE_URL}/search/movie`
    : `${BASE_URL}/discover/movie`;

  const url = new URL(endpoint);

  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("page", page);

  if (currentQuery) {
    url.searchParams.append("query", currentQuery);
  }

  if (selectedYearValue) {
    url.searchParams.append("primary_release_year", selectedYearValue);
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        showEmpty();
        return;
      }
      renderMovies(data.results);
    })
    .catch(err => console.error("Arama hatası:", err));
}










