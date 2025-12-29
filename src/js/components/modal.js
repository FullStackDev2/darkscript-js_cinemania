import { getMovieDetails } from '../api/api-service.js'; 
import { isInLibrary, addMovie, removeMovie } from '../utils/local-storage.js';

// --- 1. MODAL İSKELETİNİ OLUŞTURMA (DOM Injection) ---
function createModalRoot() {
  // Eğer modal zaten sayfada varsa tekrar oluşturma
  if (document.querySelector('.backdrop')) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'backdrop is-hidden'; // CSS: .backdrop
  overlay.setAttribute('data-modal', '');

  const modalElement = document.createElement('div');
  modalElement.className = 'modal'; // CSS: .modal
  
  // Modal içeriği: Kapatma butonu ve içerik kapsayıcısı
  modalElement.innerHTML = `
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Kapatma Eventleri (Backdrop tıklaması, Buton, ESC tuşu)
  const closeBtn = modalElement.querySelector('[data-modal-close]');
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeGlobalModal();
  });
  
  closeBtn.addEventListener('click', closeGlobalModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGlobalModal();
  });
}

// Global Kapatma Fonksiyonu
function closeGlobalModal() {
  const overlay = document.querySelector('.backdrop');
  if (overlay) {
    overlay.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
    const content = document.getElementById('modal-content');
    if (content) content.innerHTML = ''; // İçeriği temizle
  }
}

// Sayfa yüklendiğinde iskeleti hazırla
createModalRoot();

// --- 2. DETAYLARI GETİR VE MODALI AÇ ---
export async function openDetailsModal(movieId) {
  const overlay = document.querySelector('.backdrop');
  const content = document.getElementById('modal-content');
  
  // Yükleniyor animasyonu veya yazısı
  content.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>';
  
  overlay.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  try {
    // API'den veriyi çek
    const data = await getMovieDetails(movieId);
    
    // Veri hazırlığı
    const posterUrl = data.poster_path 
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}` 
      : 'https://via.placeholder.com/300x450?text=No+Image';
      
    const genresList = data.genres ? data.genres.map(g => g.name).join(', ') : 'Unknown';
    const inLib = isInLibrary(data.id);
    const releaseYear = data.release_date ? data.release_date.slice(0, 4) : 'N/A';

    // HTML Markup (CSS ile uyumlu yapı)
    const markup = `
      <div class="modal-img-wrapper">
        <img src="${posterUrl}" alt="${data.title}" class="modal-img" />
      </div>
      
      <div class="modal-info">
        <h2 class="modal-title">${data.title.toUpperCase()}</h2>
        
        <div class="modal-stats">
          <div class="stats-item">
            <span class="stats-key">Vote / Votes</span>
            <span class="stats-value">
              <span class="vote-average">${data.vote_average.toFixed(1)}</span> / 
              <span class="vote-count">${data.vote_count}</span>
            </span>
          </div>
          <div class="stats-item">
            <span class="stats-key">Popularity</span>
            <span class="stats-value">${data.popularity.toFixed(1)}</span>
          </div>
          <div class="stats-item">
            <span class="stats-key">Genre</span>
            <span class="stats-value">${genresList}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${data.overview || 'No description available.'}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${inLib ? 'active' : ''}" id="modal-library-btn">
            ${inLib ? 'Remove from library' : 'Add to my library'}
          </button>
        </div>
      </div>
    `;

    content.innerHTML = markup;

    // Library Butonu İşlevselliği
    const libBtn = document.getElementById('modal-library-btn');
    libBtn.addEventListener('click', () => {
      if (isInLibrary(data.id)) {
        removeMovie(data.id);
        libBtn.textContent = 'Add to my library';
        libBtn.classList.remove('active');
      } else {
        // Library sayfasına kaydederken gereken tüm verileri obje olarak sakla
        const movieToSave = {
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
          release_date: data.release_date,
          genres: data.genres
        };
        addMovie(movieToSave);
        libBtn.textContent = 'Remove from library';
        libBtn.classList.add('active');
      }
    });

  } catch (err) {
    console.error('Modal Hatası:', err);
    content.innerHTML = '<p style="text-align:center; padding:20px;">Error loading movie details.</p>';
  }
}

// --- 3. DİNLEYİCİLERİ (LISTENERS) BAĞLAMA ---
// Projedeki tüm potansiyel film listesi kapsayıcıları
const containerIds = [
  'weeklyTrends',    // Home Sayfası
  'moviesContainer', // Catalog Arama Sonuçları
  'catalog-list',    // Catalog Sayfası Listesi
  'movieList'        // Library Sayfası
];

// Tüm kapsayıcıları döngüye alıp tıklama olayını dinle
containerIds.forEach(id => {
  const container = document.getElementById(id);
  if (container) {
    container.addEventListener('click', (e) => {
      // Tıklanan eleman .movie-card VEYA .movie-card-overlay mi?
      // Loglarda overlay çıktığı için her ikisini de kontrol ediyoruz.
      const card = e.target.closest('.movie-card') || e.target.closest('.movie-card-overlay');

      // Eğer kart bulunduysa VE data-id özelliği varsa
      if (card && card.dataset.id) {
        e.preventDefault(); // Link ise gitmesini engelle
        const movieId = card.dataset.id;
        openDetailsModal(movieId);
      }
    });
  }
});

export default { openDetailsModal };
