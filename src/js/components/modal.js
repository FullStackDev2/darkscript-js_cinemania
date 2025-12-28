import { getMovieVideos, getMovieDetails } from '../api/api-service.js';
import { isInLibrary, addMovie, removeMovie } from '../utils/local-storage.js';

// Modalın temel yapısını oluşturan ana fonksiyon
function createModalRoot() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.display = 'none';

  const modalElement = document.createElement('div');
  modalElement.className = 'modal';
  modalElement.innerHTML = `
    <button class="modal-close" aria-label="close">×</button>
    <div class="modal-body">
      <div class="modal-content" id="modal-content"></div>
    </div>
  `;

  overlay.appendChild(modalElement);
  document.body.appendChild(overlay);

  const closeBtn = modalElement.querySelector('.modal-close');
  
  const close = () => {
    overlay.style.display = 'none';
    const iframe = overlay.querySelector('iframe');
    if (iframe) iframe.src = '';
  };

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  return { overlay, modalElement, close };
}

// Global olarak tek bir modal kökü oluşturuyoruz
const { overlay, modalElement, close } = createModalRoot();

// FRAGMAN MODALI
export async function openTrailerModal(detail) {
  const movieId = detail.movieId || detail.id;
  const content = modalElement.querySelector('#modal-content');
  content.innerHTML = '<div class="loader">Loading...</div>';
  overlay.style.display = 'flex';

  try {
    const videos = await getMovieVideos(movieId);
    if (videos?.length > 0) {
      const yt = videos.find(v => v.site === 'YouTube') || videos[0];
      content.innerHTML = `<iframe class="trailer-iframe" src="https://www.youtube.com/embed/${yt.key}" allowfullscreen></iframe>`;
    } else {
      content.innerHTML = '<p class="error-msg">Fragman bulunamadı.</p>';
    }
  } catch (err) {
    content.innerHTML = '<p class="error-msg">Yükleme hatası.</p>';
  }
}

// DETAY MODALI (Tasarımı iyileştirilmiş versiyon)
export async function openDetailsModal(detail) {
  const movie = detail.movie || detail;
  const content = modalElement.querySelector('#modal-content');
  content.innerHTML = '<div class="loader">Loading details...</div>';
  overlay.style.display = 'flex';

  try {
    const data = await getMovieDetails(movie.id);
    const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '';
    const inLib = isInLibrary(data.id);

    content.innerHTML = `
      <div class="details-wrapper">
        <div class="details-poster"><img src="${poster}" alt="${data.title}"></div>
        <div class="details-info">
          <h2 class="details-title">${data.title}</h2>
          <ul class="details-list">
             <li class="details-item"><span class="details-label">Vote / Votes</span> <span class="details-value">${data.vote_average.toFixed(1)} / ${data.vote_count}</span></li>
             <li class="details-item"><span class="details-label">Popularity</span> <span class="details-value">${data.popularity.toFixed(1)}</span></li>
             <li class="details-item"><span class="details-label">Genre</span> <span class="details-value">${data.genres.map(g => g.name).join(', ')}</span></li>
          </ul>
          <h3 class="details-about-title">About</h3>
          <p class="details-about-text">${data.overview || 'Açıklama yok.'}</p>
          <div class="modal-actions">
            <button class="btn-primary" id="modal-library-btn">${inLib ? 'Remove from library' : 'Add to library'}</button>
          </div>
        </div>
      </div>
    `;

    const libBtn = document.getElementById('modal-library-btn');
    libBtn.onclick = () => {
      if (isInLibrary(data.id)) {
        removeMovie(data.id);
        libBtn.textContent = 'Add to library';
      } else {
        addMovie({ id: data.id, title: data.title, poster_path: data.poster_path });
        libBtn.textContent = 'Remove from library';
      }
    };
  } catch (err) {
    content.innerHTML = '<p class="error-msg">Detaylar yüklenemedi.</p>';
  }
}

// Window Event Listeners (Bileşenler arası iletişim için)
window.addEventListener('openTrailerModal', (e) => openTrailerModal(e.detail));
window.addEventListener('openDetailsModal', (e) => openDetailsModal(e.detail));

export default { openTrailerModal, openDetailsModal };