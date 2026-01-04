import{a as he}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();function ae(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(ae,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}const ee="98ff2d6267ceea8e039422b0f46fb813",te="https://api.themoviedb.org/3",j="https://image.tmdb.org/t/p/w500";function U(e,t){if(!e)return;e.innerHTML="";const o=Math.floor(t/2),n=t%2>=1;for(let r=0;r<5;r++){let a="empty";r<o?a="full":r===o&&n&&(a="half");const i=`star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${i}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${i}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path
          d="M24.622 30L16 24.173 7.378 30l3.135-9.286L2.388 15.14h10.024L16 5.827l3.588 9.313h10.024l-8.125 5.569z"
          fill="${a==="full"?`url(#${i}-full)`:a==="half"?`url(#${i}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function le(){return JSON.parse(localStorage.getItem("favorites"))||[]}function ve(e){return le().some(t=>t.id===e)}function ye(e){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.some(n=>n.id===e.id)){localStorage.setItem("favorites",JSON.stringify(t.filter(n=>n.id!==e.id)));return}const o=Array.isArray(e.genre_ids)?e.genre_ids:Array.isArray(e.genres)?e.genres.map(n=>n.id):[];t.push({id:e.id,title:e.title,poster_path:e.poster_path,vote_average:e.vote_average,release_date:e.release_date,genre_ids:o}),localStorage.setItem("favorites",JSON.stringify(t))}function be(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),r=document.getElementById("genreDropdown"),a=document.getElementById("genreBtn"),i=document.getElementById("genreIcon"),g=document.querySelector(".search-button");function E(){return window.innerWidth>=768&&window.innerWidth<1024}let m=0,s=null;if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",function(){r&&r.classList.contains("active")&&(r.classList.remove("active"),a.classList.remove("open"),i&&i.classList.remove("rotate"))}),a&&r&&a.addEventListener("click",function(p){p.stopPropagation(),r.classList.toggle("active"),a.classList.toggle("open"),i&&i.classList.toggle("rotate")}),g&&g.addEventListener("click",()=>{window.location.href="/catalog.html"}),r&&r.addEventListener("click",function(p){p.stopPropagation();const d=p.target.closest("li");if(!d)return;s=d.dataset.genreId?Number(d.dataset.genreId):null;const c=a.querySelector(".genre-text");c&&(d.dataset.genreId?c.textContent=d.textContent:c.textContent="Genre"),r.classList.remove("active"),a.classList.remove("open"),i&&i.classList.remove("rotate"),m=6,f()});function h(){return window.innerWidth>=1280}function y(){return h()?9:E()&&s!==null?6:9}g&&g.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"}),m=y(),f(),window.addEventListener("resize",()=>{const p=y();p!==m&&(m=p,f())});function f(){const p=le();let d=p;if(s!==null){const c=p.filter(v=>Array.isArray(v.genres)&&v.genres.some(w=>w.id===s));c.length>0&&(d=c)}if(e.innerHTML="",s!==null&&(d=p.filter(c=>Array.isArray(c.genres)&&c.genres.some(v=>v.id===s))),s!==null&&d.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.remove("genre-hidden");return}if(p.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.add("genre-hidden");return}n&&n.classList.remove("genre-hidden"),t.classList.add("hidden"),L(d.slice(0,m)),o.classList.toggle("hidden",m===1/0||m>=d.length)}window.addEventListener("resize",()=>{const p=y();p!==m&&(m=p,f())}),o.addEventListener("click",()=>{m+=3,f()});function L(p){e.innerHTML="",p.forEach(d=>{var $;if(!d.poster_path)return;const c=`${j}${d.poster_path}`,v=(($=d.release_date)==null?void 0:$.slice(0,4))||"N/A",w=Array.isArray(d.genres)?d.genres.map(M=>M.name).slice(0,2).join(", "):"Unknown",k=document.createElement("a");k.className="movie-card",k.setAttribute("data-id",d.id),k.href=`catalog_mainbody.html?id=${d.id}`,k.innerHTML=`
      <img src="${c}" alt="${d.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${d.title}</h3>
          <p class="movie-meta">
          <span class="movie-genres">${w}</span>
          <span class="movie-year">| ${v}</span>
          </p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `,e.appendChild(k),U(k.querySelector(".movie-rating-stars"),d.vote_average||0)})}}class Le{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:r,currentPage:a=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=a,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=r,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const r=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${r}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],r=3;let a=o-1,i=o+1;a<1&&(a=1,i=Math.min(r,t)),i>t&&(i=t,a=Math.max(1,t-r+1)),a>1&&n.push("...");for(let g=a;g<=i;g++)n.push(g);return i<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function we(){let e="",t="",o="",n=!1,r={},a="trending";const i={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},g="98ff2d6267ceea8e039422b0f46fb813",E="https://api.themoviedb.org/3",m=document.getElementById("moviesContainer"),s=document.getElementById("emptyMessage"),h=document.querySelector(".search-input"),y=document.getElementById("clearSearch"),f=document.querySelector(".search-btn"),L=document.getElementById("yearBtn"),p=document.getElementById("yearDropdown"),d=document.getElementById("selectedYear"),c=document.getElementById("countrySelect"),v=c==null?void 0:c.querySelector(".search-input1"),w=c==null?void 0:c.querySelector(".country-list"),k=c.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const l=document.querySelector(".search-row");if(!l)return;const u=l.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:u,behavior:"smooth"})},300));const $=document.getElementById("pagination");if(!m||!s)return;const M=document.querySelector(".search-input"),B=M.parentElement;B.insertAdjacentHTML("beforeend",`
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
  `);const F=B.querySelector(".search-clear-btn");F.style.display="none",L.insertAdjacentHTML("beforeend",`
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
`),f&&(f.innerHTML=`
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
`,C=document.getElementById("selectedCountry");C.insertAdjacentHTML("afterend",fe);function J(l,u){const P=l>480?480:l;if(P===0){$.innerHTML="";return}new Le({containerId:"pagination",totalItems:P,itemsPerPage:20,currentPage:u,onPageChange:x=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",x),a==="trending"?A(x):K(x);const T=document.getElementById("moviesContainer");if(T){const O=T.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:O,behavior:"smooth"})}}})}if(fetch(`${E}/genre/movie/list?api_key=${g}&language=en-US`).then(l=>l.json()).then(l=>l.genres.forEach(u=>r[u.id]=u.name)),B.addEventListener("click",l=>{l.target.closest(".search-clear-btn")&&(M.value="",M.focus())}),B.addEventListener("input",l=>{if(l.target!==M)return;const u=B.querySelector(".search-clear-btn");u&&(u.style.display=M.value?"block":"none")}),k.addEventListener("click",l=>{l.stopPropagation(),c.classList.toggle("open")}),w.querySelectorAll("li").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation();const b=l.textContent.trim();C.textContent=b,o=i[b]||"",c.classList.remove("open")})}),document.addEventListener("click",l=>{c.contains(l.target)||c.classList.remove("open")}),w&&!w.dataset.init){const l=document.createElement("li");l.textContent="Country",w.prepend(l),w.dataset.init="true"}F.addEventListener("click",()=>{h.value="",h.focus(),F.style.display="none"}),c.querySelectorAll(".country-list li").forEach(l=>{l.addEventListener("click",()=>{C.textContent=l.textContent,c.classList.remove("open")})}),c.querySelectorAll(".country-list li").forEach(l=>{l.addEventListener("click",()=>{const u=l.textContent.trim();C.textContent=u,o=i[u]||"",c.classList.remove("open")})}),document.addEventListener("click",l=>{const u=document.getElementById("countrySelect");u.contains(l.target)||u.classList.remove("open")}),c&&v&&w&&(v.readOnly=!0,w.querySelectorAll("li").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation();const b=l.textContent.trim();v.value=b,o=i[b]||"",c.classList.add("has-value"),c.classList.remove("open")})})),L&&p&&(L.addEventListener("click",l=>{l.stopPropagation();const u=p.classList.toggle("open");L.classList.toggle("open",u)}),p.addEventListener("click",l=>{l.stopPropagation(),l.target.tagName==="LI"&&(e=l.target.dataset.year||"",d.textContent=l.target.textContent,p.classList.remove("open"),L.classList.remove("open"))})),document.addEventListener("click",l=>{p.classList.contains("open")&&!p.contains(l.target)&&!L.contains(l.target)&&(p.classList.remove("open"),L.classList.remove("open"))}),f.addEventListener("click",()=>{if(t=h.value.trim(),n=!0,!t&&!e&&!o){n=!1,A();return}K()}),y&&y.addEventListener("click",function(){h.value="",v&&(v.value=""),d.textContent="Year",t="",e="",o="",n=!1,c&&c.classList.remove("has-value"),A()});function K(l=1){let u=`${E}/discover/movie?api_key=${g}&page=${l}`;t&&(u+=`&with_text_query=${encodeURIComponent(t)}`),e&&(u+=`&primary_release_year=${e}`),o&&(u+=`&with_origin_country=${o}`),fetch(u).then(b=>b.json()).then(b=>{X(b.results||[]),J(b.total_results,l)})}A(1);function A(l=1){s.style.display="none",a="trending",fetch(`${E}/trending/movie/week?api_key=${g}&page=${l}`).then(u=>u.json()).then(u=>{X(u.results||[]),J(u.total_results,l)})}function X(l){if(m.innerHTML="",!l.length){s.style.display=n?"block":"none";return}s.style.display="none",l.slice(0,20).forEach(u=>{var x,T;const b=document.createElement("a");b.className="movie-card",b.setAttribute("data-id",u.id),b.href=`catalog_mainbody.html?id=${u.id}`;const Q=u.poster_path?`${j}${u.poster_path}`:"https://via.placeholder.com/300x450",Z=((x=u.release_date)==null?void 0:x.slice(0,4))||"N/A",P=((T=u.genre_ids)==null?void 0:T.map(O=>r[O]).filter(Boolean).slice(0,2).join(", "))||"Unknown";b.innerHTML=`
        <img src="${Q}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <div class="movie-meta">
        <span class="movie-genre">${P}</span>
        <span class="movie-year">| ${Z}</span>
      </div>
    </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,m.appendChild(b),U(b.querySelector(".movie-rating-stars"),u.vote_average)})}}function Ee(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}let o=[];function n(){fetch(`${te}/trending/movie/week?api_key=${ee}`).then(s=>s.json()).then(s=>{o=s.results||[],i(o)})}let r=a();window.addEventListener("resize",()=>{const s=a();s!==r&&(r=s,i(o))});function a(){return window.matchMedia("(min-width: 768px)").matches?3:1}function i(s){const h=document.getElementById("weeklyTrends");if(!h)return;h.innerHTML="",[...s].sort(()=>Math.random()-.5).slice(0,a()).forEach(f=>{var v;const L=f.genre_ids.map(w=>e[w]).filter(Boolean).slice(0,2).join(", "),p=f.poster_path?j+f.poster_path:"./images/no-poster.jpg",d=((v=f.release_date)==null?void 0:v.split("-")[0])||"N/A",c=document.createElement("a");c.className="movie-card large",c.setAttribute("data-id",f.id),c.href=`catalog_mainbody.html?id=${f.id}`,c.innerHTML=`
        <img src="${p}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${f.title}</h3>
            <p class="movie-genres">${L}</p>
            <p class="movie-year">| ${d}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,U(c.querySelector(".movie-rating-stars"),f.vote_average),h.appendChild(c)})}function g(){const s=new Date,h=s.getFullYear(),y=String(s.getMonth()+1).padStart(2,"0"),f=`${h}-${y}-01`,L=new Date(h,s.getMonth()+1,0).getDate(),p=`${h}-${y}-${String(L).padStart(2,"0")}`,d=document.getElementById("noUpcomingMsg"),c=document.querySelector(".hero1"),v=document.querySelector(".movie-details");fetch(`${te}/discover/movie?api_key=${ee}&primary_release_date.gte=${f}&primary_release_date.lte=${p}&sort_by=popularity.desc`).then(w=>w.json()).then(w=>{const k=(w.results||[]).filter(M=>M.backdrop_path&&M.vote_count>0);if(k.length===0){console.warn("NO UPCOMING MOVIE THIS MONTH"),d&&(d.style.display="block"),c&&(c.style.display="none"),v&&(v.style.display="none");return}const $=k[Math.floor(Math.random()*k.length)];d&&(d.style.display="none"),c&&(c.style.display="block"),v&&(v.style.display="block"),m($)})}function E(s){if(!s)return"—";const[h,y,f]=s.split("-");return`${f}.${y}.${h}`}function m(s){if(!s)return;if(!document.getElementById("movieVoteAvg")){console.warn("⏭️ renderMovieDetails skipped (not detail page)");return}const y=document.getElementById("heroBackdrop");y&&s.backdrop_path&&(y.src=t+s.backdrop_path);const f=(d,c)=>{const v=document.getElementById(d);v&&(v.textContent=c)};f("movieTitle",s.title||"—"),f("movieOverview",s.overview||"No overview available."),f("movieDate",s.release_date||"—"),f("movieDate",E(s.release_date)),f("movieVoteAvg",typeof s.vote_average=="number"?s.vote_average.toFixed(1):"—"),f("movieVoteCount",typeof s.vote_count=="number"?s.vote_count:"—"),f("moviePopularity",typeof s.popularity=="number"?s.popularity.toFixed(0):"—");let L="N/A";Array.isArray(s.genres)&&s.genres.length>0?L=s.genres.map(d=>d.name).join(", "):Array.isArray(s.genre_ids)&&s.genre_ids.length>0&&(L=s.genre_ids.map(d=>e[d]).filter(Boolean).join(", ")),f("movieGenre",L);const p=document.getElementById("libraryToggleBtn");if(p){const d=()=>{const c=ve(s.id);p.textContent=c?"Remove from library":"Add to my library",p.classList.toggle("active",c)};d(),p.onclick=c=>{c.stopPropagation(),ye(s),d()}}}n(),g()}function ke(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function Me(){document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),o=e.target.closest("#closeTeamModal"),n=document.getElementById("teamModal");if(n){if(t){e.preventDefault(),console.log("Footer: Modal açılıyor..."),n.classList.add("is-open"),document.body.style.overflow="hidden";return}if(o){console.log("Footer: Modal kapanıyor (Buton ile)..."),n.classList.remove("is-open"),document.body.style.overflow="";return}e.target===n&&(console.log("Footer: Modal kapanıyor (Backdrop ile)..."),n.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(console.log("Footer: Modal kapanıyor (ESC ile)..."),t.classList.remove("is-open"),document.body.style.overflow="")})}const S=document.getElementById("trailer-error-popup"),ne=document.querySelector("[data-popup-close]");function oe(){S&&(S.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function R(){S&&(S.classList.add("is-hidden"),document.body.style.overflow="")}ne&&ne.addEventListener("click",R);S&&(S.addEventListener("click",e=>{e.target===S&&R()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!S.classList.contains("is-hidden")&&R()}));const ce="global-loader-overlay";let I=0,H=null,re=null;function q(){const e=_();e&&e.classList.remove("is-visible"),I=0,N(),D()}function _(){const e=document.querySelectorAll(`#${ce}`);return e.forEach((t,o)=>{o>0&&t.remove()}),e[0]||null}function Se(){let e=_();return e||(e=document.createElement("div"),e.id=ce,e.className="loader-overlay",e.innerHTML=`
      <div class="loader-spinner" role="status" aria-live="polite" aria-label="Loading">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    `,document.body.appendChild(e)),e}function de(){const e=Se();I+=1,N(),D(),requestAnimationFrame(()=>e.classList.add("is-visible")),H=setTimeout(()=>{W()},12e3)}function Y(){const e=_();e&&(I=Math.max(0,I-1),I===0&&(e.classList.remove("is-visible"),N(),D()))}function W(){const e=_();I=0,N(),D(),e&&e.classList.remove("is-visible")}q();window.addEventListener("pageshow",q);window.addEventListener("load",q);document.addEventListener("visibilitychange",()=>{document.hidden||q()});window.addEventListener("load",()=>{setTimeout(W,300)});function N(){H&&(clearTimeout(H),H=null)}function D(){re||(re=setInterval(()=>{const e=_();e&&I===0&&e.classList.contains("is-visible")&&e.classList.remove("is-visible")},5e3))}console.log("[header] header.js checking in");document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(i){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",i),document.body.appendChild(e))}function o(){e&&(e.remove(),e=null)}function n(i,g){g.classList.add("open"),i.setAttribute("aria-expanded","true"),t(()=>r(i,g)),document.body.style.overflow="hidden"}function r(i,g){g.classList.remove("open"),i&&i.setAttribute("aria-expanded","false"),o(),document.body.style.overflow=""}document.addEventListener("click",i=>{console.log("[header] Global click on:",i.target);const g=i.target.closest(".menu-open-btn");if(g){console.log("[header] Menu btn detected!");const m=document.querySelector(".mobile-menu");if(!m)return;console.log("[header] Menu toggle clicked"),m.classList.contains("open")?r(g,m):n(g,m);return}if(i.target.closest(".mobile-menu .nav-link")){const m=document.querySelector(".mobile-menu"),s=document.querySelector(".menu-open-btn");m&&m.classList.contains("open")&&setTimeout(()=>r(s,m),100)}}),document.addEventListener("keydown",i=>{if(i.key==="Escape"){const g=document.querySelector(".mobile-menu"),E=document.querySelector(".menu-open-btn");g&&g.classList.contains("open")&&r(E,g)}});function a(){var E;const i=window.location.pathname;document.querySelectorAll(".nav-link").forEach(m=>{m.classList.remove("active"),i.includes(m.getAttribute("href").replace("./",""))&&m.classList.add("active")}),(i==="/"||i.endsWith("index.html"))&&((E=document.querySelector('.nav-link[href="./index.html"]'))==null||E.classList.add("active"))}a()});const Ie="98ff2d6267ceea8e039422b0f46fb813",$e="https://api.themoviedb.org/3",V=he.create({baseURL:$e,params:{api_key:Ie,language:"en-US"}}),xe=async(e="day")=>{try{const{data:t}=await V.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},Be=async e=>{try{const{data:t}=await V.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},ue=async e=>{try{const{data:t}=await V.get(`/movie/${e}/videos`);return t.results.filter(o=>o.site==="YouTube"&&o.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function Te(e,t){if(!e)return;e.innerHTML="";const o=Math.max(0,Math.min(10,t||0)),n=Math.floor(o/2),r=o/2-n>=.5;for(let a=0;a<5;a++){let i="empty";a<n?i="full":a===n&&r&&(i="half");const g=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14" class="star">
        <defs>
          <linearGradient id="${g}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${g}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path d="M16 2l4.09 9.63L30 12.27l-7 6.86L24.18 30 16 24.8 7.82 30 9 19.13l-7-6.86 9.91-1.64L16 2z"
          fill="${i==="full"?`url(#${g}-full)`:i==="half"?`url(#${g}-half)`:"#bfbfbf"}"
          stroke="none" />
      </svg>
    `}}function _e(e){return e[Math.floor(Math.random()*e.length)]}async function Ce(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{de();const o=await xe("day");if(o&&o.length>0){const n=_e(o);Ae(e,n)}else se(e)}catch(o){console.error("Hero yüklenirken hata:",o),se(e)}finally{Y()}}document.addEventListener("DOMContentLoaded",()=>{Ce().catch(e=>console.error("initHero error:",e))});function Ae(e,t){const{title:o,overview:n,backdrop_path:r,vote_average:a,id:i}=t,g=()=>{const m="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",s=window.devicePixelRatio>1.1;let h="";if(r){let y="w780";window.innerWidth>=1280?y=s?"original":"w1280":window.innerWidth>=768&&(y=s?"w1280":"w780"),h=`https://image.tmdb.org/t/p/${y}${r}`}else h=`./background/desktop-1${s?"-@2x":""}.jpg`;e.style.backgroundImage=`${m}, url('${h}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};g(),new MutationObserver(g).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",g),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,Te(e.querySelector(".hero-rating-stars"),a),e.querySelector("#watch-trailer").onclick=async m=>{m.preventDefault(),de();try{const s=await ue(i);s&&s.length>0?window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:i}})):oe()}catch(s){console.log("Hata:",s),oe()}finally{Y()}},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function se(e){e.classList.add("hero-default");const t=()=>{const n=window.devicePixelRatio>1.1,r="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let a=window.innerWidth<768?"mobil-1":"desktop-1";n&&(a+="-@2x");const i=`./background/${a}.jpg`.replace(/\/+/g,"/");console.log("Resim URL Deneniyor:",i),e.style.backgroundImage=`${r}, url('${i}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const o=e.querySelector("#go-catalog");o&&(o.onclick=()=>{window.location.href="./catalog.html"})}const me="favorites";function z(){try{const e=localStorage.getItem(me);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function ge(e){try{localStorage.setItem(me,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function ie(e){return z().some(o=>Number(o.id)===Number(e))}function Pe(e){const t=z();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),ge(t))}function He(e){let t=z();t=t.filter(o=>Number(o.id)!==Number(e)),ge(t)}function qe(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg class="icon icon-Vectorx"><use xlink:href="/images/icons/symbol-defs.svg#icon-Vectorx">
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const o=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&G()}),o.addEventListener("click",G),document.addEventListener("keydown",n=>{n.key==="Escape"&&G()})}function G(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}qe();async function pe(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await Be(e),r=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",a=n.genres?n.genres.map(s=>s.name).join(", "):"Unknown",i=ie(n.id),g=n.release_date?n.release_date.slice(0,4):"N/A",E=`
      <div class="modal-img-wrapper">
        <img src="${r}" alt="${n.title}" class="modal-img" />
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
          <button type="button" class="btn-modal btn-add-library ${i?"active":""}" id="modal-library-btn">
            ${i?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;o.innerHTML=E;const m=document.getElementById("modal-library-btn");m.addEventListener("click",()=>{if(ie(n.id))He(n.id),m.textContent="Add to my library",m.classList.remove("active");else{const s={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};Pe(s),m.textContent="Remove from library",m.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const Ne=["weeklyTrends","moviesContainer","catalog-list","movieList"];Ne.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const r=n.dataset.id;pe(r)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&pe(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,o=document.querySelector(".backdrop"),n=document.getElementById("modal-content");o.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const r=await ue(t);if(console.log("Fetched videos:",r),r&&r.length>0){const a=r[0].key;n.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${a}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(r){console.error("Trailer loading error:",r),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});ae();Me();document.body.dataset.page==="catalog-main"&&initCatalogMainbody();document.addEventListener("DOMContentLoaded",()=>{W(),Y(),ke(),document.getElementById("weeklyTrends")&&Ee(),document.getElementById("moviesContainer")&&we(),document.getElementById("movieList")&&be();const e=document.getElementById("hero-btn");e&&e.addEventListener("click",()=>{window.location.href="./catalog.html"})});
//# sourceMappingURL=main-DR7WkAoG.js.map
