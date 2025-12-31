import{a as z}from"./vendor-BWC8OeqA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();function D(){const e=document.querySelector("#checkbox"),t=localStorage.getItem("theme")||"dark";if(t==="light"?document.body.classList.add("light-theme"):document.body.classList.remove("light-theme"),!e){setTimeout(D,100);return}e.checked=t==="light",e.dataset.listenerAdded||(e.addEventListener("change",()=>{e.checked?(document.body.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.body.classList.remove("light-theme"),localStorage.setItem("theme","dark"))}),e.dataset.listenerAdded="true")}function V(){const e=document.getElementById("movieList"),t=document.getElementById("emptySection"),o=document.getElementById("loadMoreBtn");if(!e||!t||!o){console.warn("Library DOM bulunamadı, initLibrary çalışmadı");return}function n(){return JSON.parse(localStorage.getItem("favorites"))||[]}a();function a(){const l=n();if(e.innerHTML="",l.length===0){t.classList.remove("hidden"),o.classList.add("hidden");return}t.classList.add("hidden"),s(l.slice(0,9)),l.length>9?o.classList.remove("hidden"):o.classList.add("hidden")}function s(l){l.forEach(m=>{var f;if(!m.poster_path)return;const k=((f=m.release_date)==null?void 0:f.slice(0,4))||"N/A",y=document.createElement("article");y.className="movie-card",y.setAttribute("data-id",m.id),y.innerHTML=`
        <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" alt="${m.title}">
        <div class="movie-card-overlay">
          <h3>${m.title}</h3>
          <p>${k}</p>
        </div>
      `,e.appendChild(y)})}}class X{constructor({containerId:t,totalItems:o,itemsPerPage:n,onPageChange:a,currentPage:s=1}){this.container=document.getElementById(t),this.totalItems=o,this.itemsPerPage=n,this.currentPage=s,this.totalPages=Math.ceil(this.totalItems/this.itemsPerPage),this.onPageChange=a,this.render()}pad(t){return String(t).padStart(2,"0")}goToPage(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.render(),this.onPageChange&&this.onPageChange(this.currentPage))}render(){if(this.totalPages<=1){this.container.innerHTML="";return}let t=`<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage===1?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;this.getPaginationRange().forEach(n=>{if(n==="...")t+='<span class="pagination-dots">...</span>';else{const a=n===this.currentPage?"active":"";t+=`<button class="pagination-btn pagination-number ${a}" data-page="${n}">${this.pad(n)}</button>`}}),t+=`<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage===this.totalPages?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`,this.container.innerHTML=t,this.addEventListeners()}getPaginationRange(){const t=this.totalPages,o=this.currentPage,n=[],a=3;let s=o-1,l=o+1;s<1&&(s=1,l=Math.min(a,t)),l>t&&(l=t,s=Math.max(1,t-a+1)),s>1&&n.push("...");for(let m=s;m<=l;m++)n.push(m);return l<t&&n.push("..."),n}addEventListeners(){this.container.querySelectorAll(".pagination-number").forEach(n=>{n.addEventListener("click",()=>this.goToPage(parseInt(n.dataset.page)))});const t=this.container.querySelector(".prev-btn"),o=this.container.querySelector(".next-btn");t&&t.addEventListener("click",()=>this.goToPage(this.currentPage-1)),o&&o.addEventListener("click",()=>this.goToPage(this.currentPage+1))}}function Q(){let e="",t="",o="",n=!1,a={},s="trending";const l={"United States":"US",Germany:"DE",France:"FR",Italy:"IT",Spain:"ES","United Kingdom":"GB",Japan:"JP",Belgium:"BE"},m="98ff2d6267ceea8e039422b0f46fb813",k="https://api.themoviedb.org/3",y="https://image.tmdb.org/t/p/w500",f=document.getElementById("moviesContainer"),L=document.getElementById("emptyMessage"),I=document.querySelector(".search-input"),r=document.getElementById("clearSearch"),u=document.querySelector(".search-btn"),g=document.getElementById("yearBtn"),v=document.getElementById("yearDropdown"),b=document.getElementById("selectedYear"),d=document.getElementById("countrySelect"),p=d==null?void 0:d.querySelector(".search-input1"),B=d==null?void 0:d.querySelector(".country-list"),C=document.getElementById("pagination");if(!f||!L)return;function O(i,c){const M=i>480?480:i;if(M===0){C.innerHTML="";return}new X({containerId:"pagination",totalItems:M,itemsPerPage:20,currentPage:c,onPageChange:E=>{console.log("Sayfa Değişiyor -> Yeni Sayfa:",E),s==="trending"?P(E):q(E);const _=document.getElementById("moviesContainer");if(_){const A=_.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:A,behavior:"smooth"})}}})}fetch(`${k}/genre/movie/list?api_key=${m}&language=en-US`).then(i=>i.json()).then(i=>i.genres.forEach(c=>a[c.id]=c.name));function W(i,c){if(!i)return;i.innerHTML="";const h=Math.floor(c/2),T=c%2>=1;for(let S=0;S<5;S++){let M="empty";S<h?M="full":S===h&&T&&(M="half");const E=`star-${Math.random().toString(36).slice(2)}`;i.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>
          <linearGradient id="${E}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <linearGradient id="${E}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>
        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${M==="full"?`url(#${E}-full)`:M==="half"?`url(#${E}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}d&&p&&B&&(p.readOnly=!0,d.addEventListener("click",i=>{i.stopPropagation(),d.classList.toggle("open")}),B.querySelectorAll("li").forEach(i=>{i.addEventListener("click",c=>{c.stopPropagation();const h=i.textContent.trim();p.value=h,o=l[h]||"",d.classList.add("has-value"),d.classList.remove("open")})})),g&&v&&(g.addEventListener("click",i=>{i.stopPropagation(),v.classList.toggle("open")}),v.addEventListener("click",i=>{i.target.tagName==="LI"&&(e=i.target.dataset.year||"",b.textContent=i.target.textContent,v.classList.remove("open"))})),u.addEventListener("click",()=>{if(t=I.value.trim(),n=!0,!t&&!e&&!o){n=!1,P();return}q()}),r==null||r.addEventListener("click",()=>{I.value="",p&&(p.value=""),b.textContent="Year",t="",e="",o="",n=!1,d==null||d.classList.remove("has-value"),P()});function q(i=1){let c=t?`${k}/search/movie?api_key=${m}&query=${encodeURIComponent(t)}`:`${k}/discover/movie?api_key=${m}`;e&&(c+=`&year=${e}`),o&&(c+=`&with_origin_country=${o}`),c+=`&page=${i}`,fetch(c).then(h=>h.json()).then(h=>{U(h.results||[]),O(h.total_results,i)})}P(1);function P(i=1){L.style.display="none",s="trending",fetch(`${k}/trending/movie/week?api_key=${m}&page=${i}`).then(c=>c.json()).then(c=>{U(c.results||[]),O(c.total_results,i)})}function U(i){if(f.innerHTML="",!i.length){L.style.display=n?"block":"none";return}L.style.display="none",i.slice(0,10).forEach(c=>{var E,_;const h=document.createElement("a");h.className="movie-card",h.setAttribute("data-id",c.id),h.href=`catalog_mainbody.html?id=${c.id}`;const T=c.poster_path?`${y}${c.poster_path}`:"https://via.placeholder.com/300x450",S=((E=c.release_date)==null?void 0:E.slice(0,4))||"N/A",M=((_=c.genre_ids)==null?void 0:_.map(A=>a[A]).filter(Boolean).slice(0,2).join(", "))||"Unknown";h.innerHTML=`
        <img src="${T}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${c.title}</h3>
            <p>${M} | ${S}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,f.appendChild(h),W(h.querySelector(".movie-rating-stars"),c.vote_average)})}}function Z(){const e={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",27:"Horror",9648:"Mystery",878:"Sci-Fi",53:"Thriller",10749:"Romance"},t="98ff2d6267ceea8e039422b0f46fb813",o="https://api.themoviedb.org/3",n="https://image.tmdb.org/t/p/w500",a="https://image.tmdb.org/t/p/original";if(!document.getElementById("weeklyTrends")&&!document.getElementById("heroBackdrop")){console.warn("CatalogHome DOM yok, initCatalogHome çalışmadı");return}function s(r,u){if(!r)return;r.innerHTML="";const g=Math.floor(u/2),v=u%2>=1;for(let b=0;b<5;b++){let d="empty";b<g?d="full":b===g&&v&&(d="half");const p=`star-${Math.random().toString(36).slice(2)}`;r.innerHTML+=`
      <svg viewBox="0 0 32 32" width="14" height="14">
        <defs>

          <!-- DOLU -->
          <linearGradient id="${p}-full" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="100%" stop-color="#F89F19"/>
          </linearGradient>

          <!-- YARIM (ayni renk, ortadan bölünmüş) -->
          <linearGradient id="${p}-half" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#F84119"/>
            <stop offset="50%" stop-color="#F89F19"/>
            <stop offset="50%" stop-color="#bfbfbf"/>
            <stop offset="100%" stop-color="#bfbfbf"/>
          </linearGradient>

        </defs>

        <path
          d="M24.622 30c-0.211 0.001-0.416-0.065-0.587-0.188l-8.038-5.827-8.038 5.827c-0.172 0.125-0.379 0.191-0.591 0.191s-0.419-0.069-0.589-0.195c-0.171-0.126-0.297-0.303-0.361-0.505s-0.061-0.42 0.007-0.621l3.135-9.286-8.125-5.572c-0.176-0.121-0.309-0.294-0.379-0.496s-0.074-0.42-0.011-0.624c0.063-0.204 0.189-0.382 0.361-0.509s0.379-0.196 0.592-0.196h10.024l3.025-9.309c0.065-0.201 0.192-0.376 0.363-0.5s0.377-0.191 0.588-0.191c0.211 0 0.417 0.067 0.588 0.191s0.298 0.299 0.363 0.5l3.025 9.313h10.024c0.214 0 0.422 0.068 0.594 0.195s0.299 0.305 0.362 0.509c0.063 0.204 0.060 0.423-0.011 0.625s-0.203 0.376-0.379 0.496l-8.128 5.569 3.133 9.283c0.051 0.15 0.065 0.31 0.042 0.467s-0.084 0.306-0.176 0.435c-0.092 0.129-0.214 0.234-0.355 0.307s-0.297 0.111-0.456 0.111z"
          fill="${d==="full"?`url(#${p}-full)`:d==="half"?`url(#${p}-half)`:"#bfbfbf"}"
        />
      </svg>
    `}}function l(){fetch(`${o}/trending/movie/week?api_key=${t}`).then(r=>r.json()).then(r=>m(r.results||[]))}function m(r){const u=document.getElementById("weeklyTrends");u&&(u.innerHTML="",r.slice(0,1).forEach(g=>{var B;const v=g.genre_ids.map(C=>e[C]).filter(Boolean).slice(0,2).join(", "),b=g.poster_path?n+g.poster_path:"./images/no-poster.jpg",d=((B=g.release_date)==null?void 0:B.split("-")[0])||"N/A",p=document.createElement("a");p.className="movie-card large",p.setAttribute("data-id",g.id),p.href=`catalog_mainbody.html?id=${g.id}`,p.innerHTML=`
        <img src="${b}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${g.title}</h3>
            <p>${v} | ${d}</p>
          </div>
          <div class="movie-rating-stars"></div>
        </div>
      `,s(p.querySelector(".movie-rating-stars"),g.vote_average),u.appendChild(p)}))}function k(){const r=new Date,u=r.getFullYear(),g=String(r.getMonth()+1).padStart(2,"0");fetch(`${o}/discover/movie?api_key=${t}&primary_release_date.gte=${u}-${g}-01&primary_release_date.lte=${u}-${g}-31&sort_by=popularity.desc`).then(v=>v.json()).then(v=>{var d;const b=(d=v.results)==null?void 0:d.find(p=>p.backdrop_path);b&&(y(b),I(b))})}function y(r){const u=document.getElementById("heroBackdrop");u&&(u.src=a+r.backdrop_path,document.getElementById("movieTitle").textContent=r.title,document.getElementById("movieOverview").textContent=r.overview)}function f(){return JSON.parse(localStorage.getItem("favorites"))||[]}function L(r){return f().some(u=>u.id===r)}function I(r){const u=document.getElementById("libraryToggleBtn");if(!u)return;const g=()=>{u.textContent=L(r.id)?"Remove from my library":"Add to my library",u.classList.toggle("active",L(r.id))};g(),u.onclick=()=>{let v=f();L(r.id)?v=v.filter(b=>b.id!==r.id):v.push(r),localStorage.setItem("favorites",JSON.stringify(v)),g()}}l(),k()}function ee(){const e=document.getElementById("scrollUpBtn");if(!e){console.warn("Scroll button bulunamadı!");return}window.addEventListener("scroll",()=>{window.scrollY>300?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}console.log("[header] header.js checking in");let $=null;function te(e){$||($=document.createElement("div"),$.className="mobile-menu-overlay",$.addEventListener("click",e),document.body.appendChild($))}function ne(){$&&($.remove(),$=null)}function oe(e,t){t.classList.add("open"),e.setAttribute("aria-expanded","true"),te(()=>x(e,t)),document.body.style.overflow="hidden"}function x(e,t){t.classList.remove("open"),e&&e.setAttribute("aria-expanded","false"),ne(),document.body.style.overflow=""}document.addEventListener("click",e=>{console.log("[header] Global click on:",e.target);const t=e.target.closest(".menu-open-btn");if(t){console.log("[header] Menu btn detected!");const n=document.querySelector(".mobile-menu");if(!n)return;console.log("[header] Menu toggle clicked"),n.classList.contains("open")?x(t,n):oe(t,n);return}if(e.target.closest(".mobile-menu .nav-link")){const n=document.querySelector(".mobile-menu"),a=document.querySelector(".menu-open-btn");n&&n.classList.contains("open")&&setTimeout(()=>x(a,n),100)}});document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".mobile-menu"),o=document.querySelector(".menu-open-btn");t&&t.classList.contains("open")&&x(o,t)}});function ae(){var o;const e=window.location.pathname;document.querySelectorAll(".nav-link").forEach(n=>{n.classList.remove("active"),e.includes(n.getAttribute("href").replace("./",""))&&n.classList.add("active")}),(e==="/"||e.endsWith("index.html"))&&((o=document.querySelector('.nav-link[href="./index.html"]'))==null||o.classList.add("active"))}document.addEventListener("DOMContentLoaded",ae);const se="98ff2d6267ceea8e039422b0f46fb813",re="https://api.themoviedb.org/3",Y=z.create({baseURL:re,params:{api_key:se,language:"en-US"}}),ie=async(e="day")=>{try{const{data:t}=await Y.get(`/trending/movie/${e}`);return t.results}catch(t){throw console.error(`Trend filmler (${e}) alınamadı:`,t),t}},ce=async e=>{try{const{data:t}=await Y.get(`/movie/${e}`);return t}catch(t){throw console.error("Film detayları alınamadı:",t),t}};function le(e){return e[Math.floor(Math.random()*e.length)]}async function de(){const e=document.getElementById("hero-section");if(!e)return;const t=e.getAttribute("data-page");if(t==="dynamic")try{const o=await ie("day");if(o&&o.length>0){const n=le(o);me(e,n)}else H(e)}catch(o){console.error("Hero yüklenirken hata:",o),H(e)}else t==="library"&&H(e)}document.addEventListener("DOMContentLoaded",()=>{de().catch(e=>console.error("initHero error:",e))});function me(e,t){const{title:o,overview:n,backdrop_path:a,vote_average:s,id:l}=t,m=()=>{const y="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";let f="w780";window.innerWidth>=1280?f="original":window.innerWidth>=768&&(f="w1280");let L="";if(a)L=`https://image.tmdb.org/t/p/${f}${a}`;else{const I=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],r=I[Math.floor(Math.random()*I.length)];try{L=new URL(r,import.meta.url).href}catch{L=`/src/images/background/${r.split("/").pop()}`}}e.style.backgroundImage=`${y}, url(${L})`,e.style.backgroundPosition="right center"};m(),new MutationObserver(m).observe(document.body,{attributes:!0,attributeFilter:["class"]}),window.addEventListener("resize",m),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">${o}</h1>
      <div class="hero-rating">${s.toFixed(1)}</div> 
      <p class="hero-description">${n.slice(0,220)}...</p> 
      <div class="hero-btns">
        <button type="button" class="btn-primary" id="watch-trailer">Watch trailer</button>
        <button type="button" class="btn-secondary" id="more-details">More details</button>
      </div>
    </div>
  `,document.getElementById("watch-trailer").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openTrailerModal",{detail:{movieId:l}}))}),document.getElementById("more-details").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("openDetailsModal",{detail:{movie:t}}))})}function H(e){e.classList.add("hero-default"),e.innerHTML=`
    <div class="container hero-content">
      <h1 class="hero-title">Let’s Make Your Own Cinema</h1>
      <p class="hero-description">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. </p>
      <button type="button" class="btn-primary" id="go-catalog">Get Started</button>
    </div>
  `;const t=["../../images/background/desktop-1.jpg","../../images/background/desktop-2.jpg","../../images/background/mobile-1.jpg"],o=t[Math.floor(Math.random()*t.length)];let n;try{n=new URL(o,import.meta.url).href}catch{n=`/src/images/background/${o.split("/").pop()}`}const a="linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.0) 60%)";e.style.backgroundImage=`${a}, url(${n})`,e.style.backgroundPosition="right center",document.getElementById("go-catalog").addEventListener("click",()=>{window.location.href="./catalog.html"})}const j=document.getElementById("openTeamModal"),R=document.getElementById("closeTeamModal"),w=document.getElementById("teamModal");j&&w&&j.addEventListener("click",e=>{e.preventDefault(),w.classList.add("is-open"),document.body.style.overflow="hidden"});R&&w&&R.addEventListener("click",()=>{w.classList.remove("is-open"),document.body.style.overflow="auto"});w&&w.addEventListener("click",e=>{e.target===w&&(w.classList.remove("is-open"),document.body.style.overflow="auto")});window.addEventListener("keydown",e=>{e.key==="Escape"&&w&&w.classList.contains("is-open")&&(w.classList.remove("is-open"),document.body.style.overflow="auto")});const J="favorites";function F(){try{const e=localStorage.getItem(J);return e?JSON.parse(e):[]}catch(e){return console.error("localStorage read error",e),[]}}function K(e){try{localStorage.setItem(J,JSON.stringify(e))}catch(t){console.error("localStorage write error",t)}}function G(e){return F().some(o=>Number(o.id)===Number(e))}function ue(e){const t=F();t.some(o=>Number(o.id)===Number(e.id))||(t.push(e),K(t))}function ge(e){let t=F();t=t.filter(o=>Number(o.id)!==Number(e)),K(t)}function pe(){if(document.querySelector(".backdrop"))return;const e=document.createElement("div");e.className="backdrop is-hidden",e.setAttribute("data-modal","");const t=document.createElement("div");t.className="modal",t.innerHTML=`
    <button type="button" class="modal-close-btn" data-modal-close>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
        <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
      </svg>
    </button>
    <div class="modal-content" id="modal-content"></div>
  `,e.appendChild(t),document.body.appendChild(e);const o=t.querySelector("[data-modal-close]");e.addEventListener("click",n=>{n.target===e&&N()}),o.addEventListener("click",N),document.addEventListener("keydown",n=>{n.key==="Escape"&&N()})}function N(){const e=document.querySelector(".backdrop");if(e){e.classList.add("is-hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-content");t&&(t.innerHTML="")}}pe();async function he(e){const t=document.querySelector(".backdrop"),o=document.getElementById("modal-content");o.innerHTML='<div style="display:flex; justify-content:center; align-items:center; height:200px;">Loading details...</div>',t.classList.remove("is-hidden"),document.body.classList.add("modal-open");try{const n=await ce(e),a=n.poster_path?`https://image.tmdb.org/t/p/w500${n.poster_path}`:"https://via.placeholder.com/300x450?text=No+Image",s=n.genres?n.genres.map(f=>f.name).join(", "):"Unknown",l=G(n.id),m=n.release_date?n.release_date.slice(0,4):"N/A",k=`
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
            <span class="stats-value">${s}</span>
          </div>
        </div>

        <h3 class="modal-about-title">ABOUT</h3>
        <p class="modal-about-text">${n.overview||"No description available."}</p>

        <div class="modal-buttons">
          <button type="button" class="btn-modal btn-add-library ${l?"active":""}" id="modal-library-btn">
            ${l?"Remove from library":"Add to my library"}
          </button>
        </div>
      </div>
    `;o.innerHTML=k;const y=document.getElementById("modal-library-btn");y.addEventListener("click",()=>{if(G(n.id))ge(n.id),y.textContent="Add to my library",y.classList.remove("active");else{const f={id:n.id,title:n.title,poster_path:n.poster_path,vote_average:n.vote_average,release_date:n.release_date,genres:n.genres};ue(f),y.textContent="Remove from library",y.classList.add("active")}})}catch(n){console.error("Modal Hatası:",n),o.innerHTML='<p style="text-align:center; padding:20px;">Error loading movie details.</p>'}}const fe=["weeklyTrends","moviesContainer","catalog-list","movieList"];fe.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",o=>{const n=o.target.closest(".movie-card")||o.target.closest(".movie-card-overlay");if(n&&n.dataset.id){o.preventDefault();const a=n.dataset.id;he(a)}})});D();document.addEventListener("DOMContentLoaded",()=>{ee(),document.getElementById("weeklyTrends")&&Z(),document.getElementById("moviesContainer")&&Q(),document.getElementById("movieList")&&V()});
//# sourceMappingURL=main-CtDY1WTH.js.map
