// Mobil menü açma/kapatma işlevselliği
document.addEventListener('DOMContentLoaded', () => {
	const menuBtn = document.querySelector('.menu-open-btn');
	const mobileMenu = document.querySelector('.mobile-menu');

	if (!menuBtn || !mobileMenu) return;

	menuBtn.setAttribute('aria-expanded', 'false');

	let overlayEl = null;

	function createOverlay() {
		if (overlayEl) return;
		overlayEl = document.createElement('div');
		overlayEl.className = 'mobile-menu-overlay';
		overlayEl.addEventListener('click', closeMenu);
		document.body.appendChild(overlayEl);
	}

	function removeOverlay() {
		if (!overlayEl) return;
		overlayEl.removeEventListener('click', closeMenu);
		document.body.removeChild(overlayEl);
		overlayEl = null;
	}

	function openMenu() {
		mobileMenu.classList.add('open');
		menuBtn.setAttribute('aria-expanded', 'true');
		createOverlay();
		document.body.style.overflow = 'hidden';
	}

	function closeMenu() {
		mobileMenu.classList.remove('open');
		menuBtn.setAttribute('aria-expanded', 'false');
		removeOverlay();
		document.body.style.overflow = '';
	}

	menuBtn.addEventListener('click', () => {
		if (mobileMenu.classList.contains('open')) closeMenu();
		else openMenu();
	});

	// Kullanıcı mobil menüde bir gezinme bağlantısına tıkladığında kapat
	const navLinks = mobileMenu.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			// Belirli bir süre sonra kapatma için küçük bir zaman aşımı
			setTimeout(closeMenu, 50);
		});
	});

	// ESC tuşuna basıldığında menüyü kapat
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
			closeMenu();
		}
	});
});

