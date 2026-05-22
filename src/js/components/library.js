function renderLibraryHero(container) {
  // My Library sayfasına özel içerik
  container.innerHTML = `
    <div class="container hero-content">
      <h1 class="hero-title">Create Your Dream Cinema</h1>
      <p class="hero-description">Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.
      </div>
  `;
  
  // Arka plan için CSS'deki responsive yapıyı tetikleyecek class'ı ekliyo
  container.classList.add('hero-library-bg');
}