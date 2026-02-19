// navbar.js
const ROOT =
  window.location.pathname.includes("/services/") ||
  window.location.pathname.includes("/warranty/") ||
  window.location.pathname.includes("/career/")
    ? ".."
    : ".";

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // 1. Inject HTML
  navbar.innerHTML = `
  <header id="siteHeader" class="site-header" style="box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <a href="${ROOT}/index.html" class="logo">
              <img src="${ROOT}/images/logo/Daichi-logo-5.png"
                   alt="Daichisolution Logo" style="height: 90px; width: auto;" />
            </a>

            <ul class="nav" style="font-size: 15px;">
              <li class="scroll-to-section"><a href="${ROOT}/index.html" class="nav-link">หน้าหลัก</a></li>
              <li class="scroll-to-section"><a href="${ROOT}/map.html" class="nav-link">ศูนย์บริการ</a></li>
              <li class="scroll-to-section"><a href="${ROOT}/products.html" class="nav-link">สินค้า</a></li>
              <li class="scroll-to-section"><a href="${ROOT}/career.html" class="nav-link">สมัครงาน</a></li>
              <li class="scroll-to-section"><a href="${ROOT}/contact.html" class="nav-link">ติดต่อเรา</a></li>
            </ul>

            <a class="menu-trigger" href="#" aria-label="Toggle menu">
              <i class="fa-solid fa-bars"></i>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  `;

  // 2. ประกาศตัวแปร (ต้องอยู่ในนี้เท่านั้น ถึงจะเรียกใช้ได้)
  const header = navbar.querySelector("#siteHeader");
  const menuTrigger = navbar.querySelector(".menu-trigger");
  const nav = navbar.querySelector(".main-nav .nav");
  const links = navbar.querySelectorAll(".nav a.nav-link[href]");
  
  // ย้าย logoImg มาประกาศตรงนี้ เพื่อให้มองเห็น header
  const logoImg = header.querySelector("img"); 

  const closeMenu = () => {
    menuTrigger?.classList.remove("active");
    nav?.classList.remove("active");
  };

  // 3. Event Listeners ต่างๆ
  if (menuTrigger && nav) {
    menuTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      menuTrigger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (!header || !nav) return;
    if (!nav.classList.contains("active")) return;
    if (!header.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  links.forEach((a) => a.addEventListener("click", closeMenu));

  // 4. Active Link Logic
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  links.forEach((l) => l.classList.remove("active"));

  const normalize = (p) =>
    p.replace(/\/index\.html$/i, "/").replace(/\/$/, "") || "/";

  const current = normalize(currentPath);
  let matched = false;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;
    const linkPath = normalize(new URL(href, window.location.href).pathname);
    if (linkPath === current) {
      link.classList.add("active");
      matched = true;
    }
  });

  if (!matched && current.startsWith("/career/")) {
    links.forEach((link) => {
      if (link.getAttribute("href")?.includes("/career.html")) link.classList.add("active");
    });
  }

  if (!matched && current.startsWith("/services/")) {
    links.forEach((link) => {
      if (link.getAttribute("href")?.includes("/index.html")) link.classList.add("active");
    });
  }

  // 5. Scroll Animation & Height Calculation
  // ประกาศฟังก์ชัน refresh ไว้ข้างบน (หรือใช้ var) เพื่อให้เรียกใช้ได้ทั่วถึง
  let refresh = () => {}; 

  if (header) {
    const holder = navbar;
    let ticking = false;
    let CHANGE_AT = window.innerHeight * 0.5;

    const FADE_RANGE = 140;
    const RETURN_RANGE = 120;
    const OFFSET_MAX = -8;
    const PAD_START = 14;
    const PAD_END = 8;

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    function setHolderHeight() {
      // คำนวณความสูงของ Header จริงๆ
      const h = header.getBoundingClientRect().height;
      // ส่งค่าไปที่ CSS Variable --nav-space
      document.documentElement.style.setProperty("--nav-space", `${Math.ceil(h)}px`);
      // ดัน div#navbar ให้สูงเท่า header เพื่อกันเนื้อหาข้างล่างไหลขึ้นมาทับ
      holder.style.height = `var(--nav-space)`;
    }

    function update() {
      const y = window.scrollY;
      const pre = clamp(y / CHANGE_AT, 0, 1);
      let ty = lerp(0, OFFSET_MAX, pre);
      let py = lerp(PAD_START, PAD_END, pre);
      const after = clamp((y - CHANGE_AT) / RETURN_RANGE, 0, 1);
      if (y >= CHANGE_AT) ty = lerp(OFFSET_MAX, 0, after);

      const fade = clamp((y - CHANGE_AT) / FADE_RANGE, 0, 1);
      const bgA = lerp(1, 0.9, fade);
      const shA = lerp(0.08, 0.4, fade);

      header.style.setProperty("--ty", `${Math.round(ty * 10) / 10}px`);
      header.style.setProperty("--py", `${Math.round(py * 10) / 10}px`);
      header.style.setProperty("--bg-a", `${bgA}`);
      header.style.setProperty("--sh-a", `${shA}`);

      ticking = false;
    }

    // กำหนดค่าให้ฟังก์ชัน refresh
    refresh = () => {
      CHANGE_AT = window.innerHeight * 0.5;
      setHolderHeight();
      update();
    };

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(refresh);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh, { once: true });
    window.visualViewport?.addEventListener("resize", refresh);
  }

  // 6. Carousel Logic (Flickity)
  const flktyEl = document.querySelector(".home-products-carousel");
  if (flktyEl && flktyEl.flickity) { // เช็ค property flickity
     // (Logic เดิมของคุณ)
     const isMobile = window.matchMedia("(max-width: 576px)").matches;
     flktyEl.flickity.options.groupCells = isMobile ? 1 : 4;
     flktyEl.flickity.resize();
     flktyEl.flickity.reloadCells();
  }

  // 7. Fix Image Loading (ย้ายเข้ามาใน Scope นี้)
  if (logoImg && !logoImg.complete) {
    logoImg.addEventListener("load", refresh, { once: true });
  }

  // 8. Timeout Triggers (ย้ายเข้ามาใน Scope นี้ เพื่อให้มองเห็น refresh)
  setTimeout(refresh, 50);
  setTimeout(refresh, 250);

}); // <--- ปิดปีกกา DOMContentLoaded ตรงนี้