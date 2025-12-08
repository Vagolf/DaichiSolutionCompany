// navbar.js
const ROOT = window.location.pathname.includes('/services/') ? '..' : '.';

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
  <header class="header-area header-sticky">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            <!-- Logo -->
            <a href="${ROOT}/index.html" class="logo">
              <img src="${ROOT}/images/logo/Daichi-logo-navbar.png"
                   alt="Daichisolution Logo">
            </a>

            <!-- Menu -->
            <ul class="nav">
              <li class="scroll-to-section">
                <a href="${ROOT}/index.html" class="nav-link active">Home</a>
              </li>
              <li class="scroll-to-section">
                <a href="${ROOT}/products.html" class="nav-link">Products</a>
              </li>
              <li class="scroll-to-section">
                <a href="#footer" class="nav-link">Contact Us</a>
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
  const menuTrigger = navbar.querySelector('.menu-trigger');
  const nav = navbar.querySelector('.main-nav .nav');

  if (menuTrigger && nav) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      menuTrigger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // ========== ใส่ active ให้ลิงก์ของหน้าปัจจุบัน ==========
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
});
