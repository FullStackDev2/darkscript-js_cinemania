import{a as F}from"./vendor-BWC8OeqA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();console.log("[header] header.js checking in");let l=null;function q(t){l||(l=document.createElement("div"),l.className="mobile-menu-overlay",l.addEventListener("click",t),document.body.appendChild(l))}function j(){l&&(l.remove(),l=null)}function O(t,e){e.classList.add("open"),t.setAttribute("aria-expanded","true"),q(()=>h(t,e)),document.body.style.overflow="hidden"}function h(t,e){e.classList.remove("open"),t&&t.setAttribute("aria-expanded","false"),j(),document.body.style.overflow=""}document.addEventListener("click",t=>{console.log("[header] Global click on:",t.target);const e=t.target.closest(".menu-open-btn");if(e){console.log("[header] Menu btn detected!");const n=document.querySelector(".mobile-menu");if(!n)return;console.log("[header] Menu toggle clicked"),n.classList.contains("open")?h(e,n):O(e,n);return}if(t.target.closest(".mobile-menu .nav-link")){const n=document.querySelector(".mobile-menu"),a=document.querySelector(".menu-open-btn");n&&n.classList.contains("open")&&setTimeout(()=>h(a,n),100)}});document.addEventListener("keydown",t=>{if(t.key==="Escape"){const e=document.querySelector(".mobile-menu"),o=document.querySelector(".menu-open-btn");e&&e.classList.contains("open")&&h(o,e)}});function U(){var o;const t=window.location.pathname;document.querySelectorAll(".nav-link").forEach(n=>{n.classList.remove("active"),t.includes(n.getAttribute("href").replace("./",""))&&n.classList.add("active")}),(t==="/"||t.endsWith("index.html"))&&((o=document.querySelector('.nav-link[href="./index.html"]'))==null||o.classList.add("active"))}document.addEventListener("DOMContentLoaded",U);const R="98ff2d6267ceea8e039422b0f46fb813",D="https://api.themoviedb.org/3",x=F.create({baseURL:D,params:{api_key:R,language:"en-US"}}),G=async(t="day")=>{try{const{data:e}=await x.get(`/trending/movie/${t}`);return e.results}catch(e){throw console.error(`Trend filmler (${t}) alınamadı:`,e),e}},Y=async t=>{try{const{data:e}=await x.get(`/movie/${t}`);return e}catch(e){throw console.error("Film detayları alınamadı:",e),e}};function z(t){return t[Math.floor(Math.random()*t.length)]}async function K(){const t=document.getElementById("hero-section");if(!t)return;const e=t.getAttribute("data-page");if(e==="dynamic")try{const o=await G("day");if(o&&o.length>0){const n=z(o);V(t,n)}else b(t)}catch(o){console.error("Hero yüklenirken hata:",o),b(t)}else e==="library"&&b(t)}document.addEventListener("DOMContentLoaded",()=>{K().catch(t=>console.error("initHero error:",t))});function V(t,e){const{title:o,overview:n,backdrop_path:a,vote_average:r,id:s}=e,i=()=>{const c="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let d="w780";window.innerWidth>=1280?d="original":window.innerWidth>=768&&(d="w1280");let p="";if(a)p=`https://image.tmdb.org/t/p/${d}${a}`;else{const P=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],I=P[Math.floor(Math.random()*P.length)];try{p=new URL(I,import.meta.url).href}catch{p=`/src/images/background/${I.split("/").pop()}`}}t.style.backgroundImage=`${c}, url(${p})`,t.style.backgroundPosition="right center"};i(),new MutationObserver(i).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",i),t.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="hero-rating">${r.toFixed(1)}</div> 
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,document.getElementById("watch-trailer").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:s}}))}),document.getElementById("more-details").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:e}}))})}function b(t){t.classList.add("hero-default"),t.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const e=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],o=e[Math.floor(Math.random()*e.length)];let n;try{n=new URL(o,import.meta.url).href}catch{n=`/src/images/background/${o.split("/").pop()}`}const a="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";t.style.backgroundImage=`${a}, url(${n})`,t.style.backgroundPosition="right center",document.getElementById("go-catalog").addEventListener("click",()=>{window.location.href="./catalog.html"})}const W=document.getElementById("openTeamModal"),J=document.getElementById("closeTeamModal"),u=document.getElementById("teamModal");W.addEventListener("click",()=>{u.style.display="flex"});J.addEventListener("click",()=>{u.style.display="none"});u.addEventListener("click",t=>{t.target===u&&(u.style.display="none")});const _="myLibrary";function M(){try{const t=localStorage.getItem(_);return t?JSON.parse(t):[]}catch(t){return console.error("localStorage read error",t),[]}}function T(t){try{localStorage.setItem(_,JSON.stringify(t))}catch(e){console.error("localStorage write error",e)}}function B(t){return M().some(o=>Number(o.id)===Number(t))}function X(t){const e=M();e.some(o=>Number(o.id)===Number(t.id))||(e.push(t),T(e))}function Q(t){let e=M();e=e.filter(o=>Number(o.id)!==Number(t)),T(e)}function Z(){if(document.querySelector(".backdrop"))return;const t=document.createElement("div");t.className="backdrop is-hidden",t.setAttribute("data-modal","");const e=document.createElement("div");e.className="modal",e.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,t.appendChild(modal),document.body.appendChild(t);const o=e.querySelector("[data-modal-close]");t.addEventListener("click",n=>{n.target===t&&L()}),o.addEventListener("click",L),document.addEventListener("keydown",n=>{n.key==="Escape"&&L()})}function L(){const t=document.querySelector(".backdrop");if(t){t.classList.add("is-hidden"),document.body.classList.remove("modal-open");const e=document.getElementById("modal-content");e&&(e.innerHTML="")}}Z();async function ee(t){const e=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',e.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await Y(t),a=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",r=n.genres?n.genres.map(d=>d.name).join(", "):"Unknown",s=B(n.id),i=n.release_date?n.release_date.slice(0,4):"N/A",g=`
      <div class="modal-img-wrapper">
        <img src="${a}" alt="${n.title}" class="modal-img" />
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
            <span class="stats-value">${r}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${n.overview||"No description available."}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${s?"active":""}" id="modal-library-btn">
            ${s?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;o.innerHTML=g;const c=document.getElementById("modal-library-btn");c.addEventListener("click",()=>{if(B(n.id))Q(n.id),c.textContent="Add to my library",c.classList.remove("active");else{const d={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};X(d),c.textContent="Remove from library",c.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const te=["weeklyTrends","moviesContainer","catalog-list","movieList"];te.forEach(t=>{const e=document.getElementById(t);e&&e.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const a=n.dataset.id;ee(a)}})});class ne{constructor({containerId:e,totalItems:o,itemsPerPage:n,onPageChange:a,currentPage:r=1}){this.container=document.getElementById(e),this.totalItems=o,this.itemsPerPage=n,this.currentPage=r,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=a,this.render()}pad(e){return String(e).padStart(2,"0")}goToPage(e){e<1||e>this.totalPages||e===this.currentPage||(this.currentPage=e,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let e=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")e+='<span class="pagination-dots">...</span>';else{const a=n===this.currentPage?"active":"";e+=`<button class="pagination-btn pagination-number ${a}" data-page="${n}">${this.pad(n)}</button>`}}),e+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=e,this.addEventListeners()}getPaginationRange(){const e=this.totalPages,o=this.currentPage,n=[],a=3;let r=o-1,s=o+1;r<1&&(r=1,s=Math.min(a,e)),s>e&&(s=e,r=Math.max(1,e-a+1)),r>1&&n.push("...");for(let i=r;i<=s;i++)n.push(i);return s<e&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const e=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");e&&e.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}const v="98ff2d6267ceea8e039422b0f46fb813",f="https://api.themoviedb.org/3",oe="https://image.tmdb.org/t/p/w500";let $="trending",y="",m="",E={};fetch(`${f}/genre/movie/list?api_key=${v}&language=en-US`).then(t=>t.json()).then(t=>{t.genres.forEach(e=>{E[e.id]=e.name})});function ae(t,e){if(!t)return;t.innerHTML="";const o=Math.floor(e/2),n=e%2>=1;for(let a=0;a<5;a++){let r="empty";a<o?r="full":a===o&&n&&(r="half");const s=`star-${Math.random().toString(36).slice(2)}`;t.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${s}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${s}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#BFBFBF"/>
            <stop offset="100%" stop-color="#BFBFBF"/>
          </linearGradient>
        </defs>
        <path d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${r==="full"?`url(#${s}-full)`:r==="half"?`url(#${s}-half)`:"#BFBFBF"}" />
      </svg>`}}function w(t=1){$="trending",fetch(`${f}/trending/movie/week?api_key=${v}&page=${t}`).then(e=>e.json()).then(e=>{A(e.results||[]),H(e.total_results,t)}).catch(e=>console.error(e))}function C(t=1){$="search";let e=y?`${f}/search/movie?api_key=${v}&query=${encodeURIComponent(y)}&page=${t}${m?`&year=${m}`:""}`:`${f}/discover/movie?api_key=${v}&primary_release_year=${m}&page=${t}`;fetch(e).then(o=>o.json()).then(o=>{A(o.results||[]),H(o.total_results,t)}).catch(o=>console.error(o))}function A(t){const e=document.getElementById("moviesContainer"),o=document.getElementById("emptyMessage");if(e){if(e.innerHTML="",!t||!t.length){o.hidden=!1;return}o.hidden=!0,t.forEach(n=>{const a=n.poster_path?`${oe}${n.poster_path}`:"./placeholder.jpg",r=n.release_date?n.release_date.slice(0,4):"N/A",s=n.genre_ids&&Object.keys(E).length?n.genre_ids.map(c=>E[c]).filter(Boolean).slice(0,2).join(", "):"Unknown",i=document.createElement("a");i.className="movie-card",i.dataset.id=n.id,i.href="#",i.innerHTML=`
      <img src="${a}" alt="${n.title}" loading="lazy">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3 class="movie-title">${n.title}</h3>
          <p class="movie-meta">${s} | ${r}</p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `;const g=i.querySelector(".movie-rating-stars");ae(g,n.vote_average),e.appendChild(i)})}}function H(t,e){const r=t>480?480:t;new ne({containerId:"pagination",totalItems:r,itemsPerPage:20,currentPage:e,onPageChange:s=>{$==="trending"?w(s):C(s);const i=document.querySelector(".movie-list");i&&i.scrollIntoView({behavior:"smooth"})}})}document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("yearBtn"),e=document.getElementById("yearDropdown"),o=document.getElementById("selectedYear"),n=document.querySelector(".search-input1"),a=document.querySelector(".search-btn");w(1),t&&e&&(t.addEventListener("click",r=>{r.stopPropagation(),e.classList.toggle("open")}),e.addEventListener("click",r=>{r.target.tagName==="LI"&&(m=r.target.dataset.year||"",o.textContent=r.target.textContent,e.classList.remove("open"))}),document.addEventListener("click",()=>e.classList.remove("open"))),a&&a.addEventListener("click",()=>{y=n.value.trim(),!y&&!m?w(1):C(1)}),n&&n.addEventListener("keypress",r=>{r.key==="Enter"&&a.click()})});const N=document.getElementById("movieList"),S=document.getElementById("emptySection"),k=document.getElementById("loadMoreBtn");function re(){return JSON.parse(localStorage.getItem("favorites"))||[]}document.addEventListener("DOMContentLoaded",()=>{se()});function se(){const t=re();if(N.innerHTML="",t.length===0){S.classList.remove("hidden"),k.classList.add("hidden");return}S.classList.add("hidden"),ie(t.slice(0,9)),t.length>9?k.classList.remove("hidden"):k.classList.add("hidden")}function ie(t){t.forEach(e=>{var a;if(!e.poster_path)return;const o=((a=e.release_date)==null?void 0:a.slice(0,4))||"N/A",n=document.createElement("article");n.className="movie-card",n.dataset.id=e.id,n.innerHTML=`
      <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.title}">
      <div class="movie-card-overlay">
        <h3>${e.title}</h3>
        <p>${o}</p>
      </div>
    `,N.appendChild(n)})}
//# sourceMappingURL=main-xUc0m_hu.js.map
