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

// 🔥 sayfa numaraları

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


const totalPages = 24; // Toplam sayfa sayısı


const paginationList = document.querySelector('.pagination-list');
const prevBtn = document.querySelector('.pagination-arrow.prev');
const nextBtn = document.querySelector('.pagination-arrow.next');

// Sayfa numaralarını render eden fonksiyon
function renderPagination(page) {
    paginationList.innerHTML = ''; // Listeyi temizle

    // Sayfa numarasını 01, 02 formatına çeviren yardımcı fonksiyon
    const formatNum = (num) => num.toString().padStart(2, '0');

    // Mantık: Her zaman ilk sayfayı, son sayfayı ve aktif sayfanın çevresini göster
    let pages = [];
    
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        if (page <= 3) {
            pages = [1, 2, 3, '...', totalPages];
        } else if (page >= totalPages - 2) {
            pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, '...', page, '...', totalPages];
        }
    }

    pages.forEach(p => {
        const li = document.createElement('li');
        li.classList.add('pagination-item');
        
        if (p === '...') {
            li.textContent = '...';
            li.classList.add('dots');
        } else {
            li.textContent = formatNum(p);
            if (p === page) li.classList.add('active');
            
            li.addEventListener('click', () => {
                currentPage = p;
                updatePagination();
            });
        }
        paginationList.appendChild(li);
    });
}

function updatePagination() {
    renderPagination(currentPage);
    
    // API çağrısı veya film listesini filtreleme fonksiyonunu burada çalıştırın
    console.log(`Şu anki sayfa: ${currentPage}`);
    // searchAndRender(currentPage); 
}

// Ok butonları için event listenerlar
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
});

// İlk çalıştırma
renderPagination(currentPage);







