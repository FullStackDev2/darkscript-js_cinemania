import{a as se}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=r(s);fetch(s.href,l)}})();function K(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(K,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}const U="98ff2d6267ceea8e039422b0f46fb813",Y="https://api.themoviedb.org/3",H="https://image.tmdb.org/t/p/w500";function q(e,t){if(!e)return;e.innerHTML="";const r=Math.floor(t/2),n=t%2>=1;for(let s=0;s<5;s++){let l="empty";s<r?l="full":s===r&&n&&(l="half");const a=`star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
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
    `}}function X(){return JSON.parse(localStorage.getItem("favorites"))||[]}function ae(e){return X().some(t=>t.id===e)}function ie(e){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.some(n=>n.id===e.id)){localStorage.setItem("favorites",JSON.stringify(t.filter(n=>n.id!==e.id)));return}const r=Array.isArray(e.genre_ids)?e.genre_ids:Array.isArray(e.genres)?e.genres.map(n=>n.id):[];t.push({id:e.id,title:e.title,poster_path:e.poster_path,vote_average:e.vote_average,release_date:e.release_date,genre_ids:r}),localStorage.setItem("favorites",JSON.stringify(t))}function le(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),r=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),s=document.getElementById("genreDropdown"),l=document.getElementById("genreBtn"),a=document.getElementById("genreIcon"),o=document.querySelector(".search-button");let f=5,c=null;if(!e||!t||!r){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",function(){s&&s.classList.contains("active")&&(s.classList.remove("active"),l.classList.remove("open"),a&&a.classList.remove("rotate"))}),l&&s&&l.addEventListener("click",function(h){h.stopPropagation(),s.classList.toggle("active"),l.classList.toggle("open"),a&&a.classList.toggle("rotate")}),o&&o.addEventListener("click",()=>{window.location.href="/catalog.html"}),s&&s.addEventListener("click",function(h){h.stopPropagation();const d=h.target.closest("li");if(!d)return;c=d.dataset.genreId?Number(d.dataset.genreId):null;const m=l.querySelector(".genre-text");m&&(d.dataset.genreId?m.textContent=d.textContent:m.textContent="Genre"),s.classList.remove("active"),l.classList.remove("open"),a&&a.classList.remove("rotate"),window.addEventListener("resize",()=>{window.innerWidth<=768?f=6:f=1/0,g()}),f=5,g()}),o&&o.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"}),g();function g(){const h=X();let d=h;if(c!==null){const m=h.filter(y=>Array.isArray(y.genres)&&y.genres.some(E=>E.id===c));m.length>0&&(d=m)}if(e.innerHTML="",c!==null&&(d=h.filter(m=>Array.isArray(m.genres)&&m.genres.some(y=>y.id===c))),c!==null&&d.length===0){t.classList.remove("hidden"),r.classList.add("hidden"),n&&n.classList.remove("genre-hidden");return}if(h.length===0){t.classList.remove("hidden"),r.classList.add("hidden"),n&&n.classList.add("genre-hidden");return}n&&n.classList.remove("genre-hidden"),t.classList.add("hidden"),v(d.slice(0,f)),r.classList.toggle("hidden",f===1/0||f>=d.length)}r.addEventListener("click",()=>{f+=3,g()});function v(h){e.innerHTML="",h.forEach(d=>{var L;if(!d.poster_path)return;const m=`${H}${d.poster_path}`,y=((L=d.release_date)==null?void 0:L.slice(0,4))||"N/A",E=Array.isArray(d.genres)?d.genres.map(w=>w.name).slice(0,2).join(", "):"Unknown",p=document.createElement("a");p.className="movie-card",p.setAttribute("data-id",d.id),p.href=`catalog_mainbody.html?id=${d.id}`,p.innerHTML=`
      <img src="${m}" alt="${d.title}">
      <div class="movie-card-overlay">
        <div class="movie-card-text">
          <h3>${d.title}</h3>
          <p>${E} | ${y}</p>
        </div>
        <div class="movie-rating-stars"></div>
      </div>
    `,e.appendChild(p),q(p.querySelector(".movie-rating-stars"),d.vote_average||0)})}}class ce{constructor({containerId:t,totalItems:r,itemsPerPage:n,onPageChange:s,currentPage:l=1}){this.container=document.getElementById(t),this.totalItems=r,this.itemsPerPage=n,this.currentPage=l,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=s,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const s=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${s}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,r=this.currentPage,n=[],s=3;let l=r-1,a=r+1;l<1&&(l=1,a=Math.min(s,t)),a>t&&(a=t,l=Math.max(1,t-s+1)),l>1&&n.push("...");for(let o=l;o<=a;o++)n.push(o);return a<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),r=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),r&&r.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function de(){let e="",t="",r="",n=!1,s={},l="trending";const a={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},o="98ff2d6267ceea8e039422b0f46fb813",f="https://api.themoviedb.org/3",c=document.getElementById("moviesContainer"),g=document.getElementById("emptyMessage"),v=document.querySelector(".search-input"),h=document.getElementById("clearSearch"),d=document.querySelector(".search-btn"),m=document.getElementById("yearBtn"),y=document.getElementById("yearDropdown"),E=document.getElementById("selectedYear"),p=document.getElementById("countrySelect"),L=p==null?void 0:p.querySelector(".search-input1"),w=p==null?void 0:p.querySelector(".country-list"),ne=p.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const i=document.querySelector(".search-row");if(!i)return;const u=i.getBoundingClientRect().top+window.scrollY-20;window.scrollTo({top:u,behavior:"smooth"})},300));const oe=document.getElementById("pagination");if(!c||!g)return;const S=document.querySelector(".search-input"),I=S.parentElement;I.insertAdjacentHTML("beforeend",`
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
  `);const T=I.querySelector(".search-clear-btn");T.style.display="none",m.insertAdjacentHTML("beforeend",`
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
  `);const re=`
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
`,_=document.getElementById("selectedCountry");_.insertAdjacentHTML("afterend",re);function D(i,u){const x=i>480?480:i;if(x===0){oe.innerHTML="";return}new ce({containerId:"pagination",totalItems:x,itemsPerPage:20,currentPage:u,onPageChange:M=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",M),l==="trending"?B(M):O(M);const $=document.getElementById("moviesContainer");if($){const C=$.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:C,behavior:"smooth"})}}})}if(fetch(`${f}/genre/movie/list?api_key=${o}&language=en-US`).then(i=>i.json()).then(i=>i.genres.forEach(u=>s[u.id]=u.name)),I.addEventListener("click",i=>{i.target.closest(".search-clear-btn")&&(S.value="",S.focus())}),I.addEventListener("input",i=>{if(i.target!==S)return;const u=I.querySelector(".search-clear-btn");u&&(u.style.display=S.value?"block":"none")}),ne.addEventListener("click",i=>{i.stopPropagation(),p.classList.toggle("open")}),w.querySelectorAll("li").forEach(i=>{i.addEventListener("click",u=>{u.stopPropagation();const b=i.textContent.trim();_.textContent=b,r=a[b]||"",p.classList.remove("open")})}),document.addEventListener("click",i=>{p.contains(i.target)||p.classList.remove("open")}),w&&!w.dataset.init){const i=document.createElement("li");i.textContent="Country",w.prepend(i),w.dataset.init="true"}T.addEventListener("click",()=>{v.value="",v.focus(),T.style.display="none"}),p.querySelectorAll(".country-list li").forEach(i=>{i.addEventListener("click",()=>{_.textContent=i.textContent,p.classList.remove("open")})}),p.querySelectorAll(".country-list li").forEach(i=>{i.addEventListener("click",()=>{const u=i.textContent.trim();_.textContent=u,r=a[u]||"",p.classList.remove("open")})}),document.addEventListener("click",i=>{const u=document.getElementById("countrySelect");u.contains(i.target)||u.classList.remove("open")}),p&&L&&w&&(L.readOnly=!0,w.querySelectorAll("li").forEach(i=>{i.addEventListener("click",u=>{u.stopPropagation();const b=i.textContent.trim();L.value=b,r=a[b]||"",p.classList.add("has-value"),p.classList.remove("open")})})),m&&y&&(m.addEventListener("click",i=>{i.stopPropagation();const u=y.classList.toggle("open");m.classList.toggle("open",u)}),y.addEventListener("click",i=>{i.stopPropagation(),i.target.tagName==="LI"&&(e=i.target.dataset.year||"",E.textContent=i.target.textContent,y.classList.remove("open"),m.classList.remove("open"))})),document.addEventListener("click",i=>{y.classList.contains("open")&&!y.contains(i.target)&&!m.contains(i.target)&&(y.classList.remove("open"),m.classList.remove("open"))}),d.addEventListener("click",()=>{if(t=v.value.trim(),n=!0,!t&&!e&&!r){n=!1,B();return}O()}),h&&h.addEventListener("click",function(){v.value="",L&&(L.value=""),E.textContent="Year",t="",e="",r="",n=!1,p&&p.classList.remove("has-value"),B()});function O(i=1){let u=`${f}/discover/movie?api_key=${o}&page=${i}`;t&&(u+=`&with_text_query=${encodeURIComponent(t)}`),e&&(u+=`&primary_release_year=${e}`),r&&(u+=`&with_origin_country=${r}`),fetch(u).then(b=>b.json()).then(b=>{R(b.results||[]),D(b.total_results,i)})}B(1);function B(i=1){g.style.display="none",l="trending",fetch(`${f}/trending/movie/week?api_key=${o}&page=${i}`).then(u=>u.json()).then(u=>{R(u.results||[]),D(u.total_results,i)})}function R(i){if(c.innerHTML="",!i.length){g.style.display=n?"block":"none";return}g.style.display="none",i.slice(0,10).forEach(u=>{var M,$;const b=document.createElement("a");b.className="movie-card",b.setAttribute("data-id",u.id),b.href=`catalog_mainbody.html?id=${u.id}`;const j=u.poster_path?`${H}${u.poster_path}`:"https://via.placeholder.com/300x450",G=((M=u.release_date)==null?void 0:M.slice(0,4))||"N/A",x=(($=u.genre_ids)==null?void 0:$.map(C=>s[C]).filter(Boolean).slice(0,2).join(", "))||"Unknown";b.innerHTML=`
        <img src="${j}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${u.title}</h3>
            <p>${x} | ${G}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,c.appendChild(b),q(b.querySelector(".movie-rating-stars"),u.vote_average)})}}function ue(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function r(){fetch(`${Y}/trending/movie/week?api_key=${U}`).then(o=>o.json()).then(o=>n(o.results||[]))}function n(o){const f=document.getElementById("weeklyTrends");f&&(f.innerHTML="",o.slice(0,1).forEach(c=>{var m;const g=c.genre_ids.map(y=>e[y]).filter(Boolean).slice(0,2).join(", "),v=c.poster_path?H+c.poster_path:"./images/no-poster.jpg",h=((m=c.release_date)==null?void 0:m.split("-")[0])||"N/A",d=document.createElement("a");d.className="movie-card large",d.setAttribute("data-id",c.id),d.href=`catalog_mainbody.html?id=${c.id}`,d.innerHTML=`
        <img src="${v}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${c.title}</h3>
            <p>${g} | ${h}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,q(d.querySelector(".movie-rating-stars"),c.vote_average),f.appendChild(d)}))}function s(){const o=new Date,f=o.getFullYear(),c=String(o.getMonth()+1).padStart(2,"0"),g=`${f}-${c}-01`,v=new Date(f,o.getMonth()+1,0).getDate(),h=`${f}-${c}-${String(v).padStart(2,"0")}`,d=document.getElementById("noUpcomingMsg"),m=document.querySelector(".hero1"),y=document.querySelector(".movie-details");fetch(`${Y}/discover/movie?api_key=${U}&primary_release_date.gte=${g}&primary_release_date.lte=${h}&sort_by=popularity.desc`).then(E=>E.json()).then(E=>{console.log("API RAW RESULTS:",E.results);const p=(E.results||[]).filter(w=>w.backdrop_path&&w.vote_count>0);if(console.log("FILTERED MOVIES:",p),p.length===0){console.warn("NO UPCOMING MOVIE THIS MONTH"),d&&(d.style.display="block"),m&&(m.style.display="none"),y&&(y.style.display="none");return}const L=p[Math.floor(Math.random()*p.length)];console.log("RANDOM MOVIE:",{title:L.title,release_date:L.release_date,vote_count:L.vote_count,popularity:L.popularity}),d&&(d.style.display="none"),m&&(m.style.display="block"),y&&(y.style.display="block"),a(L)})}function l(o){if(!o)return"—";const[f,c,g]=o.split("-");return`${g}.${c}.${f}`}function a(o){if(!o)return;if(!document.getElementById("movieVoteAvg")){console.warn("⏭️ renderMovieDetails skipped (not detail page)");return}const c=document.getElementById("heroBackdrop");c&&o.backdrop_path&&(c.src=t+o.backdrop_path);const g=(d,m)=>{const y=document.getElementById(d);y&&(y.textContent=m)};g("movieTitle",o.title||"—"),g("movieOverview",o.overview||"No overview available."),g("movieDate",o.release_date||"—"),g("movieDate",l(o.release_date)),g("movieVoteAvg",typeof o.vote_average=="number"?o.vote_average.toFixed(1):"—"),g("movieVoteCount",typeof o.vote_count=="number"?o.vote_count:"—"),g("moviePopularity",typeof o.popularity=="number"?o.popularity.toFixed(0):"—");let v="N/A";Array.isArray(o.genres)&&o.genres.length>0?v=o.genres.map(d=>d.name).join(", "):Array.isArray(o.genre_ids)&&o.genre_ids.length>0&&(v=o.genre_ids.map(d=>e[d]).filter(Boolean).join(", ")),g("movieGenre",v);const h=document.getElementById("libraryToggleBtn");if(h){const d=()=>{const m=ae(o.id);h.textContent=m?"Remove from library":"Add to my library",h.classList.toggle("active",m)};d(),h.onclick=m=>{m.stopPropagation(),ie(o),d()}}}r(),s()}function ge(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function me(){document.body.addEventListener("click",e=>{const t=e.target.closest("#openTeamModal"),r=e.target.closest("#closeTeamModal"),n=document.getElementById("teamModal");if(n){if(t){e.preventDefault(),console.log("Footer: Modal açılıyor..."),n.classList.add("is-open"),document.body.style.overflow="hidden";return}if(r){console.log("Footer: Modal kapanıyor (Buton ile)..."),n.classList.remove("is-open"),document.body.style.overflow="";return}e.target===n&&(console.log("Footer: Modal kapanıyor (Backdrop ile)..."),n.classList.remove("is-open"),document.body.style.overflow="")}}),window.addEventListener("keydown",e=>{const t=document.getElementById("teamModal");e.key==="Escape"&&t&&t.classList.contains("is-open")&&(console.log("Footer: Modal kapanıyor (ESC ile)..."),t.classList.remove("is-open"),document.body.style.overflow="")})}const k=document.getElementById("trailer-error-popup"),V=document.querySelector("[data-popup-close]");function W(){k&&(k.classList.remove("is-hidden"),document.body.style.overflow="hidden")}function P(){k&&(k.classList.add("is-hidden"),document.body.style.overflow="")}V&&V.addEventListener("click",P);k&&(k.addEventListener("click",e=>{e.target===k&&P()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&!k.classList.contains("is-hidden")&&P()}));console.log("[header] header.js checking in");document.addEventListener("DOMContentLoaded",()=>{let e=null;function t(a){e||(e=document.createElement("div"),e.className="mobile-menu-overlay",e.addEventListener("click",a),document.body.appendChild(e))}function r(){e&&(e.remove(),e=null)}function n(a,o){o.classList.add("open"),a.setAttribute("aria-expanded","true"),t(()=>s(a,o)),document.body.style.overflow="hidden"}function s(a,o){o.classList.remove("open"),a&&a.setAttribute("aria-expanded","false"),r(),document.body.style.overflow=""}document.addEventListener("click",a=>{console.log("[header] Global click on:",a.target);const o=a.target.closest(".menu-open-btn");if(o){console.log("[header] Menu btn detected!");const c=document.querySelector(".mobile-menu");if(!c)return;console.log("[header] Menu toggle clicked"),c.classList.contains("open")?s(o,c):n(o,c);return}if(a.target.closest(".mobile-menu .nav-link")){const c=document.querySelector(".mobile-menu"),g=document.querySelector(".menu-open-btn");c&&c.classList.contains("open")&&setTimeout(()=>s(g,c),100)}}),document.addEventListener("keydown",a=>{if(a.key==="Escape"){const o=document.querySelector(".mobile-menu"),f=document.querySelector(".menu-open-btn");o&&o.classList.contains("open")&&s(f,o)}});function l(){var f;const a=window.location.pathname;document.querySelectorAll(".nav-link").forEach(c=>{c.classList.remove("active"),a.includes(c.getAttribute("href").replace("./",""))&&c.classList.add("active")}),(a==="/"||a.endsWith("index.html"))&&((f=document.querySelector('.nav-link[href="./index.html"]'))==null||f.classList.add("active"))}l()});const pe="98ff2d6267ceea8e039422b0f46fb813",fe="https://api.themoviedb.org/3",N=se.create({baseURL:fe,params:{api_key:pe,language:"en-US"}}),he=async(e="day")=>{try{const{data:t}=await N.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},ye=async e=>{try{const{data:t}=await N.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},Q=async e=>{try{const{data:t}=await N.get(`/movie/${e}/videos`);return t.results.filter(r=>r.site==="YouTube"&&r.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function ve(e,t){if(!e)return;e.innerHTML="";const r=Math.max(0,Math.min(10,t||0)),n=Math.floor(r/2),s=r/2-n>=.5;for(let l=0;l<5;l++){let a="empty";l<n?a="full":l===n&&s&&(a="half");const o=`hero-star-${Math.random().toString(36).slice(2)}`;e.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14" class="star">
        <defs>
          <linearGradient id="${o}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>
          <linearGradient id="${o}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>
        <path d="M16 2l4.09 9.63L30 12.27l-7 6.86L24.18 30 16 24.8 7.82 30 9 19.13l-7-6.86 9.91-1.64L16 2z"
          fill="${a==="full"?`url(#${o}-full)`:a==="half"?`url(#${o}-half)`:"#bfbfbf"}"
          stroke="none" />
      </svg>
    `}}function be(e){return e[Math.floor(Math.random()*e.length)]}async function Le(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t!=="library"&&t==="dynamic")try{const r=await he("day");if(r&&r.length>0){const n=be(r);we(e,n)}else z(e)}catch(r){console.error("Hero yüklenirken hata:",r),z(e)}}document.addEventListener("DOMContentLoaded",()=>{Le().catch(e=>console.error("initHero error:",e))});function we(e,t){const{title:r,overview:n,backdrop_path:s,vote_average:l,id:a}=t,o=()=>{const c="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)",g=window.devicePixelRatio>1.1;let v="";if(s){let h="w780";window.innerWidth>=1280?h=g?"original":"w1280":window.innerWidth>=768&&(h=g?"w1280":"w780"),v=`https://image.tmdb.org/t/p/${h}${s}`}else v=`./background/desktop-1${g?"-@2x":""}.jpg`;e.style.backgroundImage=`${c}, url('${v}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};o(),new MutationObserver(o).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",o),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${r}</h1>
      <div class="movie-rating-stars hero-rating-stars"></div>
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,ve(e.querySelector(".hero-rating-stars"),l),e.querySelector("#watch-trailer").onclick=async c=>{c.preventDefault();try{const g=await Q(a);g&&g.length>0?window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:a}})):W()}catch(g){console.log("Hata:",g),W()}},e.querySelector("#more-details").onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}}function z(e){e.classList.add("hero-default");const t=()=>{const n=window.devicePixelRatio>1.1,s="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let l=window.innerWidth<768?"mobil-1":"desktop-1";n&&(l+="-@2x");const a=`./background/${l}.jpg`.replace(/\/+/g,"/");console.log("Resim URL Deneniyor:",a),e.style.backgroundImage=`${s}, url('${a}')`,e.style.backgroundSize="cover",e.style.backgroundPosition="center"};t(),window.addEventListener("resize",t),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const r=e.querySelector("#go-catalog");r&&(r.onclick=()=>{window.location.href="./catalog.html"})}const Z="favorites";function F(){try{const e=localStorage.getItem(Z);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function ee(e){try{localStorage.setItem(Z,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function J(e){return F().some(r=>Number(r.id)===Number(e))}function Ee(e){const t=F();t.some(r=>Number(r.id)===Number(e.id))||(t.push(e),ee(t))}function ke(e){let t=F();t=t.filter(r=>Number(r.id)!==Number(e)),ee(t)}function Me(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg class="icon icon-Vectorx"><use xlink:href="/images/icons/symbol-defs.svg#icon-Vectorx">
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const r=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&A()}),r.addEventListener("click",A),document.addEventListener("keydown",n=>{n.key==="Escape"&&A()})}function A(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}Me();async function te(e){const t=document.querySelector(".backdrop"),r=document.getElementById("modal-content");r.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await ye(e),s=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",l=n.genres?n.genres.map(g=>g.name).join(", "):"Unknown",a=J(n.id),o=n.release_date?n.release_date.slice(0,4):"N/A",f=`
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
    `;r.innerHTML=f;const c=document.getElementById("modal-library-btn");c.addEventListener("click",()=>{if(J(n.id))ke(n.id),c.textContent="Add to my library",c.classList.remove("active");else{const g={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};Ee(g),c.textContent="Remove from library",c.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),r.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const Se=["weeklyTrends","moviesContainer","catalog-list","movieList"];Se.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",r=>{const n=r.target.closest(".movie-card")||r.target.closest(".movie-card-overlay");if(n&&n.dataset.id){r.preventDefault();const s=n.dataset.id;te(s)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&te(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,r=document.querySelector(".backdrop"),n=document.getElementById("modal-content");r.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const s=await Q(t);if(console.log("Fetched videos:",s),s&&s.length>0){const l=s[0].key;n.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${l}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(s){console.error("Trailer loading error:",s),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});K();me();document.body.dataset.page==="catalog-main"&&initCatalogMainbody();document.addEventListener("DOMContentLoaded",()=>{ge(),document.getElementById("weeklyTrends")&&ue(),document.getElementById("moviesContainer")&&de(),document.getElementById("movieList")&&le()});
//# sourceMappingURL=main-Did2BH8R.js.map
