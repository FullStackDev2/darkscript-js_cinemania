// ======================
// API CONFIG
// ======================
import { Pagination } from './components/pagination.js';

const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

let currentMode = 'trending'; 
let currentQuery = "";
let selectedYearValue = "";
let genreMap = {};

// Türleri çek
fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(data => {
    data.genres.forEach(g => { genreMap[g.id] = g.name; });
  });

// ======================
// STAR RENDER FUNCTION
// ======================
function renderStarsToRating(el, rating) {
  if (!el) return;
  el.innerHTML = "";
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  for (let i = 0; i < 5; i++) {
    let fillType = "empty";
    if (i < fullStars) fillType = "full";
    else if (i === fullStars && hasHalfStar) fillType = "half";

    const gradientId = `star-${Math.random().toString(36).slice(2)}`;
    el.innerHTML += `
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${gradientId}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${gradientId}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${fillType === "full" ? `url(#${gradientId}-full)` : fillType === "half" ? `url(#${gradientId}-half)` : "#bfbfbf"}" />
      </svg>`;
  }
}

// ======================
// HELPER FUNCTIONS
// ======================
function fetchTrending(page = 1) {
  currentMode = 'trending';
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      renderMovies(data.results || []);
      setupPagination(data.total_results, page);
    })
    .catch(err => console.error(err));
}

function searchMovies(page = 1) {
  currentMode = 'search';
  let url = currentQuery 
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentQuery)}&page=${page}${selectedYearValue ? `&year=${selectedYearValue}` : ''}`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${selectedYearValue}&page=${page}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderMovies(data.results || []);
      setupPagination(data.total_results, page);
    })
    .catch(err => console.error(err));
}

function renderMovies(movies) {
  const moviesContainer = document.getElementById("moviesContainer");
  const emptyMessage = document.getElementById("emptyMessage");
  if(!moviesContainer) return;

  moviesContainer.innerHTML = "";
  if (!movies || !movies.length) {
    emptyMessage.hidden = false;
    return;
  }
  emptyMessage.hidden = true;

  movies.forEach(movie => {
    const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "./placeholder.jpg";
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
    const genres = movie.genre_ids && Object.keys(genreMap).length
      ? movie.genre_ids.map(id => genreMap[id]).filter(Boolean).slice(0, 2).join(", ")
      : "Unknown";

    const card = document.createElement("a");
    card.className = "movie-card";
    card.dataset.id = movie.id;
    card.href = "#";
    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}" loading="lazy">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-meta">${genres} | ${year}</p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `;
    const ratingEl = card.querySelector(".movie-rating-stars");
    renderStarsToRating(ratingEl, movie.vote_average);
    moviesContainer.appendChild(card);
  });
}

function setupPagination(totalResults, currentPage) {
  const MAX_PAGES = 24;
  const itemsPerPage = 20;
  const maxItems = MAX_PAGES * itemsPerPage;
  const safeTotal = totalResults > maxItems ? maxItems : totalResults;

  new Pagination({
    containerId: 'pagination',
    totalItems: safeTotal,
    itemsPerPage: itemsPerPage,
    currentPage: currentPage,
    onPageChange: (newPage) => {
      if (currentMode === 'trending') fetchTrending(newPage);
      else searchMovies(newPage);
      const listSection = document.querySelector('.movie-list');
      if(listSection) listSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ======================
// EVENT LISTENERS
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const yearBtn = document.getElementById("yearBtn");
  const yearDropdown = document.getElementById("yearDropdown");
  const selectedYear = document.getElementById("selectedYear");
  const filmInput = document.querySelector(".search-input1");
  const searchBtn = document.querySelector(".search-btn");

  fetchTrending(1);

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
    document.addEventListener("click", () => yearDropdown.classList.remove("open"));
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      currentQuery = filmInput.value.trim();
      if (!currentQuery && !selectedYearValue) {
        fetchTrending(1);
      } else {
        searchMovies(1);
      }
    });
  }
  
  if (filmInput) {
    filmInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }
});