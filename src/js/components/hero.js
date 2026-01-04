import { getTrending, getUpcoming, getGenres, getMovieVideos } from '../api/api-service.js';
import { openTrailerErrorPopup } from './trailer_popup.js';
import { showLoader, hideLoader } from '../utils/loader.js';
function renderStarsToRating(el, rating) {
  if (!el) return;

  el.innerHTML = '';

  const normalized = Math.max(0, Math.min(10, rating || 0));
  const fullStars = Math.floor(normalized / 2);
  const hasHalfStar = normalized / 2 - fullStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    let fillType = 'empty';

    if (i < fullStars) {
      fillType = 'full';
    } else if (i === fullStars && hasHalfStar) {
      fillType = 'half';
    }

    const gradientId = `hero-star-${Math.random().toString(36).slice(2)}`;

    el.innerHTML += `
      <svg viewBox="0 0 32 32" width="14" height="14" class="star">
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
        <path d="M16 2l4.09 9.63L30 12.27l-7 6.86L24.18 30 16 24.8 7.82 30 9 19.13l-7-6.86 9.91-1.64L16 2z"
          fill="${fillType === 'full' ? `url(#${gradientId}-full)` : fillType === 'half' ? `url(#${gradientId}-half)` : '#bfbfbf'}"
          stroke="none" />
      </svg>
    `;
  }
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function initHero() {
  const heroSection = document.getElementById('hero-section');
  if (!heroSection) return;

  const pageType = heroSection.getAttribute('data-page'); // 'dynamic', 'library', or other

  // Library page uses static CSS background — skip JS processing
  if (pageType === 'library') {
    return;
  }

  if (pageType === 'dynamic') {
    try {
        showLoader();
        const movies = await getTrending('day');

        if (movies && movies.length > 0) {
          const film = pickRandom(movies);
          // API'den gelen filmle hero içeriğini oluştur
          renderHeroContent(heroSection, film);
        } else {
          // Api'den veri gelmezse varsayılan hero içeriğini oluştur
          renderDefaultHero(heroSection);
        }
    } catch (err) {
        console.error('Hero yüklenirken hata:', err);
        renderDefaultHero(heroSection);
  } finally {
    hideLoader();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Try to initialize hero when DOM is ready
  initHero().catch(err => console.error('initHero error:', err));
});

function renderHeroContent(container, film) {
  const { title, overview, backdrop_path, vote_average, id } = film;

  const updateBg = () => {
    const overlay = 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)';
    const isRetina = window.devicePixelRatio > 1.1;
    
    let imageUrl = '';
    if (backdrop_path) {
        let quality = 'w780'; 
        if (window.innerWidth >= 1280) quality = isRetina ? 'original' : 'w1280'; 
        else if (window.innerWidth >= 768) quality = isRetina ? 'w1280' : 'w780';
        imageUrl = `https://image.tmdb.org/t/p/${quality}${backdrop_path}`;
    } else {
  // API'den görsel gelmezse src/images/background klasöründeki görseli kullan
  const suffix = isRetina ? '-@2x' : '';
  imageUrl = `./images/background/desktop-1${suffix}.jpg`;
    }

    container.style.backgroundImage = `${overlay}, url('${imageUrl}')`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
  };

  updateBg();
  const observer = new MutationObserver(updateBg);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('resize', updateBg);

  container.innerHTML = `
    <div class="container hero-content">
      <h1 class="hero-title">${title}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${overview.slice(0, 220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `;

  renderStarsToRating(container.querySelector('.hero-rating-stars'), vote_average);

  // --- popup ---

container.querySelector('#watch-trailer').onclick = async (e) => {
    e.preventDefault();
    showLoader();
    
    try {
      
      const videos = await getMovieVideos(id);
     
      if (videos && videos.length > 0) { 
        window.dispatchEvent(new CustomEvent('openTrailerModal', { detail: { movieId: id } }));
      } else {
        openTrailerErrorPopup();
      }

    } catch (error) {
      openTrailerErrorPopup();
    } finally {
      hideLoader();
    }
  };
  // --------------------------

  container.querySelector('#more-details').onclick = () => {
    window.dispatchEvent(new CustomEvent('openDetailsModal', { detail: { movie: film } }));
  };
}

function renderDefaultHero(container) {
  container.classList.add('hero-default');

  const updateDefaultBg = () => {
    const isRetina = window.devicePixelRatio > 1.1;
    const overlay = 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)';
    
    // Görselindeki isimlendirmeye göre: mobil-1 (i ile)
    let fileName = window.innerWidth < 768 ? 'mobil-1' : 'desktop-1';
    if (isRetina) fileName += '-@2x';
    
    // Public içindeki dosya yolu
    const base = import.meta.env.BASE_URL || '/';
  const imageUrl = `./images/background/${fileName}.jpg`.replace(/\/+/g, '/');

    container.style.backgroundImage = `${overlay}, url('${imageUrl}')`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
  };

  updateDefaultBg();
  window.addEventListener('resize', updateDefaultBg);

  container.innerHTML = `
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;

  const goCatalog = container.querySelector('#go-catalog');
  if (goCatalog) {
    goCatalog.onclick = () => {
      window.location.href = './catalog.html';
    };
  }
}