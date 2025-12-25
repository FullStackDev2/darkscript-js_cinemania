// Hero: trending film getir ve öne çıkan bir kahraman oluştur (mobil öncelikli)
const HERO_API_KEY = 'YOUR_API_KEY'; // <-- Değiştir TMDB API anahtarıyla
const HERO_BASE = 'https://api.themoviedb.org/3';

function pickRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

async function fetchTrending() {
	if (!HERO_API_KEY || HERO_API_KEY === 'YOUR_API_KEY') {
		console.warn('TMDB API key not set in hero.js — hero will use default content.');
		return null;
	}

	const url = `${HERO_BASE}/trending/movie/day?api_key=${HERO_API_KEY}`;
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error('Network response not ok');
		const data = await res.json();
		return data.results || [];
	} catch (err) {
		console.error('Error fetching trending movies', err);
		return null;
	}
}

async function initHero() {
	const heroSection = document.getElementById('hero-section');
	if (!heroSection) return;

	const titleEl = heroSection.querySelector('.hero-title');
	const descEl = heroSection.querySelector('.hero-description');
	const btn = heroSection.querySelector('#hero-btn');

	const results = await fetchTrending();
	if (results && results.length > 0) {
		const film = pickRandom(results);
		const backdrop = film.backdrop_path || film.poster_path;

		function applyHeroBackground(path) {
			if (!path) return;
			const isLight = document.body.classList.contains('light-mode');
			// set CSS vars: --hero-image and --hero-overlay (refers to hero overlay vars)
			heroSection.style.setProperty('--hero-image', `url('https://image.tmdb.org/t/p/original${path}')`);
			heroSection.style.setProperty('--hero-overlay', isLight ? 'var(--hero-overlay-light)' : 'var(--hero-overlay-dark)');
		}

		if (backdrop) applyHeroBackground(backdrop);

		// Update overlay when theme changes (observe body class changes)
		const observer = new MutationObserver(() => {
			applyHeroBackground(backdrop);
		});
		observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

		titleEl.textContent = film.title || film.name || titleEl.textContent;
		descEl.textContent = film.overview ? film.overview.slice(0, 220) + (film.overview.length > 220 ? '...' : '') : descEl.textContent;

		// Detaylar için özel olay yayını — diğer modüller (modal) dinleyebilir ve ayrıntıları gösterebilir
		btn.addEventListener('click', () => {
			const evt = new CustomEvent('heroMoreDetails', { detail: film });
			window.dispatchEvent(evt);
		});
	} else {
		// fallback: API anahtarı yok veya sonuç yok — varsayılan kahramanı koru
		btn.addEventListener('click', () => {
			window.location.href = './catalog.html';
		});
	}
}

document.addEventListener('DOMContentLoaded', initHero);
