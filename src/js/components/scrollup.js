export function initScrollUp() {
  const scrollUpBtn = document.getElementById("scrollUpBtn");

  // DOM Guard: Buton yoksa dur
  if (!scrollUpBtn) {
    console.warn("Scroll button bulunamadı!"); // Konsolda bunu görürsen HTML'de buton yok demektir.
    return;
  }

  window.addEventListener("scroll", () => {
    // 300px aşağı inildi mi?
    if (window.scrollY > 300) {
      scrollUpBtn.classList.add("show"); // CSS'teki .show class'ını ekler
    } else {
      scrollUpBtn.classList.remove("show");
    }
  });

  scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}