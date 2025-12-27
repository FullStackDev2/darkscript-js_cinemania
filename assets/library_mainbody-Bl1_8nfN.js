const r="98ff2d6267ceea8e039422b0f46fb813",a="https://api.themoviedb.org/3/trending/movie/day";fetch(`${a}?api_key=${r}`).then(n=>n.json()).then(n=>{const e=n.results.slice(0,9);d(e)}).catch(console.error);const c=document.getElementById("movieList");function d(n){c.innerHTML="",n.forEach(e=>{var o;const t=document.createElement("article");t.className="movie-card",t.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}">
      <div class="movie-info">
        <h3>${e.title}</h3>
        <p>${e.genre} | ${(o=e.release_date)==null?void 0:o.slice(0,4)}</p>
      </div>
    `,c.appendChild(t)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("genreBtn"),e=document.getElementById("genreDropdown"),t=document.getElementById("genreIcon"),o=e.querySelectorAll("li");n.addEventListener("click",s=>{s.stopPropagation(),e.classList.toggle("active"),t.classList.toggle("rotate")}),o.forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation(),e.classList.remove("active"),t.classList.remove("rotate")})}),document.addEventListener("click",()=>{e.classList.remove("active"),t.classList.remove("rotate")}),document.addEventListener("keydown",s=>{s.key==="Escape"&&(e.classList.remove("active"),t.classList.remove("rotate"))})});
//# sourceMappingURL=library_mainbody-Bl1_8nfN.js.map
