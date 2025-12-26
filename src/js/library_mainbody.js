
const API_KEY = "98ff2d6267ceea8e039422b0f46fb813";
const BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";

fetch(`${BASE_URL}?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const limitedMovies = data.results.slice(0, 9); // 👈 BURASI
    renderMovies(limitedMovies);
  })
  .catch(console.error);

const movieList = document.getElementById("movieList");

function renderMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.genre} | ${movie.release_date?.slice(0,4)}</p>
      </div>
    `;

    movieList.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const genreBtn = document.getElementById('genreBtn');
  const genreDropdown = document.getElementById('genreDropdown');
  const genreIcon = document.getElementById('genreIcon');
  const genreItems = genreDropdown.querySelectorAll('li');

  genreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    genreDropdown.classList.toggle('active');
    genreIcon.classList.toggle('rotate');
  });


  genreItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();

      genreDropdown.classList.remove('active');
      genreIcon.classList.remove('rotate');
    });
  });


  document.addEventListener('click', () => {
    genreDropdown.classList.remove('active');
    genreIcon.classList.remove('rotate');
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      genreDropdown.classList.remove('active');
      genreIcon.classList.remove('rotate');
    }
  });
});

function populateGenres(genres) {
  const genreDropdown = document.getElementById("genreDropdown");
  genreDropdown.innerHTML = "";

  genres.forEach(genre => {
    const li = document.createElement("li");
    li.textContent = genre.name;
    li.dataset.genreId = genre.id;

    genreDropdown.appendChild(li);
  });
}
