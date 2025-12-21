// navbar.js
const ROOT = window.location.pathname.includes("/services/") ? ".." : ".";

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
<<<<<<< HEAD
  <header header id="siteHeader" class="site-header" style="box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);">
=======
  <header class="header-area header-sticky" style="box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);">
>>>>>>> origin/main
    <div class="container">
      <div class="row">
        <div class="col-12"  style="border-color: #ffffff;">
          <nav class="main-nav">
            <!-- Logo -->
            <a href="${ROOT}/index.html" class="logo">
              <img src="${ROOT}/images/logo/Daichi-logo.png"
                   alt="Daichisolution Logo" style="height: 60px; width: auto;" />
            </a>

            <!-- Menu -->
            <ul class="nav" style="font-size: 15px;">
<<<<<<< HEAD
              <li class="scroll-to-section">
                <a href="${ROOT}/index.html" class="nav-link active">หน้าหลัก</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/map.html" class="nav-link">ศูนย์บริการ</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/products.html" class="nav-link">สินค้า</a>
              </li>
              <li class="scroll-to-section">
=======
              <li class="scroll-to-section" style="margin: -10px;">
                <a href="${ROOT}/index.html" class="nav-link active">หน้าหลัก</a>
              </li>
              <li class="scroll-to-section" style="margin: -10px;">
                <a href="${ROOT}/station.html" class="nav-link">ศูนย์บริการ</a>
              </li>
              <li class="scroll-to-section" style="margin: -10px;">
                <a href="${ROOT}/products.html" class="nav-link">สินค้า</a>
              </li>
              <li class="scroll-to-section" style="margin: -10px;">
>>>>>>> origin/main
                <a href="${ROOT}/contact.html" class="nav-link">ติดต่อเรา</a>
              </li>
            </ul>

            <!-- Mobile Menu Trigger -->
            <a class="menu-trigger" aria-label="Toggle menu">
              <i href="javascript:void(0)" class="fa-solid fa-bars"></i>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  `;

  // ========== toggle เมนูตอนจอเล็ก ==========
<<<<<<< HEAD
  const menuTrigger = navbar.querySelector(".menu-trigger");
  const nav = navbar.querySelector(".main-nav .nav");

  if (menuTrigger && nav) {
    menuTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      menuTrigger.classList.toggle("active");
      nav.classList.toggle("active");
=======
  const menuTrigger = navbar.querySelector('.menu-trigger');
  const nav = navbar.querySelector('.main-nav .nav');

  if (menuTrigger && nav) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      menuTrigger.classList.toggle('active');
      nav.classList.toggle('active');
>>>>>>> origin/main
    });
  }

  // ========== ใส่ active ให้ลิงก์ของหน้าปัจจุบัน ==========
<<<<<<< HEAD
  const links = navbar.querySelectorAll(".nav a.nav-link[href]");
  const currentPath = window.location.pathname.replace(/\\/g, "/");

  links.forEach((link) => {
    let href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    // ตัด #anchor ทิ้ง
    href = href.split("#")[0];

    const absolute = new URL(href, window.location.origin + currentPath)
      .pathname;

    if (absolute === currentPath) {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });

  // ========== เปลี่ยนสี navbar ตอนเลื่อน ==========
  const header = navbar.querySelector("#siteHeader");
  if (header) {
    const holder = document.getElementById("navbar"); // div placeholder
    let ticking = false;

    // จุดเปลี่ยนสี: ครึ่งหน้าจอ
    let CHANGE_AT = window.innerHeight * 0.5;

    // ระยะเฟดสี/เงาให้เนียน
    const FADE_RANGE = 140; // px
    // ระยะคืน top (จากยุบขึ้นเล็กน้อยกลับไป top 0)
    const RETURN_RANGE = 120; // px

    // ค่าการยุบ
    const OFFSET_MAX = -8; // px (ยุบขึ้นเล็กน้อย)
    const PAD_START = 14; // px
    const PAD_END = 8; // px
    const BG_MAX = 0.95;
    const SH_MAX = 0.14;

    function clamp(v, min, max) {
      return Math.min(max, Math.max(min, v));
    }
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function setHolderHeight() {
      // กันกระตุก: ให้ holder สูงเท่ากับ header จริง
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--nav-space",
        `${Math.ceil(h)}px`
      );
      if (holder) holder.style.height = `var(--nav-space)`;
    }

    // อัพเดตสถานะ navbar
    function update() {
      const BG_START = 1;
      const BG_END = 0.9;

      const SH_START = 0.08;
      const SH_END = 0.4;

      const y = window.scrollY;

      // progress ช่วงก่อนถึงจุดเปลี่ยนสี
      const pre = clamp(y / CHANGE_AT, 0, 1);

      // ระหว่างเลื่อนลง “ยุบลงนิดหน่อย”
      let ty = lerp(0, OFFSET_MAX, pre);
      let py = lerp(PAD_START, PAD_END, pre);

      // หลังถึงจุดเปลี่ยนสี: ให้กลับ top (ty -> 0) แบบเนียน
      const after = clamp((y - CHANGE_AT) / RETURN_RANGE, 0, 1);
      if (y >= CHANGE_AT) ty = lerp(OFFSET_MAX, 0, after);

      // เฟดพื้นหลัง/เงา เริ่มหลังครึ่งจอ
      const fade = clamp((y - CHANGE_AT) / FADE_RANGE, 0, 1);
      const bgA = lerp(BG_START, BG_END, fade);
      const shA = lerp(SH_START, SH_END, fade);

      // ลด jitter: ปัดเศษเล็กน้อย
      ty = Math.round(ty * 10) / 10;
      py = Math.round(py * 10) / 10;

      header.style.setProperty("--ty", `${ty}px`);
      header.style.setProperty("--py", `${py}px`);
      header.style.setProperty("--bg-a", `${bgA}`);
      header.style.setProperty("--sh-a", `${shA}`);

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    // init
    setHolderHeight();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      CHANGE_AT = window.innerHeight * 0.5;
      setHolderHeight();
      update();
    });
  }
=======
  const links = navbar.querySelectorAll('.nav a.nav-link[href]');
  const currentPath = window.location.pathname.replace(/\\/g, '/');

  links.forEach(link => {
    let href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return;

    // ตัด #anchor ทิ้ง
    href = href.split('#')[0];

    const absolute = new URL(href, window.location.origin + currentPath).pathname;

    if (absolute === currentPath) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
>>>>>>> origin/main
});
