# Cinemania

Cinemania, TMDB API’sini kullanarak trend filmleri, katalog aramasını ve kişisel kütüphaneyi gösteren Vite tabanlı bir web uygulamasıdır. Proje; ana sayfa (trend/hero), katalog (arama + filtre), kütüphane, modal/popup bileşenleri, tema değiştirici ve global loader gibi bileşenleri içerir.

---

## English Summary

Cinemania is a Vite-based web app that uses the TMDB API to show trending movies, a searchable catalog, and a personal library. It includes a hero section (dynamic or fallback), catalog search with filters and pagination, library view, modals/popups, a theme toggle, and a global loader.

## Özellikler
- **Hero alanı:** Trend film veya varsayılan içerik, yıldızlı puan gösterimi, trailer açma/ hata popup’ı.
- **Katalog:** Arama, yıl ve ülke filtreleri, sayfalama, sonuç boşsa uyarı durumu.
- **Kütüphane:** Yerel depolama tabanlı listeleme, boş durum mesajı.
- **Modal & trailer:** Detay ve trailer açma, trailer bulunamazsa hata popup’ı.
- **Tema değiştirici:** Açık/koyu tema.
- **Global loader:** API isteklerinde animasyonlu yükleniyor katmanı.
- **Scroll-up & responsive tasarım:** Mobil/tablet/desktop için optimize edilmiş.

## Features (EN)
- **Hero:** Trending or fallback content with star rating, trailer launch / error popup fallback.
- **Catalog:** Search with year & country filters, pagination, empty-state handling.
- **Library:** Local-storage backed list, empty state message.
- **Modal & trailer:** Details and trailer openers; trailer-missing popup.
- **Theme toggle:** Light/dark.
- **Global loader:** Overlay spinner during API calls.
- **Scroll-up & responsive design:** Optimized for mobile/tablet/desktop.

## Dizinin Yapısı
```
src/
  index.html            # Ana sayfa (trend + hero)
  catalog.html          # Katalog arama/filtre sayfası
  library.html          # Kütüphane sayfası
  trailer_popup.html    # Trailer bulunamazsa popup
  css/                  # Stil dosyaları (bileşen bazlı)
  js/                   # Bileşenler, api servisleri, utils
  partials/             # Header, footer, hero gibi parça HTML’ler
  images/               # Arkaplan ve ikonlar
```

## Project Structure (EN)
```
src/
  index.html            # Landing (trending + hero)
  catalog.html          # Catalog search/filter page
  library.html          # Library page
  trailer_popup.html    # Trailer-missing popup
  css/                  # Component-level styles
  js/                   # Components, API services, utils
  partials/             # Header, footer, hero snippets
  images/               # Backgrounds & icons
```

## Kullanılan Teknolojiler
- **Vite** (geliştirme sunucusu ve build)
- **JavaScript (ESM)**
- **Axios** (TMDB API istekleri)
- **PostCSS / postcss-sort-media-queries** (stil derleme)
- **vite-plugin-html-inject, vite-plugin-full-reload**

## Tech Stack (EN)
- **Vite** (dev server & build)
- **JavaScript (ESM)**
- **Axios** (TMDB API calls)
- **PostCSS / postcss-sort-media-queries**
- **vite-plugin-html-inject, vite-plugin-full-reload**

## Kurulum
1) Depoyu klonla ve dizine gir:
```bash
git clone https://github.com/FullStackDev2/darkscript-js_cinemania.git
cd darkscript-js_cinemania
```
2) Bağımlılıkları kur:
```bash
npm install
```

## Setup (EN)
1) Clone and enter directory:
```bash
git clone https://github.com/FullStackDev2/darkscript-js_cinemania.git
cd darkscript-js_cinemania
```
2) Install dependencies:
```bash
npm install
```

## Geliştirme Ortamı
```bash
npm run dev
```
Vite varsayılan olarak 5173 portunu kullanır. Çalışmazsa terminaldeki çıktıda gösterilen URL’yi aç.

## Development (EN)
```bash
npm run dev
```
Vite defaults to port 5173; if different, use the URL shown in the terminal.

## Build
```bash
npm run build
```
- GitHub Pages için `--base=/darkscript-js_cinemania/` ile çıktıyı üretir.
- Üretilen dosyalar `dist/` altında yer alır.

## Build (EN)
```bash
npm run build
```
- Uses `--base=/darkscript-js_cinemania/` for GitHub Pages.
- Outputs to `dist/`.

## Preview (build sonrası yerel önizleme)
```bash
npm run preview
```

## Preview (EN)
```bash
npm run preview
```

## Deploy (GitHub Pages)
1) `npm run build` komutuyla `dist/` üret.
2) `dist/` içeriğini GitHub Pages’a (örn. `gh-pages` branch) yayınla.
3) Repository ayarlarında Pages kaynağını ilgili branch/klasöre yönlendir.

## Deploy (GitHub Pages, EN)
1) Run `npm run build` to produce `dist/`.
2) Publish `dist/` to GitHub Pages (e.g., `gh-pages` branch).
3) Point Pages source to that branch/folder in repo settings.

## Önemli Notlar
- **Base URL:** Pages altında doğru çalışması için build komutundaki base değeri `/darkscript-js_cinemania/` olarak ayarlanmıştır.
- **Relative linkler:** Header’daki logo ve menü linkleri `./index.html`, `./catalog.html`, `./library.html` olarak relative kullanılır; proje alt dizinde barınırken 404 oluşmaz.
- **TMDB API anahtarı:** Gerekliyse `.env` veya uygun konfigurasyonla sağlamayı unutmayın.

## Notes (EN)
- **Base URL:** Build uses `/darkscript-js_cinemania/` for Pages.
- **Relative links:** Header links use `./index.html`, `./catalog.html`, `./library.html` to avoid 404s in subpath deployments.
- **TMDB API key:** Provide via `.env` or appropriate config if needed.

## Script Özeti
- `npm run dev` — Geliştirme
- `npm run build` — Production build (Pages base ile)
- `npm run preview` — Build sonrası lokal önizleme

## Scripts (EN)
- `npm run dev` — Development
- `npm run build` — Production build (with Pages base)
- `npm run preview` — Local preview after build

## Katkı
- Branch aç, değişikliklerini yap, `npm run build` ile kontrol et, PR aç.

## Contributing (EN)
- Open a branch, make changes, validate with `npm run build`, then open a PR.

## Lisans
ISC

## License (EN)
ISC
