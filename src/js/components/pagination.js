export class Pagination {
  // 👇 currentPage = 1 parametresini buraya yazdığından EMİN OL
  constructor({ containerId, totalItems, itemsPerPage, onPageChange, currentPage = 1 }) {
    this.container = document.getElementById(containerId);
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    
    // 👇 BU SATIR EKSİKSE ÇALIŞMAZ! 
    // Dışarıdan gelen sayfa numarasını hafızaya alıyoruz.
    this.currentPage = currentPage; 
    
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.onPageChange = onPageChange;
    this.render();
  }

  pad(num) {
    return String(num).padStart(2, '0');
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.render();
    if (this.onPageChange) this.onPageChange(this.currentPage);
  }

  render() {
    if (this.totalPages <= 1) {
      this.container.innerHTML = '';
      return;
    }
    
    // Önceki (<) butonu
    let html = `<button class="pagination-btn pagination-arrow prev-btn" ${this.currentPage === 1 ? 'disabled' : ''}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6666 8H3.33325" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;
    
    const range = this.getPaginationRange();

    range.forEach(item => {
      if (item === '...') {
        html += `<span class="pagination-dots">...</span>`;
      } else {
        const isActive = item === this.currentPage ? 'active' : '';
        html += `<button class="pagination-btn pagination-number ${isActive}" data-page="${item}">${this.pad(item)}</button>`;
      }
    });

    // Sonraki (>) butonu
    html += `<button class="pagination-btn pagination-arrow next-btn" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33341 8H12.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;
    
    this.container.innerHTML = html;
    this.addEventListeners();
  }

  getPaginationRange() {
    const total = this.totalPages;
    const current = this.currentPage;
    const range = [];
    const visibleCount = 3; 
    let start = current - 1;
    let end = current + 1;

    if (start < 1) {
      start = 1;
      end = Math.min(visibleCount, total);
    }
    if (end > total) {
      end = total;
      start = Math.max(1, total - visibleCount + 1);
    }

    if (start > 1) range.push('...');
    for (let i = start; i <= end; i++) range.push(i);
    if (end < total) range.push('...');

    return range;
  }

  addEventListeners() {
    this.container.querySelectorAll('.pagination-number').forEach(btn => {
      btn.addEventListener('click', () => this.goToPage(parseInt(btn.dataset.page)));
    });
    const prev = this.container.querySelector('.prev-btn');
    const next = this.container.querySelector('.next-btn');
    if (prev) prev.addEventListener('click', () => this.goToPage(this.currentPage - 1));
    if (next) next.addEventListener('click', () => this.goToPage(this.currentPage + 1));
  }
}