import{a as he}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=o(s);fetch(s.href,l)}})();function se(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(se,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}const Q="98ff2d6267ceea8e039422b0f46fb813",Z="https://api.themoviedb.org/3",R="https://image.tmdb.org/t/p/w500";function G(e,t){if(!e)return;e.innerHTML="";const o=Math.floor(t/2),n=t%2>=1;for(let s=0;s<5;s++){let l="empty";s<o?l="full":s===o&&n&&(l="half");const a=`star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${a}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${a}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path
          d="M24.622 30L16 24.173 7.378 30l3.135-9.286L2.388 15.14h10.024L16 5.827l3.588 9.313h10.024l-8.125 5.569z"
          fill="${l==="full"?`url(#${a}-full)`:l==="half"?`url(#${a}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function ae(){return JSON.parse(localStorage.getItem("favorites"))||[]}function ve(e){return ae().some(t=>t.id===e)}function ye(e){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.some(n=>n.id===e.id)){localStorage.setItem("favorites",JSON.stringify(t.filter(n=>n.id!==e.id)));return}const o=Array.isArray(e.genre_ids)?e.genre_ids:Array.isArray(e.genres)?e.genres.map(n=>n.id):[];t.push({id:e.id,title:e.title,poster_path:e.poster_path,vote_average:e.vote_average,release_date:e.release_date,genre_ids:o}),localStorage.setItem("favorites",JSON.stringify(t))}function be(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),s=document.getElementById("genreDropdown"),l=document.getElementById("genreBtn"),a=document.getElementById("genreIcon"),r=document.querySelector(".search-button");let f=5,c=null;if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",function(){s&&s.classList.contains("active")&&(s.classList.remove("active"),l.classList.remove("open"),a&&a.classList.remove("rotate"))}),l&&s&&l.addEventListener("click",function(h){h.stopPropagation(),s.classList.toggle("active"),l.classList.toggle("open"),a&&a.classList.toggle("rotate")}),r&&r.addEventListener("click",()=>{window.location.href="/catalog.html"}),s&&s.addEventListener("click",function(h){h.stopPropagation();const d=h.target.closest("li");if(!d)return;c=d.dataset.genreId?Number(d.dataset.genreId):null;const g=l.querySelector(".genre-text");g&&(d.dataset.genreId?g.textContent=d.textContent:g.textContent="Genre"),s.classList.remove("active"),l.classList.remove("open"),a&&a.classList.remove("rotate"),window.addEventListener("resize",()=>{window.innerWidth<=768?f=6:f=1/0,m()}),f=5,m()}),r&&r.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"}),m();function m(){const h=ae();let d=h;if(c!==null){const g=h.filter(v=>Array.isArray(v.genres)&&v.genres.some(E=>E.id===c));g.length>0&&(d=g)}if(e.innerHTML="",c!==null&&(d=h.filter(g=>Array.isArray(g.genres)&&g.genres.some(v=>v.id===c))),c!==null&&d.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.remove("genre-hidden");return}if(h.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.add("genre-hidden");return}n&&n.classList.remove("genre-hidden"),t.classList.add("hidden"),y(d.slice(0,f)),o.classList.toggle("hidden",f===1/0||f>=d.length)}o.addEventListener("click",()=>{f+=3,m()});function y(h){e.innerHTML="",h.forEach(d=>{var L;if(!d.poster_path)return;const g=`${R}${d.poster_path}`,v=((L=d.release_date)==null?void 0:L.slice(0,4))||"N/A",E=Array.isArray(d.genres)?d.genres.map(w=>w.name).slice(0,2).join(", "):"Unknown",p=document.createElement("a");p.className="movie-card",p.setAttribute("data-id",d.id),p.href=`catalog_mainbody.html?id=${d.id}`,p.innerHTML=`
      <img src="${g}" alt="${d.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${d.title}</h3>
          <p>${E} | ${v}</p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `,e.appendChild(p),G(p.querySelector(".movie-rating-stars"),d.vote_average||0)})}}class Le{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:s,currentPage:l=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=l,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=s,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const s=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${s}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],s=3;let l=o-1,a=o+1;l<1&&(l=1,a=Math.min(s,t)),a>t&&(a=t,l=Math.max(1,t-s+1)),l>1&&n.push("...");for(let r=l;r<=a;r++)n.push(r);return a<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function we(){let e="",t="",o="",n=!1,s={},l="trending";const a={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},r="98ff2d6267ceea8e039422b0f46fb813",f="https://api.themoviedb.org/3",c=document.getElementById("moviesContainer"),m=document.getElementById("emptyMessage"),y=document.querySelector(".search-input"),h=document.getElementById("clearSearch"),d=document.querySelector(".search-btn"),g=document.getElementById("yearBtn"),v=document.getElementById("yearDropdown"),E=document.getElementById("selectedYear"),p=document.getElementById("countrySelect"),L=p==null?void 0:p.querySelector(".search-input1"),w=p==null?void 0:p.querySelector(".country-list"),ge=p.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const i=document.querySelector(".search-row");if(!i)return;const u=i.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:u,behavior:"smooth"})},300));const pe=document.getElementById("pagination");if(!c||!m)return;const I=document.querySelector(".search-input"),$=I.parentElement;$.insertAdjacentHTML("beforeend",`
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
  `);const N=$.querySelector(".search-clear-btn");N.style.display="none",g.insertAdjacentHTML("beforeend",`
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
`),d&&(d.innerHTML=`
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
  `);const fe=`
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
`,B=document.getElementById("selectedCountry");B.insertAdjacentHTML("afterend",fe);function W(i,u){const C=i>480?480:i;if(C===0){pe.innerHTML="";return}new Le({containerId:"pagination",totalItems:C,itemsPerPage:20,currentPage:u,onPageChange:S=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",S),l==="trending"?x(S):z(S);const T=document.getElementById("moviesContainer");if(T){const F=T.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:F,behavior:"smooth"})}}})}if(fetch(`${f}/genre/movie/list?api_key=${r}&language=en-US`).then(i=>i.json()).then(i=>i.genres.forEach(u=>s[u.id]=u.name)),$.addEventListener("click",i=>{i.target.closest(".search-clear-btn")&&(I.value="",I.focus())}),$.addEventListener("input",i=>{if(i.target!==I)return;const u=$.querySelector(".search-clear-btn");u&&(u.style.display=I.value?"block":"none")}),ge.addEventListener("click",i=>{i.stopPropagation(),p.classList.toggle("open")}),w.querySelectorAll("li").forEach(i=>{i.addEventListener("click",u=>{u.stopPropagation();const b=i.textContent.trim();B.textContent=b,o=a[b]||"",p.classList.remove("open")})}),document.addEventListener("click",i=>{p.contains(i.target)||p.classList.remove("open")}),w&&!w.dataset.init){const i=document.createElement("li");i.textContent="Country",w.prepend(i),w.dataset.init="true"}N.addEventListener("click",()=>{y.value="",y.focus(),N.style.display="none"}),p.querySelectorAll(".country-list li").forEach(i=>{i.addEventListener("click",()=>{B.textContent=i.textContent,p.classList.remove("open")})}),p.querySelectorAll(".country-list li").forEach(i=>{i.addEventListener("click",()=>{const u=i.textContent.trim();B.textContent=u,o=a[u]||"",p.classList.remove("open")})}),document.addEventListener("click",i=>{const u=document.getElementById("countrySelect");u.contains(i.target)||u.classList.remove("open")}),p&&L&&w&&(L.readOnly=!0,w.querySelectorAll("li").forEach(i=>{i.addEventListener("click",u=>{u.stopPropagation();const b=i.textContent.trim();L.value=b,o=a[b]||"",p.classList.add("has-value"),p.classList.remove("open")})})),g&&v&&(g.addEventListener("click",i=>{i.stopPropagation();const u=v.classList.toggle("open");g.classList.toggle("open",u)}),v.addEventListener("click",i=>{i.stopPropagation(),i.target.tagName==="LI"&&(e=i.target.dataset.year||"",E.textContent=i.target.textContent,v.classList.remove("open"),g.classList.remove("open"))})),document.addEventListener("click",i=>{v.classList.contains("open")&&!v.contains(i.target)&&!g.contains(i.target)&&(v.classList.remove("open"),g.classList.remove("open"))}),d.addEventListener("click",()=>{if(t=y.value.trim(),n=!0,!t&&!e&&!o){n=!1,x();return}z()}),h&&h.addEventListener("click",function(){y.value="",L&&(L.value=""),E.textContent="Year",t="",e="",o="",n=!1,p&&p.classList.remove("has-value"),x()});function z(i=1){let u=`${f}/discover/movie?api_key=${r}&page=${i}`;t&&(u+=`&with_text_query=${encodeURIComponent(t)}`),e&&(u+=`&primary_release_year=${e}`),o&&(u+=`&with_origin_country=${o}`),fetch(u).then(b=>b.json()).then(b=>{J(b.results||[]),W(b.total_results,i)})}x(1);function x(i=1){m.style.display="none",l="trending",fetch(`${f}/trending/movie/week?api_key=${r}&page=${i}`).then(u=>u.json()).then(u=>{J(u.results||[]),W(u.total_results,i)})}function J(i){if(c.innerHTML="",!i.length){m.style.display=n?"block":"none";return}m.style.display="none",i.slice(0,10).forEach(u=>{var S,T;const b=document.createElement("a");b.className="movie-card",b.setAttribute("data-id",u.id),b.href=`catalog_mainbody.html?id=${u.id}`;const K=u.poster_path?`${R}${u.poster_path}`:"https://via.placeholder.com/300x450",X=((S=u.release_date)==null?void 0:S.slice(0,4))||"N/A",C=((T=u.genre_ids)==null?void 0:T.map(F=>s[F]).filter(Boolean).slice(0,2).join(", "))||"Unknown";b.innerHTML=`
        <img src="${K}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <p>${C} | ${X}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,c.appendChild(b),G(b.querySelector(".movie-rating-stars"),u.vote_average)})}}function Ee(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function o(){fetch(`${Z}/trending/movie/week?api_key=${Q}`).then(r=>r.json()).then(r=>n(r.results||[]))}function n(r){const f=document.getElementById("weeklyTrends");f&&(f.innerHTML="",r.slice(0,1).forEach(c=>{var g;const m=c.genre_ids.map(v=>e[v]).filter(Boolean).slice(0,2).join(", "),y=c.poster_path?R+c.poster_path:"./images/no-poster.jpg",h=((g=c.release_date)==null?void 0:g.split("-")[0])||"N/A",d=document.createElement("a");d.className="movie-card large",d.setAttribute("data-id",c.id),d.href=`catalog_mainbody.html?id=${c.id}`,d.innerHTML=`
        <img src="${y}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${c.title}</h3>
            <p>${m} | ${h}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,G(d.querySelector(".movie-rating-stars"),c.vote_average),f.appendChild(d)}))}function s(){const r=new Date,f=r.getFullYear(),c=String(r.getMonth()+1).padStart(2,"0"),m=`${f}-${c}-01`,y=new Date(f,r.getMonth()+1,0).getDate(),h=`${f}-${c}-${String(y).padStart(2,"0")}`,d=document.getElementById("noUpcomingMsg"),g=document.querySelector(".hero1"),v=document.querySelector(".movie-details");fetch(`${Z}/discover/movie?api_key=${Q}&primary_release_date.gte=${m}&primary_release_date.lte=${h}&sort_by=popularity.desc`).then(E=>E.json()).then(E=>{console.log("API RAW RESULTS:",E.results);const p=(E.results||[]).filter(w=>w.backdrop_path&&w.vote_count>0);if(console.log("FILTERED MOVIES:",p),p.length===0){console.warn("NO UPCOMING MOVIE THIS MONTH"),d&&(d.style.display="block"),g&&(g.style.display="none"),v&&(v.style.display="none");return}const L=p[Math.floor(Math.random()*p.length)];console.log("RANDOM MOVIE:",{title:L.title,release_date:L.release_date,vote_count:L.vote_count,popularity:L.popularity}),d&&(d.style.display="none"),g&&(g.style.display="block"),v&&(v.style.display="block"),a(L)})}function l(r){if(!r)return"—";const[f,c,m]=r.split("-");return`${m}.${c}.${f}`}function a(r){if(!r)return;if(!document.getElementById("movieVoteAvg")){console.warn("⏭️ renderMovieDetails skipped (not detail page)");return}const c=document.getElementById("heroBackdrop");c&&r.backdrop_path&&(c.src=t+r.backdrop_path);const m=(d,g)=>{const v=document.getElementById(d);v&&(v.textContent=g)};m("movieTitle",r.title||"—"),m("movieOverview",r.overview||"No overview available."),m("movieDate",r.release_date||"—"),m("movieDate",l(r.release_date)),m("movieVoteAvg",typeof r.vote_average=="number"?r.vote_average.toFixed(1):"—"),m("movieVoteCount",typeof r.vote_count=="number"?r.vote_count:"—"),m("moviePopularity",typeof r.popularity=="number"?r.popularity.toFixed(0):"—");let y="N/A";Array.isArray(r.genres)&&r.genres.length>0?y=r.genres.map(d=>d.name).join(", "):Array.isArray(r.genre_ids)&&r.genre_ids.length>0&&(y=r.genre_ids.map(d=>e[d]).filter(Boolean).join(", ")),m("movieGenre",y);const h=document.getElementById("libraryToggleBtn");if(h){const d=()=>{const g=ve(r.id);h.textContent=g?"Remove from library":"Add to my library",h.classList.toggle("active",g)};d(),h.onclick=g=>{g.stopPropagation(),ye(r),d()}}}o(),s()}function ke(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function Me(){document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),o=e.target.closest("#closeTeamModal"),n=document.getElementById("teamModal");if(n){if(t){e.preventDefault(),console.log("Footer: Modal açılıyor..."),n.classList.add("is-open"),document.body.style.overflow="hidden";return}if(o){console.log("Footer: Modal kapanıyor (Buton ile)..."),n.classList.remove("is-open"),document.body.style.overflow="";return}e.target===n&&(console.log("Footer: Modal kapanıyor (Backdrop ile)..."),n.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(console.log("Footer: Modal kapanıyor (ESC ile)..."),t.classList.remove("is-open"),document.body.style.overflow="")})}const k=document.getElementById("trailer-error-popup"),ee=document.querySelector("[data-popup-close]");function te(){k&&(k.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function O(){k&&(k.classList.add("is-hidden"),document.body.style.overflow="")}ee&&ee.addEventListener("click",O);k&&(k.addEventListener("click",e=>{e.target===k&&O()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!k.classList.contains("is-hidden")&&O()}));const ie="global-loader-overlay";let M=0,A=null,ne=null;function P(){const e=_();e&&e.classList.remove("is-visible"),M=0,H(),q()}function _(){const e=document.querySelectorAll(`#${ie}`);return e.forEach((t,o)=>{o>0&&t.remove()}),e[0]||null}function Se(){let e=_();return e||(e=document.createElement("div"),e.id=ie,e.className="loader-overlay",e.innerHTML=`
      <div class="loader-spinner" role="status" aria-live="polite" aria-label="Loading">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    `,document.body.appendChild(e)),e}function le(){const e=Se();M+=1,H(),q(),requestAnimationFrame(()=>e.classList.add("is-visible")),A=setTimeout(()=>{U()},12e3)}function j(){const e=_();e&&(M=Math.max(0,M-1),M===0&&(e.classList.remove("is-visible"),H(),q()))}function U(){const e=_();M=0,H(),q(),e&&e.classList.remove("is-visible")}P();window.addEventListener("pageshow",P);window.addEventListener("load",P);document.addEventListener("visibilitychange",()=>{document.hidden||P()});window.addEventListener("load",()=>{setTimeout(U,300)});function H(){A&&(clearTimeout(A),A=null)}function q(){ne||(ne=setInterval(()=>{const e=_();e&&M===0&&e.classList.contains("is-visible")&&e.classList.remove("is-visible")},5e3))}console.log("[header] header.js checking in");document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(a){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",a),document.body.appendChild(e))}function o(){e&&(e.remove(),e=null)}function n(a,r){r.classList.add("open"),a.setAttribute("aria-expanded","true"),t(()=>s(a,r)),document.body.style.overflow="hidden"}function s(a,r){r.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),o(),document.body.style.overflow=""}document.addEventListener("click",a=>{console.log("[header] Global click on:",a.target);const r=a.target.closest(".menu-open-btn");if(r){console.log("[header] Menu btn detected!");const c=document.querySelector(".mobile-menu");if(!c)return;console.log("[header] Menu toggle clicked"),c.classList.contains("open")?s(r,c):n(r,c);return}if(a.target.closest(".mobile-menu .nav-link")){const c=document.querySelector(".mobile-menu"),m=document.querySelector(".menu-open-btn");c&&c.classList.contains("open")&&setTimeout(()=>s(m,c),100)}}),document.addEventListener("keydown",a=>{if(a.key==="Escape"){const r=document.querySelector(".mobile-menu"),f=document.querySelector(".menu-open-btn");r&&r.classList.contains("open")&&s(f,r)}});function l(){var f;const a=window.location.pathname;document.querySelectorAll(".nav-link").forEach(c=>{c.classList.remove("active"),a.includes(c.getAttribute("href").replace("./",""))&&c.classList.add("active")}),(a==="/"||a.endsWith("index.html"))&&((f=document.querySelector('.nav-link[href="./index.html"]'))==null||f.classList.add("active"))}l()});const Ie="98ff2d6267ceea8e039422b0f46fb813",$e="https://api.themoviedb.org/3",Y=he.create({baseURL:$e,params:{api_key:Ie,language:"en-US"}}),Te=async(e="day")=>{try{const{data:t}=await Y.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},_e=async e=>{try{const{data:t}=await Y.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},ce=async e=>{try{const{data:t}=await Y.get(`/movie/${e}/videos`);return t.results.filter(o=>o.site==="YouTube"&&o.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function Be(e,t){if(!e)return;e.innerHTML="";const o=Math.max(0,Math.min(10,t||0)),n=Math.floor(o/2),s=o/2-n>=.5;for(let l=0;l<5;l++){let a="empty";l<n?a="full":l===n&&s&&(a="half");const r=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14" class="star">
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
        <path d="M16 2l4.09 9.63L30 12.27l-7 6.86L24.18 30 16 24.8 7.82 30 9 19.13l-7-6.86 9.91-1.64L16 2z"
          fill="${a==="full"?`url(#${r}-full)`:a==="half"?`url(#${r}-half)`:"#bfbfbf"}"
          stroke="none" />
      </svg>
    `}}function xe(e){return e[Math.floor(Math.random()*e.length)]}async function Ce(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{le();const o=await Te("day");if(o&&o.length>0){const n=xe(o);Ae(e,n)}else oe(e)}catch(o){console.error("Hero yüklenirken hata:",o),oe(e)}finally{j()}}document.addEventListener("DOMContentLoaded",()=>{Ce().catch(e=>console.error("initHero error:",e))});function Ae(e,t){const{title:o,overview:n,backdrop_path:s,vote_average:l,id:a}=t,r=()=>{const c="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",m=window.devicePixelRatio>1.1;let y="";if(s){let h="w780";window.innerWidth>=1280?h=m?"original":"w1280":window.innerWidth>=768&&(h=m?"w1280":"w780"),y=`https://image.tmdb.org/t/p/${h}${s}`}else y=`./background/desktop-1${m?"-@2x":""}.jpg`;e.style.backgroundImage=`${c}, url('${y}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};r(),new MutationObserver(r).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",r),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,Be(e.querySelector(".hero-rating-stars"),l),e.querySelector("#watch-trailer").onclick=async c=>{c.preventDefault(),le();try{const m=await ce(a);m&&m.length>0?window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:a}})):te()}catch(m){console.log("Hata:",m),te()}finally{j()}},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function oe(e){e.classList.add("hero-default");const t=()=>{const n=window.devicePixelRatio>1.1,s="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let l=window.innerWidth<768?"mobil-1":"desktop-1";n&&(l+="-@2x");const a=`./background/${l}.jpg`.replace(/\/+/g,"/");console.log("Resim URL Deneniyor:",a),e.style.backgroundImage=`${s}, url('${a}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const o=e.querySelector("#go-catalog");o&&(o.onclick=()=>{window.location.href="./catalog.html"})}const de="favorites";function V(){try{const e=localStorage.getItem(de);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function ue(e){try{localStorage.setItem(de,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function re(e){return V().some(o=>Number(o.id)===Number(e))}function Pe(e){const t=V();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),ue(t))}function He(e){let t=V();t=t.filter(o=>Number(o.id)!==Number(e)),ue(t)}function qe(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg class="icon icon-Vectorx"><use xlink:href="/images/icons/symbol-defs.svg#icon-Vectorx">
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const o=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&D()}),o.addEventListener("click",D),document.addEventListener("keydown",n=>{n.key==="Escape"&&D()})}function D(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}qe();async function me(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await _e(e),s=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",l=n.genres?n.genres.map(m=>m.name).join(", "):"Unknown",a=re(n.id),r=n.release_date?n.release_date.slice(0,4):"N/A",f=`
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
            <span class="stats-value">${l}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${n.overview||"No description available."}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${a?"active":""}" id="modal-library-btn">
            ${a?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;o.innerHTML=f;const c=document.getElementById("modal-library-btn");c.addEventListener("click",()=>{if(re(n.id))He(n.id),c.textContent="Add to my library",c.classList.remove("active");else{const m={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};Pe(m),c.textContent="Remove from library",c.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const Ne=["weeklyTrends","moviesContainer","catalog-list","movieList"];Ne.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const s=n.dataset.id;me(s)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&me(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,o=document.querySelector(".backdrop"),n=document.getElementById("modal-content");o.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const s=await ce(t);if(console.log("Fetched videos:",s),s&&s.length>0){const l=s[0].key;n.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${l}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(s){console.error("Trailer loading error:",s),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});se();Me();document.body.dataset.page==="catalog-main"&&initCatalogMainbody();document.addEventListener("DOMContentLoaded",()=>{U(),j(),ke(),document.getElementById("weeklyTrends")&&Ee(),document.getElementById("moviesContainer")&&we(),document.getElementById("movieList")&&be();const e=document.getElementById("hero-btn");e&&e.addEventListener("click",()=>{window.location.href="./catalog.html"})});
//# sourceMappingURL=main-HBC-XRFT.js.map
