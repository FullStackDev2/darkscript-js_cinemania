import { getMovieDetails, getMovieVideos } from '../api/api-service.js';
import { isInLibrary, addMovie, removeMovie } from '../utils/local-storage.js';

const waitFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

function createModalRoot() {
  if (document.querySelector('.backdrop')) return;

  const overlay = document.createElement('div');
  overlay.className = 'backdrop is-hidden';
  overlay.setAttribute('data-modal', '');

  const modalElement = document.createElement('div');
  modalElement.className = 'modal';

  const spriteHref = `${import.meta.env.BASE_URL}images/icons/symbol-defs.svg#icon-Vectorx`;

  modalElement.innerHTML = `
  <button type="button" class="modal-close-btn" data-modal-close aria-label="Close modal">
    <svg class="icon icon-Vectorx">
      <use href="${spriteHref}"></use>
    </svg>
  </button>
  <div class="modal-content" id="modal-content"></div>
`;

  overlay.appendChild(modalElement);
  document.body.appendChild(overlay);

  const closeBtn = modalElement.querySelector('[data-modal-close]');

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeGlobalModal();
  });

  closeBtn.addEventListener('click', closeGlobalModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeGlobalModal();
  });
}

function closeGlobalModal() {
  const overlay = document.querySelector('.backdrop');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  const iframe = content.querySelector('iframe');
  if (iframe) iframe.src = '';

  overlay.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  setTimeout(() => {
    content.innerHTML = '';
  }, 250);
}

createModalRoot();

export async function openDetailsModal(movieId) {
  const overlay = document.querySelector('.backdrop');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  overlay.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  content.innerHTML =
    '<div style="text-align:center; padding:50px;">🎬 Loading...</div>';

  await waitFrame();

  try {
    const data = await getMovieDetails(movieId);

    await waitFrame();

    const posterUrl = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image';

    const genresList = data.genres
      ? data.genres.map(g => g.name).join(', ')
      : 'Unknown';

    const inLib = isInLibrary(data.id);

    content.innerHTML = `
      <div class="modal-img-wrapper">
        <img src="${posterUrl}" alt="${data.title}" class="modal-img" loading="lazy" />
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

    const libBtn = document.getElementById('modal-library-btn');

    libBtn.addEventListener('click', () => {
      if (isInLibrary(data.id)) {
        removeMovie(data.id);
        libBtn.textContent = 'Add to my library';
        libBtn.classList.remove('active');
      } else {
        addMovie({
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
          release_date: data.release_date,
          genres: data.genres,
        });

        libBtn.textContent = 'Remove from library';
        libBtn.classList.add('active');
      }
    });
  } catch (err) {
    console.error('Modal Hatası:', err);
    content.innerHTML =
      '<p style="text-align:center; padding:20px;">Error loading movie details.</p>';
  }
}

const containerIds = [
  'weeklyTrends',
  'moviesContainer',
  'catalog-list',
  'movieList',
];

containerIds.forEach(id => {
  const container = document.getElementById(id);

  if (!container) return;

  container.addEventListener('click', e => {
    const card =
      e.target.closest('.movie-card') ||
      e.target.closest('.movie-card-overlay');

    if (card && card.dataset.id) {
      e.preventDefault();
      openDetailsModal(card.dataset.id);
    }
  });
});

window.addEventListener('openDetailsModal', event => {
  const movieData = event.detail.movie;

  if (movieData && movieData.id) {
    openDetailsModal(movieData.id);
  }
});

window.addEventListener('openTrailerModal', async event => {
  const movieId = event.detail.movieId;
  const overlay = document.querySelector('.backdrop');
  const content = document.getElementById('modal-content');

  if (!overlay || !content) return;

  overlay.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  content.innerHTML =
    '<div style="text-align:center; padding:50px;">🎬 Loading Trailer...</div>';

  await waitFrame();

  try {
    const videos = await getMovieVideos(movieId);

    if (videos && videos.length > 0) {
      const trailerKey = videos[0].key;
      const thumbnail = `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`;

      content.innerHTML = `
    <div class="trailer-preview">
      <img
        src="${thumbnail}"
        alt="Trailer preview"
        loading="lazy"
        class="trailer-thumbnail"
      >
    </div>
  `;

      const thumbnailImg = content.querySelector('.trailer-thumbnail');

      thumbnailImg.addEventListener('click', () => {
        content.innerHTML = `
    <div class="trailer-container">
      <iframe
        src="https://www.youtube.com/embed/${trailerKey}?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  `;
      });
    } else {
      content.innerHTML =
        '<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>';
    }
  } catch (error) {
    console.error('Trailer loading error:', error);
    content.innerHTML =
      '<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>';
  }
});

export default { openDetailsModal };
