// navbar.js
const ROOT =
  window.location.pathname.includes("/services/") ||
  window.location.pathname.includes("/career/")
    ? ".."
    : ".";

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
  <header id="siteHeader" class="site-header" style="box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);">
    <div class="container">
      <div class="row">
        <div class="col-12"  style="border-color: #ffffff;">
          <nav class="main-nav">
            <!-- Logo -->
            <a href="${ROOT}/index.html" class="logo">
              <img src="${ROOT}/images/logo/Daichi-logo-4.png"
                   alt="Daichisolution Logo" style="height: 60px; width: auto;" />
            </a>

            <!-- Menu -->
            <ul class="nav" style="font-size: 15px;">
              <li class="scroll-to-section">
                <a href="${ROOT}/index.html" class="nav-link">หน้าหลัก</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/map.html" class="nav-link">ศูนย์บริการ</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/products.html" class="nav-link">สินค้า</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/career.html" class="nav-link">สมัครงาน</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/contact.html" class="nav-link">ติดต่อเรา</a>
              </li>
            </ul>

            <!-- Mobile Menu Trigger -->
            <a class="menu-trigger" href="#" aria-label="Toggle menu">
              <i class="fa-solid fa-bars"></i>
            </a>

          </nav>
        </div>
      </div>
    </div>
  </header>
  `;

  // ========== toggle เมนูตอนจอเล็ก ==========
  const menuTrigger = navbar.querySelector(".menu-trigger");
  const nav = navbar.querySelector(".main-nav .nav");

  if (menuTrigger && nav) {
    menuTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      menuTrigger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // ========== ใส่ active ให้ลิงก์ของหน้าปัจจุบัน ==========
  const links = navbar.querySelectorAll(".nav a.nav-link[href]");
  const currentPath = window.location.pathname.replace(/\\/g, "/");

  // ล้าง active ทุกอันก่อน
  links.forEach((l) => l.classList.remove("active"));

  // ฟังก์ชันช่วย normalize path (กัน /index.html)
  const normalize = (p) =>
    p.replace(/\/index\.html$/i, "/").replace(/\/$/, "") || "/";

  const current = normalize(currentPath);

  let matched = false;

  // 1) match แบบตรง ๆ ก่อน
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;

    const linkPath = normalize(new URL(href, window.location.href).pathname);

    if (linkPath === current) {
      link.classList.add("active");
      matched = true;
    }
  });

  // 2) ถ้าเป็นหน้าย่อย careers ให้ active ที่ "สมัครงาน"
  if (!matched && current.startsWith("/career/")) {
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPath = new URL(href, window.location.href).pathname;
      if (linkPath.endsWith("/career.html")) {
        link.classList.add("active");
        matched = true;
      }
    });
  }

  // 3) ถ้าเป็นหน้าย่อย services ให้ active ที่ "ศูนย์บริการ"
  if (!matched && current.startsWith("/services/")) {
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPath = new URL(href, window.location.href).pathname;
      if (linkPath.endsWith("/index.html")) {
        link.classList.add("active");
        matched = true;
      }
    });
  }

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
});

// ปิดเมนูเมื่อกดลิงก์ (มือถือ)
links.forEach((a) => {
  a.addEventListener("click", () => {
    menuTrigger?.classList.remove("active");
    nav?.classList.remove("active");
  });
});
