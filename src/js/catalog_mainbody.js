const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  27: "Horror",
  9648: "Mystery",
  878: "Sci-Fi",
  53: "Thriller",
  10749: "Romance"
};



const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const IMAGE_HERO = "https://image.tmdb.org/t/p/original";



function getStars(voteAverage) {
  const rating = Math.round(voteAverage / 2);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "★" : "☆";
  }
  return stars;
}



function fetchWeeklyTrends() {
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      renderWeeklyTrends(data.results);
    })
    .catch(err => console.error("Weekly trends error:", err));
}

function renderWeeklyTrends(movies) {
  const container = document.getElementById("weeklyTrends");
  if (!container) return;

  container.innerHTML = "";

  movies.slice(0, 1).forEach(movie => {
    const stars = getStars(movie.vote_average);

    const genres = movie.genre_ids
      .map(id => GENRES[id])
      .filter(Boolean)
      .slice(0, 2)
      .join(", ");

    const poster = movie.poster_path
      ? IMAGE_BASE + movie.poster_path
      : "./images/no-poster.jpg";

    const card = `
      <a href="#" class="movie-card large" data-id="${movie.id}">
        <img src="${poster}" alt="${movie.title}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-meta">
              ${genres} | ${movie.release_date?.split("-")[0]}
            </p>
          </div>
          <div class="movie-card-rating">
            ${stars}
          </div>
        </div>
      </a>
    `;

    container.insertAdjacentHTML("beforeend", card);
  });
}



function fetchMovieOfTheMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-31`;

  fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US` +
    `&primary_release_date.gte=${startDate}` +
    `&primary_release_date.lte=${endDate}` +
    `&sort_by=popularity.desc`
  )
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) return;


      const movie = data.results.find(m => m.backdrop_path);
      if (!movie) return;

      renderMovieDetails(movie);
    })
    .catch(err => console.error("Upcoming error:", err));
}



function renderMovieDetails(movie) {
  const backdrop = document.getElementById("heroBackdrop");
  if (!backdrop) return;

  backdrop.src = IMAGE_HERO + movie.backdrop_path;

  document.getElementById("movieTitle").textContent = movie.title;
  document.getElementById("movieDate").textContent =
    movie.release_date.split("-").reverse().join(".");

  document.getElementById("movieGenre").textContent =
    movie.genres?.map(g => g.name).join(", ") || "";

  document.getElementById("movieVoteAvg").textContent =
    movie.vote_average.toFixed(1);

  document.getElementById("movieVoteCount").textContent =
    movie.vote_count;

  document.getElementById("moviePopularity").textContent =
    movie.popularity.toFixed(1);

  document.getElementById("movieOverview").textContent =
    movie.overview;
}


document.addEventListener("DOMContentLoaded", () => {
  fetchWeeklyTrends();
  fetchMovieOfTheMonth();
});
