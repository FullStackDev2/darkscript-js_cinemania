import { Pagination } from './components/pagination.js';

const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// 👇 BU DEĞİŞKENİ EN TEPEYE TAŞIDIK (Her yerden erişilebilir olsun diye)
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

function getStars(vote) {
  if (!vote) return "☆☆☆☆☆";
  const count = Math.round(vote / 2);
  return "★".repeat(count) + "☆".repeat(5 - count);
}

document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("moviesContainer");
  const emptyMessage = document.getElementById("emptyMessage");
  const paginationContainer = document.getElementById("pagination");

  const yearBtn = document.getElementById("yearBtn");
  const yearDropdown = document.getElementById("yearDropdown");
  const selectedYear = document.getElementById("selectedYear");

  const filmInput = document.querySelector(".search-input1");
  const searchBtn = document.querySelector(".search-btn");

  // Sayfa açılışında trendleri getir
  fetchTrending(1);

  // --- FETCH FONKSİYONLARI ---

  function fetchTrending(page = 1) {
    currentMode = 'trending';
    // URL'de &page=${page} olduğundan eminiz
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        renderMovies(data.results || []);
        setupPagination(data.total_results, page); // Page bilgisini gönderiyoruz
      })
      .catch(err => console.error(err));
  }

  function searchMovies(page = 1) {
    currentMode = 'search'; // Modu search yapıyoruz
    let url;
    if (currentQuery) {
      // URL'de &page=${page} olduğundan eminiz
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentQuery)}&page=${page}`;
      if (selectedYearValue) url += `&year=${selectedYearValue}`;
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${selectedYearValue}&page=${page}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        renderMovies(data.results || []);
        setupPagination(data.total_results, page); // Page bilgisini gönderiyoruz
      })
      .catch(err => console.error(err));
  }

  // --- RENDER ---

  function renderMovies(movies) {
    if(!moviesContainer) return;
    moviesContainer.innerHTML = "";

    if (!movies.length) {
      emptyMessage.hidden = false;
      if(paginationContainer) paginationContainer.innerHTML = "";
      return;
    }
    emptyMessage.hidden = true;

    movies.forEach(movie => {
      const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "./placeholder.jpg";
      const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
      const genres = movie.genre_ids && Object.keys(genreMap).length
        ? movie.genre_ids.map(id => genreMap[id]).filter(Boolean).slice(0, 2).join(", ")
        : "Unknown";
      const stars = getStars(movie.vote_average);

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
          <div class="movie-card-rating">${stars}</div>
        </div>
      `;
      moviesContainer.appendChild(card);
    });
  }

  // --- PAGINATION KURULUMU ---
  
  function setupPagination(totalResults, currentPage) {
    // TMDB max 500 sayfa (10.000 film) limiti
    const MAX_PAGES = 24; // Senin isteğin üzerine 24 sayfa limiti
    const itemsPerPage = 20;
    const maxItems = MAX_PAGES * itemsPerPage; // 480 film
    
    // Eğer toplam sonuç 480'den büyükse 480'e sabitle
    const safeTotal = totalResults > maxItems ? maxItems : totalResults;

    new Pagination({
        containerId: 'pagination',
        totalItems: safeTotal,
        itemsPerPage: itemsPerPage,
        
        // 👇 Bu satır sayesinde sayfa 1'e sıfırlanmıyor
        currentPage: currentPage, 
        
        onPageChange: (newPage) => {
            console.log("Sayfa Değişiyor -> Yeni Sayfa:", newPage);
            
            // currentMode değişkeni artık dosyanın en tepesinde olduğu için hata vermeyecek
            if (currentMode === 'trending') {
                fetchTrending(newPage);
            } else {
                searchMovies(newPage);
            }
            
            const listSection = document.querySelector('.movie-list');
            if(listSection) listSection.scrollIntoView({ behavior: "smooth" });
        }
    });
  }

  // --- EVENT LISTENERS ---

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
        return;
      }
      searchMovies(1);
    });
  }
  
  if (filmInput) {
      filmInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') searchBtn.click();
      });
  }
});