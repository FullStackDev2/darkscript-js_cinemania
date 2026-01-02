import{a as X}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();function U(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(U,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}function Q(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),n=document.getElementById("loadMoreBtn"),o=document.querySelector(".genre-wrapper"),r=document.getElementById("genreDropdown"),l=document.getElementById("genreBtn"),a=document.getElementById("genreIcon"),d=document.querySelector(".search-button");let v=null;if(!e||!t||!n){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",()=>{r!=null&&r.classList.contains("active")&&(r.classList.remove("active"),a==null||a.classList.remove("rotate"))}),d&&d.addEventListener("click",()=>{window.location.href="/catalog.html"}),r==null||r.addEventListener("click",f=>{const i=f.target.closest("li");i&&(v=i.dataset.genreId?Number(i.dataset.genreId):null,r.classList.remove("active"),a==null||a.classList.remove("rotate"),b())}),d&&d.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"});function p(){return JSON.parse(localStorage.getItem("favorites"))||[]}b();function b(){const f=p();if(v&&f.filter(i=>{var g;return(g=i.genre_ids)==null?void 0:g.includes(v)}),e.innerHTML="",o&&o.classList.toggle("genre-hidden",f.length===0),f.length===0){t.classList.remove("hidden"),n.classList.add("hidden");return}t.classList.add("hidden"),k(f.slice(0,9)),n.classList.toggle("hidden",f.length<=9)}l==null||l.addEventListener("click",f=>{f.stopPropagation(),r.classList.toggle("active"),a==null||a.classList.toggle("rotate")}),r==null||r.addEventListener("click",f=>{const i=f.target.closest("li");i&&(v=i.dataset.genreId?Number(i.dataset.genreId):null,r.classList.remove("active"),a==null||a.classList.remove("rotate"),b())});function k(f){f.forEach(i=>{var h;if(!i.poster_path)return;const g=((h=i.release_date)==null?void 0:h.slice(0,4))||"N/A",m=document.createElement("article");m.className="movie-card",m.setAttribute("data-id",i.id),m.innerHTML=`
        <img src="https://image.tmdb.org/t/p/w500${i.poster_path}" alt="${i.title}">
        <div class="movie-card-overlay">
          <h3>${i.title}</h3>
          <p>${g}</p>
        </div>
      `,e.appendChild(m)})}}class Z{constructor({containerId:t,totalItems:n,itemsPerPage:o,onPageChange:r,currentPage:l=1}){this.container=document.getElementById(t),this.totalItems=n,this.itemsPerPage=o,this.currentPage=l,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=r,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(o=>{if(o==="...")t+='<span class="pagination-dots">...</span>';else{const r=o===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${r}" data-page="${o}">${this.pad(o)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,n=this.currentPage,o=[],r=3;let l=n-1,a=n+1;l<1&&(l=1,a=Math.min(r,t)),a>t&&(a=t,l=Math.max(1,t-r+1)),l>1&&o.push("...");for(let d=l;d<=a;d++)o.push(d);return a<t&&o.push("..."),o}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(o=>{o.addEventListener("click",()=>this.goToPage(parseInt(o.dataset.page)))});const t=this.container.querySelector(".prev-btn"),n=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),n&&n.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function ee(){let e="",t="",n="",o=!1,r={},l="trending";const a={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},d="98ff2d6267ceea8e039422b0f46fb813",v="https://api.themoviedb.org/3",p="https://image.tmdb.org/t/p/w500",b=document.getElementById("moviesContainer"),k=document.getElementById("emptyMessage"),f=document.querySelector(".search-input"),i=document.getElementById("clearSearch"),g=document.querySelector(".search-btn"),m=document.getElementById("yearBtn"),h=document.getElementById("yearDropdown"),L=document.getElementById("selectedYear"),u=document.getElementById("countrySelect"),y=u==null?void 0:u.querySelector(".search-input1"),E=u==null?void 0:u.querySelector(".country-list"),P=u.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const s=document.querySelector(".movie-card img");if(!s)return;const c=s.getBoundingClientRect().height;window.scrollBy({top:c*2.5,behavior:"smooth"})},600));const V=document.getElementById("pagination");if(!b||!k)return;const $=document.querySelector(".search-input"),x=$.parentElement;x.insertAdjacentHTML("beforeend",`
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
  `);const A=x.querySelector(".search-clear-btn");A.style.display="none",m.insertAdjacentHTML("beforeend",`
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
`),g&&(g.innerHTML=`
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
  `);const W=`
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
`,C=document.getElementById("selectedCountry");C.insertAdjacentHTML("afterend",W);function J(s,c){const S=s>480?480:s;if(S===0){V.innerHTML="";return}new Z({containerId:"pagination",totalItems:S,itemsPerPage:20,currentPage:c,onPageChange:M=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",M),l==="trending"?T(M):G();const B=document.getElementById("moviesContainer");if(B){const H=B.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:H,behavior:"smooth"})}}})}fetch(`${v}/genre/movie/list?api_key=${d}&language=en-US`).then(s=>s.json()).then(s=>s.genres.forEach(c=>r[c.id]=c.name)),x.addEventListener("click",s=>{s.target.closest(".search-clear-btn")&&($.value="",$.focus())}),x.addEventListener("input",s=>{if(s.target!==$)return;const c=x.querySelector(".search-clear-btn");c&&(c.style.display=$.value?"block":"none")});function K(s,c){if(!s)return;s.innerHTML="";const w=Math.floor(c/2),_=c%2>=1;for(let I=0;I<5;I++){let S="empty";I<w?S="full":I===w&&_&&(S="half");const M=`star-${Math.random().toString(36).slice(2)}`;s.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${M}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <linearGradient id="${M}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${S==="full"?`url(#${M}-full)`:S==="half"?`url(#${M}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}if(P.addEventListener("click",s=>{s.stopPropagation(),u.classList.toggle("open")}),E.querySelectorAll("li").forEach(s=>{s.addEventListener("click",c=>{c.stopPropagation();const w=s.textContent.trim();C.textContent=w,n=a[w]||"",u.classList.remove("open")})}),document.addEventListener("click",s=>{u.contains(s.target)||u.classList.remove("open")}),E&&!E.dataset.init){const s=document.createElement("li");s.textContent="Country",E.prepend(s),E.dataset.init="true"}A.addEventListener("click",()=>{f.value="",f.focus(),A.style.display="none"}),u.querySelectorAll(".country-list li").forEach(s=>{s.addEventListener("click",()=>{C.textContent=s.textContent,u.classList.remove("open")})}),u.querySelectorAll(".country-list li").forEach(s=>{s.addEventListener("click",()=>{const c=s.textContent.trim();C.textContent=c,n=a[c]||"",u.classList.remove("open")})}),document.addEventListener("click",s=>{const c=document.getElementById("countrySelect");c.contains(s.target)||c.classList.remove("open")}),u&&y&&E&&(y.readOnly=!0,E.querySelectorAll("li").forEach(s=>{s.addEventListener("click",c=>{c.stopPropagation();const w=s.textContent.trim();y.value=w,n=a[w]||"",u.classList.add("has-value"),u.classList.remove("open")})})),m&&h&&(m.addEventListener("click",s=>{s.stopPropagation();const c=h.classList.toggle("open");m.classList.toggle("open",c)}),h.addEventListener("click",s=>{s.stopPropagation(),s.target.tagName==="LI"&&(e=s.target.dataset.year||"",L.textContent=s.target.textContent,h.classList.remove("open"),m.classList.remove("open"))})),document.addEventListener("click",s=>{h.classList.contains("open")&&!h.contains(s.target)&&!m.contains(s.target)&&(h.classList.remove("open"),m.classList.remove("open"))}),g.addEventListener("click",()=>{if(t=f.value.trim(),o=!0,!t&&!e&&!n){o=!1,T();return}G()}),i==null||i.addEventListener("click",()=>{f.value="",y&&(y.value=""),L.textContent="Year",t="",e="",n="",o=!1,u==null||u.classList.remove("has-value"),T()});function G(){let s="";t?(s=`${v}/search/movie?api_key=${d}&query=${encodeURIComponent(t)}`,(e||n)&&(s=`${v}/discover/movie?api_key=${d}&with_text_query=${encodeURIComponent(t)}`)):s=`${v}/discover/movie?api_key=${d}`,e&&(s+=`&primary_release_year=${e}`),n&&(s+=`&with_origin_country=${n}`),fetch(s).then(c=>c.json()).then(c=>O(c.results||[]))}T(1);function T(s=1){k.style.display="none",l="trending",fetch(`${v}/trending/movie/week?api_key=${d}&page=${s}`).then(c=>c.json()).then(c=>{O(c.results||[]),J(c.total_results,s)})}function O(s){if(b.innerHTML="",!s.length){k.style.display=o?"block":"none";return}k.style.display="none",s.slice(0,10).forEach(c=>{var M,B;const w=document.createElement("a");w.className="movie-card",w.setAttribute("data-id",c.id),w.href=`catalog_mainbody.html?id=${c.id}`;const _=c.poster_path?`${p}${c.poster_path}`:"https://via.placeholder.com/300x450",I=((M=c.release_date)==null?void 0:M.slice(0,4))||"N/A",S=((B=c.genre_ids)==null?void 0:B.map(H=>r[H]).filter(Boolean).slice(0,2).join(", "))||"Unknown";w.innerHTML=`
        <img src="${_}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${c.title}</h3>
            <p>${S} | ${I}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,b.appendChild(w),K(w.querySelector(".movie-rating-stars"),c.vote_average)})}}function te(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="98ff2d6267ceea8e039422b0f46fb813",n="https://api.themoviedb.org/3",o="https://image.tmdb.org/t/p/w500",r="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function l(i,g){if(!i)return;i.innerHTML="";const m=Math.floor(g/2),h=g%2>=1;for(let L=0;L<5;L++){let u="empty";L<m?u="full":L===m&&h&&(u="half");const y=`star-${Math.random().toString(36).slice(2)}`;i.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>

          <!-- DOLU -->
          <linearGradient id="${y}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <!-- YARIM (ayni renk, ortadan bölünmüş) -->
          <linearGradient id="${y}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>

        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${u==="full"?`url(#${y}-full)`:u==="half"?`url(#${y}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function a(){fetch(`${n}/trending/movie/week?api_key=${t}`).then(i=>i.json()).then(i=>d(i.results||[]))}function d(i){const g=document.getElementById("weeklyTrends");g&&(g.innerHTML="",i.slice(0,1).forEach(m=>{var E;const h=m.genre_ids.map(P=>e[P]).filter(Boolean).slice(0,2).join(", "),L=m.poster_path?o+m.poster_path:"./images/no-poster.jpg",u=((E=m.release_date)==null?void 0:E.split("-")[0])||"N/A",y=document.createElement("a");y.className="movie-card large",y.setAttribute("data-id",m.id),y.href=`catalog_mainbody.html?id=${m.id}`,y.innerHTML=`
        <img src="${L}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${m.title}</h3>
            <p>${h} | ${u}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,l(y.querySelector(".movie-rating-stars"),m.vote_average),g.appendChild(y)}))}function v(){const i=new Date,g=i.getFullYear(),m=String(i.getMonth()+1).padStart(2,"0");fetch(`${n}/discover/movie?api_key=${t}&primary_release_date.gte=${g}-${m}-01&primary_release_date.lte=${g}-${m}-31&sort_by=popularity.desc`).then(h=>h.json()).then(h=>{var u;const L=(u=h.results)==null?void 0:u.find(y=>y.backdrop_path);L&&(p(L),f(L))})}function p(i){var h,L,u;const g=document.getElementById("heroBackdrop");if(!g)return;g.src=r+i.backdrop_path,document.getElementById("movieTitle").textContent=i.title,document.getElementById("movieOverview").textContent=i.overview||"No overview available.",document.getElementById("movieDate").textContent=i.release_date||"N/A",document.getElementById("movieVoteAvg").textContent=((h=i.vote_average)==null?void 0:h.toFixed(1))||"0",document.getElementById("movieVoteCount").textContent=i.vote_count||"0",document.getElementById("moviePopularity").textContent=((L=i.popularity)==null?void 0:L.toFixed(0))||"0";const m=(u=i.genre_ids)==null?void 0:u.map(y=>e[y]).filter(Boolean).join(", ");document.getElementById("movieGenre").textContent=m||"N/A"}function b(){return JSON.parse(localStorage.getItem("favorites"))||[]}function k(i){return b().some(g=>g.id===i)}function f(i){const g=document.getElementById("libraryToggleBtn");if(!g)return;const m=()=>{g.textContent=k(i.id)?"Remove from my library":"Add to my library",g.classList.toggle("active",k(i.id))};m(),g.onclick=()=>{let h=b();k(i.id)?h=h.filter(L=>L.id!==i.id):h.push(i),localStorage.setItem("favorites",JSON.stringify(h)),m()}}a(),v()}function oe(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function ne(){console.log("Footer: Olay dinleyicisi başlatıldı (Event Delegation)"),document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),n=e.target.closest("#closeTeamModal"),o=document.getElementById("teamModal");if(o){if(t){e.preventDefault(),console.log("Footer: Modal açılıyor..."),o.classList.add("is-open"),document.body.style.overflow="hidden";return}if(n){console.log("Footer: Modal kapanıyor (Buton ile)..."),o.classList.remove("is-open"),document.body.style.overflow="";return}e.target===o&&(console.log("Footer: Modal kapanıyor (Backdrop ile)..."),o.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(console.log("Footer: Modal kapanıyor (ESC ile)..."),t.classList.remove("is-open"),document.body.style.overflow="")})}console.log("[header] header.js checking in");document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(a){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",a),document.body.appendChild(e))}function n(){e&&(e.remove(),e=null)}function o(a,d){d.classList.add("open"),a.setAttribute("aria-expanded","true"),t(()=>r(a,d)),document.body.style.overflow="hidden"}function r(a,d){d.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),n(),document.body.style.overflow=""}document.addEventListener("click",a=>{console.log("[header] Global click on:",a.target);const d=a.target.closest(".menu-open-btn");if(d){console.log("[header] Menu btn detected!");const p=document.querySelector(".mobile-menu");if(!p)return;console.log("[header] Menu toggle clicked"),p.classList.contains("open")?r(d,p):o(d,p);return}if(a.target.closest(".mobile-menu .nav-link")){const p=document.querySelector(".mobile-menu"),b=document.querySelector(".menu-open-btn");p&&p.classList.contains("open")&&setTimeout(()=>r(b,p),100)}}),document.addEventListener("keydown",a=>{if(a.key==="Escape"){const d=document.querySelector(".mobile-menu"),v=document.querySelector(".menu-open-btn");d&&d.classList.contains("open")&&r(v,d)}});function l(){var v;const a=window.location.pathname;document.querySelectorAll(".nav-link").forEach(p=>{p.classList.remove("active"),a.includes(p.getAttribute("href").replace("./",""))&&p.classList.add("active")}),(a==="/"||a.endsWith("index.html"))&&((v=document.querySelector('.nav-link[href="./index.html"]'))==null||v.classList.add("active"))}l()});const re="98ff2d6267ceea8e039422b0f46fb813",se="https://api.themoviedb.org/3",q=X.create({baseURL:se,params:{api_key:re,language:"en-US"}}),ae=async(e="day")=>{try{const{data:t}=await q.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},ie=async e=>{try{const{data:t}=await q.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},le=async e=>{try{const{data:t}=await q.get(`/movie/${e}/videos`);return t.results.filter(n=>n.site==="YouTube"&&n.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function ce(e,t){if(!e)return;e.innerHTML="";const n=Math.max(0,Math.min(10,t||0)),o=Math.floor(n/2),r=n/2-o>=.5;for(let l=0;l<5;l++){let a="empty";l<o?a="full":l===o&&r&&(a="half");const d=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14" class="star">
        <defs>
          <linearGradient id="${d}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${d}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path d="M16 2l4.09 9.63L30 12.27l-7 6.86L24.18 30 16 24.8 7.82 30 9 19.13l-7-6.86 9.91-1.64L16 2z"
          fill="${a==="full"?`url(#${d}-full)`:a==="half"?`url(#${d}-half)`:"#bfbfbf"}"
          stroke="none" />
      </svg>
    `}}function de(e){return e[Math.floor(Math.random()*e.length)]}async function ue(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{const n=await ae("day");if(n&&n.length>0){const o=de(n);me(e,o)}else R(e)}catch(n){console.error("Hero yüklenirken hata:",n),R(e)}}document.addEventListener("DOMContentLoaded",()=>{ue().catch(e=>console.error("initHero error:",e))});function me(e,t){const{title:n,overview:o,backdrop_path:r,vote_average:l,id:a}=t,d=()=>{const p="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",b=window.devicePixelRatio>1.1;let k="";if(r){let f="w780";window.innerWidth>=1280?f=b?"original":"w1280":window.innerWidth>=768&&(f=b?"w1280":"w780"),k=`https://image.tmdb.org/t/p/${f}${r}`}else k=`./background/desktop-1${b?"-@2x":""}.jpg`;e.style.backgroundImage=`${p}, url('${k}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};d(),new MutationObserver(d).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",d),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${n}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${o.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,ce(e.querySelector(".hero-rating-stars"),l),e.querySelector("#watch-trailer").onclick=()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:a}}))},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function R(e){e.classList.add("hero-default");const t=()=>{const o=window.devicePixelRatio>1.1,r="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let l=window.innerWidth<768?"mobil-1":"desktop-1";o&&(l+="-@2x");const a=`./background/${l}.jpg`.replace(/\/+/g,"/");console.log("Resim URL Deneniyor:",a),e.style.backgroundImage=`${r}, url('${a}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const n=e.querySelector("#go-catalog");n&&(n.onclick=()=>{window.location.href="./catalog.html"})}const D="favorites";function N(){try{const e=localStorage.getItem(D);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function Y(e){try{localStorage.setItem(D,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function j(e){return N().some(n=>Number(n.id)===Number(e))}function ge(e){const t=N();t.some(n=>Number(n.id)===Number(e.id))||(t.push(e),Y(t))}function pe(e){let t=N();t=t.filter(n=>Number(n.id)!==Number(e)),Y(t)}function fe(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const n=t.querySelector("[data-modal-close]");e.addEventListener("click",o=>{o.target===e&&F()}),n.addEventListener("click",F),document.addEventListener("keydown",o=>{o.key==="Escape"&&F()})}function F(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}fe();async function z(e){const t=document.querySelector(".backdrop"),n=document.getElementById("modal-content");n.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const o=await ie(e),r=o.poster_path?`https://image.tmdb.org/t/p/w500${o.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",l=o.genres?o.genres.map(b=>b.name).join(", "):"Unknown",a=j(o.id),d=o.release_date?o.release_date.slice(0,4):"N/A",v=`
      <div class="modal-img-wrapper">
        <img src="${r}" alt="${o.title}" class="modal-img" />
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
          <button type="button" class="btn-modal btn-add-library ${a?"active":""}" id="modal-library-btn">
            ${a?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;n.innerHTML=v;const p=document.getElementById("modal-library-btn");p.addEventListener("click",()=>{if(j(o.id))pe(o.id),p.textContent="Add to my library",p.classList.remove("active");else{const b={id:o.id,title:o.title,poster_path:o.poster_path,vote_average:o.vote_average,release_date:o.release_date,genres:o.genres};ge(b),p.textContent="Remove from library",p.classList.add("active")}})}catch(o){console.error("Modal Hatası:",o),n.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const he=["weeklyTrends","moviesContainer","catalog-list","movieList"];he.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",n=>{const o=n.target.closest(".movie-card")||n.target.closest(".movie-card-overlay");if(o&&o.dataset.id){n.preventDefault();const r=o.dataset.id;z(r)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&z(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,n=document.querySelector(".backdrop"),o=document.getElementById("modal-content");n.classList.remove("is-hidden"),document.body.classList.add("modal-open"),o.innerHTML='<div style="color: #111; text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const r=await le(t);if(console.log("Fetched videos:",r),r&&r.length>0){const l=r[0].key;o.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${l}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else o.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(r){console.error("Trailer loading error:",r),o.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});U();ne();document.addEventListener("DOMContentLoaded",()=>{oe(),document.getElementById("weeklyTrends")&&te(),document.getElementById("moviesContainer")&&ee(),document.getElementById("movieList")&&Q()});
//# sourceMappingURL=main-D9UkwpQE.js.map
