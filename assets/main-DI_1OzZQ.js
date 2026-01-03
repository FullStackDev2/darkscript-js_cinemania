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
    `}}function le(){return JSON.parse(localStorage.getItem("favorites"))||[]}function ve(e){return le().some(t=>t.id===e)}function ye(e){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.some(n=>n.id===e.id)){localStorage.setItem("favorites",JSON.stringify(t.filter(n=>n.id!==e.id)));return}const o=Array.isArray(e.genre_ids)?e.genre_ids:Array.isArray(e.genres)?e.genres.map(n=>n.id):[];t.push({id:e.id,title:e.title,poster_path:e.poster_path,vote_average:e.vote_average,release_date:e.release_date,genre_ids:o}),localStorage.setItem("favorites",JSON.stringify(t))}function be(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),r=document.getElementById("genreDropdown"),a=document.getElementById("genreBtn"),i=document.getElementById("genreIcon"),g=document.querySelector(".search-button");function E(){return window.innerWidth>=768&&window.innerWidth<1024}let u=0,s=null;if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",function(){r&&r.classList.contains("active")&&(r.classList.remove("active"),a.classList.remove("open"),i&&i.classList.remove("rotate"))}),a&&r&&a.addEventListener("click",function(p){p.stopPropagation(),r.classList.toggle("active"),a.classList.toggle("open"),i&&i.classList.toggle("rotate")}),g&&g.addEventListener("click",()=>{window.location.href="/catalog.html"}),r&&r.addEventListener("click",function(p){p.stopPropagation();const m=p.target.closest("li");if(!m)return;s=m.dataset.genreId?Number(m.dataset.genreId):null;const f=a.querySelector(".genre-text");f&&(m.dataset.genreId?f.textContent=m.textContent:f.textContent="Genre"),r.classList.remove("active"),a.classList.remove("open"),i&&i.classList.remove("rotate"),u=6,y()});function v(){return E()?s!==null?6:9:1/0}g&&g.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"}),u=v(),y(),window.addEventListener("resize",()=>{const p=v();p!==u&&(u=p,y())});function y(){const p=le();let m=p;if(s!==null){const f=p.filter(c=>Array.isArray(c.genres)&&c.genres.some(b=>b.id===s));f.length>0&&(m=f)}if(e.innerHTML="",s!==null&&(m=p.filter(f=>Array.isArray(f.genres)&&f.genres.some(c=>c.id===s))),s!==null&&m.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.remove("genre-hidden");return}if(p.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.add("genre-hidden");return}n&&n.classList.remove("genre-hidden"),t.classList.add("hidden"),h(m.slice(0,u)),o.classList.toggle("hidden",u===1/0||u>=m.length)}window.addEventListener("resize",()=>{const p=v();p!==u&&(u=p,y())}),o.addEventListener("click",()=>{u+=3,y()});function h(p){e.innerHTML="",p.forEach(m=>{var k;if(!m.poster_path)return;const f=`${j}${m.poster_path}`,c=((k=m.release_date)==null?void 0:k.slice(0,4))||"N/A",b=Array.isArray(m.genres)?m.genres.map(x=>x.name).slice(0,2).join(", "):"Unknown",L=document.createElement("a");L.className="movie-card",L.setAttribute("data-id",m.id),L.href=`catalog_mainbody.html?id=${m.id}`,L.innerHTML=`
      <img src="${f}" alt="${m.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${m.title}</h3>
          <p class="movie-meta">
          <span class="movie-genres">${b}</span>
          <span class="movie-year">| ${c}</span>
          </p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `,e.appendChild(L),U(L.querySelector(".movie-rating-stars"),m.vote_average||0)})}}class Le{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:r,currentPage:a=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=a,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=r,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const r=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${r}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],r=3;let a=o-1,i=o+1;a<1&&(a=1,i=Math.min(r,t)),i>t&&(i=t,a=Math.max(1,t-r+1)),a>1&&n.push("...");for(let g=a;g<=i;g++)n.push(g);return i<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function we(){let e="",t="",o="",n=!1,r={},a="trending";const i={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},g="98ff2d6267ceea8e039422b0f46fb813",E="https://api.themoviedb.org/3",u=document.getElementById("moviesContainer"),s=document.getElementById("emptyMessage"),v=document.querySelector(".search-input"),y=document.getElementById("clearSearch"),h=document.querySelector(".search-btn"),p=document.getElementById("yearBtn"),m=document.getElementById("yearDropdown"),f=document.getElementById("selectedYear"),c=document.getElementById("countrySelect"),b=c==null?void 0:c.querySelector(".search-input1"),L=c==null?void 0:c.querySelector(".country-list"),k=c.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const l=document.querySelector(".search-row");if(!l)return;const d=l.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:d,behavior:"smooth"})},300));const x=document.getElementById("pagination");if(!u||!s)return;const M=document.querySelector(".search-input"),B=M.parentElement;B.insertAdjacentHTML("beforeend",`
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
  `);const D=B.querySelector(".search-clear-btn");D.style.display="none",p.insertAdjacentHTML("beforeend",`
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
`),h&&(h.innerHTML=`
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
`,C=document.getElementById("selectedCountry");C.insertAdjacentHTML("afterend",fe);function J(l,d){const P=l>480?480:l;if(P===0){x.innerHTML="";return}new Le({containerId:"pagination",totalItems:P,itemsPerPage:20,currentPage:d,onPageChange:$=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",$),a==="trending"?A($):K($);const T=document.getElementById("moviesContainer");if(T){const O=T.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:O,behavior:"smooth"})}}})}if(fetch(`${E}/genre/movie/list?api_key=${g}&language=en-US`).then(l=>l.json()).then(l=>l.genres.forEach(d=>r[d.id]=d.name)),B.addEventListener("click",l=>{l.target.closest(".search-clear-btn")&&(M.value="",M.focus())}),B.addEventListener("input",l=>{if(l.target!==M)return;const d=B.querySelector(".search-clear-btn");d&&(d.style.display=M.value?"block":"none")}),k.addEventListener("click",l=>{l.stopPropagation(),c.classList.toggle("open")}),L.querySelectorAll("li").forEach(l=>{l.addEventListener("click",d=>{d.stopPropagation();const w=l.textContent.trim();C.textContent=w,o=i[w]||"",c.classList.remove("open")})}),document.addEventListener("click",l=>{c.contains(l.target)||c.classList.remove("open")}),L&&!L.dataset.init){const l=document.createElement("li");l.textContent="Country",L.prepend(l),L.dataset.init="true"}D.addEventListener("click",()=>{v.value="",v.focus(),D.style.display="none"}),c.querySelectorAll(".country-list li").forEach(l=>{l.addEventListener("click",()=>{C.textContent=l.textContent,c.classList.remove("open")})}),c.querySelectorAll(".country-list li").forEach(l=>{l.addEventListener("click",()=>{const d=l.textContent.trim();C.textContent=d,o=i[d]||"",c.classList.remove("open")})}),document.addEventListener("click",l=>{const d=document.getElementById("countrySelect");d.contains(l.target)||d.classList.remove("open")}),c&&b&&L&&(b.readOnly=!0,L.querySelectorAll("li").forEach(l=>{l.addEventListener("click",d=>{d.stopPropagation();const w=l.textContent.trim();b.value=w,o=i[w]||"",c.classList.add("has-value"),c.classList.remove("open")})})),p&&m&&(p.addEventListener("click",l=>{l.stopPropagation();const d=m.classList.toggle("open");p.classList.toggle("open",d)}),m.addEventListener("click",l=>{l.stopPropagation(),l.target.tagName==="LI"&&(e=l.target.dataset.year||"",f.textContent=l.target.textContent,m.classList.remove("open"),p.classList.remove("open"))})),document.addEventListener("click",l=>{m.classList.contains("open")&&!m.contains(l.target)&&!p.contains(l.target)&&(m.classList.remove("open"),p.classList.remove("open"))}),h.addEventListener("click",()=>{if(t=v.value.trim(),n=!0,!t&&!e&&!o){n=!1,A();return}K()}),y&&y.addEventListener("click",function(){v.value="",b&&(b.value=""),f.textContent="Year",t="",e="",o="",n=!1,c&&c.classList.remove("has-value"),A()});function K(l=1){let d=`${E}/discover/movie?api_key=${g}&page=${l}`;t&&(d+=`&with_text_query=${encodeURIComponent(t)}`),e&&(d+=`&primary_release_year=${e}`),o&&(d+=`&with_origin_country=${o}`),fetch(d).then(w=>w.json()).then(w=>{X(w.results||[]),J(w.total_results,l)})}A(1);function A(l=1){s.style.display="none",a="trending",fetch(`${E}/trending/movie/week?api_key=${g}&page=${l}`).then(d=>d.json()).then(d=>{X(d.results||[]),J(d.total_results,l)})}function X(l){if(u.innerHTML="",!l.length){s.style.display=n?"block":"none";return}s.style.display="none",l.slice(0,20).forEach(d=>{var $,T;const w=document.createElement("a");w.className="movie-card",w.setAttribute("data-id",d.id),w.href=`catalog_mainbody.html?id=${d.id}`;const Q=d.poster_path?`${j}${d.poster_path}`:"https://via.placeholder.com/300x450",Z=(($=d.release_date)==null?void 0:$.slice(0,4))||"N/A",P=((T=d.genre_ids)==null?void 0:T.map(O=>r[O]).filter(Boolean).slice(0,2).join(", "))||"Unknown";w.innerHTML=`
        <img src="${Q}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${d.title}</h3>
            <div class="movie-meta">
        <span class="movie-genre">${P}</span>
        <span class="movie-year">| ${Z}</span>
      </div>
    </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,u.appendChild(w),U(w.querySelector(".movie-rating-stars"),d.vote_average)})}}function Ee(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}let o=[];function n(){fetch(`${te}/trending/movie/week?api_key=${ee}`).then(s=>s.json()).then(s=>{o=s.results||[],i(o)})}let r=a();window.addEventListener("resize",()=>{const s=a();s!==r&&(r=s,i(o))});function a(){return window.matchMedia("(min-width: 768px)").matches?3:1}function i(s){const v=document.getElementById("weeklyTrends");if(!v)return;v.innerHTML="",[...s].sort(()=>Math.random()-.5).slice(0,a()).forEach(h=>{var b;const p=h.genre_ids.map(L=>e[L]).filter(Boolean).slice(0,2).join(", "),m=h.poster_path?j+h.poster_path:"./images/no-poster.jpg",f=((b=h.release_date)==null?void 0:b.split("-")[0])||"N/A",c=document.createElement("a");c.className="movie-card large",c.setAttribute("data-id",h.id),c.href=`catalog_mainbody.html?id=${h.id}`,c.innerHTML=`
        <img src="${m}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${h.title}</h3>
            <p class="movie-genres">${p}</p>
            <p class="movie-year">| ${f}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,U(c.querySelector(".movie-rating-stars"),h.vote_average),v.appendChild(c)})}function g(){const s=new Date,v=s.getFullYear(),y=String(s.getMonth()+1).padStart(2,"0"),h=`${v}-${y}-01`,p=new Date(v,s.getMonth()+1,0).getDate(),m=`${v}-${y}-${String(p).padStart(2,"0")}`,f=document.getElementById("noUpcomingMsg"),c=document.querySelector(".hero1"),b=document.querySelector(".movie-details");fetch(`${te}/discover/movie?api_key=${ee}&primary_release_date.gte=${h}&primary_release_date.lte=${m}&sort_by=popularity.desc`).then(L=>L.json()).then(L=>{const k=(L.results||[]).filter(M=>M.backdrop_path&&M.vote_count>0);if(k.length===0){console.warn("NO UPCOMING MOVIE THIS MONTH"),f&&(f.style.display="block"),c&&(c.style.display="none"),b&&(b.style.display="none");return}const x=k[Math.floor(Math.random()*k.length)];f&&(f.style.display="none"),c&&(c.style.display="block"),b&&(b.style.display="block"),u(x)})}function E(s){if(!s)return"—";const[v,y,h]=s.split("-");return`${h}.${y}.${v}`}function u(s){if(!s)return;if(!document.getElementById("movieVoteAvg")){console.warn("⏭️ renderMovieDetails skipped (not detail page)");return}const y=document.getElementById("heroBackdrop");y&&s.backdrop_path&&(y.src=t+s.backdrop_path);const h=(f,c)=>{const b=document.getElementById(f);b&&(b.textContent=c)};h("movieTitle",s.title||"—"),h("movieOverview",s.overview||"No overview available."),h("movieDate",s.release_date||"—"),h("movieDate",E(s.release_date)),h("movieVoteAvg",typeof s.vote_average=="number"?s.vote_average.toFixed(1):"—"),h("movieVoteCount",typeof s.vote_count=="number"?s.vote_count:"—"),h("moviePopularity",typeof s.popularity=="number"?s.popularity.toFixed(0):"—");let p="N/A";Array.isArray(s.genres)&&s.genres.length>0?p=s.genres.map(f=>f.name).join(", "):Array.isArray(s.genre_ids)&&s.genre_ids.length>0&&(p=s.genre_ids.map(f=>e[f]).filter(Boolean).join(", ")),h("movieGenre",p);const m=document.getElementById("libraryToggleBtn");if(m){const f=()=>{const c=ve(s.id);m.textContent=c?"Remove from library":"Add to my library",m.classList.toggle("active",c)};f(),m.onclick=c=>{c.stopPropagation(),ye(s),f()}}}n(),g()}function ke(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function Me(){document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),o=e.target.closest("#closeTeamModal"),n=document.getElementById("teamModal");if(n){if(t){e.preventDefault(),console.log("Footer: Modal açılıyor..."),n.classList.add("is-open"),document.body.style.overflow="hidden";return}if(o){console.log("Footer: Modal kapanıyor (Buton ile)..."),n.classList.remove("is-open"),document.body.style.overflow="";return}e.target===n&&(console.log("Footer: Modal kapanıyor (Backdrop ile)..."),n.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(console.log("Footer: Modal kapanıyor (ESC ile)..."),t.classList.remove("is-open"),document.body.style.overflow="")})}const S=document.getElementById("trailer-error-popup"),ne=document.querySelector("[data-popup-close]");function oe(){S&&(S.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function R(){S&&(S.classList.add("is-hidden"),document.body.style.overflow="")}ne&&ne.addEventListener("click",R);S&&(S.addEventListener("click",e=>{e.target===S&&R()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!S.classList.contains("is-hidden")&&R()}));const ce="global-loader-overlay";let I=0,H=null,re=null;function q(){const e=_();e&&e.classList.remove("is-visible"),I=0,N(),F()}function _(){const e=document.querySelectorAll(`#${ce}`);return e.forEach((t,o)=>{o>0&&t.remove()}),e[0]||null}function Se(){let e=_();return e||(e=document.createElement("div"),e.id=ce,e.className="loader-overlay",e.innerHTML=`
      <div class="loader-spinner" role="status" aria-live="polite" aria-label="Loading">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    `,document.body.appendChild(e)),e}function de(){const e=Se();I+=1,N(),F(),requestAnimationFrame(()=>e.classList.add("is-visible")),H=setTimeout(()=>{V()},12e3)}function Y(){const e=_();e&&(I=Math.max(0,I-1),I===0&&(e.classList.remove("is-visible"),N(),F()))}function V(){const e=_();I=0,N(),F(),e&&e.classList.remove("is-visible")}q();window.addEventListener("pageshow",q);window.addEventListener("load",q);document.addEventListener("visibilitychange",()=>{document.hidden||q()});window.addEventListener("load",()=>{setTimeout(V,300)});function N(){H&&(clearTimeout(H),H=null)}function F(){re||(re=setInterval(()=>{const e=_();e&&I===0&&e.classList.contains("is-visible")&&e.classList.remove("is-visible")},5e3))}console.log("[header] header.js checking in");document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(i){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",i),document.body.appendChild(e))}function o(){e&&(e.remove(),e=null)}function n(i,g){g.classList.add("open"),i.setAttribute("aria-expanded","true"),t(()=>r(i,g)),document.body.style.overflow="hidden"}function r(i,g){g.classList.remove("open"),i&&i.setAttribute("aria-expanded","false"),o(),document.body.style.overflow=""}document.addEventListener("click",i=>{console.log("[header] Global click on:",i.target);const g=i.target.closest(".menu-open-btn");if(g){console.log("[header] Menu btn detected!");const u=document.querySelector(".mobile-menu");if(!u)return;console.log("[header] Menu toggle clicked"),u.classList.contains("open")?r(g,u):n(g,u);return}if(i.target.closest(".mobile-menu .nav-link")){const u=document.querySelector(".mobile-menu"),s=document.querySelector(".menu-open-btn");u&&u.classList.contains("open")&&setTimeout(()=>r(s,u),100)}}),document.addEventListener("keydown",i=>{if(i.key==="Escape"){const g=document.querySelector(".mobile-menu"),E=document.querySelector(".menu-open-btn");g&&g.classList.contains("open")&&r(E,g)}});function a(){var E;const i=window.location.pathname;document.querySelectorAll(".nav-link").forEach(u=>{u.classList.remove("active"),i.includes(u.getAttribute("href").replace("./",""))&&u.classList.add("active")}),(i==="/"||i.endsWith("index.html"))&&((E=document.querySelector('.nav-link[href="./index.html"]'))==null||E.classList.add("active"))}a()});const Ie="98ff2d6267ceea8e039422b0f46fb813",$e="https://api.themoviedb.org/3",W=he.create({baseURL:$e,params:{api_key:Ie,language:"en-US"}}),xe=async(e="day")=>{try{const{data:t}=await W.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},Be=async e=>{try{const{data:t}=await W.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},ue=async e=>{try{const{data:t}=await W.get(`/movie/${e}/videos`);return t.results.filter(o=>o.site==="YouTube"&&o.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function Te(e,t){if(!e)return;e.innerHTML="";const o=Math.max(0,Math.min(10,t||0)),n=Math.floor(o/2),r=o/2-n>=.5;for(let a=0;a<5;a++){let i="empty";a<n?i="full":a===n&&r&&(i="half");const g=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
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
    `}}function _e(e){return e[Math.floor(Math.random()*e.length)]}async function Ce(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{de();const o=await xe("day");if(o&&o.length>0){const n=_e(o);Ae(e,n)}else se(e)}catch(o){console.error("Hero yüklenirken hata:",o),se(e)}finally{Y()}}document.addEventListener("DOMContentLoaded",()=>{Ce().catch(e=>console.error("initHero error:",e))});function Ae(e,t){const{title:o,overview:n,backdrop_path:r,vote_average:a,id:i}=t,g=()=>{const u="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",s=window.devicePixelRatio>1.1;let v="";if(r){let y="w780";window.innerWidth>=1280?y=s?"original":"w1280":window.innerWidth>=768&&(y=s?"w1280":"w780"),v=`https://image.tmdb.org/t/p/${y}${r}`}else v=`./background/desktop-1${s?"-@2x":""}.jpg`;e.style.backgroundImage=`${u}, url('${v}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};g(),new MutationObserver(g).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",g),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,Te(e.querySelector(".hero-rating-stars"),a),e.querySelector("#watch-trailer").onclick=async u=>{u.preventDefault(),de();try{const s=await ue(i);s&&s.length>0?window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:i}})):oe()}catch(s){console.log("Hata:",s),oe()}finally{Y()}},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function se(e){e.classList.add("hero-default");const t=()=>{const n=window.devicePixelRatio>1.1,r="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let a=window.innerWidth<768?"mobil-1":"desktop-1";n&&(a+="-@2x");const i=`./background/${a}.jpg`.replace(/\/+/g,"/");console.log("Resim URL Deneniyor:",i),e.style.backgroundImage=`${r}, url('${i}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
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
    `;o.innerHTML=E;const u=document.getElementById("modal-library-btn");u.addEventListener("click",()=>{if(ie(n.id))He(n.id),u.textContent="Add to my library",u.classList.remove("active");else{const s={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};Pe(s),u.textContent="Remove from library",u.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const Ne=["weeklyTrends","moviesContainer","catalog-list","movieList"];Ne.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const r=n.dataset.id;pe(r)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&pe(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,o=document.querySelector(".backdrop"),n=document.getElementById("modal-content");o.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const r=await ue(t);if(console.log("Fetched videos:",r),r&&r.length>0){const a=r[0].key;n.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${a}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(r){console.error("Trailer loading error:",r),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});ae();Me();document.body.dataset.page==="catalog-main"&&initCatalogMainbody();document.addEventListener("DOMContentLoaded",()=>{V(),Y(),ke(),document.getElementById("weeklyTrends")&&Ee(),document.getElementById("moviesContainer")&&we(),document.getElementById("movieList")&&be();const e=document.getElementById("hero-btn");e&&e.addEventListener("click",()=>{window.location.href="./catalog.html"})});
//# sourceMappingURL=main-DI_1OzZQ.js.map
