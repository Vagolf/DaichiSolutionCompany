// navbar.js
const ROOT = window.location.pathname.includes('/services/') ? '..' : '.';

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
    <style>
      .navbar-toggler:focus {
        outline: none;
        box-shadow: none;
      }
      .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='white' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
      }
    </style>

    <nav class="navbar navbar-expand-lg navbar-light sticky-top py-0 px-0 px-lg-5 shadow-sm"
         style="background-color: #0F172A;">
      <div class="container-fluid">
        <a href="${ROOT}/index.html" class="navbar-brand">
          <img class="me-3" src="${ROOT}/images/logo/Daichi-logo-navbar.png"
               alt="Daichisolution Logo" style="max-height: 50px;">
        </a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false"
                aria-label="Toggle navigation" style="border: 1px solid #ffffff;">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav ms-auto p-2 p-lg-0">
            <li class="nav-item">
              <a href="${ROOT}/index.html" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="${ROOT}/products.html" class="nav-link">Products</a>
            </li>
            <li class="nav-item">
              <a href="#footer" class="nav-link">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
});
