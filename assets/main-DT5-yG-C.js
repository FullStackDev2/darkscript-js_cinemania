import{a as ne}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(s){if(s.ep)return;s.ep=!0;const c=o(s);fetch(s.href,c)}})();function K(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(K,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}function oe(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn"),n=document.querySelector(".genre-wrapper"),s=document.getElementById("genreDropdown"),c=document.getElementById("genreBtn"),d=document.getElementById("genreIcon"),h=document.querySelector(".search-button");let L=null;if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}document.addEventListener("click",()=>{s!=null&&s.classList.contains("active")&&(s.classList.remove("active"),d==null||d.classList.remove("rotate"))}),h&&h.addEventListener("click",()=>{window.location.href="/catalog.html"}),s==null||s.addEventListener("click",p=>{const a=p.target.closest("li");a&&(L=a.dataset.genreId?Number(a.dataset.genreId):null,s.classList.remove("active"),d==null||d.classList.remove("rotate"),y())}),h&&h.addEventListener("click",()=>{sessionStorage.setItem("scrollCatalog","true"),window.location.href="./catalog.html"});function k(){return JSON.parse(localStorage.getItem("favorites"))||[]}y();function y(){const p=k();if(L&&p.filter(a=>{var m;return(m=a.genre_ids)==null?void 0:m.includes(L)}),e.innerHTML="",n&&n.classList.toggle("genre-hidden",p.length===0),p.length===0){t.classList.remove("hidden"),o.classList.add("hidden");return}t.classList.add("hidden"),E(p.slice(0,9)),o.classList.toggle("hidden",p.length<=9)}c==null||c.addEventListener("click",p=>{p.stopPropagation(),s.classList.toggle("active"),d==null||d.classList.toggle("rotate")}),s==null||s.addEventListener("click",p=>{const a=p.target.closest("li");a&&(L=a.dataset.genreId?Number(a.dataset.genreId):null,s.classList.remove("active"),d==null||d.classList.remove("rotate"),y())});function E(p){p.forEach(a=>{var g;if(!a.poster_path)return;const m=((g=a.release_date)==null?void 0:g.slice(0,4))||"N/A",l=document.createElement("article");l.className="movie-card",l.setAttribute("data-id",a.id),l.innerHTML=`
        <img src="https://image.tmdb.org/t/p/w500${a.poster_path}" alt="${a.title}">
        <div class="movie-card-overlay">
          <h3>${a.title}</h3>
          <p>${m}</p>
        </div>
      `,e.appendChild(l)})}}class re{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:s,currentPage:c=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=c,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=s,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const s=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${s}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],s=3;let c=o-1,d=o+1;c<1&&(c=1,d=Math.min(s,t)),d>t&&(d=t,c=Math.max(1,t-s+1)),c>1&&n.push("...");for(let h=c;h<=d;h++)n.push(h);return d<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function se(){let e="",t="",o="",n=!1,s={},c="trending";const d={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},h="98ff2d6267ceea8e039422b0f46fb813",L="https://api.themoviedb.org/3",k="https://image.tmdb.org/t/p/w500",y=document.getElementById("moviesContainer"),E=document.getElementById("emptyMessage"),p=document.querySelector(".search-input"),a=document.getElementById("clearSearch"),m=document.querySelector(".search-btn"),l=document.getElementById("yearBtn"),g=document.getElementById("yearDropdown"),v=document.getElementById("selectedYear"),u=document.getElementById("countrySelect"),f=u==null?void 0:u.querySelector(".search-input1"),M=u==null?void 0:u.querySelector(".country-list"),q=u.querySelector(".country-btn");sessionStorage.getItem("scrollCatalog")==="true"&&(sessionStorage.removeItem("scrollCatalog"),setTimeout(()=>{const r=document.querySelector(".movie-card img");if(!r)return;const i=r.getBoundingClientRect().height;window.scrollBy({top:i*2.5,behavior:"smooth"})},600));const Q=document.getElementById("pagination");if(!y||!E)return;const C=document.querySelector(".search-input"),x=C.parentElement;x.insertAdjacentHTML("beforeend",`
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
  `);const N=x.querySelector(".search-clear-btn");N.style.display="none",l.insertAdjacentHTML("beforeend",`
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
  `);const Z=`
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
`,_=document.getElementById("selectedCountry");_.insertAdjacentHTML("afterend",Z);function ee(r,i){const I=r>480?480:r;if(I===0){Q.innerHTML="";return}new re({containerId:"pagination",totalItems:I,itemsPerPage:20,currentPage:i,onPageChange:S=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",S),c==="trending"?P(S):R();const T=document.getElementById("moviesContainer");if(T){const F=T.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:F,behavior:"smooth"})}}})}fetch(`${L}/genre/movie/list?api_key=${h}&language=en-US`).then(r=>r.json()).then(r=>r.genres.forEach(i=>s[i.id]=i.name)),x.addEventListener("click",r=>{r.target.closest(".search-clear-btn")&&(C.value="",C.focus())}),x.addEventListener("input",r=>{if(r.target!==C)return;const i=x.querySelector(".search-clear-btn");i&&(i.style.display=C.value?"block":"none")});function te(r,i){if(!r)return;r.innerHTML="";const b=Math.floor(i/2),A=i%2>=1;for(let $=0;$<5;$++){let I="empty";$<b?I="full":$===b&&A&&(I="half");const S=`star-${Math.random().toString(36).slice(2)}`;r.innerHTML+=`
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
    `}}if(q.addEventListener("click",r=>{r.stopPropagation(),u.classList.toggle("open")}),M.querySelectorAll("li").forEach(r=>{r.addEventListener("click",i=>{i.stopPropagation();const b=r.textContent.trim();_.textContent=b,o=d[b]||"",u.classList.remove("open")})}),document.addEventListener("click",r=>{u.contains(r.target)||u.classList.remove("open")}),M&&!M.dataset.init){const r=document.createElement("li");r.textContent="Country",M.prepend(r),M.dataset.init="true"}N.addEventListener("click",()=>{p.value="",p.focus(),N.style.display="none"}),u.querySelectorAll(".country-list li").forEach(r=>{r.addEventListener("click",()=>{_.textContent=r.textContent,u.classList.remove("open")})}),u.querySelectorAll(".country-list li").forEach(r=>{r.addEventListener("click",()=>{const i=r.textContent.trim();_.textContent=i,o=d[i]||"",u.classList.remove("open")})}),document.addEventListener("click",r=>{const i=document.getElementById("countrySelect");i.contains(r.target)||i.classList.remove("open")}),u&&f&&M&&(f.readOnly=!0,M.querySelectorAll("li").forEach(r=>{r.addEventListener("click",i=>{i.stopPropagation();const b=r.textContent.trim();f.value=b,o=d[b]||"",u.classList.add("has-value"),u.classList.remove("open")})})),l&&g&&(l.addEventListener("click",r=>{r.stopPropagation();const i=g.classList.toggle("open");l.classList.toggle("open",i)}),g.addEventListener("click",r=>{r.stopPropagation(),r.target.tagName==="LI"&&(e=r.target.dataset.year||"",v.textContent=r.target.textContent,g.classList.remove("open"),l.classList.remove("open"))})),document.addEventListener("click",r=>{g.classList.contains("open")&&!g.contains(r.target)&&!l.contains(r.target)&&(g.classList.remove("open"),l.classList.remove("open"))}),m.addEventListener("click",()=>{if(t=p.value.trim(),n=!0,!t&&!e&&!o){n=!1,P();return}R()}),a==null||a.addEventListener("click",()=>{p.value="",f&&(f.value=""),v.textContent="Year",t="",e="",o="",n=!1,u==null||u.classList.remove("has-value"),P()});function R(){let r="";t?(r=`${L}/search/movie?api_key=${h}&query=${encodeURIComponent(t)}`,(e||o)&&(r=`${L}/discover/movie?api_key=${h}&with_text_query=${encodeURIComponent(t)}`)):r=`${L}/discover/movie?api_key=${h}`,e&&(r+=`&primary_release_year=${e}`),o&&(r+=`&with_origin_country=${o}`),fetch(r).then(i=>i.json()).then(i=>D(i.results||[]))}P(1);function P(r=1){E.style.display="none",c="trending",fetch(`${L}/trending/movie/week?api_key=${h}&page=${r}`).then(i=>i.json()).then(i=>{D(i.results||[]),ee(i.total_results,r)})}function D(r){if(y.innerHTML="",!r.length){E.style.display=n?"block":"none";return}E.style.display="none",r.slice(0,10).forEach(i=>{var S,T;const b=document.createElement("a");b.className="movie-card",b.setAttribute("data-id",i.id),b.href=`catalog_mainbody.html?id=${i.id}`;const A=i.poster_path?`${k}${i.poster_path}`:"https://via.placeholder.com/300x450",$=((S=i.release_date)==null?void 0:S.slice(0,4))||"N/A",I=((T=i.genre_ids)==null?void 0:T.map(F=>s[F]).filter(Boolean).slice(0,2).join(", "))||"Unknown";b.innerHTML=`
        <img src="${A}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${i.title}</h3>
            <p>${I} | ${$}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,y.appendChild(b),te(b.querySelector(".movie-rating-stars"),i.vote_average)})}}function ae(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="98ff2d6267ceea8e039422b0f46fb813",o="https://api.themoviedb.org/3",n="https://image.tmdb.org/t/p/w500",s="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function c(a,m){if(!a)return;a.innerHTML="";const l=Math.floor(m/2),g=m%2>=1;for(let v=0;v<5;v++){let u="empty";v<l?u="full":v===l&&g&&(u="half");const f=`star-${Math.random().toString(36).slice(2)}`;a.innerHTML+=`
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
          fill="${u==="full"?`url(#${f}-full)`:u==="half"?`url(#${f}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function d(){fetch(`${o}/trending/movie/week?api_key=${t}`).then(a=>a.json()).then(a=>h(a.results||[]))}function h(a){const m=document.getElementById("weeklyTrends");m&&(m.innerHTML="",a.slice(0,1).forEach(l=>{var M;const g=l.genre_ids.map(q=>e[q]).filter(Boolean).slice(0,2).join(", "),v=l.poster_path?n+l.poster_path:"./images/no-poster.jpg",u=((M=l.release_date)==null?void 0:M.split("-")[0])||"N/A",f=document.createElement("a");f.className="movie-card large",f.setAttribute("data-id",l.id),f.href=`catalog_mainbody.html?id=${l.id}`,f.innerHTML=`
        <img src="${v}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${l.title}</h3>
            <p>${g} | ${u}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,c(f.querySelector(".movie-rating-stars"),l.vote_average),m.appendChild(f)}))}function L(){const a=new Date,m=a.getFullYear(),l=String(a.getMonth()+1).padStart(2,"0");fetch(`${o}/discover/movie?api_key=${t}&primary_release_date.gte=${m}-${l}-01&primary_release_date.lte=${m}-${l}-31&sort_by=popularity.desc`).then(g=>g.json()).then(g=>{var u;const v=(u=g.results)==null?void 0:u.find(f=>f.backdrop_path);v&&(k(v),p(v))})}function k(a){var g,v,u;const m=document.getElementById("heroBackdrop");if(!m)return;m.src=s+a.backdrop_path,document.getElementById("movieTitle").textContent=a.title,document.getElementById("movieOverview").textContent=a.overview||"No overview available.",document.getElementById("movieDate").textContent=a.release_date||"N/A",document.getElementById("movieVoteAvg").textContent=((g=a.vote_average)==null?void 0:g.toFixed(1))||"0",document.getElementById("movieVoteCount").textContent=a.vote_count||"0",document.getElementById("moviePopularity").textContent=((v=a.popularity)==null?void 0:v.toFixed(0))||"0";const l=(u=a.genre_ids)==null?void 0:u.map(f=>e[f]).filter(Boolean).join(", ");document.getElementById("movieGenre").textContent=l||"N/A"}function y(){return JSON.parse(localStorage.getItem("favorites"))||[]}function E(a){return y().some(m=>m.id===a)}function p(a){const m=document.getElementById("libraryToggleBtn");if(!m)return;const l=()=>{m.textContent=E(a.id)?"Remove from my library":"Add to my library",m.classList.toggle("active",E(a.id))};l(),m.onclick=()=>{let g=y();E(a.id)?g=g.filter(v=>v.id!==a.id):g.push(a),localStorage.setItem("favorites",JSON.stringify(g)),l()}}d(),L()}function ie(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}console.log("[header] header.js checking in");let B=null;function ce(e){B||(B=document.createElement("div"),B.className="mobile-menu-overlay",B.addEventListener("click",e),document.body.appendChild(B))}function le(){B&&(B.remove(),B=null)}function de(e,t){t.classList.add("open"),e.setAttribute("aria-expanded","true"),ce(()=>H(e,t)),document.body.style.overflow="hidden"}function H(e,t){t.classList.remove("open"),e&&e.setAttribute("aria-expanded","false"),le(),document.body.style.overflow=""}document.addEventListener("click",e=>{console.log("[header] Global click on:",e.target);const t=e.target.closest(".menu-open-btn");if(t){console.log("[header] Menu btn detected!");const n=document.querySelector(".mobile-menu");if(!n)return;console.log("[header] Menu toggle clicked"),n.classList.contains("open")?H(t,n):de(t,n);return}if(e.target.closest(".mobile-menu .nav-link")){const n=document.querySelector(".mobile-menu"),s=document.querySelector(".menu-open-btn");n&&n.classList.contains("open")&&setTimeout(()=>H(s,n),100)}});document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".mobile-menu"),o=document.querySelector(".menu-open-btn");t&&t.classList.contains("open")&&H(o,t)}});function ue(){var o;const e=window.location.pathname;document.querySelectorAll(".nav-link").forEach(n=>{n.classList.remove("active"),e.includes(n.getAttribute("href").replace("./",""))&&n.classList.add("active")}),(e==="/"||e.endsWith("index.html"))&&((o=document.querySelector('.nav-link[href="./index.html"]'))==null||o.classList.add("active"))}document.addEventListener("DOMContentLoaded",ue);const me="98ff2d6267ceea8e039422b0f46fb813",ge="https://api.themoviedb.org/3",G=ne.create({baseURL:ge,params:{api_key:me,language:"en-US"}}),pe=async(e="day")=>{try{const{data:t}=await G.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},he=async e=>{try{const{data:t}=await G.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}},fe=async e=>{try{const{data:t}=await G.get(`/movie/${e}/videos`);return t.results.filter(o=>o.site==="YouTube"&&o.type==="Trailer")}catch(t){throw console.error("Film fragmanı bulunamadı:",t),t}};function ve(e){return e[Math.floor(Math.random()*e.length)]}async function ye(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t==="dynamic")try{const o=await pe("day");if(o&&o.length>0){const n=ve(o);be(e,n)}else j(e)}catch(o){console.error("Hero yüklenirken hata:",o),j(e)}else t==="library"&&j(e)}document.addEventListener("DOMContentLoaded",()=>{ye().catch(e=>console.error("initHero error:",e))});function be(e,t){const{title:o,overview:n,backdrop_path:s,vote_average:c,id:d}=t,h=()=>{const E="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let p="w780";window.innerWidth>=1280?p="original":window.innerWidth>=768&&(p="w1280");let a="";if(s)a=`https://image.tmdb.org/t/p/${p}${s}`;else{const m=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],l=m[Math.floor(Math.random()*m.length)];try{a=new URL(l,import.meta.url).href}catch{a=`/src/images/background/${l.split("/").pop()}`}}e.style.backgroundImage=`${E}, url(${a})`,e.style.backgroundPosition="right center"};h(),new MutationObserver(h).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",h),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="hero-rating">${c.toFixed(1)}</div> 
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `;const k=e.querySelector("#watch-trailer"),y=e.querySelector("#more-details");k&&(k.onclick=()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:d}}))}),y&&(y.onclick=()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))}),document.getElementById("watch-trailer").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:d}}))}),document.getElementById("more-details").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))})}function j(e){e.classList.add("hero-default"),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const t=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],o=t[Math.floor(Math.random()*t.length)];let n;try{n=new URL(o,import.meta.url).href}catch{n=`/src/images/background/${o.split("/").pop()}`}const s="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";e.style.backgroundImage=`${s}, url(${n})`,e.style.backgroundPosition="right center",document.getElementById("go-catalog").addEventListener("click",()=>{window.location.href="./catalog.html"})}const Y=document.getElementById("openTeamModal"),V=document.getElementById("closeTeamModal"),w=document.getElementById("teamModal");Y&&w&&Y.addEventListener("click",e=>{e.preventDefault(),w.classList.add("is-open"),document.body.style.overflow="hidden"});V&&w&&V.addEventListener("click",()=>{w.classList.remove("is-open"),document.body.style.overflow="auto"});w&&w.addEventListener("click",e=>{e.target===w&&(w.classList.remove("is-open"),document.body.style.overflow="auto")});window.addEventListener("keydown",e=>{e.key==="Escape"&&w&&w.classList.contains("is-open")&&(w.classList.remove("is-open"),document.body.style.overflow="auto")});const W="favorites";function U(){try{const e=localStorage.getItem(W);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function z(e){try{localStorage.setItem(W,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function J(e){return U().some(o=>Number(o.id)===Number(e))}function Le(e){const t=U();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),z(t))}function ke(e){let t=U();t=t.filter(o=>Number(o.id)!==Number(e)),z(t)}function Ee(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const o=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&O()}),o.addEventListener("click",O),document.addEventListener("keydown",n=>{n.key==="Escape"&&O()})}function O(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}Ee();async function X(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await he(e),s=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",c=n.genres?n.genres.map(y=>y.name).join(", "):"Unknown",d=J(n.id),h=n.release_date?n.release_date.slice(0,4):"N/A",L=`
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
          <button type="button" class="btn-modal btn-add-library ${d?"active":""}" id="modal-library-btn">
            ${d?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;o.innerHTML=L;const k=document.getElementById("modal-library-btn");k.addEventListener("click",()=>{if(J(n.id))ke(n.id),k.textContent="Add to my library",k.classList.remove("active");else{const y={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};Le(y),k.textContent="Remove from library",k.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const we=["weeklyTrends","moviesContainer","catalog-list","movieList"];we.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const s=n.dataset.id;X(s)}})});window.addEventListener("openDetailsModal",e=>{const t=e.detail.movie;t&&t.id&&X(t.id)});window.addEventListener("openTrailerModal",async e=>{const t=e.detail.movieId,o=document.querySelector(".backdrop"),n=document.getElementById("modal-content");o.classList.remove("is-hidden"),document.body.classList.add("modal-open"),n.innerHTML='<div style="color: #111; text-align:center; padding: 50px;">🎬 Loading Trailer...</div>';try{const s=await fe(t);if(console.log("Fetched videos:",s),s&&s.length>0){const c=s[0].key;n.innerHTML=`
        <div class="trailer-container">
          <iframe 
            src="https://www.youtube.com/embed/${c}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `}else n.innerHTML='<div class="no-trailer-msg">Sorry, no trailer found for this movie.</div>'}catch(s){console.error("Trailer loading error:",s),n.innerHTML='<p style="text-align:center; padding:20px;">An error occurred while fetching the video.</p>'}});K();document.addEventListener("DOMContentLoaded",()=>{ie(),document.getElementById("weeklyTrends")&&ae(),document.getElementById("moviesContainer")&&se(),document.getElementById("movieList")&&oe()});
//# sourceMappingURL=main-DT5-yG-C.js.map
