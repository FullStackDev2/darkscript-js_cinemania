import { getTrending, getUpcoming, getGenres } from '../api/api-service.js';

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function initHero() {
  const heroSection = document.getElementById('hero-section');
  if (!heroSection) return;

  const pageType = heroSection.getAttribute('data-page'); // 'dynamic' veya 'library' olabilir

  if (pageType === 'dynamic') {
    try {
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
    }
  } else if (pageType === 'library') {
    // Kütüphane sayfası için varsayılan hero içeriğini oluştur
    renderDefaultHero(heroSection);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Try to initialize hero when DOM is ready
  initHero().catch(err => console.error('initHero error:', err));
});

function renderHeroContent(container, film) {
  const { title, overview, backdrop_path, vote_average, id } = film;

  const updateBg = () => {
    // Always use a dark left->right overlay so theme toggle doesn't whiten the hero
    const overlay = 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)';
    
    // API Görsel Kalite Seçimi (Responsive)
    let quality = 'w780'; // Mobile için orta kalite
    if (window.innerWidth >= 1280) quality = 'original'; // Desktop için en yüksek
    else if (window.innerWidth >= 768) quality = 'w1280'; // Tablet için yüksek
    // If no backdrop_path provided by API, use local fallback images
    let imageUrl = '';
    if (backdrop_path) {
      imageUrl = `https://image.tmdb.org/t/p/${quality}${backdrop_path}`;
    } else {
      // local fallbacks (bundler-safe)
      const fallbacks = ['../../images/background/desktop-1.jpg','../../images/background/desktop-2.jpg','../../images/background/mobile-1.jpg'];
      const pick = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      try {
        imageUrl = new URL(pick, import.meta.url).href;
      } catch (err) {
        imageUrl = `/src/images/background/${pick.split('/').pop()}`;
      }
    }

    container.style.backgroundImage = `${overlay}, url(${imageUrl})`;
    container.style.backgroundPosition = 'right center';
  };

  updateBg();

  // Tema değiştiğinde veya ekran boyutu değiştiğinde arka planı güncelle
  const observer = new MutationObserver(updateBg);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('resize', updateBg); // Ekran boyutu değişirse kaliteyi tekrar kontrol et


  // slice(0, 220) ile açıklamayı kısaltabiliriz
  container.innerHTML = `
    <div class="container hero-content">
      <h1 class="hero-title">${title}</h1>
      <div class="hero-rating">${vote_average.toFixed(1)}</div> 
      <p class="hero-description">${overview.slice(0, 220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `;

  // Event Listeners (Burayı koruyoruz)
  document.getElementById('watch-trailer').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openTrailerModal', { detail: { movieId: id } }));
  });

  document.getElementById('more-details').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openDetailsModal', { detail: { movie: film } }));
  });
}

function renderDefaultHero(container) {
  container.classList.add('hero-default');
  container.innerHTML = `
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;
  // Set a fallback background image (bundler-safe)
  const fallbacks = ['../../images/background/desktop-1.jpg','../../images/background/desktop-2.jpg','../../images/background/mobile-1.jpg'];
  const pick = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  let imageUrl;
  try {
    imageUrl = new URL(pick, import.meta.url).href;
  } catch (err) {
    imageUrl = `/src/images/background/${pick.split('/').pop()}`;
  }

  const overlay = 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)';
  container.style.backgroundImage = `${overlay}, url(${imageUrl})`;
  container.style.backgroundPosition = 'right center';

  document.getElementById('go-catalog').addEventListener('click', () => {
    window.location.href = './catalog.html';
  });
}

