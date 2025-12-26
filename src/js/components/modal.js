import { getMovieVideos, getMovieDetails } from '../api/api-service.js';
import { isInLibrary, addMovie, removeMovie } from '../utils/local-storage.js';

function createModalRoot() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.display = 'none';

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <button class="modal-close" aria-label="close">×</button>
    <div class="modal-body">
      <div class="modal-content" id="modal-content"></div>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const closeBtn = modal.querySelector('.modal-close');
  function close() {
    overlay.style.display = 'none';
    // remove iframe src to stop playback
    const iframe = overlay.querySelector('iframe');
    if (iframe) iframe.src = '';
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'block') close();
  });

  return { overlay, modal, close };
}

const { overlay, modal, close } = createModalRoot();

async function openTrailerModal(detail) {
  const movieId = detail.movieId || detail.id;
  const content = modal.querySelector('#modal-content');
  content.innerHTML = '<p>Yükleniyor...</p>';
  overlay.style.display = 'block';

  try {
    const videos = await getMovieVideos(movieId);
    if (videos && videos.length > 0) {
      const yt = videos.find(v => v.site === 'YouTube');
      const key = yt ? yt.key : videos[0].key;
      content.innerHTML = `<iframe class="trailer-iframe" src="https://www.youtube.com/embed/${key}" allowfullscreen></iframe>`;
    } else {
      content.innerHTML = '<p>Fragman bulunamadı.</p>';
    }
  } catch (err) {
    console.error(err);
    content.innerHTML = '<p>Fragman yüklenirken hata oluştu.</p>';
  }
}

async function openDetailsModal(detail) {
  const movie = detail.movie || detail;
  const content = modal.querySelector('#modal-content');
  content.innerHTML = '<p>Yükleniyor...</p>';
  overlay.style.display = 'block';

  try {
    const data = await getMovieDetails(movie.id);
    const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '';
    const rating = data.vote_average ? data.vote_average.toFixed(1) : '—';
    const popularity = data.popularity ? Math.round(data.popularity) : '—';

    const inLib = isInLibrary(data.id);
    content.innerHTML = `
      <div class="modal-content">
        <div class="modal-poster"><img src="${poster}" alt="${data.title}" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="modal-info">
          <h2>${data.title}</h2>
          <div>Puan: ${rating} · Popülerlik: ${popularity}</div>
          <p style="margin-top:8px;">${data.overview || 'Açıklama yok.'}</p>
          <div class="modal-actions">
            <button class="btn-primary" id="modal-library-btn">${inLib ? 'Remove from My Library' : 'Add to My Library'}</button>
          </div>
        </div>
      </div>
    `;

    const libBtn = document.getElementById('modal-library-btn');
    libBtn.addEventListener('click', () => {
      if (isInLibrary(data.id)) {
        removeMovie(data.id);
        libBtn.textContent = 'Add to My Library';
      } else {
        addMovie({ id: data.id, title: data.title, poster_path: data.poster_path });
        libBtn.textContent = 'Remove from My Library';
      }
    });
  } catch (err) {
    console.error(err);
    content.innerHTML = '<p>Detaylar yüklenirken hata oluştu.</p>';
  }
}

// Window event listeners
window.addEventListener('openTrailerModal', (e) => openTrailerModal(e.detail));
window.addEventListener('openDetailsModal', (e) => openDetailsModal(e.detail));

export default { openTrailerModal, openDetailsModal };
