import{a as te}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=s(a);fetch(a.href,l)}})();function J(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(J,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}function ne(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),s=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),a=document.getElementById("genreDropdown"),l=document.getElementById("genreBtn"),d=document.getElementById("genreIcon"),h=document.querySelector(".search-button");let L=null;if(!e||!t||!s){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",()=>{a!=null&&a.classList.contains("active")&&(a.classList.remove("active"),d==null||d.classList.remove("rotate"))}),h&&h.addEventListener("click",()=>{window.location.href="/catalog.html"}),a==null||a.addEventListener("click",p=>{const r=p.target.closest("li");r&&(L=r.dataset.genreId?Number(r.dataset.genreId):null,a.classList.remove("active"),d==null||d.classList.remove("rotate"),v())}),h&&h.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"});function E(){return JSON.parse(localStorage.getItem("favorites"))||[]}v();function v(){const p=E();if(L&&p.filter(r=>{var m;return(m=r.genre_ids)==null?void 0:m.includes(L)}),e.innerHTML="",n&&n.classList.toggle("genre-hidden",p.length===0),p.length===0){t.classList.remove("hidden"),s.classList.add("hidden");return}t.classList.add("hidden"),k(p.slice(0,9)),s.classList.toggle("hidden",p.length<=9)}l==null||l.addEventListener("click",p=>{p.stopPropagation(),a.classList.toggle("active"),d==null||d.classList.toggle("rotate")}),a==null||a.addEventListener("click",p=>{const r=p.target.closest("li");r&&(L=r.dataset.genreId?Number(r.dataset.genreId):null,a.classList.remove("active"),d==null||d.classList.remove("rotate"),v())});function k(p){p.forEach(r=>{var g;if(!r.poster_path)return;const m=((g=r.release_date)==null?void 0:g.slice(0,4))||"N/A",u=document.createElement("article");u.className="movie-card",u.setAttribute("data-id",r.id),u.innerHTML=`
        <img src="https://image.tmdb.org/t/p/w500${r.poster_path}" alt="${r.title}">
        <div class="movie-card-overlay">
          <h3>${r.title}</h3>
          <p>${m}</p>
        </div>
      `,e.appendChild(u)})}}class oe{constructor({containerId:t,totalItems:s,itemsPerPage:n,onPageChange:a,currentPage:l=1}){this.container=document.getElementById(t),this.totalItems=s,this.itemsPerPage=n,this.currentPage=l,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=a,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const a=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${a}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,s=this.currentPage,n=[],a=3;let l=s-1,d=s+1;l<1&&(l=1,d=Math.min(a,t)),d>t&&(d=t,l=Math.max(1,t-a+1)),l>1&&n.push("...");for(let h=l;h<=d;h++)n.push(h);return d<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),s=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),s&&s.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function se(){let e="",t="",s="",n=!1,a={},l="trending";const d={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},h="98ff2d6267ceea8e039422b0f46fb813",L="https://api.themoviedb.org/3",E="https://image.tmdb.org/t/p/w500",v=document.getElementById("moviesContainer"),k=document.getElementById("emptyMessage"),p=document.querySelector(".search-input"),r=document.getElementById("clearSearch"),m=document.querySelector(".search-btn"),u=document.getElementById("yearBtn"),g=document.getElementById("yearDropdown"),y=document.getElementById("selectedYear"),c=document.getElementById("countrySelect"),f=c==null?void 0:c.querySelector(".search-input1"),M=c==null?void 0:c.querySelector(".country-list"),N=c.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const o=document.querySelector(".movie-card img");if(!o)return;const i=o.getBoundingClientRect().height;window.scrollBy({top:i*2.5,behavior:"smooth"})},600));const X=document.getElementById("pagination");if(!v||!k)return;const C=document.querySelector(".search-input"),x=C.parentElement;x.insertAdjacentHTML("beforeend",`
  <button class="search-clear-btn">
    <svg viewBox="0 0 32 32" width="14" height="14">
      <path
        d="M29.333 29.333l-28-28M29.333 1.333l-28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2.6667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  `);const q=x.querySelector(".search-clear-btn");q.style.display="none",u.insertAdjacentHTML("beforeend",`
  <svg class="icon-chevron" width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
  <path
    d="M7 20.5l9-9 9 9"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`),m&&(m.innerHTML=`
    <svg viewBox="0 0 32 32" width="18" height="18">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="2.08"
        d="M14.667 25.333c5.891 0 10.667-4.776 10.667-10.667
           S20.558 4 14.667 4 4 8.776 4 14.667
           s4.776 10.666 10.667 10.666M28 28l-5.8-5.8"
      />
    </svg>
  `);const Q=`
<svg class="country-chevron" width="14" height="14" viewBox="0 0 32 32" aria-hidden="true">
  <path
    d="M7 20.5l9-9 9 9"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`,P=document.getElementById("selectedCountry");P.insertAdjacentHTML("afterend",Q);function Z(o,i){const I=o>480?480:o;if(I===0){X.innerHTML="";return}new oe({containerId:"pagination",totalItems:I,itemsPerPage:20,currentPage:i,onPageChange:S=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",S),l==="trending"?T(S):U();const _=document.getElementById("moviesContainer");if(_){const j=_.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:j,behavior:"smooth"})}}})}fetch(`${L}/genre/movie/list?api_key=${h}&language=en-US`).then(o=>o.json()).then(o=>o.genres.forEach(i=>a[i.id]=i.name)),x.addEventListener("click",o=>{o.target.closest(".search-clear-btn")&&(C.value="",C.focus())}),x.addEventListener("input",o=>{if(o.target!==C)return;const i=x.querySelector(".search-clear-btn");i&&(i.style.display=C.value?"block":"none")});function ee(o,i){if(!o)return;o.innerHTML="";const b=Math.floor(i/2),A=i%2>=1;for(let $=0;$<5;$++){let I="empty";$<b?I="full":$===b&&A&&(I="half");const S=`star-${Math.random().toString(36).slice(2)}`;o.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${S}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <linearGradient id="${S}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${I==="full"?`url(#${S}-full)`:I==="half"?`url(#${S}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}if(N.addEventListener("click",o=>{o.stopPropagation(),c.classList.toggle("open")}),M.querySelectorAll("li").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const b=o.textContent.trim();P.textContent=b,s=d[b]||"",c.classList.remove("open")})}),document.addEventListener("click",o=>{c.contains(o.target)||c.classList.remove("open")}),M&&!M.dataset.init){const o=document.createElement("li");o.textContent="Country",M.prepend(o),M.dataset.init="true"}q.addEventListener("click",()=>{p.value="",p.focus(),q.style.display="none"}),c.querySelectorAll(".country-list li").forEach(o=>{o.addEventListener("click",()=>{P.textContent=o.textContent,c.classList.remove("open")})}),c.querySelectorAll(".country-list li").forEach(o=>{o.addEventListener("click",()=>{const i=o.textContent.trim();P.textContent=i,s=d[i]||"",c.classList.remove("open")})}),document.addEventListener("click",o=>{const i=document.getElementById("countrySelect");i.contains(o.target)||i.classList.remove("open")}),c&&f&&M&&(f.readOnly=!0,M.querySelectorAll("li").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const b=o.textContent.trim();f.value=b,s=d[b]||"",c.classList.add("has-value"),c.classList.remove("open")})})),u&&g&&(u.addEventListener("click",o=>{o.stopPropagation();const i=g.classList.toggle("open");u.classList.toggle("open",i)}),g.addEventListener("click",o=>{o.stopPropagation(),o.target.tagName==="LI"&&(e=o.target.dataset.year||"",y.textContent=o.target.textContent,g.classList.remove("open"),u.classList.remove("open"))})),document.addEventListener("click",o=>{g.classList.contains("open")&&!g.contains(o.target)&&!u.contains(o.target)&&(g.classList.remove("open"),u.classList.remove("open"))}),m.addEventListener("click",()=>{if(t=p.value.trim(),n=!0,!t&&!e&&!s){n=!1,T();return}U()}),r==null||r.addEventListener("click",()=>{p.value="",f&&(f.value=""),y.textContent="Year",t="",e="",s="",n=!1,c==null||c.classList.remove("has-value"),T()});function U(){let o="";t?(o=`${L}/search/movie?api_key=${h}&query=${encodeURIComponent(t)}`,(e||s)&&(o=`${L}/discover/movie?api_key=${h}&with_text_query=${encodeURIComponent(t)}`)):o=`${L}/discover/movie?api_key=${h}`,e&&(o+=`&primary_release_year=${e}`),s&&(o+=`&with_origin_country=${s}`),fetch(o).then(i=>i.json()).then(i=>R(i.results||[]))}T(1);function T(o=1){k.style.display="none",l="trending",fetch(`${L}/trending/movie/week?api_key=${h}&page=${o}`).then(i=>i.json()).then(i=>{R(i.results||[]),Z(i.total_results,o)})}function R(o){if(v.innerHTML="",!o.length){k.style.display=n?"block":"none";return}k.style.display="none",o.slice(0,10).forEach(i=>{var S,_;const b=document.createElement("a");b.className="movie-card",b.setAttribute("data-id",i.id),b.href=`catalog_mainbody.html?id=${i.id}`;const A=i.poster_path?`${E}${i.poster_path}`:"https://via.placeholder.com/300x450",$=((S=i.release_date)==null?void 0:S.slice(0,4))||"N/A",I=((_=i.genre_ids)==null?void 0:_.map(j=>a[j]).filter(Boolean).slice(0,2).join(", "))||"Unknown";b.innerHTML=`
        <img src="${A}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${i.title}</h3>
            <p>${I} | ${$}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,v.appendChild(b),ee(b.querySelector(".movie-rating-stars"),i.vote_average)})}}function re(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="98ff2d6267ceea8e039422b0f46fb813",s="https://api.themoviedb.org/3",n="https://image.tmdb.org/t/p/w500",a="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function l(r,m){if(!r)return;r.innerHTML="";const u=Math.floor(m/2),g=m%2>=1;for(let y=0;y<5;y++){let c="empty";y<u?c="full":y===u&&g&&(c="half");const f=`star-${Math.random().toString(36).slice(2)}`;r.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>

          <!-- DOLU -->
          <linearGradient id="${f}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <!-- YARIM (ayni renk, ortadan bölünmüş) -->
          <linearGradient id="${f}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>

        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${c==="full"?`url(#${f}-full)`:c==="half"?`url(#${f}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function d(){fetch(`${s}/trending/movie/week?api_key=${t}`).then(r=>r.json()).then(r=>h(r.results||[]))}function h(r){const m=document.getElementById("weeklyTrends");m&&(m.innerHTML="",r.slice(0,1).forEach(u=>{var M;const g=u.genre_ids.map(N=>e[N]).filter(Boolean).slice(0,2).join(", "),y=u.poster_path?n+u.poster_path:"./images/no-poster.jpg",c=((M=u.release_date)==null?void 0:M.split("-")[0])||"N/A",f=document.createElement("a");f.className="movie-card large",f.setAttribute("data-id",u.id),f.href=`catalog_mainbody.html?id=${u.id}`,f.innerHTML=`
        <img src="${y}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <p>${g} | ${c}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,l(f.querySelector(".movie-rating-stars"),u.vote_average),m.appendChild(f)}))}function L(){const r=new Date,m=r.getFullYear(),u=String(r.getMonth()+1).padStart(2,"0");fetch(`${s}/discover/movie?api_key=${t}&primary_release_date.gte=${m}-${u}-01&primary_release_date.lte=${m}-${u}-31&sort_by=popularity.desc`).then(g=>g.json()).then(g=>{var c;const y=(c=g.results)==null?void 0:c.find(f=>f.backdrop_path);y&&(E(y),p(y))})}function E(r){var g,y,c;const m=document.getElementById("heroBackdrop");if(!m)return;m.src=a+r.backdrop_path,document.getElementById("movieTitle").textContent=r.title,document.getElementById("movieOverview").textContent=r.overview||"No overview available.",document.getElementById("movieDate").textContent=r.release_date||"N/A",document.getElementById("movieVoteAvg").textContent=((g=r.vote_average)==null?void 0:g.toFixed(1))||"0",document.getElementById("movieVoteCount").textContent=r.vote_count||"0",document.getElementById("moviePopularity").textContent=((y=r.popularity)==null?void 0:y.toFixed(0))||"0";const u=(c=r.genre_ids)==null?void 0:c.map(f=>e[f]).filter(Boolean).join(", ");document.getElementById("movieGenre").textContent=u||"N/A"}function v(){return JSON.parse(localStorage.getItem("favorites"))||[]}function k(r){return v().some(m=>m.id===r)}function p(r){const m=document.getElementById("libraryToggleBtn");if(!m)return;const u=()=>{m.textContent=k(r.id)?"Remove from my library":"Add to my library",m.classList.toggle("active",k(r.id))};u(),m.onclick=()=>{let g=v();k(r.id)?g=g.filter(y=>y.id!==r.id):g.push(r),localStorage.setItem("favorites",JSON.stringify(g)),u()}}d(),L()}function ae(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}console.log("[header] header.js checking in");let B=null;function ie(e){B||(B=document.createElement("div"),B.className="mobile-menu-overlay",B.addEventListener("click",e),document.body.appendChild(B))}function ce(){B&&(B.remove(),B=null)}function le(e,t){t.classList.add("open"),e.setAttribute("aria-expanded","true"),ie(()=>H(e,t)),document.body.style.overflow="hidden"}function H(e,t){t.classList.remove("open"),e&&e.setAttribute("aria-expanded","false"),ce(),document.body.style.overflow=""}document.addEventListener("click",e=>{console.log("[header] Global click on:",e.target);const t=e.target.closest(".menu-open-btn");if(t){console.log("[header] Menu btn detected!");const n=document.querySelector(".mobile-menu");if(!n)return;console.log("[header] Menu toggle clicked"),n.classList.contains("open")?H(t,n):le(t,n);return}if(e.target.closest(".mobile-menu .nav-link")){const n=document.querySelector(".mobile-menu"),a=document.querySelector(".menu-open-btn");n&&n.classList.contains("open")&&setTimeout(()=>H(a,n),100)}});document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".mobile-menu"),s=document.querySelector(".menu-open-btn");t&&t.classList.contains("open")&&H(s,t)}});function de(){var s;const e=window.location.pathname;document.querySelectorAll(".nav-link").forEach(n=>{n.classList.remove("active"),e.includes(n.getAttribute("href").replace("./",""))&&n.classList.add("active")}),(e==="/"||e.endsWith("index.html"))&&((s=document.querySelector('.nav-link[href="./index.html"]'))==null||s.classList.add("active"))}document.addEventListener("DOMContentLoaded",de);const ue="98ff2d6267ceea8e039422b0f46fb813",me="https://api.themoviedb.org/3",W=te.create({baseURL:me,params:{api_key:ue,language:"en-US"}}),ge=async(e="day")=>{try{const{data:t}=await W.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},pe=async e=>{try{const{data:t}=await W.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}};function he(e){return e[Math.floor(Math.random()*e.length)]}async function fe(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t==="dynamic")try{const s=await ge("day");if(s&&s.length>0){const n=he(s);ve(e,n)}else F(e)}catch(s){console.error("Hero yüklenirken hata:",s),F(e)}else t==="library"&&F(e)}document.addEventListener("DOMContentLoaded",()=>{fe().catch(e=>console.error("initHero error:",e))});function ve(e,t){const{title:s,overview:n,backdrop_path:a,vote_average:l,id:d}=t,h=()=>{const E="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let v="w780";window.innerWidth>=1280?v="original":window.innerWidth>=768&&(v="w1280");let k="";if(a)k=`https://image.tmdb.org/t/p/${v}${a}`;else{const p=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],r=p[Math.floor(Math.random()*p.length)];try{k=new URL(r,import.meta.url).href}catch{k=`/src/images/background/${r.split("/").pop()}`}}e.style.backgroundImage=`${E}, url(${k})`,e.style.backgroundPosition="right center"};h(),new MutationObserver(h).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",h),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${s}</h1>
      <div class="hero-rating">${l.toFixed(1)}</div> 
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,document.getElementById("watch-trailer").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:d}}))}),document.getElementById("more-details").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))})}function F(e){e.classList.add("hero-default"),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const t=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],s=t[Math.floor(Math.random()*t.length)];let n;try{n=new URL(s,import.meta.url).href}catch{n=`/src/images/background/${s.split("/").pop()}`}const a="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";e.style.backgroundImage=`${a}, url(${n})`,e.style.backgroundPosition="right center",document.getElementById("go-catalog").addEventListener("click",()=>{window.location.href="./catalog.html"})}const Y=document.getElementById("openTeamModal"),D=document.getElementById("closeTeamModal"),w=document.getElementById("teamModal");Y&&w&&Y.addEventListener("click",e=>{e.preventDefault(),w.classList.add("is-open"),document.body.style.overflow="hidden"});D&&w&&D.addEventListener("click",()=>{w.classList.remove("is-open"),document.body.style.overflow="auto"});w&&w.addEventListener("click",e=>{e.target===w&&(w.classList.remove("is-open"),document.body.style.overflow="auto")});window.addEventListener("keydown",e=>{e.key==="Escape"&&w&&w.classList.contains("is-open")&&(w.classList.remove("is-open"),document.body.style.overflow="auto")});const K="favorites";function G(){try{const e=localStorage.getItem(K);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function z(e){try{localStorage.setItem(K,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function V(e){return G().some(s=>Number(s.id)===Number(e))}function ye(e){const t=G();t.some(s=>Number(s.id)===Number(e.id))||(t.push(e),z(t))}function be(e){let t=G();t=t.filter(s=>Number(s.id)!==Number(e)),z(t)}function Le(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const s=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&O()}),s.addEventListener("click",O),document.addEventListener("keydown",n=>{n.key==="Escape"&&O()})}function O(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}Le();async function ke(e){const t=document.querySelector(".backdrop"),s=document.getElementById("modal-content");s.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await pe(e),a=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",l=n.genres?n.genres.map(v=>v.name).join(", "):"Unknown",d=V(n.id),h=n.release_date?n.release_date.slice(0,4):"N/A",L=`
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
            <span class="stats-value">${l}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${n.overview||"No description available."}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${d?"active":""}" id="modal-library-btn">
            ${d?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;s.innerHTML=L;const E=document.getElementById("modal-library-btn");E.addEventListener("click",()=>{if(V(n.id))be(n.id),E.textContent="Add to my library",E.classList.remove("active");else{const v={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};ye(v),E.textContent="Remove from library",E.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),s.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const Ee=["weeklyTrends","moviesContainer","catalog-list","movieList"];Ee.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",s=>{const n=s.target.closest(".movie-card")||s.target.closest(".movie-card-overlay");if(n&&n.dataset.id){s.preventDefault();const a=n.dataset.id;ke(a)}})});J();document.addEventListener("DOMContentLoaded",()=>{ae(),document.getElementById("weeklyTrends")&&re(),document.getElementById("moviesContainer")&&se(),document.getElementById("movieList")&&ne()});
//# sourceMappingURL=main-CxJns5p4.js.map
