(function () {
    const modal    = document.getElementById('modal');
    const overlay  = document.getElementById('overlay');
    const closeBtn = document.getElementById('close');
    const img      = document.getElementById('dlg-img');
    const title    = document.getElementById('dlg-title');
    const desc     = document.getElementById('dlg-desc');
    const price    = document.getElementById('dlg-price');
    const products = document.getElementById('products');

    if (!modal || !products) return;

    function openCard(card) {
        const src = card.dataset.img || card.querySelector('img')?.src || '';
        const t   = card.dataset.title || card.querySelector('.card-title')?.innerText || 'Product';
        const d   = card.dataset.desc || card.querySelector('.card-sub')?.innerText || '';
        const p   = card.dataset.price || card.querySelector('.price')?.innerText || '';

        img.src = src;
        img.alt = t;
        title.textContent = t;
        desc.textContent = d;
        price.textContent = p;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    // เปิด modal เมื่อคลิกรูป
    products.addEventListener('click', function (e) {
        const card = e.target.closest('.card');
        if (!card) return;

        if (e.target.closest('[data-skip-modal="true"]')) return;

        if (e.target.matches('img')) {
            openCard(card);
        }
    });

    products.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.card')) {
            e.preventDefault();
            openCard(e.target.closest('.card'));
        }
    });

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // ✅ ปุ่ม Contact sales ใน popup
    const contactBtn = document.getElementById('contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            e.preventDefault(); // กันไม่ให้รีโหลด/เด้งแปลก ๆ
            closeModal();
            const footer = document.getElementById('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
})();
