import{a as he}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(s){if(s.ep)return;s.ep=!0;const c=o(s);fetch(s.href,c)}})();function ie(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(ie,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}const ee="98ff2d6267ceea8e039422b0f46fb813",te="https://api.themoviedb.org/3",j="https://image.tmdb.org/t/p/w500";function U(e,t){if(!e)return;e.innerHTML="";const o=Math.floor(t/2),n=t%2>=1;for(let s=0;s<5;s++){let c="empty";s<o?c="full":s===o&&n&&(c="half");const a=`star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
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
          fill="${c==="full"?`url(#${a}-full)`:c==="half"?`url(#${a}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function le(){return JSON.parse(localStorage.getItem("favorites"))||[]}function ve(e){return le().some(t=>t.id===e)}function ye(e){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.some(n=>n.id===e.id)){localStorage.setItem("favorites",JSON.stringify(t.filter(n=>n.id!==e.id)));return}const o=Array.isArray(e.genre_ids)?e.genre_ids:Array.isArray(e.genres)?e.genres.map(n=>n.id):[];t.push({id:e.id,title:e.title,poster_path:e.poster_path,vote_average:e.vote_average,release_date:e.release_date,genre_ids:o}),localStorage.setItem("favorites",JSON.stringify(t))}function be(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),s=document.getElementById("genreDropdown"),c=document.getElementById("genreBtn"),a=document.getElementById("genreIcon"),r=document.querySelector(".search-button");function h(){return window.innerWidth>=768&&window.innerWidth<1024}let i=0,d=null;if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",function(){s&&s.classList.contains("active")&&(s.classList.remove("active"),c.classList.remove("open"),a&&a.classList.remove("rotate"))}),c&&s&&c.addEventListener("click",function(m){m.stopPropagation(),s.classList.toggle("active"),c.classList.toggle("open"),a&&a.classList.toggle("rotate")}),r&&r.addEventListener("click",()=>{window.location.href="/catalog.html"}),s&&s.addEventListener("click",function(m){m.stopPropagation();const g=m.target.closest("li");if(!g)return;d=g.dataset.genreId?Number(g.dataset.genreId):null;const b=c.querySelector(".genre-text");b&&(g.dataset.genreId?b.textContent=g.textContent:b.textContent="Genre"),s.classList.remove("active"),c.classList.remove("open"),a&&a.classList.remove("rotate"),i=6,v()});function y(){return h()?d!==null?6:9:1/0}r&&r.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"}),i=y(),v(),window.addEventListener("resize",()=>{const m=y();m!==i&&(i=m,v())});function v(){const m=le();let g=m;if(d!==null){const b=m.filter(p=>Array.isArray(p.genres)&&p.genres.some(E=>E.id===d));b.length>0&&(g=b)}if(e.innerHTML="",d!==null&&(g=m.filter(b=>Array.isArray(b.genres)&&b.genres.some(p=>p.id===d))),d!==null&&g.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.remove("genre-hidden");return}if(m.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.add("genre-hidden");return}n&&n.classList.remove("genre-hidden"),t.classList.add("hidden"),f(g.slice(0,i)),o.classList.toggle("hidden",i===1/0||i>=g.length)}window.addEventListener("resize",()=>{const m=y();m!==i&&(i=m,v())}),o.addEventListener("click",()=>{i+=3,v()});function f(m){e.innerHTML="",m.forEach(g=>{var B;if(!g.poster_path)return;const b=`${j}${g.poster_path}`,p=((B=g.release_date)==null?void 0:B.slice(0,4))||"N/A",E=Array.isArray(g.genres)?g.genres.map(F=>F.name).slice(0,2).join(", "):"Unknown",w=document.createElement("a");w.className="movie-card",w.setAttribute("data-id",g.id),w.href=`catalog_mainbody.html?id=${g.id}`,w.innerHTML=`
      <img src="${b}" alt="${g.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${g.title}</h3>
          <p class="movie-meta">
          <span class="movie-genres">${E}</span>
          <span class="movie-year">| ${p}</span>
          </p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `,e.appendChild(w),U(w.querySelector(".movie-rating-stars"),g.vote_average||0)})}}class Le{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:s,currentPage:c=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=c,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=s,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const s=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${s}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],s=3;let c=o-1,a=o+1;c<1&&(c=1,a=Math.min(s,t)),a>t&&(a=t,c=Math.max(1,t-s+1)),c>1&&n.push("...");for(let r=c;r<=a;r++)n.push(r);return a<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function we(){let e="",t="",o="",n=!1,s={},c="trending";const a={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},r="98ff2d6267ceea8e039422b0f46fb813",h="https://api.themoviedb.org/3",i=document.getElementById("moviesContainer"),d=document.getElementById("emptyMessage"),y=document.querySelector(".search-input"),v=document.getElementById("clearSearch"),f=document.querySelector(".search-btn"),m=document.getElementById("yearBtn"),g=document.getElementById("yearDropdown"),b=document.getElementById("selectedYear"),p=document.getElementById("countrySelect"),E=p==null?void 0:p.querySelector(".search-input1"),w=p==null?void 0:p.querySelector(".country-list"),B=p.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const l=document.querySelector(".search-row");if(!l)return;const u=l.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:u,behavior:"smooth"})},300));const F=document.getElementById("pagination");if(!i||!d)return;const I=document.querySelector(".search-input"),$=I.parentElement;$.insertAdjacentHTML("beforeend",`
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
  `);const D=$.querySelector(".search-clear-btn");D.style.display="none",m.insertAdjacentHTML("beforeend",`
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
`,x=document.getElementById("selectedCountry");x.insertAdjacentHTML("afterend",fe);function J(l,u){const A=l>480?480:l;if(A===0){F.innerHTML="";return}new Le({containerId:"pagination",totalItems:A,itemsPerPage:20,currentPage:u,onPageChange:S=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",S),c==="trending"?C(S):K(S);const T=document.getElementById("moviesContainer");if(T){const O=T.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:O,behavior:"smooth"})}}})}if(fetch(`${h}/genre/movie/list?api_key=${r}&language=en-US`).then(l=>l.json()).then(l=>l.genres.forEach(u=>s[u.id]=u.name)),$.addEventListener("click",l=>{l.target.closest(".search-clear-btn")&&(I.value="",I.focus())}),$.addEventListener("input",l=>{if(l.target!==I)return;const u=$.querySelector(".search-clear-btn");u&&(u.style.display=I.value?"block":"none")}),B.addEventListener("click",l=>{l.stopPropagation(),p.classList.toggle("open")}),w.querySelectorAll("li").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation();const L=l.textContent.trim();x.textContent=L,o=a[L]||"",p.classList.remove("open")})}),document.addEventListener("click",l=>{p.contains(l.target)||p.classList.remove("open")}),w&&!w.dataset.init){const l=document.createElement("li");l.textContent="Country",w.prepend(l),w.dataset.init="true"}D.addEventListener("click",()=>{y.value="",y.focus(),D.style.display="none"}),p.querySelectorAll(".country-list li").forEach(l=>{l.addEventListener("click",()=>{x.textContent=l.textContent,p.classList.remove("open")})}),p.querySelectorAll(".country-list li").forEach(l=>{l.addEventListener("click",()=>{const u=l.textContent.trim();x.textContent=u,o=a[u]||"",p.classList.remove("open")})}),document.addEventListener("click",l=>{const u=document.getElementById("countrySelect");u.contains(l.target)||u.classList.remove("open")}),p&&E&&w&&(E.readOnly=!0,w.querySelectorAll("li").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation();const L=l.textContent.trim();E.value=L,o=a[L]||"",p.classList.add("has-value"),p.classList.remove("open")})})),m&&g&&(m.addEventListener("click",l=>{l.stopPropagation();const u=g.classList.toggle("open");m.classList.toggle("open",u)}),g.addEventListener("click",l=>{l.stopPropagation(),l.target.tagName==="LI"&&(e=l.target.dataset.year||"",b.textContent=l.target.textContent,g.classList.remove("open"),m.classList.remove("open"))})),document.addEventListener("click",l=>{g.classList.contains("open")&&!g.contains(l.target)&&!m.contains(l.target)&&(g.classList.remove("open"),m.classList.remove("open"))}),f.addEventListener("click",()=>{if(t=y.value.trim(),n=!0,!t&&!e&&!o){n=!1,C();return}K()}),v&&v.addEventListener("click",function(){y.value="",E&&(E.value=""),b.textContent="Year",t="",e="",o="",n=!1,p&&p.classList.remove("has-value"),C()});function K(l=1){let u=`${h}/discover/movie?api_key=${r}&page=${l}`;t&&(u+=`&with_text_query=${encodeURIComponent(t)}`),e&&(u+=`&primary_release_year=${e}`),o&&(u+=`&with_origin_country=${o}`),fetch(u).then(L=>L.json()).then(L=>{X(L.results||[]),J(L.total_results,l)})}C(1);function C(l=1){d.style.display="none",c="trending",fetch(`${h}/trending/movie/week?api_key=${r}&page=${l}`).then(u=>u.json()).then(u=>{X(u.results||[]),J(u.total_results,l)})}function X(l){if(i.innerHTML="",!l.length){d.style.display=n?"block":"none";return}d.style.display="none",l.slice(0,20).forEach(u=>{var S,T;const L=document.createElement("a");L.className="movie-card",L.setAttribute("data-id",u.id),L.href=`catalog_mainbody.html?id=${u.id}`;const Q=u.poster_path?`${j}${u.poster_path}`:"https://via.placeholder.com/300x450",Z=((S=u.release_date)==null?void 0:S.slice(0,4))||"N/A",A=((T=u.genre_ids)==null?void 0:T.map(O=>s[O]).filter(Boolean).slice(0,2).join(", "))||"Unknown";L.innerHTML=`
        <img src="${Q}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <div class="movie-meta">
        <span class="movie-genre">${A}</span>
        <span class="movie-year">| ${Z}</span>
      </div>
    </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,i.appendChild(L),U(L.querySelector(".movie-rating-stars"),u.vote_average)})}}function Ee(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function o(){fetch(`${te}/trending/movie/week?api_key=${ee}`).then(r=>r.json()).then(r=>n(r.results||[]))}function n(r){const h=document.getElementById("weeklyTrends");h&&(h.innerHTML="",r.slice(0,3).forEach(i=>{var m;const d=i.genre_ids.map(g=>e[g]).filter(Boolean).slice(0,2).join(", "),y=i.poster_path?j+i.poster_path:"./images/no-poster.jpg",v=((m=i.release_date)==null?void 0:m.split("-")[0])||"N/A",f=document.createElement("a");f.className="movie-card large",f.setAttribute("data-id",i.id),f.href=`catalog_mainbody.html?id=${i.id}`,f.innerHTML=`
        <img src="${y}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${i.title}</h3>
            <p>${d} | ${v}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,U(f.querySelector(".movie-rating-stars"),i.vote_average),h.appendChild(f)}))}function s(){const r=new Date,h=r.getFullYear(),i=String(r.getMonth()+1).padStart(2,"0"),d=`${h}-${i}-01`,y=new Date(h,r.getMonth()+1,0).getDate(),v=`${h}-${i}-${String(y).padStart(2,"0")}`,f=document.getElementById("noUpcomingMsg"),m=document.querySelector(".hero1"),g=document.querySelector(".movie-details");fetch(`${te}/discover/movie?api_key=${ee}&primary_release_date.gte=${d}&primary_release_date.lte=${v}&sort_by=popularity.desc`).then(b=>b.json()).then(b=>{console.log("API RAW RESULTS:",b.results);const p=(b.results||[]).filter(w=>w.backdrop_path&&w.vote_count>0);if(console.log("FILTERED MOVIES:",p),p.length===0){console.warn("NO UPCOMING MOVIE THIS MONTH"),f&&(f.style.display="block"),m&&(m.style.display="none"),g&&(g.style.display="none");return}const E=p[Math.floor(Math.random()*p.length)];console.log("RANDOM MOVIE:",{title:E.title,release_date:E.release_date,vote_count:E.vote_count,popularity:E.popularity}),f&&(f.style.display="none"),m&&(m.style.display="block"),g&&(g.style.display="block"),a(E)})}function c(r){if(!r)return"—";const[h,i,d]=r.split("-");return`${d}.${i}.${h}`}function a(r){if(!r)return;if(!document.getElementById("movieVoteAvg")){console.warn("⏭️ renderMovieDetails skipped (not detail page)");return}const i=document.getElementById("heroBackdrop");i&&r.backdrop_path&&(i.src=t+r.backdrop_path);const d=(f,m)=>{const g=document.getElementById(f);g&&(g.textContent=m)};d("movieTitle",r.title||"—"),d("movieOverview",r.overview||"No overview available."),d("movieDate",r.release_date||"—"),d("movieDate",c(r.release_date)),d("movieVoteAvg",typeof r.vote_average=="number"?r.vote_average.toFixed(1):"—"),d("movieVoteCount",typeof r.vote_count=="number"?r.vote_count:"—"),d("moviePopularity",typeof r.popularity=="number"?r.popularity.toFixed(0):"—");let y="N/A";Array.isArray(r.genres)&&r.genres.length>0?y=r.genres.map(f=>f.name).join(", "):Array.isArray(r.genre_ids)&&r.genre_ids.length>0&&(y=r.genre_ids.map(f=>e[f]).filter(Boolean).join(", ")),d("movieGenre",y);const v=document.getElementById("libraryToggleBtn");if(v){const f=()=>{const m=ve(r.id);v.textContent=m?"Remove from library":"Add to my library",v.classList.toggle("active",m)};f(),v.onclick=m=>{m.stopPropagation(),ye(r),f()}}}o(),s()}function ke(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function Me(){document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),o=e.target.closest("#closeTeamModal"),n=document.getElementById("teamModal");if(n){if(t){e.preventDefault(),console.log("Footer: Modal açılıyor..."),n.classList.add("is-open"),document.body.style.overflow="hidden";return}if(o){console.log("Footer: Modal kapanıyor (Buton ile)..."),n.classList.remove("is-open"),document.body.style.overflow="";return}e.target===n&&(console.log("Footer: Modal kapanıyor (Backdrop ile)..."),n.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(console.log("Footer: Modal kapanıyor (ESC ile)..."),t.classList.remove("is-open"),document.body.style.overflow="")})}const k=document.getElementById("trailer-error-popup"),ne=document.querySelector("[data-popup-close]");function oe(){k&&(k.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function G(){k&&(k.classList.add("is-hidden"),document.body.style.overflow="")}ne&&ne.addEventListener("click",G);k&&(k.addEventListener("click",e=>{e.target===k&&G()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!k.classList.contains("is-hidden")&&G()}));const ce="global-loader-overlay";let M=0,P=null,re=null;function H(){const e=_();e&&e.classList.remove("is-visible"),M=0,q(),N()}function _(){const e=document.querySelectorAll(`#${ce}`);return e.forEach((t,o)=>{o>0&&t.remove()}),e[0]||null}function Se(){let e=_();return e||(e=document.createElement("div"),e.id=ce,e.className="loader-overlay",e.innerHTML=`
      <div class="loader-spinner" role="status" aria-live="polite" aria-label="Loading">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    `,document.body.appendChild(e)),e}function de(){const e=Se();M+=1,q(),N(),requestAnimationFrame(()=>e.classList.add("is-visible")),P=setTimeout(()=>{V()},12e3)}function Y(){const e=_();e&&(M=Math.max(0,M-1),M===0&&(e.classList.remove("is-visible"),q(),N()))}function V(){const e=_();M=0,q(),N(),e&&e.classList.remove("is-visible")}H();window.addEventListener("pageshow",H);window.addEventListener("load",H);document.addEventListener("visibilitychange",()=>{document.hidden||H()});window.addEventListener("load",()=>{setTimeout(V,300)});function q(){P&&(clearTimeout(P),P=null)}function N(){re||(re=setInterval(()=>{const e=_();e&&M===0&&e.classList.contains("is-visible")&&e.classList.remove("is-visible")},5e3))}console.log("[header] header.js checking in");document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(a){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",a),document.body.appendChild(e))}function o(){e&&(e.remove(),e=null)}function n(a,r){r.classList.add("open"),a.setAttribute("aria-expanded","true"),t(()=>s(a,r)),document.body.style.overflow="hidden"}function s(a,r){r.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),o(),document.body.style.overflow=""}document.addEventListener("click",a=>{console.log("[header] Global click on:",a.target);const r=a.target.closest(".menu-open-btn");if(r){console.log("[header] Menu btn detected!");const i=document.querySelector(".mobile-menu");if(!i)return;console.log("[header] Menu toggle clicked"),i.classList.contains("open")?s(r,i):n(r,i);return}if(a.target.closest(".mobile-menu .nav-link")){const i=document.querySelector(".mobile-menu"),d=document.querySelector(".menu-open-btn");i&&i.classList.contains("open")&&setTimeout(()=>s(d,i),100)}}),document.addEventListener("keydown",a=>{if(a.key==="Escape"){const r=document.querySelector(".mobile-menu"),h=document.querySelector(".menu-open-btn");r&&r.classList.contains("open")&&s(h,r)}});function c(){var h;const a=window.location.pathname;document.querySelectorAll(".nav-link").forEach(i=>{i.classList.remove("active"),a.includes(i.getAttribute("href").replace("./",""))&&i.classList.add("active")}),(a==="/"||a.endsWith("index.html"))&&((h=document.querySelector('.nav-link[href="./index.html"]'))==null||h.classList.add("active"))}c()});const Ie="98ff2d6267ceea8e039422b0f46fb813",$e="https://api.themoviedb.org/3",W=he.create({baseURL:$e,params:{api_key:Ie,language:"en-US"}}),Te=async(e="day")=>{try{const{data:t}=await W.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},_e=async e=>{try{const{data:t}=await W.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},ue=async e=>{try{const{data:t}=await W.get(`/movie/${e}/videos`);return t.results.filter(o=>o.site==="YouTube"&&o.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function Be(e,t){if(!e)return;e.innerHTML="";const o=Math.max(0,Math.min(10,t||0)),n=Math.floor(o/2),s=o/2-n>=.5;for(let c=0;c<5;c++){let a="empty";c<n?a="full":c===n&&s&&(a="half");const r=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
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
    `}}function xe(e){return e[Math.floor(Math.random()*e.length)]}async function Ce(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{de();const o=await Te("day");if(o&&o.length>0){const n=xe(o);Ae(e,n)}else se(e)}catch(o){console.error("Hero yüklenirken hata:",o),se(e)}finally{Y()}}document.addEventListener("DOMContentLoaded",()=>{Ce().catch(e=>console.error("initHero error:",e))});function Ae(e,t){const{title:o,overview:n,backdrop_path:s,vote_average:c,id:a}=t,r=()=>{const i="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",d=window.devicePixelRatio>1.1;let y="";if(s){let v="w780";window.innerWidth>=1280?v=d?"original":"w1280":window.innerWidth>=768&&(v=d?"w1280":"w780"),y=`https://image.tmdb.org/t/p/${v}${s}`}else y=`./background/desktop-1${d?"-@2x":""}.jpg`;e.style.backgroundImage=`${i}, url('${y}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};r(),new MutationObserver(r).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",r),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,Be(e.querySelector(".hero-rating-stars"),c),e.querySelector("#watch-trailer").onclick=async i=>{i.preventDefault(),de();try{const d=await ue(a);d&&d.length>0?window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:a}})):oe()}catch(d){console.log("Hata:",d),oe()}finally{Y()}},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function se(e){e.classList.add("hero-default");const t=()=>{const n=window.devicePixelRatio>1.1,s="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let c=window.innerWidth<768?"mobil-1":"desktop-1";n&&(c+="-@2x");const a=`./background/${c}.jpg`.replace(/\/+/g,"/");console.log("Resim URL Deneniyor:",a),e.style.backgroundImage=`${s}, url('${a}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const o=e.querySelector("#go-catalog");o&&(o.onclick=()=>{window.location.href="./catalog.html"})}const me="favorites";function z(){try{const e=localStorage.getItem(me);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function ge(e){try{localStorage.setItem(me,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function ae(e){return z().some(o=>Number(o.id)===Number(e))}function Pe(e){const t=z();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),ge(t))}function He(e){let t=z();t=t.filter(o=>Number(o.id)!==Number(e)),ge(t)}function qe(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg class="icon icon-Vectorx"><use xlink:href="/images/icons/symbol-defs.svg#icon-Vectorx">
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const o=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&R()}),o.addEventListener("click",R),document.addEventListener("keydown",n=>{n.key==="Escape"&&R()})}function R(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}qe();async function pe(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await _e(e),s=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",c=n.genres?n.genres.map(d=>d.name).join(", "):"Unknown",a=ae(n.id),r=n.release_date?n.release_date.slice(0,4):"N/A",h=`
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
            <span class="stats-value">${c}</span>
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
    `;o.innerHTML=h;const i=document.getElementById("modal-library-btn");i.addEventListener("click",()=>{if(ae(n.id))He(n.id),i.textContent="Add to my library",i.classList.remove("active");else{const d={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};Pe(d),i.textContent="Remove from library",i.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const Ne=["weeklyTrends","moviesContainer","catalog-list","movieList"];Ne.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const s=n.dataset.id;pe(s)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&pe(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,o=document.querySelector(".backdrop"),n=document.getElementById("modal-content");o.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const s=await ue(t);if(console.log("Fetched videos:",s),s&&s.length>0){const c=s[0].key;n.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${c}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(s){console.error("Trailer loading error:",s),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});ie();Me();document.body.dataset.page==="catalog-main"&&initCatalogMainbody();document.addEventListener("DOMContentLoaded",()=>{V(),Y(),ke(),document.getElementById("weeklyTrends")&&Ee(),document.getElementById("moviesContainer")&&we(),document.getElementById("movieList")&&be();const e=document.getElementById("hero-btn");e&&e.addEventListener("click",()=>{window.location.href="./catalog.html"})});
//# sourceMappingURL=main-8g9N7gj7.js.map
