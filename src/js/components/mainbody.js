// ======================
// API
// ======================
export const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// ======================
// STAR RENDER
// ======================
export function renderStarsToRating(el, rating) {
  if (!el) return;
  el.innerHTML = "";

  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  for (let i = 0; i < 5; i++) {
    let fillType = "empty";
    if (i < fullStars) fillType = "full";
    else if (i === fullStars && hasHalfStar) fillType = "half";

    const gid = `star-${Math.random().toString(36).slice(2)}`;

    el.innerHTML += `
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${gid}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${gid}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path
          d="M24.622 30L16 24.173 7.378 30l3.135-9.286L2.388 15.14h10.024L16 5.827l3.588 9.313h10.024l-8.125 5.569z"
          fill="${
            fillType === "full"
              ? `url(#${gid}-full)`
              : fillType === "half"
              ? `url(#${gid}-half)`
              : "#bfbfbf"
          }"
        />
      </svg>
    `;
  }
}

// ======================
// LIBRARY
// ======================
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function isFavorite(id) {
  return getFavorites().some(m => m.id === id);
}

export function toggleFavorite(movie) {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favs.some(m => m.id === movie.id)) {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favs.filter(m => m.id !== movie.id))
    );
    return;
  }

  const genre_ids = Array.isArray(movie.genre_ids)
    ? movie.genre_ids
    : Array.isArray(movie.genres)
    ? movie.genres.map(g => g.id)
    : [];

  favs.push({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    genre_ids
  });

  localStorage.setItem("favorites", JSON.stringify(favs));
}













