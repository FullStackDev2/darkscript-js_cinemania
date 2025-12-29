import{a as q}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();function x(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(x,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}console.log("[header] header.js checking in");let d=null;function O(e){d||(d=document.createElement("div"),d.className="mobile-menu-overlay",d.addEventListener("click",e),document.body.appendChild(d))}function U(){d&&(d.remove(),d=null)}function D(e,t){t.classList.add("open"),e.setAttribute("aria-expanded","true"),O(()=>h(e,t)),document.body.style.overflow="hidden"}function h(e,t){t.classList.remove("open"),e&&e.setAttribute("aria-expanded","false"),U(),document.body.style.overflow=""}document.addEventListener("click",e=>{console.log("[header] Global click on:",e.target);const t=e.target.closest(".menu-open-btn");if(t){console.log("[header] Menu btn detected!");const n=document.querySelector(".mobile-menu");if(!n)return;console.log("[header] Menu toggle clicked"),n.classList.contains("open")?h(t,n):D(t,n);return}if(e.target.closest(".mobile-menu .nav-link")){const n=document.querySelector(".mobile-menu"),s=document.querySelector(".menu-open-btn");n&&n.classList.contains("open")&&setTimeout(()=>h(s,n),100)}});document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".mobile-menu"),o=document.querySelector(".menu-open-btn");t&&t.classList.contains("open")&&h(o,t)}});function R(){var o;const e=window.location.pathname;document.querySelectorAll(".nav-link").forEach(n=>{n.classList.remove("active"),e.includes(n.getAttribute("href").replace("./",""))&&n.classList.add("active")}),(e==="/"||e.endsWith("index.html"))&&((o=document.querySelector('.nav-link[href="./index.html"]'))==null||o.classList.add("active"))}document.addEventListener("DOMContentLoaded",R);const F="98ff2d6267ceea8e039422b0f46fb813",G="https://api.themoviedb.org/3",T=q.create({baseURL:G,params:{api_key:F,language:"en-US"}}),Y=async(e="day")=>{try{const{data:t}=await T.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},K=async e=>{try{const{data:t}=await T.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}};function z(e){return e[Math.floor(Math.random()*e.length)]}async function V(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t==="dynamic")try{const o=await Y("day");if(o&&o.length>0){const n=z(o);W(e,n)}else b(e)}catch(o){console.error("Hero yüklenirken hata:",o),b(e)}else t==="library"&&b(e)}document.addEventListener("DOMContentLoaded",()=>{V().catch(e=>console.error("initHero error:",e))});function W(e,t){const{title:o,overview:n,backdrop_path:s,vote_average:a,id:r}=t,i=()=>{const l="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let m="w780";window.innerWidth>=1280?m="original":window.innerWidth>=768&&(m="w1280");let p="";if(s)p=`https://image.tmdb.org/t/p/${m}${s}`;else{const I=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],P=I[Math.floor(Math.random()*I.length)];try{p=new URL(P,import.meta.url).href}catch{p=`/src/images/background/${P.split("/").pop()}`}}e.style.backgroundImage=`${l}, url(${p})`,e.style.backgroundPosition="right center"};i(),new MutationObserver(i).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",i),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="hero-rating">${a.toFixed(1)}</div> 
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,document.getElementById("watch-trailer").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:r}}))}),document.getElementById("more-details").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))})}function b(e){e.classList.add("hero-default"),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const t=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],o=t[Math.floor(Math.random()*t.length)];let n;try{n=new URL(o,import.meta.url).href}catch{n=`/src/images/background/${o.split("/").pop()}`}const s="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";e.style.backgroundImage=`${s}, url(${n})`,e.style.backgroundPosition="right center",document.getElementById("go-catalog").addEventListener("click",()=>{window.location.href="./catalog.html"})}const S=document.getElementById("openTeamModal"),B=document.getElementById("closeTeamModal"),c=document.getElementById("teamModal");S&&c&&S.addEventListener("click",e=>{e.preventDefault(),c.classList.add("is-open"),document.body.style.overflow="hidden"});B&&c&&B.addEventListener("click",()=>{c.classList.remove("is-open"),document.body.style.overflow="auto"});c&&c.addEventListener("click",e=>{e.target===c&&(c.classList.remove("is-open"),document.body.style.overflow="auto")});window.addEventListener("keydown",e=>{e.key==="Escape"&&c&&c.classList.contains("is-open")&&(c.classList.remove("is-open"),document.body.style.overflow="auto")});const A="myLibrary";function M(){try{const e=localStorage.getItem(A);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function C(e){try{localStorage.setItem(A,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function _(e){return M().some(o=>Number(o.id)===Number(e))}function J(e){const t=M();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),C(t))}function X(e){let t=M();t=t.filter(o=>Number(o.id)!==Number(e)),C(t)}function Q(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const o=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&L()}),o.addEventListener("click",L),document.addEventListener("keydown",n=>{n.key==="Escape"&&L()})}function L(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}Q();async function Z(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await K(e),s=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",a=n.genres?n.genres.map(m=>m.name).join(", "):"Unknown",r=_(n.id),i=n.release_date?n.release_date.slice(0,4):"N/A",u=`
      <div class="modal-img-wrapper">
        <img src="${s}" alt="${n.title}" class="modal-img" />
      </div>
      
      <div class="modal-info">
        <h2 class="modal-title">${n.title.toUpperCase()}</h2>
        
        <div class="modal-stats">
          <div class="stats-item">
            <span class="stats-key">Vote / Votes</span>
            <span class="stats-value">
              <span class="vote-average">${n.vote_average.toFixed(1)}</span> / 
              <span class="vote-count">${n.vote_count}</span>
            </span>
          </div>
          <div class="stats-item">
            <span class="stats-key">Popularity</span>
            <span class="stats-value">${n.popularity.toFixed(1)}</span>
          </div>
          <div class="stats-item">
            <span class="stats-key">Genre</span>
            <span class="stats-value">${a}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${n.overview||"No description available."}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${r?"active":""}" id="modal-library-btn">
            ${r?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;o.innerHTML=u;const l=document.getElementById("modal-library-btn");l.addEventListener("click",()=>{if(_(n.id))X(n.id),l.textContent="Add to my library",l.classList.remove("active");else{const m={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};J(m),l.textContent="Remove from library",l.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const ee=["weeklyTrends","moviesContainer","catalog-list","movieList"];ee.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const s=n.dataset.id;Z(s)}})});class te{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:s,currentPage:a=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=a,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=s,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const s=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${s}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],s=3;let a=o-1,r=o+1;a<1&&(a=1,r=Math.min(s,t)),r>t&&(r=t,a=Math.max(1,t-s+1)),a>1&&n.push("...");for(let i=a;i<=r;i++)n.push(i);return r<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}const v="98ff2d6267ceea8e039422b0f46fb813",f="https://api.themoviedb.org/3",ne="https://image.tmdb.org/t/p/w500";let $="trending",y="",g="",k={};fetch(`${f}/genre/movie/list?api_key=${v}&language=en-US`).then(e=>e.json()).then(e=>{e.genres.forEach(t=>{k[t.id]=t.name})});function oe(e,t){if(!e)return;e.innerHTML="";const o=Math.floor(t/2),n=t%2>=1;for(let s=0;s<5;s++){let a="empty";s<o?a="full":s===o&&n&&(a="half");const r=`star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${r}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${r}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${a==="full"?`url(#${r}-full)`:a==="half"?`url(#${r}-half)`:"#bfbfbf"}" />
      </svg>`}}function E(e=1){$="trending",fetch(`${f}/trending/movie/week?api_key=${v}&page=${e}`).then(t=>t.json()).then(t=>{N(t.results||[]),j(t.total_results,e)}).catch(t=>console.error(t))}function H(e=1){$="search";let t=y?`${f}/search/movie?api_key=${v}&query=${encodeURIComponent(y)}&page=${e}${g?`&year=${g}`:""}`:`${f}/discover/movie?api_key=${v}&primary_release_year=${g}&page=${e}`;fetch(t).then(o=>o.json()).then(o=>{N(o.results||[]),j(o.total_results,e)}).catch(o=>console.error(o))}function N(e){const t=document.getElementById("moviesContainer"),o=document.getElementById("emptyMessage");if(t){if(t.innerHTML="",!e||!e.length){o.hidden=!1;return}o.hidden=!0,e.forEach(n=>{const s=n.poster_path?`${ne}${n.poster_path}`:"./placeholder.jpg",a=n.release_date?n.release_date.slice(0,4):"N/A",r=n.genre_ids&&Object.keys(k).length?n.genre_ids.map(l=>k[l]).filter(Boolean).slice(0,2).join(", "):"Unknown",i=document.createElement("a");i.className="movie-card",i.dataset.id=n.id,i.href="#",i.innerHTML=`
      <img src="${s}" alt="${n.title}" loading="lazy">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3 class="movie-title">${n.title}</h3>
          <p class="movie-meta">${r} | ${a}</p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `;const u=i.querySelector(".movie-rating-stars");oe(u,n.vote_average),t.appendChild(i)})}}function j(e,t){const a=e>480?480:e;new te({containerId:"pagination",totalItems:a,itemsPerPage:20,currentPage:t,onPageChange:r=>{$==="trending"?E(r):H(r);const i=document.querySelector(".movie-list");i&&i.scrollIntoView({behavior:"smooth"})}})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("yearBtn"),t=document.getElementById("yearDropdown"),o=document.getElementById("selectedYear"),n=document.querySelector(".search-input1"),s=document.querySelector(".search-btn");E(1),e&&t&&(e.addEventListener("click",a=>{a.stopPropagation(),t.classList.toggle("open")}),t.addEventListener("click",a=>{a.target.tagName==="LI"&&(g=a.target.dataset.year||"",o.textContent=a.target.textContent,t.classList.remove("open"))}),document.addEventListener("click",()=>t.classList.remove("open"))),s&&s.addEventListener("click",()=>{y=n.value.trim(),!y&&!g?E(1):H(1)}),n&&n.addEventListener("keypress",a=>{a.key==="Enter"&&s.click()})});const se="98ff2d6267ceea8e039422b0f46fb813",ae="https://api.themoviedb.org/3";document.getElementById("emptySection");const re=document.getElementById("movieList");document.getElementById("moviesContainer");document.getElementById("loadMoreBtn");document.getElementById("emptyState");let w={};fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=98ff2d6267ceea8e039422b0f46fb813&language=en-US").then(e=>e.json()).then(e=>{e.genres.forEach(t=>{w[t.id]=t.name})});document.addEventListener("DOMContentLoaded",()=>{document.getElementById("movieList")&&(ie(),de())});function ie(){fetch(`${ae}/trending/movie/day?api_key=${se}`).then(e=>{if(!e.ok)throw new Error("HTTP error: "+e.status);return e.json()}).then(e=>{!e||!Array.isArray(e.results)||(re.innerHTML="",le(e.results.slice(0,9)))}).catch(e=>console.error("Initial fetch error:",e))}function ce(e){const t=Math.round(e/2);return"★".repeat(t)+"☆".repeat(5-t)}function le(e){const t=document.getElementById("movieList");e.forEach(o=>{var i;if(!o.poster_path)return;const n=((i=o.release_date)==null?void 0:i.slice(0,4))||"N/A",s=o.genre_ids&&w?o.genre_ids.map(u=>w[u]).filter(Boolean).slice(0,2).join(", "):"Unknown",a=ce(o.vote_average),r=document.createElement("article");r.className="movie-card",r.dataset.id=o.id,r.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500${o.poster_path}" alt="${o.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${o.title}</h3>
          <p>${s} | ${n}</p>
        </div>
        <div class="movie-card-rating">${a}</div>
      </div>
    `,t.appendChild(r)})}function de(){const e=document.getElementById("genreBtn"),t=document.getElementById("genreDropdown"),o=document.getElementById("genreIcon");e.addEventListener("click",n=>{n.stopPropagation(),t.classList.toggle("active"),o.classList.toggle("rotate")}),t.addEventListener("click",n=>{n.target.tagName==="LI"&&(n.target.dataset.genreId,t.classList.remove("active"),o.classList.remove("rotate"))}),document.addEventListener("click",()=>{t.classList.remove("active"),o.classList.remove("rotate")}),document.addEventListener("keydown",n=>{n.key==="Escape"&&(t.classList.remove("active"),o.classList.remove("rotate"))})}x();
//# sourceMappingURL=main-D5wRIM0Q.js.map
