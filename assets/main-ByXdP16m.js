import{a as ye}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(r){if(r.ep)return;r.ep=!0;const l=o(r);fetch(r.href,l)}})();function le(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(document.body.classList.remove("light-theme","dark-theme"),document.body.classList.add(t==="light"?"light-theme":"dark-theme"),!e){setTimeout(le,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{document.body.classList.remove("light-theme","dark-theme"),e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.add("dark-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}const ne="98ff2d6267ceea8e039422b0f46fb813",oe="https://api.themoviedb.org/3",z="https://image.tmdb.org/t/p/w500";function W(e,t){if(!e)return;e.innerHTML="";const o=Math.floor(t/2),n=t%2>=1;for(let r=0;r<5;r++){let l="empty";r<o?l="full":r===o&&n&&(l="half");const i=`star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
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
          fill="${l==="full"?`url(#${i}-full)`:l==="half"?`url(#${i}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function ce(){return JSON.parse(localStorage.getItem("favorites"))||[]}function be(e){return ce().some(t=>t.id===e)}function Le(e){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.some(n=>n.id===e.id)){localStorage.setItem("favorites",JSON.stringify(t.filter(n=>n.id!==e.id)));return}const o=Array.isArray(e.genre_ids)?e.genre_ids:Array.isArray(e.genres)?e.genres.map(n=>n.id):[];t.push({id:e.id,title:e.title,poster_path:e.poster_path,vote_average:e.vote_average,release_date:e.release_date,genre_ids:o}),localStorage.setItem("favorites",JSON.stringify(t))}function we(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),r=document.getElementById("genreDropdown"),l=document.getElementById("genreBtn"),i=document.getElementById("genreIcon"),d=document.querySelector(".search-button");function k(){return window.innerWidth>=768&&window.innerWidth<1024}let g=0,a=null;if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",function(){r&&r.classList.contains("active")&&(r.classList.remove("active"),l.classList.remove("open"),i&&i.classList.remove("rotate"))}),l&&r&&l.addEventListener("click",function(m){m.stopPropagation(),r.classList.toggle("active"),l.classList.toggle("open"),i&&i.classList.toggle("rotate")}),d&&d.addEventListener("click",()=>{window.location.href="/catalog.html"}),r&&r.addEventListener("click",function(m){m.stopPropagation();const f=m.target.closest("li");if(!f)return;a=f.dataset.genreId?Number(f.dataset.genreId):null;const s=l.querySelector(".genre-text");s&&(f.dataset.genreId?s.textContent=f.textContent:s.textContent="Genre"),r.classList.remove("active"),l.classList.remove("open"),i&&i.classList.remove("rotate"),g=6,p()});function h(){return window.innerWidth>=1280}function y(){return h()?9:k()&&a!==null?6:9}d&&d.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"}),g=y(),p(),window.addEventListener("resize",()=>{const m=y();m!==g&&(g=m,p())});function p(){const m=ce();let f=m;if(a!==null){const s=m.filter(v=>Array.isArray(v.genres)&&v.genres.some(w=>w.id===a));s.length>0&&(f=s)}if(e.innerHTML="",a!==null&&(f=m.filter(s=>Array.isArray(s.genres)&&s.genres.some(v=>v.id===a))),a!==null&&f.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.remove("genre-hidden");return}if(m.length===0){t.classList.remove("hidden"),o.classList.add("hidden"),n&&n.classList.add("genre-hidden");return}n&&n.classList.remove("genre-hidden"),t.classList.add("hidden"),L(f.slice(0,g)),o.classList.toggle("hidden",g===1/0||g>=f.length)}window.addEventListener("resize",()=>{const m=y();m!==g&&(g=m,p())}),o.addEventListener("click",()=>{g+=3,p()});function L(m){e.innerHTML="";const f=document.createDocumentFragment();m.forEach(s=>{var E;if(!s.poster_path)return;const v=`${z}${s.poster_path}`,w=((E=s.release_date)==null?void 0:E.slice(0,4))||"N/A",I=Array.isArray(s.genres)?s.genres.map($=>$.name).slice(0,2).join(", "):"Unknown",S=document.createElement("a");S.className="movie-card",S.setAttribute("data-id",s.id),S.href=`catalog_mainbody.html?id=${s.id}`,S.innerHTML=`
      <img src="${v}" alt="${s.title}" loading="lazy">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${s.title}</h3>
          <p class="movie-meta">
            <span class="movie-genres">${I}</span>
            <span class="movie-year">| ${w}</span>
          </p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `,W(S.querySelector(".movie-rating-stars"),s.vote_average||0),f.appendChild(S)}),e.appendChild(f)}}class ke{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:r,currentPage:l=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=l,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=r,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const r=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${r}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],r=3;let l=o-1,i=o+1;l<1&&(l=1,i=Math.min(r,t)),i>t&&(i=t,l=Math.max(1,t-r+1)),l>1&&n.push("...");for(let d=l;d<=i;d++)n.push(d);return i<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function Ee(){let e="",t="",o="",n=!1,r={},l="trending";const i={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},d="98ff2d6267ceea8e039422b0f46fb813",k="https://api.themoviedb.org/3",g=document.getElementById("moviesContainer"),a=document.getElementById("emptyMessage"),h=document.querySelector(".search-input"),y=document.getElementById("clearSearch"),p=document.querySelector(".search-btn"),L=document.getElementById("yearBtn"),m=document.getElementById("yearDropdown"),f=document.getElementById("selectedYear"),s=document.getElementById("countrySelect"),v=s==null?void 0:s.querySelector(".search-input1"),w=s==null?void 0:s.querySelector(".country-list"),I=s.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const c=document.querySelector(".search-row");if(!c)return;const u=c.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:u,behavior:"smooth"})},300));const S=document.getElementById("pagination");if(!g||!a)return;const E=document.querySelector(".search-input"),$=E.parentElement;$.insertAdjacentHTML("beforeend",`
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
  `);const j=$.querySelector(".search-clear-btn");j.style.display="none",L.insertAdjacentHTML("beforeend",`
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
`),p&&(p.innerHTML=`
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
  `);const ve=`
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
`,P=document.getElementById("selectedCountry");P.insertAdjacentHTML("afterend",ve);function X(c,u){const H=c>480?480:c;if(H===0){S.innerHTML="";return}new ke({containerId:"pagination",totalItems:H,itemsPerPage:20,currentPage:u,onPageChange:T=>{l==="trending"?q(T):Q(T);const _=document.getElementById("moviesContainer");if(_){const O=_.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:O,behavior:"smooth"})}}})}if(fetch(`${k}/genre/movie/list?api_key=${d}&language=en-US`).then(c=>c.json()).then(c=>c.genres.forEach(u=>r[u.id]=u.name)),$.addEventListener("click",c=>{c.target.closest(".search-clear-btn")&&(E.value="",E.focus())}),$.addEventListener("input",c=>{if(c.target!==E)return;const u=$.querySelector(".search-clear-btn");u&&(u.style.display=E.value?"block":"none")}),I.addEventListener("click",c=>{c.stopPropagation(),s.classList.toggle("open")}),w.querySelectorAll("li").forEach(c=>{c.addEventListener("click",u=>{u.stopPropagation();const b=c.textContent.trim();P.textContent=b,o=i[b]||"",s.classList.remove("open")})}),document.addEventListener("click",c=>{s.contains(c.target)||s.classList.remove("open")}),w&&!w.dataset.init){const c=document.createElement("li");c.textContent="Country",w.prepend(c),w.dataset.init="true"}j.addEventListener("click",()=>{h.value="",h.focus(),j.style.display="none"}),s.querySelectorAll(".country-list li").forEach(c=>{c.addEventListener("click",()=>{P.textContent=c.textContent,s.classList.remove("open")})}),s.querySelectorAll(".country-list li").forEach(c=>{c.addEventListener("click",()=>{const u=c.textContent.trim();P.textContent=u,o=i[u]||"",s.classList.remove("open")})}),document.addEventListener("click",c=>{const u=document.getElementById("countrySelect");u.contains(c.target)||u.classList.remove("open")}),s&&v&&w&&(v.readOnly=!0,w.querySelectorAll("li").forEach(c=>{c.addEventListener("click",u=>{u.stopPropagation();const b=c.textContent.trim();v.value=b,o=i[b]||"",s.classList.add("has-value"),s.classList.remove("open")})})),L&&m&&(L.addEventListener("click",c=>{c.stopPropagation();const u=m.classList.toggle("open");L.classList.toggle("open",u)}),m.addEventListener("click",c=>{c.stopPropagation(),c.target.tagName==="LI"&&(e=c.target.dataset.year||"",f.textContent=c.target.textContent,m.classList.remove("open"),L.classList.remove("open"))})),document.addEventListener("click",c=>{m.classList.contains("open")&&!m.contains(c.target)&&!L.contains(c.target)&&(m.classList.remove("open"),L.classList.remove("open"))}),p.addEventListener("click",()=>{if(t=h.value.trim(),n=!0,!t&&!e&&!o){n=!1,q();return}Q()}),y&&y.addEventListener("click",function(){h.value="",v&&(v.value=""),f.textContent="Year",t="",e="",o="",n=!1,s&&s.classList.remove("has-value"),q()});function Q(c=1){let u=`${k}/discover/movie?api_key=${d}&page=${c}`;t&&(u+=`&with_text_query=${encodeURIComponent(t)}`),e&&(u+=`&primary_release_year=${e}`),o&&(u+=`&with_origin_country=${o}`),fetch(u).then(b=>b.json()).then(b=>{Z(b.results||[]),X(b.total_results,c)})}q(1);function q(c=1){a.style.display="none",l="trending",fetch(`${k}/trending/movie/week?api_key=${d}&page=${c}`).then(u=>u.json()).then(u=>{Z(u.results||[]),X(u.total_results,c)})}function Z(c){if(g.innerHTML="",!c.length){a.style.display=n?"block":"none";return}a.style.display="none",c.slice(0,20).forEach(u=>{var T,_;const b=document.createElement("a");b.className="movie-card",b.setAttribute("data-id",u.id),b.href=`catalog_mainbody.html?id=${u.id}`;const ee=u.poster_path?`${z}${u.poster_path}`:"https://via.placeholder.com/300x450",te=((T=u.release_date)==null?void 0:T.slice(0,4))||"N/A",H=((_=u.genre_ids)==null?void 0:_.map(O=>r[O]).filter(Boolean).slice(0,2).join(", "))||"Unknown";b.innerHTML=`
        <img src="${ee}" loading="lazy">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <div class="movie-meta">
        <span class="movie-genre">${H}</span>
        <span class="movie-year">| ${te}</span>
      </div>
    </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,g.appendChild(b),W(b.querySelector(".movie-rating-stars"),u.vote_average)})}}function de(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}let o=[];function n(){fetch(`${oe}/trending/movie/week?api_key=${ne}`).then(a=>a.json()).then(a=>{o=a.results||[],i(o)})}let r=l();window.addEventListener("resize",()=>{const a=l();a!==r&&(r=a,i(o))});function l(){return window.matchMedia("(min-width: 768px)").matches?3:1}function i(a){const h=document.getElementById("weeklyTrends");if(!h)return;h.innerHTML="",[...a].sort(()=>Math.random()-.5).slice(0,l()).forEach(p=>{var v;const L=p.genre_ids.map(w=>e[w]).filter(Boolean).slice(0,2).join(", "),m=p.poster_path?z+p.poster_path:"./images/no-poster.jpg",f=((v=p.release_date)==null?void 0:v.split("-")[0])||"N/A",s=document.createElement("a");s.className="movie-card large",s.setAttribute("data-id",p.id),s.href=`catalog_mainbody.html?id=${p.id}`,s.innerHTML=`
        <img src="${m}" loading="lazy">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${p.title}</h3>
            <p class="movie-genres">${L}</p>
            <p class="movie-year">| ${f}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,W(s.querySelector(".movie-rating-stars"),p.vote_average),h.appendChild(s)})}function d(){const a=new Date,h=a.getFullYear(),y=String(a.getMonth()+1).padStart(2,"0"),p=`${h}-${y}-01`,L=new Date(h,a.getMonth()+1,0).getDate(),m=`${h}-${y}-${String(L).padStart(2,"0")}`,f=document.getElementById("noUpcomingMsg"),s=document.querySelector(".hero1"),v=document.querySelector(".movie-details");fetch(`${oe}/discover/movie?api_key=${ne}&primary_release_date.gte=${p}&primary_release_date.lte=${m}&sort_by=popularity.desc`).then(w=>w.json()).then(w=>{const I=(w.results||[]).filter(E=>E.backdrop_path&&E.vote_count>0);if(I.length===0){console.warn("NO UPCOMING MOVIE THIS MONTH"),f&&(f.style.display="block"),s&&(s.style.display="none"),v&&(v.style.display="none");return}const S=I[Math.floor(Math.random()*I.length)];f&&(f.style.display="none"),s&&(s.style.display="block"),v&&(v.style.display="block"),g(S)})}function k(a){if(!a)return"—";const[h,y,p]=a.split("-");return`${p}.${y}.${h}`}function g(a){if(!a)return;if(!document.getElementById("movieVoteAvg")){console.warn("⏭️ renderMovieDetails skipped (not detail page)");return}const y=document.getElementById("heroBackdrop");y&&a.backdrop_path&&(y.src=t+a.backdrop_path);const p=(f,s)=>{const v=document.getElementById(f);v&&(v.textContent=s)};p("movieTitle",a.title||"—"),p("movieOverview",a.overview||"No overview available."),p("movieDate",a.release_date||"—"),p("movieDate",k(a.release_date)),p("movieVoteAvg",typeof a.vote_average=="number"?a.vote_average.toFixed(1):"—"),p("movieVoteCount",typeof a.vote_count=="number"?a.vote_count:"—"),p("moviePopularity",typeof a.popularity=="number"?a.popularity.toFixed(0):"—");let L="N/A";Array.isArray(a.genres)&&a.genres.length>0?L=a.genres.map(f=>f.name).join(", "):Array.isArray(a.genre_ids)&&a.genre_ids.length>0&&(L=a.genre_ids.map(f=>e[f]).filter(Boolean).join(", ")),p("movieGenre",L);const m=document.getElementById("libraryToggleBtn");if(m){const f=()=>{const s=be(a.id);m.textContent=s?"Remove from library":"Add to my library",m.classList.toggle("active",s)};f(),m.onclick=s=>{s.stopPropagation(),Le(a),f()}}}n(),d()}function Se(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}let t=!1;function o(){window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}window.addEventListener("scroll",()=>{t||(window.requestAnimationFrame(()=>{o(),t=!1}),t=!0)}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function Me(){document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),o=e.target.closest("#closeTeamModal"),n=document.getElementById("teamModal");if(n){if(t){e.preventDefault(),n.classList.add("is-open"),document.body.style.overflow="hidden";return}if(o){n.classList.remove("is-open"),document.body.style.overflow="";return}e.target===n&&(n.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(t.classList.remove("is-open"),document.body.style.overflow="")})}const M=document.getElementById("trailer-error-popup"),re=document.querySelector("[data-popup-close]");function ie(){M&&(M.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function R(){M&&(M.classList.add("is-hidden"),document.body.style.overflow="")}re&&re.addEventListener("click",R);M&&(M.addEventListener("click",e=>{e.target===M&&R()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!M.classList.contains("is-hidden")&&R()}));const ue="global-loader-overlay";let x=0,N=null,B=null;function A(){const e=document.querySelectorAll(`#${ue}`);return e.forEach((t,o)=>{o>0&&t.remove()}),e[0]||null}function Ie(){let e=A();return e||(e=document.createElement("div"),e.id=ue,e.className="loader-overlay",e.innerHTML=`
      <div class="loader-spinner" role="status" aria-live="polite" aria-label="Loading">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    `,document.body.appendChild(e)),e}function D(){N&&(clearTimeout(N),N=null)}function $e(){B||(B=setInterval(()=>{const e=A();if(!e){C();return}x===0&&e.classList.contains("is-visible")&&(e.classList.remove("is-visible"),C())},5e3))}function C(){B&&(clearInterval(B),B=null)}function F(){const e=A();e&&e.classList.remove("is-visible"),x=0,D(),C()}function me(){const e=Ie();x+=1,D(),$e(),requestAnimationFrame(()=>{e.classList.add("is-visible")}),N=setTimeout(()=>{V()},12e3)}function Y(){const e=A();x=Math.max(0,x-1),x===0&&(e&&e.classList.remove("is-visible"),D(),C())}function V(){const e=A();x=0,D(),C(),e&&e.classList.remove("is-visible")}F();window.addEventListener("pageshow",F);window.addEventListener("load",F);document.addEventListener("visibilitychange",()=>{document.hidden||F()});window.addEventListener("load",()=>{setTimeout(V,300)});document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(i){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",i),document.body.appendChild(e))}function o(){e&&(e.remove(),e=null)}function n(i,d){d.classList.add("open"),i.setAttribute("aria-expanded","true"),t(()=>r(i,d)),document.body.style.overflow="hidden"}function r(i,d){d.classList.remove("open"),i&&i.setAttribute("aria-expanded","false"),o(),document.body.style.overflow=""}document.addEventListener("click",i=>{const d=i.target.closest(".menu-open-btn");if(d){const g=document.querySelector(".mobile-menu");if(!g)return;g.classList.contains("open")?r(d,g):n(d,g);return}if(i.target.closest(".mobile-menu .nav-link")){const g=document.querySelector(".mobile-menu"),a=document.querySelector(".menu-open-btn");g&&g.classList.contains("open")&&setTimeout(()=>r(a,g),100)}}),document.addEventListener("keydown",i=>{if(i.key==="Escape"){const d=document.querySelector(".mobile-menu"),k=document.querySelector(".menu-open-btn");d&&d.classList.contains("open")&&r(k,d)}});function l(){var k;const i=window.location.pathname;document.querySelectorAll(".nav-link").forEach(g=>{g.classList.remove("active"),i.includes(g.getAttribute("href").replace("./",""))&&g.classList.add("active")}),(i==="/"||i.endsWith("index.html"))&&((k=document.querySelector('.nav-link[href="./index.html"]'))==null||k.classList.add("active"))}l()});const xe="98ff2d6267ceea8e039422b0f46fb813",Te="https://api.themoviedb.org/3",J=ye.create({baseURL:Te,params:{api_key:xe,language:"en-US"}}),_e=async(e="day")=>{try{const{data:t}=await J.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},Be=async e=>{try{const{data:t}=await J.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},ge=async e=>{try{const{data:t}=await J.get(`/movie/${e}/videos`);return t.results.filter(o=>o.site==="YouTube"&&o.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function Ce(e,t){if(!e)return;e.innerHTML="";const o=Math.max(0,Math.min(10,t||0)),n=Math.floor(o/2),r=o/2-n>=.5;for(let l=0;l<5;l++){let i="empty";l<n?i="full":l===n&&r&&(i="half");const d=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
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
          fill="${i==="full"?`url(#${d}-full)`:i==="half"?`url(#${d}-half)`:"#bfbfbf"}"
          stroke="none" />
      </svg>
    `}}function Ae(e){return e[Math.floor(Math.random()*e.length)]}async function Pe(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{me();const o=await _e("day");if(o&&o.length>0){const n=Ae(o);qe(e,n)}else ae(e)}catch(o){console.error("Hero yüklenirken hata:",o),ae(e)}finally{Y()}}document.addEventListener("DOMContentLoaded",()=>{Pe().catch(e=>console.error("initHero error:",e))});function qe(e,t){const{title:o,overview:n,backdrop_path:r,vote_average:l,id:i}=t,d=()=>{const g="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",a=window.devicePixelRatio>1.1;let h="";if(r){let y="w780";window.innerWidth>=1280?y=a?"original":"w1280":window.innerWidth>=768&&(y=a?"w1280":"w780"),h=`https://image.tmdb.org/t/p/${y}${r}`}else h=`./images/background/desktop-1${a?"-@2x":""}.jpg`;e.style.backgroundImage=`${g}, url('${h}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};d(),new MutationObserver(d).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",d),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${n.slice(0,220)}...</p>
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,Ce(e.querySelector(".hero-rating-stars"),l),e.querySelector("#watch-trailer").onclick=async g=>{g.preventDefault(),me();try{const a=await ge(i);a&&a.length>0?window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:i}})):ie()}catch{ie()}finally{Y()}},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function ae(e){e.classList.add("hero-default");const t=()=>{const n=window.devicePixelRatio>1.1,r="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let l=window.innerWidth<768?"mobil-1":"desktop-1";n&&(l+="-@2x");const i=`./images/background/${l}.jpg`.replace(/\/+/g,"/");e.style.backgroundImage=`${r}, url('${i}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const o=e.querySelector("#go-catalog");o&&(o.onclick=()=>{window.location.href="./catalog.html"})}const fe="favorites";function K(){try{const e=localStorage.getItem(fe);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function pe(e){try{localStorage.setItem(fe,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function se(e){return K().some(o=>Number(o.id)===Number(e))}function He(e){const t=K();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),pe(t))}function Ne(e){let t=K();t=t.filter(o=>Number(o.id)!==Number(e)),pe(t)}const U=()=>new Promise(e=>requestAnimationFrame(e));function De(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal";const o="/darkscript-js_cinemania/images/icons/symbol-defs.svg#icon-Vectorx";t.innerHTML=`
  <button type="button" class="modal-close-btn" data-modal-close aria-label="Close modal">
    <svg class="icon icon-Vectorx">
      <use href="${o}"></use>
    </svg>
  </button>
  <div class="modal-content" id="modal-content"></div>
`,e.appendChild(t),document.body.appendChild(e);const n=t.querySelector("[data-modal-close]");e.addEventListener("click",r=>{r.target===e&&G()}),n.addEventListener("click",G),document.addEventListener("keydown",r=>{r.key==="Escape"&&G()})}function G(){const e=document.querySelector(".backdrop"),t=document.getElementById("modal-content");if(!e||!t)return;const o=t.querySelector("iframe");o&&(o.src=""),e.classList.add("is-hidden"),document.body.classList.remove("modal-open"),setTimeout(()=>{t.innerHTML=""},250)}De();async function he(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");if(!(!t||!o)){t.classList.remove("is-hidden"),document.body.classList.add("modal-open"),o.innerHTML='<div style="text-align:center; padding:50px;">🎬 Loading...</div>',await U();try{const n=await Be(e);await U();const r=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",l=n.genres?n.genres.map(k=>k.name).join(", "):"Unknown",i=se(n.id);o.innerHTML=`
      <div class="modal-img-wrapper">
        <img src="${r}" alt="${n.title}" class="modal-img" loading="lazy" />
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
          <button type="button" class="btn-modal btn-add-library ${i?"active":""}" id="modal-library-btn">
            ${i?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;const d=document.getElementById("modal-library-btn");d.addEventListener("click",()=>{se(n.id)?(Ne(n.id),d.textContent="Add to my library",d.classList.remove("active")):(He({id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres}),d.textContent="Remove from library",d.classList.add("active"))})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}}const Fe=["weeklyTrends","moviesContainer","catalog-list","movieList"];Fe.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");n&&n.dataset.id&&(o.preventDefault(),he(n.dataset.id))})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&he(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,o=document.querySelector(".backdrop"),n=document.getElementById("modal-content");if(!(!o||!n)){o.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="text-align:center; padding:50px;">🎬 Loading Trailer...</div>',await U();try{const r=await ge(t);if(r&&r.length>0){const l=r[0].key,i=`https://img.youtube.com/vi/${l}/hqdefault.jpg`;n.innerHTML=`
    <div class="trailer-preview">
      <img
        src="${i}"
        alt="Trailer preview"
        loading="lazy"
        class="trailer-thumbnail"
      >
    </div>
  `,n.querySelector(".trailer-thumbnail").addEventListener("click",()=>{n.innerHTML=`
    <div class="trailer-container">
      <iframe
        src="https://www.youtube.com/embed/${l}?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  `})}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(r){console.error("Trailer loading error:",r),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}}});const je=["/","/index.html","/catalog.html","/library.html","/darkscript-js_cinemania/","/darkscript-js_cinemania/index.html","/darkscript-js_cinemania/catalog.html","/darkscript-js_cinemania/library.html"];if(!je.includes(window.location.pathname))throw document.body.innerHTML=`
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#111;color:white;text-align:center;">
      <div>
        <h1>404 - Sayfa Bulunamadı</h1>
        <p>Aradığınız sayfa mevcut değil.</p>
        <a href="/darkscript-js_cinemania/index.html" style="color:#ff6b08;">Ana Sayfaya Dön</a>
      </div>
    </main>
  `,new Error("404 - Invalid route");le();Me();document.body.dataset.page==="catalog-main"&&de();document.addEventListener("DOMContentLoaded",()=>{V(),Y(),Se(),document.getElementById("weeklyTrends")&&de(),document.getElementById("moviesContainer")&&Ee(),document.getElementById("movieList")&&we();const e=document.getElementById("hero-btn");e&&e.addEventListener("click",()=>{window.location.href="./catalog.html"})});
//# sourceMappingURL=main-ByXdP16m.js.map
