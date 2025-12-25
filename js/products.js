document.addEventListener("DOMContentLoaded", function () {
  const PAGE_SIZE = 6; // แสดงกี่ชิ้นต่อหน้า (ปรับเลขได้)

  const productsEl = document.getElementById("products");
  const allCards = Array.from(productsEl.querySelectorAll(".product-card"));
  const categoryLinks = Array.from(
    document.querySelectorAll(".category-list a[data-category]")
  );
  const countBadges = Array.from(
    document.querySelectorAll("[data-category-count]")
  );

  const titleEl = document.getElementById("products-title");
  const countEl = document.getElementById("products-count");
  const paginationEl =
    document.getElementById("products-pagination") ||
    document.querySelector(".products-pagination");

  let currentCategory = "all";
  let currentPage = 1;
  // เลื่อนหน้าจอขึ้นไปบริเวณด้านบนของสินค้าทุกครั้งที่เปลี่ยนหน้า/เปลี่ยนหมวด
  function scrollToProductsTop() {
    // อยากให้เลื่อนมาที่หัว section (products-area)
    const section = document.querySelector(".products-area") || productsEl;
    const rect = section.getBoundingClientRect();
    const offset = rect.top + window.scrollY - 120; // 120 = เผื่อ navbar สูง ๆ

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }

  
function applyCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("category");
  if (!cat) return;

  const link = categoryLinks.find((l) => (l.dataset.category || "all") === cat);
  if (!link) return;

  // ทำเหมือนผู้ใช้คลิกเลือกหมวด
  categoryLinks.forEach((l) => l.classList.remove("active"));
  link.classList.add("active");

  currentCategory = cat;
  currentPage = 1;

  renderProducts();
  scrollToProductsTop();
}

  
  // ========= 1) อัปเดตจำนวนชิ้นในแต่ละหมวด =========
  function updateCategoryCounts() {
    const counts = {
      all: allCards.length,
    };

    allCards.forEach((card) => {
      const cat = card.dataset.category || "uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });

    countBadges.forEach((badge) => {
      const cat = badge.dataset.categoryCount;
      badge.textContent = counts[cat] || 0;
    });
  }

  // ========= 2) ดึงรายการสินค้าที่เข้ากับหมวดปัจจุบัน =========
  function getFilteredCards() {
    if (currentCategory === "all") return allCards;
    return allCards.filter((card) => card.dataset.category === currentCategory);
  }

  // ========= 3) เรนเดอร์สินค้า + pagination =========
  function renderProducts() {
    const filtered = getFilteredCards();
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (currentPage > totalPages) currentPage = totalPages;

    // ซ่อนทุกใบก่อน
    allCards.forEach((card) => {
      card.style.display = "none";
    });

    // แสดงเฉพาะใบที่อยู่ในหน้าปัจจุบัน
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    filtered.slice(start, end).forEach((card) => {
      card.style.display = "";
    });

    // อัปเดตหัวข้อ + จำนวน
    const activeLink = document.querySelector(".category-list a.active");
    if (activeLink && titleEl) {
      const label = activeLink.querySelector("span")?.textContent || "สินค้า";
      titleEl.textContent = label;
    }
    if (countEl) {
      countEl.textContent = `พบสินค้า ${total} รายการ`;
    }

    // สร้าง pagination ใหม่
    if (!paginationEl) return;
    paginationEl.innerHTML = "";

    if (totalPages <= 1) {
      // ถ้ามีหน้าเดียว ไม่ต้องโชว์เลขเลยก็ได้
      return;
    }

    // ปุ่มย้อนกลับ
    const prev = document.createElement("a");
    prev.href = "#";
    prev.className = "page-number";
    prev.textContent = "‹";
    if (currentPage === 1) prev.classList.add("disabled");
    paginationEl.appendChild(prev);

    // ปุ่มเลขหน้า
    for (let i = 1; i <= totalPages; i++) {
      const a = document.createElement("a");
      a.href = "#";
      a.className = "page-number";
      if (i === currentPage) a.classList.add("current");
      a.textContent = String(i);
      paginationEl.appendChild(a);
    }

    // ปุ่มไปหน้า next
    const next = document.createElement("a");
    next.href = "#";
    next.className = "page-number";
    next.textContent = "›";
    if (currentPage === totalPages) next.classList.add("disabled");
    paginationEl.appendChild(next);
  }

  // ========= 4) เปลี่ยนหมวด =========
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const cat = this.dataset.category || "all";
      currentCategory = cat;
      currentPage = 1;

      categoryLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      renderProducts();
      scrollToProductsTop(); // 👈 เลื่อนขึ้นมาด้านบนของสินค้า
    });
  });

  // ========= 5) คลิกเลขหน้า / ปุ่ม next / prev =========
  if (paginationEl) {
    paginationEl.addEventListener("click", function (e) {
      const target = e.target.closest(".page-number");
      if (!target) return;
      e.preventDefault();
      if (target.classList.contains("disabled")) return;

      const text = target.textContent.trim();

      if (text === "‹") {
        if (currentPage > 1) currentPage--;
      } else if (text === "›") {
        const totalPages = Math.max(
          1,
          Math.ceil(getFilteredCards().length / PAGE_SIZE)
        );
        if (currentPage < totalPages) currentPage++;
      } else {
        const pageNum = parseInt(text, 10);
        if (!isNaN(pageNum)) currentPage = pageNum;
      }

      // ...
      renderProducts();
      scrollToProductsTop(); // 👈 เวลาเปลี่ยนหน้า เลื่อนขึ้นไปบนสุดของกริดสินค้า
    });
  }

  // ========= 6) Model (ดูรายละเอียดสินค้า) =========
  (function setupModel() {
    const model = document.getElementById("model");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("close");
    const img = document.getElementById("dlg-img");
    const title = document.getElementById("dlg-title");
    const desc = document.getElementById("dlg-desc");
    const contactBtn = document.getElementById("contact");

    function escapeHTML(s) {
      return String(s).replace(
        /[&<>"']/g,
        (m) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[m])
      );
    }

    function formatDesc(text) {
      return (text || "")
        .replace(/&#10;/g, "\n") // เผื่อ data-desc ใช้ &#10;
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((line) => {
          const m = line.match(/^([^:]+):\s*(.*)$/);
          if (!m) return `<div class="rowline">${escapeHTML(line)}</div>`;
          return `<div class="rowline"><strong>${escapeHTML(
            m[1]
          )}:</strong> ${escapeHTML(m[2])}</div>`;
        })
        .join("");
    }

    if (!model || !overlay || !closeBtn) return;

    function openCard(card) {
      const src = card.dataset.img || card.querySelector("img")?.src || "";
      const t =
        card.dataset.title ||
        card.querySelector(".card-title")?.innerText ||
        "Product";
      const d =
        card.dataset.desc || card.querySelector(".card-sub")?.innerText || "";

      img.src = src;
      img.alt = t;
      title.textContent = t;
      desc.innerHTML = formatDesc(d);

      model.classList.add("open");
      overlay.classList.add("open");
      model.setAttribute("aria-hidden", "false");
      closeBtn.focus();
    }

    function closeModel() {
      model.classList.remove("open");
      overlay.classList.remove("open");
      model.setAttribute("aria-hidden", "true");
    }

    // click card -> open model (ยกเว้นปุ่มที่มี data-skip-model="true")
    productsEl.addEventListener("click", function (e) {
      const card = e.target.closest(".card");
      if (!card) return;

      if (e.target.closest('[data-skip-model="true"]')) {
        return; // ให้ลิงก์ทำงานเอง เช่น ไปเว็บนอก
      }

      openCard(card);
    });

    // กด Enter / Space บนการ์ด -> เปิด model
    productsEl.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.closest(".card")) {
        e.preventDefault();
        openCard(e.target.closest(".card"));
      }
    });

    overlay.addEventListener("click", closeModel);
    closeBtn.addEventListener("click", closeModel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModel();
    });

    if (contactBtn) {
      contactBtn.addEventListener("click", function () {
        alert("Contact sales about: " + title.textContent);
        // ภายหลังเปลี่ยนเป็น mailto:, ฟอร์ม, หรือ link หน้า Contact ได้
      });
    }
  })();

  updateCategoryCounts();
renderProducts();
applyCategoryFromURL(); // เพิ่มบรรทัดนี้

});
