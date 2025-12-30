import{a as J}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();function j(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(j,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}function K(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),n=document.getElementById("loadMoreBtn");if(!e||!t||!n){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}function o(){return JSON.parse(localStorage.getItem("favorites"))||[]}a();function a(){const d=o();if(e.innerHTML="",d.length===0){t.classList.remove("hidden"),n.classList.add("hidden");return}t.classList.add("hidden"),l(d.slice(0,9)),d.length>9?n.classList.remove("hidden"):n.classList.add("hidden")}function l(d){d.forEach(f=>{var p;if(!f.poster_path)return;const E=((p=f.release_date)==null?void 0:p.slice(0,4))||"N/A",g=document.createElement("article");g.className="movie-card",g.innerHTML=`
        <img src="https://image.tmdb.org/t/p/w500${f.poster_path}" alt="${f.title}">
        <div class="movie-card-overlay">
          <h3>${f.title}</h3>
          <p>${E}</p>
        </div>
      `,e.appendChild(g)})}}function W(){let e="",t="",n="",o=!1,a={};const l={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},d="98ff2d6267ceea8e039422b0f46fb813",f="https://api.themoviedb.org/3",E="https://image.tmdb.org/t/p/w500",g=document.getElementById("moviesContainer"),p=document.getElementById("emptyMessage"),b=document.querySelector(".search-input"),w=document.getElementById("clearSearch"),s=document.querySelector(".search-btn"),c=document.getElementById("yearBtn"),m=document.getElementById("yearDropdown"),h=document.getElementById("selectedYear"),i=document.getElementById("countrySelect"),y=i==null?void 0:i.querySelector(".search-input1"),v=i==null?void 0:i.querySelector(".country-list");if(!g||!p)return;fetch(`${f}/genre/movie/list?api_key=${d}&language=en-US`).then(r=>r.json()).then(r=>r.genres.forEach(u=>a[u.id]=u.name));function B(r,u){if(!r)return;r.innerHTML="";const L=Math.floor(u/2),C=u%2>=1;for(let I=0;I<5;I++){let S="empty";I<L?S="full":I===L&&C&&(S="half");const $=`star-${Math.random().toString(36).slice(2)}`;r.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${$}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <linearGradient id="${$}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${S==="full"?`url(#${$}-full)`:S==="half"?`url(#${$}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}i&&y&&v&&(y.readOnly=!0,i.addEventListener("click",r=>{r.stopPropagation(),i.classList.toggle("open")}),v.querySelectorAll("li").forEach(r=>{r.addEventListener("click",u=>{u.stopPropagation();const L=r.textContent.trim();y.value=L,n=l[L]||"",i.classList.add("has-value"),i.classList.remove("open")})})),c&&m&&(c.addEventListener("click",r=>{r.stopPropagation(),m.classList.toggle("open")}),m.addEventListener("click",r=>{r.target.tagName==="LI"&&(e=r.target.dataset.year||"",h.textContent=r.target.textContent,m.classList.remove("open"))})),s.addEventListener("click",()=>{if(t=b.value.trim(),o=!0,!t&&!e&&!n){o=!1,x();return}T()}),w==null||w.addEventListener("click",()=>{b.value="",y&&(y.value=""),h.textContent="Year",t="",e="",n="",o=!1,i==null||i.classList.remove("has-value"),x()});function T(){let r=t?`${f}/search/movie?api_key=${d}&query=${encodeURIComponent(t)}`:`${f}/discover/movie?api_key=${d}`;e&&(r+=`&year=${e}`),n&&(r+=`&with_origin_country=${n}`),fetch(r).then(u=>u.json()).then(u=>F(u.results||[]))}x();function x(){p.style.display="none",fetch(`${f}/trending/movie/week?api_key=${d}`).then(r=>r.json()).then(r=>F(r.results||[]))}function F(r){if(g.innerHTML="",!r.length){p.style.display=o?"block":"none";return}p.style.display="none",r.slice(0,10).forEach(u=>{var $,O;const L=document.createElement("a");L.className="movie-card",L.href=`catalog_mainbody.html?id=${u.id}`;const C=u.poster_path?`${E}${u.poster_path}`:"https://via.placeholder.com/300x450",I=(($=u.release_date)==null?void 0:$.slice(0,4))||"N/A",S=((O=u.genre_ids)==null?void 0:O.map(Y=>a[Y]).filter(Boolean).slice(0,2).join(", "))||"Unknown";L.innerHTML=`
        <img src="${C}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <p>${S} | ${I}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,g.appendChild(L),B(L.querySelector(".movie-rating-stars"),u.vote_average)})}}function z(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="98ff2d6267ceea8e039422b0f46fb813",n="https://api.themoviedb.org/3",o="https://image.tmdb.org/t/p/w500",a="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function l(s,c){if(!s)return;s.innerHTML="";const m=Math.floor(c/2),h=c%2>=1;for(let i=0;i<5;i++){let y="empty";i<m?y="full":i===m&&h&&(y="half");const v=`star-${Math.random().toString(36).slice(2)}`;s.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>

          <!-- DOLU -->
          <linearGradient id="${v}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <!-- YARIM (ayni renk, ortadan bölünmüş) -->
          <linearGradient id="${v}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>

        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${y==="full"?`url(#${v}-full)`:y==="half"?`url(#${v}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function d(){fetch(`${n}/trending/movie/week?api_key=${t}`).then(s=>s.json()).then(s=>f(s.results||[]))}function f(s){const c=document.getElementById("weeklyTrends");c&&(c.innerHTML="",s.slice(0,1).forEach(m=>{var B;const h=m.genre_ids.map(T=>e[T]).filter(Boolean).slice(0,2).join(", "),i=m.poster_path?o+m.poster_path:"./images/no-poster.jpg",y=((B=m.release_date)==null?void 0:B.split("-")[0])||"N/A",v=document.createElement("a");v.className="movie-card large",v.href=`catalog_mainbody.html?id=${m.id}`,v.innerHTML=`
        <img src="${i}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${m.title}</h3>
            <p>${h} | ${y}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,l(v.querySelector(".movie-rating-stars"),m.vote_average),c.appendChild(v)}))}function E(){const s=new Date,c=s.getFullYear(),m=String(s.getMonth()+1).padStart(2,"0");fetch(`${n}/discover/movie?api_key=${t}&primary_release_date.gte=${c}-${m}-01&primary_release_date.lte=${c}-${m}-31&sort_by=popularity.desc`).then(h=>h.json()).then(h=>{var y;const i=(y=h.results)==null?void 0:y.find(v=>v.backdrop_path);i&&(g(i),w(i))})}function g(s){const c=document.getElementById("heroBackdrop");c&&(c.src=a+s.backdrop_path,document.getElementById("movieTitle").textContent=s.title,document.getElementById("movieOverview").textContent=s.overview)}function p(){return JSON.parse(localStorage.getItem("favorites"))||[]}function b(s){return p().some(c=>c.id===s)}function w(s){const c=document.getElementById("libraryToggleBtn");if(!c)return;const m=()=>{c.textContent=b(s.id)?"Remove from my library":"Add to my library",c.classList.toggle("active",b(s.id))};m(),c.onclick=()=>{let h=p();b(s.id)?h=h.filter(i=>i.id!==s.id):h.push(s),localStorage.setItem("favorites",JSON.stringify(h)),m()}}d(),E()}console.log("[header] header.js checking in");let M=null;function V(e){M||(M=document.createElement("div"),M.className="mobile-menu-overlay",M.addEventListener("click",e),document.body.appendChild(M))}function Q(){M&&(M.remove(),M=null)}function X(e,t){t.classList.add("open"),e.setAttribute("aria-expanded","true"),V(()=>_(e,t)),document.body.style.overflow="hidden"}function _(e,t){t.classList.remove("open"),e&&e.setAttribute("aria-expanded","false"),Q(),document.body.style.overflow=""}document.addEventListener("click",e=>{console.log("[header] Global click on:",e.target);const t=e.target.closest(".menu-open-btn");if(t){console.log("[header] Menu btn detected!");const o=document.querySelector(".mobile-menu");if(!o)return;console.log("[header] Menu toggle clicked"),o.classList.contains("open")?_(t,o):X(t,o);return}if(e.target.closest(".mobile-menu .nav-link")){const o=document.querySelector(".mobile-menu"),a=document.querySelector(".menu-open-btn");o&&o.classList.contains("open")&&setTimeout(()=>_(a,o),100)}});document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".mobile-menu"),n=document.querySelector(".menu-open-btn");t&&t.classList.contains("open")&&_(n,t)}});function Z(){var n;const e=window.location.pathname;document.querySelectorAll(".nav-link").forEach(o=>{o.classList.remove("active"),e.includes(o.getAttribute("href").replace("./",""))&&o.classList.add("active")}),(e==="/"||e.endsWith("index.html"))&&((n=document.querySelector('.nav-link[href="./index.html"]'))==null||n.classList.add("active"))}document.addEventListener("DOMContentLoaded",Z);const ee="98ff2d6267ceea8e039422b0f46fb813",te="https://api.themoviedb.org/3",D=J.create({baseURL:te,params:{api_key:ee,language:"en-US"}}),oe=async(e="day")=>{try{const{data:t}=await D.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},ne=async e=>{try{const{data:t}=await D.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}};function ae(e){return e[Math.floor(Math.random()*e.length)]}async function se(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t==="dynamic")try{const n=await oe("day");if(n&&n.length>0){const o=ae(n);re(e,o)}else A(e)}catch(n){console.error("Hero yüklenirken hata:",n),A(e)}else t==="library"&&A(e)}document.addEventListener("DOMContentLoaded",()=>{se().catch(e=>console.error("initHero error:",e))});function re(e,t){const{title:n,overview:o,backdrop_path:a,vote_average:l,id:d}=t,f=()=>{const g="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let p="w780";window.innerWidth>=1280?p="original":window.innerWidth>=768&&(p="w1280");let b="";if(a)b=`https://image.tmdb.org/t/p/${p}${a}`;else{const w=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],s=w[Math.floor(Math.random()*w.length)];try{b=new URL(s,import.meta.url).href}catch{b=`/src/images/background/${s.split("/").pop()}`}}e.style.backgroundImage=`${g}, url(${b})`,e.style.backgroundPosition="right center"};f(),new MutationObserver(f).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",f),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${n}</h1>
      <div class="hero-rating">${l.toFixed(1)}</div> 
      <p class="hero-description">${o.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,document.getElementById("watch-trailer").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:d}}))}),document.getElementById("more-details").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))})}function A(e){e.classList.add("hero-default"),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const t=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],n=t[Math.floor(Math.random()*t.length)];let o;try{o=new URL(n,import.meta.url).href}catch{o=`/src/images/background/${n.split("/").pop()}`}const a="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";e.style.backgroundImage=`${a}, url(${o})`,e.style.backgroundPosition="right center",document.getElementById("go-catalog").addEventListener("click",()=>{window.location.href="./catalog.html"})}const q=document.getElementById("openTeamModal"),U=document.getElementById("closeTeamModal"),k=document.getElementById("teamModal");q&&k&&q.addEventListener("click",e=>{e.preventDefault(),k.classList.add("is-open"),document.body.style.overflow="hidden"});U&&k&&U.addEventListener("click",()=>{k.classList.remove("is-open"),document.body.style.overflow="auto"});k&&k.addEventListener("click",e=>{e.target===k&&(k.classList.remove("is-open"),document.body.style.overflow="auto")});window.addEventListener("keydown",e=>{e.key==="Escape"&&k&&k.classList.contains("is-open")&&(k.classList.remove("is-open"),document.body.style.overflow="auto")});const G="myLibrary";function N(){try{const e=localStorage.getItem(G);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function P(e){try{localStorage.setItem(G,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function R(e){return N().some(n=>Number(n.id)===Number(e))}function ie(e){const t=N();t.some(n=>Number(n.id)===Number(e.id))||(t.push(e),P(t))}function ce(e){let t=N();t=t.filter(n=>Number(n.id)!==Number(e)),P(t)}function le(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const n=t.querySelector("[data-modal-close]");e.addEventListener("click",o=>{o.target===e&&H()}),n.addEventListener("click",H),document.addEventListener("keydown",o=>{o.key==="Escape"&&H()})}function H(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}le();async function de(e){const t=document.querySelector(".backdrop"),n=document.getElementById("modal-content");n.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const o=await ne(e),a=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",l=o.genres?o.genres.map(p=>p.name).join(", "):"Unknown",d=R(o.id),f=o.release_date?o.release_date.slice(0,4):"N/A",E=`
      <div class="modal-img-wrapper">
        <img src="${a}" alt="${o.title}" class="modal-img" />
      </div>
      
      <div class="modal-info">
        <h2 class="modal-title">${o.title.toUpperCase()}</h2>
        
        <div class="modal-stats">
          <div class="stats-item">
            <span class="stats-key">Vote / Votes</span>
            <span class="stats-value">
              <span class="vote-average">${o.vote_average.toFixed(1)}</span> / 
              <span class="vote-count">${o.vote_count}</span>
            </span>
          </div>
          <div class="stats-item">
            <span class="stats-key">Popularity</span>
            <span class="stats-value">${o.popularity.toFixed(1)}</span>
          </div>
          <div class="stats-item">
            <span class="stats-key">Genre</span>
            <span class="stats-value">${l}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${o.overview||"No description available."}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${d?"active":""}" id="modal-library-btn">
            ${d?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;n.innerHTML=E;const g=document.getElementById("modal-library-btn");g.addEventListener("click",()=>{if(R(o.id))ce(o.id),g.textContent="Add to my library",g.classList.remove("active");else{const p={id:o.id,title:o.title,poster_path:o.poster_path,vote_average:o.vote_average,release_date:o.release_date,genres:o.genres};ie(p),g.textContent="Remove from library",g.classList.add("active")}})}catch(o){console.error("Modal Hatası:",o),n.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const me=["weeklyTrends","moviesContainer","catalog-list","movieList"];me.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",n=>{const o=n.target.closest(".movie-card")||n.target.closest(".movie-card-overlay");if(o&&o.dataset.id){n.preventDefault();const a=o.dataset.id;de(a)}})});j();document.addEventListener("DOMContentLoaded",()=>{document.getElementById("weeklyTrends")&&z(),document.getElementById("moviesContainer")&&W(),document.getElementById("movieList")&&K()});
//# sourceMappingURL=main-LezNK-hq.js.map
